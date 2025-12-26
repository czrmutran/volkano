"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useCart, CartItem } from "../context/cart-context";
import Header from "./header-section";


interface ProdutoDetalheClientProps {
  produto: CartItem;
  relacionados: CartItem[];
}

export default function ProdutoDetalheClient({ produto, relacionados }: ProdutoDetalheClientProps) {
  const [mainImage, setMainImage] = useState(produto.img);
  const { addToCart, isInCart } = useCart();

  const handleAdicionar = () => {
    addToCart(produto);
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = produto.video_url ? getYoutubeId(produto.video_url) : null;
  const isAdded = isInCart(produto.id);

  return (
    <>
      <Header />
      <main className="bg-black pt-22 pb-12 text-white min-h-screen">
        <div className="container mx-auto px-4">
          
          {/* Breadcrumb / Voltar */}
          <div className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/store" className="hover:text-white flex items-center gap-1 transition-colors">
              <ArrowLeft size={14} /> Voltar para Loja
            </Link>
            <span className="mx-2">/</span>
            <span className="text-orange-500">{produto.nome}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-8 lg:gap-16 items-start">
            {/* Galeria de Imagens */}
            <div className="space-y-3 lg:sticky lg:top-24">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5">
                <Image
                  src={mainImage}
                  alt={produto.alt}
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
              
              {/* Miniaturas */}
              {produto.imagens.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {produto.imagens.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMainImage(img)}
                      className={`relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border transition-all ${
                        mainImage === img ? "border-orange-500 ring-1 ring-orange-500" : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Imagem ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do Produto */}
            <div className="flex flex-col justify-start relative h-full">
              <div className="mb-1">
                <span className="inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-2">
                  {produto.linha}
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase leading-tight mb-1">
                  {produto.nome}
                </h1>
                {produto.codigo && (
                  <p className="text-sm text-white/50 font-mono">
                    CÓD: {produto.codigo}
                  </p>
                )}
              </div>

              {/* Botão de Ação (Topo) */}
              <div className="mt-4 mb-6 flex flex-col items-center w-full">
                <button
                  onClick={handleAdicionar}
                  disabled={isAdded}
                  className={`w-full max-w-[280px] px-6 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    isAdded
                      ? "bg-green-600 text-white cursor-default"
                      : "bg-orange-500 text-black hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle size={18} />
                      ADICIONADO
                    </>
                  ) : (
                    "ADICIONAR AO ORÇAMENTO"
                  )}
                </button>
                <p className="mt-2 text-[10px] text-white/40 max-w-[280px] text-center">
                  * Adicione para solicitar um orçamento sem compromisso.
                </p>
              </div>

              <div className="h-px w-full bg-white/10 mb-6" />

              <div className="mb-6 flex-1 overflow-y-auto max-h-[300px] pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
                <h3 className="text-sm font-bold mb-2 uppercase text-white/50">Descrição</h3>
                <div className="text-white/80 text-xs leading-relaxed whitespace-pre-wrap">
                  {produto.desc}
                </div>
              </div>

              {/* Vídeo do YouTube */}
              {youtubeId && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold mb-2 uppercase text-white/50">Vídeo</h3>
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Produtos Relacionados */}
          {relacionados.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl md:text-2xl font-black uppercase mb-6">
                Produtos <span className="text-orange-500">Relacionados</span>
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relacionados.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/produto/${rel.slug || encodeURIComponent(rel.nome)}`}
                    className="group block rounded-xl border border-white/10 bg-white/5 overflow-hidden transition-all hover:border-orange-500/50 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={rel.img}
                        alt={rel.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-orange-500 font-bold mb-1">{rel.linha}</p>
                      <h3 className="text-sm font-bold text-white group-hover:text-orange-500 transition-colors">
                        {rel.nome}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
