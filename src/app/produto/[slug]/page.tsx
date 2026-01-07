import { supabase } from "../../../lib/supabase";
import ProdutoDetalheClient from "../../../components/produto-detalhe-client";
import Header from "../../../components/header-section";
import Link from "next/link";
import { CartItem } from "../../../context/cart-context";
import { ArrowLeft } from "lucide-react";
import type { Metadata, ResolvingMetadata } from 'next';

// Força a página a ser dinâmica para sempre buscar dados frescos do DB
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const rawSlug = resolvedParams.slug;
  const slugParam = decodeURIComponent(rawSlug);

  const { data: prodData } = await supabase
    .from("produtos")
    .select("nome, descricao, imagens, categoria")
    .or(`slug.eq.${slugParam},slug.ilike.${slugParam},nome.ilike.${slugParam}`)
    .limit(1)
    .maybeSingle();

  if (!prodData) {
    return {
      title: "Produto Não Encontrado | Volkano Fitness",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const productImage = prodData.imagens?.[0] || "/banner_principal_desktop_2.png";

  return {
    title: prodData.nome,
    description: prodData.descricao?.slice(0, 160) || `Confira o ${prodData.nome} da linha ${prodData.categoria}. Equipamento profissional de alta qualidade.`,
    openGraph: {
      title: `${prodData.nome} | Volkano Fitness`,
      description: prodData.descricao?.slice(0, 200),
      images: [productImage, ...previousImages],
    },
  };
}

export default async function ProdutoDetalhePage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams.slug;
  const slugParam = decodeURIComponent(rawSlug);

  console.log(`[ProdutoPage] Iniciando busca por: "${slugParam}" (Raw: "${rawSlug}")`);

  let prodData = null;

  try {
    // ESTRATÉGIA 1: Busca Direta pelo Slug (Exata e Case-Insensitive)
    const { data: bySlug, error: errSlug } = await supabase
      .from("produtos")
      .select("*")
      .or(`slug.eq.${slugParam},slug.ilike.${slugParam}`)
      .limit(1)
      .maybeSingle();

    if (!errSlug && bySlug) {
      console.log("[ProdutoPage] Encontrado por Slug:", bySlug.nome);
      prodData = bySlug;
    }

    // ESTRATÉGIA 2: Busca por Nome (Legado/Fallback)
    if (!prodData) {
      console.log("[ProdutoPage] Não encontrado por slug. Tentando por nome...");
      const { data: byName, error: errName } = await supabase
        .from("produtos")
        .select("*")
        .ilike("nome", slugParam)
        .limit(1)
        .maybeSingle();

      if (!errName && byName) {
        console.log("[ProdutoPage] Encontrado por Nome (exato):", byName.nome);
        prodData = byName;
      }
    }

    // ESTRATÉGIA 3: Busca por Nome "Higienizado" (Hífens -> Espaços)
    if (!prodData && slugParam.includes("-")) {
      const nameFromSlug = slugParam.replace(/-/g, " ");
      console.log(`[ProdutoPage] Tentando buscar por nome transformado: "${nameFromSlug}"`);

      const { data: bySpaceName, error: errSpace } = await supabase
        .from("produtos")
        .select("*")
        .ilike("nome", nameFromSlug)
        .limit(1)
        .maybeSingle();

      if (!errSpace && bySpaceName) {
        console.log("[ProdutoPage] Encontrado por Nome (espaços):", bySpaceName.nome);
        prodData = bySpaceName;
      }
    }

    // ESTRATÉGIA 4: Varredura de Segurança
    if (!prodData) {
      console.log("[ProdutoPage] Fallback final: Varredura local...");
      const { data: allProds } = await supabase
        .from("produtos")
        .select("id, nome, slug, categoria, codigo, descricao, imagens, video_url");

      if (allProds) {
        const normalize = (str: string) => str
          ? str.toLowerCase()
               .normalize("NFD")
               .replace(/[\u0300-\u036f]/g, "")
               .replace(/[^a-z0-9]/g, "")
          : "";

        const target = normalize(slugParam);

        prodData = allProds.find(p => {
          if (p.slug && normalize(p.slug) === target) return true;
          if (p.nome && normalize(p.nome) === target) return true;
          return false;
        });

        if (prodData) {
          console.log("[ProdutoPage] Encontrado por Varredura Local:", prodData.nome);
        }
      }
    }

  } catch (err) {
    console.error("[ProdutoPage] Erro crítico na busca:", err);
  }

  // RENDERIZAÇÃO DE "NÃO ENCONTRADO"
  if (!prodData) {
    console.warn("[ProdutoPage] Produto definitivamente não encontrado.");
    return (
      <>
        <Header />
        <div className="min-h-screen bg-black pt-32 flex flex-col items-center justify-center gap-6 text-white px-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-orange-500">Produto não encontrado</h1>
            <p className="text-white/60 max-w-md">
              Não conseguimos localizar o produto com o identificador: <br />
              <span className="font-mono text-sm bg-white/10 px-2 py-1 rounded mt-2 inline-block text-white">
                {slugParam}
              </span>
            </p>
          </div>
          
          <Link 
            href="/store" 
            className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-orange-500 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Voltar para a Loja
          </Link>
        </div>
      </>
    );
  }

  // PREPARAÇÃO DOS DADOS PARA O CLIENTE
  const produto: CartItem = {
    id: prodData.id,
    nome: prodData.nome,
    codigo: prodData.codigo,
    desc: prodData.descricao || "",
    img: prodData.imagens?.[0] || "/placeholder.webp",
    alt: prodData.nome,
    linha: prodData.categoria,
    imagens: prodData.imagens || [],
    video_url: prodData.video_url || null,
    slug: prodData.slug || null,
  };

  // BUSCA DE RELACIONADOS
  let relacionados: CartItem[] = [];
  try {
    const { data: relData } = await supabase
      .from("produtos")
      .select("*")
      .eq("categoria", prodData.categoria)
      .neq("id", prodData.id)
      .limit(4);

    if (relData) {
      relacionados = relData.map((item: any) => ({
        id: item.id,
        nome: item.nome,
        codigo: item.codigo,
        desc: item.descricao || "",
        img: item.imagens?.[0] || "/placeholder.webp",
        alt: item.nome,
        linha: item.categoria,
        imagens: item.imagens || [],
        video_url: item.video_url || null,
        slug: item.slug || null,
      }));
    }
  } catch (err) {
    console.error("[ProdutoPage] Erro ao buscar relacionados:", err);
  }

  return <ProdutoDetalheClient produto={produto} relacionados={relacionados} />;
}
