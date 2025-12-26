"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Filter, CheckCircle } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useCart, CartItem } from "../context/cart-context";

const linhas = [
  "Volkano Pro",
  "Volkano Infinity",
  "Volkano Black",
  "Volkano Prime",
  "Hammer e Articulados",
  "Força Variável",
  "Suportes",
];

type SortKey = "padrao" | "nome_asc" | "nome_desc";

interface EquipamentosStoreProps {
  categoria?: string;
}

export default function EquipamentosStore({ categoria }: EquipamentosStoreProps) {
  const searchParams = useSearchParams();
  const linhaSelecionada = categoria || searchParams.get("linha") || "Todos";
  const [termoBusca, setTermoBusca] = useState("");
  const [sort, setSort] = useState<SortKey>("padrao");
  const [visibleCount, setVisibleCount] = useState(12);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [equipamentos, setEquipamentos] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart, isInCart } = useCart();

  // Fetch products from Supabase
  useEffect(() => {
    async function fetchProdutos() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("produtos")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Erro ao buscar produtos:", error);
          return;
        }

        if (data) {
          const formatted: CartItem[] = data.map((item: any) => ({
            id: item.id,
            nome: item.nome,
            codigo: item.codigo,
            desc: item.descricao || "",
            img: item.imagens?.[0] || "/placeholder.webp", // Fallback image
            alt: item.nome,
            linha: item.categoria,
            imagens: item.imagens || [],
            slug: item.slug || null,
            video_url: item.video_url || null,
          }));
          setEquipamentos(formatted);
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

  // Resetar paginação ao filtrar
  useEffect(() => {
    setVisibleCount(12);
  }, [linhaSelecionada, termoBusca, sort]);

  const equipamentosFiltrados = useMemo(() => {
    let list = equipamentos
      .filter((equip) => (linhaSelecionada === "Todos" ? true : equip.linha === linhaSelecionada))
      .filter((equip) =>
        (equip.nome + " " + equip.desc).toLowerCase().includes(termoBusca.toLowerCase())
      );

    if (sort === "nome_asc") list = [...list].sort((a, b) => a.nome.localeCompare(b.nome));
    if (sort === "nome_desc") list = [...list].sort((a, b) => b.nome.localeCompare(a.nome));

    return list;
  }, [linhaSelecionada, termoBusca, sort, equipamentos]);

  const handleAdicionar = (equipamento: CartItem) => {
    addToCart(equipamento);
  };

  const total = equipamentosFiltrados.length;
  const displayedItems = equipamentosFiltrados.slice(0, visibleCount);

  // Função para gerar o link correto para cada linha
  const getLinkLinha = (linha: string) => {
    const map: Record<string, string> = {
      "Volkano Pro": "/store/categoria-produto/volkanopro",
      "Volkano Infinity": "/store/categoria-produto/volkanoinfinity",
      "Volkano Black": "/store/categoria-produto/volkanoblack",
      "Volkano Prime": "/store/categoria-produto/volkanoprime",
      "Hammer e Articulados": "/store/categoria-produto/hammer-e-articulados",
      "Força Variável": "/store/categoria-produto/forcavariavel",
      "Suportes": "/store/categoria-produto/suportes",
    };

    return map[linha] || `/store?linha=${encodeURIComponent(linha)}`;
  };

  const getProductLink = (item: CartItem) => {
    if (item.slug) return `/produto/${item.slug}`;
    
    // Gerar slug amigável a partir do nome se não houver slug definido
    const generatedSlug = item.nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
      .replace(/\s+/g, "-"); // Substitui espaços por hífens
      
    return `/produto/${generatedSlug}`;
  };

  return (
  <section className="bg-black/80 py-16 sm:py-20 lg:py-24 overflow-hidden" id="equipamentos">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:grid lg:grid-cols-[320px_1fr] gap-10 xl:gap-12">

        {/* Mobile Filter Toggle */}
        <button
          className="lg:hidden flex items-center justify-center gap-2 rounded-full bg-white/10 text-white font-bold py-3 px-5 border border-white/10 hover:bg-white/15 transition"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <Filter size={18} />
          {showMobileFilters ? "Ocultar Linhas" : "Linhas"}
        </button>

        {/* SIDEBAR */}
        <aside
          className={`space-y-8 ${
            showMobileFilters ? "block" : "hidden"
          } lg:block lg:sticky lg:top-28 lg:self-start`}
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-2xl">
            {/* Pesquisa */}
            <p className="text-sm font-semibold text-white/70 mb-3">Pesquisa</p>

            <div className="flex gap-3">
              <input
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-white/5 py-3 px-4 text-white placeholder-white/40 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                placeholder="Buscar equipamento..."
              />
              <button
                className="rounded-full bg-orange-500 text-black font-extrabold px-5 py-3 hover:bg-orange-400 transition whitespace-nowrap"
                type="button"
              >
                Buscar
              </button>
            </div>

            {/* Linhas */}
            <div className="mt-8">
              <h2 className="text-3xl font-black text-white mb-4">Linhas</h2>

              <ul className="space-y-2">
                <li>
                  <Link
                    href="/store"
                    className={`w-full text-left rounded-lg px-3 py-2 transition block ${
                      linhaSelecionada === "Todos"
                        ? "bg-orange-500 text-black font-bold"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    Todos
                  </Link>
                </li>

                {linhas.map((l) => (
                  <li key={l}>
                    <Link
                      href={getLinkLinha(l)}
                      className={`w-full text-left rounded-lg px-3 py-2 transition block ${
                        linhaSelecionada === l
                          ? "bg-orange-500 text-black font-bold"
                          : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </aside>

        {/* LISTAGEM */}
        <main className="space-y-6">
          {/* Breadcrumb */}
          <div className="text-sm text-white/50">
            <Link href="/" className="hover:text-white transition-colors">
              Início
            </Link>
            <span className="mx-2">/</span>
            {linhaSelecionada === 'Todos' ? (
              <span>Equipamentos</span>
            ) : (
              <>
                <Link href="/store" className="hover:text-white transition-colors">
                  Equipamentos
                </Link>
                <span className="mx-2">/</span>
                <span>{linhaSelecionada}</span>
              </>
            )}
          </div>

          {/* Topo: exibindo + ordenação */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-white/70">
              Exibindo 1–{Math.min(visibleCount, total)} de {total} resultados
            </p>

            <div className="flex items-center gap-3">
              <span className="text-white/50">Ordenar</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="padrao">Padrão</option>
                <option value="nome_asc">Nome: A–Z</option>
                <option value="nome_desc">Nome: Z–A</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <p className="text-white/50 animate-pulse">Carregando equipamentos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayedItems.map((item) => {
                const isAdded = isInCart(item.id);

                return (
                  <div
                    key={item.id}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[.02]"
                  >
                    <Link href={getProductLink(item)}>
                      <div className="relative w-full aspect-[3/4] cursor-pointer bg-black/20">
                        <Image
                          src={item.img}
                          alt={item.alt}
                          fill
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
                          quality={80}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent pointer-events-none" />
                      </div>
                    </Link>

                    <div className="p-4 flex flex-col flex-1">
                      <Link href={getProductLink(item)} className="hover:text-orange-500 transition-colors">
                        <p className="text-sm font-extrabold text-white/90">
                          {item.nome}
                        </p>
                      </Link>
                      {item.codigo && (
                        <p className="text-xs text-orange-500 font-bold mt-1">
                          Cód: {item.codigo}
                        </p>
                      )}
                      <p className="text-xs text-white/50 mt-1 flex-1">
                        {item.linha}
                      </p>

                      <button
                        onClick={() => handleAdicionar(item)}
                        disabled={isAdded}
                        className={`mt-4 w-full flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-extrabold transition-colors ${
                          isAdded
                            ? "bg-green-600 text-white cursor-default"
                            : "bg-white/10 text-white/80 hover:bg-orange-500 hover:text-black"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle size={14} /> Adicionado
                          </>
                        ) : (
                          "Adicionar"
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Load More */}
          {visibleCount < total && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="rounded-full border border-white/15 bg-white/5 text-white font-extrabold px-8 py-3 hover:bg-orange-500 hover:text-black transition"
              >
                Carregar mais
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  </section>
);
}
