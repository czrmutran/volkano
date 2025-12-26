import { supabase } from "../../../lib/supabase";
import ProdutoDetalheClient from "../../../components/produto-detalhe-client";
import Header from "../../../components/header-section";
import Link from "next/link";
import { CartItem } from "../../../context/cart-context";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ produto_nome: string }>;
}

export default async function ProdutoDetalhePage({ params }: PageProps) {
  const resolvedParams = await params;
  const produtoParam = decodeURIComponent(resolvedParams.produto_nome);

  let produto: CartItem | null = null;
  let relacionados: CartItem[] = [];
  let prodError = null;

  try {
    // 1. Tentar buscar pelo slug exato
    let { data: prodData, error } = await supabase
      .from("produtos")
      .select("*")
      .eq("slug", produtoParam)
      .single();

    prodError = error;

    // 2. Se não encontrar, tentar pelo nome (case insensitive)
    if (!prodData) {
      let { data: nameData, error: nameError } = await supabase
        .from("produtos")
        .select("*")
        .ilike("nome", produtoParam)
        .single();

      // 3. Fallback: Se tiver hifens, tenta substituir por espaços
      if (!nameData && produtoParam.includes("-")) {
        const nameWithSpaces = produtoParam.replace(/-/g, " ");
        const { data: spaceData } = await supabase
          .from("produtos")
          .select("*")
          .ilike("nome", nameWithSpaces)
          .maybeSingle();

        if (spaceData) {
          nameData = spaceData;
          nameError = null;
        }
      }

      prodData = nameData;
      if (nameData) prodError = null;
    }

    if (prodData) {
      produto = {
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

      // 3. Buscar relacionados
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
    }
  } catch (err) {
    console.error("Erro ao buscar produto:", err);
  }

  if (!produto) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-black pt-32 flex flex-col items-center gap-4">
          <p className="text-white text-xl">Produto não encontrado.</p>
          <Link href="/store" className="text-orange-500 hover:underline">
            Voltar para a loja
          </Link>
          {/* Debug info - only visible if user inspects */}
          <div className="hidden">
            Param: {produtoParam}
          </div>
        </div>
      </>
    );
  }

  return <ProdutoDetalheClient produto={produto} relacionados={relacionados} />;
}
