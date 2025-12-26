"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../../lib/supabase";
import Header from "../../components/header-section";
import FooterSection from "../../components/footer";
import { Plus, Pencil, Trash2, Search, Loader2, FileText, LayoutGrid } from "lucide-react";

type Produto = {
  id: string;
  nome: string;
  codigo: string | null;
  categoria: string;
  imagens: string[];
};

type Orcamento = {
  id: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  cidade: string | null;
  itens: any;
  created_at: string;
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"produtos" | "orcamentos">("produtos");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === "produtos") {
      fetchProdutos();
    } else {
      fetchOrcamentos();
    }
  }, [activeTab]);

  async function fetchProdutos() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setProdutos(data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchOrcamentos() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("orcamentos_info")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setOrcamentos(data);
    } catch (err) {
      console.error("Erro ao buscar orçamentos:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      setDeleting(id);
      const { error } = await supabase.from("produtos").delete().eq("id", id);
      if (error) throw error;
      
      setProdutos(produtos.filter((p) => p.id !== id));
      alert("Produto excluído com sucesso.");
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir produto.");
    } finally {
      setDeleting(null);
    }
  }

  const filteredProdutos = produtos.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    p.codigo?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredOrcamentos = orcamentos.filter((o) =>
    o.nome.toLowerCase().includes(search.toLowerCase()) ||
    o.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-24 pb-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <h1 className="text-3xl font-black uppercase">
              Painel <span className="text-orange-500">Admin</span>
            </h1>
            <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10">
              <button
                onClick={() => setActiveTab("produtos")}
                className={`px-4 py-2 rounded-full text-sm font-bold transition flex items-center gap-2 ${
                  activeTab === "produtos"
                    ? "bg-orange-500 text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <LayoutGrid size={16} /> Produtos
              </button>
              <button
                onClick={() => setActiveTab("orcamentos")}
                className={`px-4 py-2 rounded-full text-sm font-bold transition flex items-center gap-2 ${
                  activeTab === "orcamentos"
                    ? "bg-orange-500 text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <FileText size={16} /> Orçamentos
              </button>
            </div>
            {activeTab === "produtos" && (
              <Link
                href="/admin/novo-produto"
                className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition"
              >
                <Plus size={20} />
                Novo Produto
              </Link>
            )}
          </div>

          {/* Filtro */}
          <div className="mb-8 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={activeTab === "produtos" ? "Buscar por nome ou código..." : "Buscar por nome ou e-mail..."}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none transition"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-orange-500" size={40} />
            </div>
          ) : (
            <>
              {activeTab === "produtos" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProdutos.map((prod) => (
                    <div key={prod.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-orange-500/50 transition">
                      <div className="relative h-48 w-full bg-black/20">
                        <Image
                          src={prod.imagens?.[0] || "/placeholder.webp"}
                          alt={prod.nome}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                      
                      <div className="p-5">
                        <div className="mb-4">
                          <p className="text-xs text-orange-500 font-bold mb-1">{prod.categoria}</p>
                          <h3 className="text-lg font-bold leading-tight mb-1">{prod.nome}</h3>
                          {prod.codigo && (
                            <p className="text-sm text-white/50">Cód: {prod.codigo}</p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Link
                            href={`/admin/editar-produto/${prod.id}`}
                            className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-bold transition"
                          >
                            <Pencil size={16} /> Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(prod.id)}
                            disabled={deleting === prod.id}
                            className="flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-500 py-2 px-3 rounded-lg transition disabled:opacity-50"
                          >
                            {deleting === prod.id ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredProdutos.length === 0 && (
                    <div className="col-span-full text-center py-20 text-white/50">
                      Nenhum produto encontrado.
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrcamentos.map((orc) => (
                    <div key={orc.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{orc.nome}</h3>
                          <div className="text-sm text-white/60 space-y-1">
                            <p>{orc.email || "Sem e-mail"}</p>
                            <p>{orc.telefone || "Sem telefone"} • {orc.cidade || "Cidade não informada"}</p>
                          </div>
                        </div>
                        <div className="text-right text-sm text-white/40">
                          {new Date(orc.created_at).toLocaleDateString('pt-BR')} às {new Date(orc.created_at).toLocaleTimeString('pt-BR')}
                        </div>
                      </div>
                      
                      <div className="bg-black/20 rounded-lg p-4">
                        <p className="text-xs font-bold text-orange-500 mb-2 uppercase tracking-wider">Itens Solicitados</p>
                        <ul className="space-y-2">
                          {Array.isArray(orc.itens) && orc.itens.map((item: any, idx: number) => (
                            <li key={idx} className="flex justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                              <span className="text-white/80">{item.nome} <span className="text-white/40 text-xs">({item.linha})</span></span>
                              <span className="font-mono text-orange-500 font-bold">x{item.quantity || 1}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}

                  {filteredOrcamentos.length === 0 && (
                    <div className="text-center py-20 text-white/50">
                      Nenhum orçamento encontrado.
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <FooterSection />
    </>
  );
}
