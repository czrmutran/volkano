import Header from '../../components/header-section';
import BlogSection from '../../components/blog-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Fitness | Dicas de Gestão e Treino',
  description: 'Fique por dentro das novidades do mercado fitness, dicas de gestão para academias e informações sobre equipamentos de musculação no Blog da Volkano.',
  openGraph: {
    title: 'Blog Volkano Fitness - Conteúdo para Academias',
    url: 'https://volkanofitness.com.br/blog',
  }
};

const BlogPage = () => {
  return (
    <>
      <Header />
      <div className="pt-20">
        <BlogSection />
      </div>
    </>
  );
};

export default BlogPage;