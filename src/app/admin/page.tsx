"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../../lib/supabase";
import Header from "../../components/header-section";
import FooterSection from "../../components/footer";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";

type Produto = {
  id: string;
  nome: string;
  codigo: string | null;
  categoria: string;
  imagens: string[];
};

export default function AdminPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-24 pb-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <h1 className="text-3xl font-black uppercase">
              Painel <span className="text-orange-500">Admin</span>
            </h1>
            <Link
              href="/admin/novo-produto"
              className="flex items-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-full font-bold hover:bg-orange-400 transition"
            >
              <Plus size={20} />
              Novo Produto
            </Link>
          </div>

          {/* Filtro */}
          <div className="mb-8 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou código..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none transition"
            />
          </div>

          {/* Tabela / Lista */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-orange-500" size={40} />
            </div>
          ) : (
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
          )}
        </div>
      </main>
      <FooterSection />
    </>
  );
}
