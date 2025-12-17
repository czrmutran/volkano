import Header from '../../components/header-section';
import BlogSection from '../../components/blog-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Volkano',
  description: 'Fique por dentro das novidades e dicas sobre musculação e equipamentos Volkano.',
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