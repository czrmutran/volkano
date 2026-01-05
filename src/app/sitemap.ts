import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const baseUrl = 'https://volkanofitness.com.br'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Inicializar Supabase diretamente aqui para garantir acesso em tempo de build/execução
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  // 1. Rotas Estáticas Principais
  const staticRoutes = [
    '',
    '/store',
    '/sobre-nos',
    '/contato',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.9,
  }))

  // 2. Rotas de Categorias (Baseado na estrutura de pastas existente)
  const categories = [
    'volkano-pro',
    'volkano-prime',
    'volkano-black',
    'volkano-infinity',
    'hammer-e-articulados',
    'forcavariavel',
    'suportes',
  ]

  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/store/categoria-produto/${cat}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 3. Rotas Dinâmicas de Produtos (Buscando do Supabase)
  let productRoutes: MetadataRoute.Sitemap = []
  
  try {
    const { data: produtos } = await supabase
      .from('produtos')
      .select('slug, updated_at, created_at')
      .not('slug', 'is', null)

    if (produtos) {
      productRoutes = produtos.map((prod) => ({
        url: `${baseUrl}/produto/${prod.slug}`,
        lastModified: prod.updated_at || prod.created_at || new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    }
  } catch (error) {
    console.error('Erro ao gerar sitemap de produtos:', error)
  }

  // 4. Rotas de Blog (Estáticas por enquanto, baseadas no data/blog-posts.tsx)
  // Como não tenho acesso fácil ao array de posts aqui sem importar o arquivo client-side, 
  // vou adicionar manualmente ou deixar genérico.
  // Idealmente, o blog viria de um CMS/Banco de Dados. 
  // Vou assumir que o usuário vai querer expandir isso depois.

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
