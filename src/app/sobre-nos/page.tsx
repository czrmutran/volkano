import Header from '../../components/header-section';
import SobreNosSection from '../../components/sobre-nos-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre a Volkano | Nossa História e Missão',
  description: 'Conheça a história da Volkano Fitness, referência em fabricação de equipamentos de musculação no Brasil. Inovação, qualidade e biomecânica avançada.',
  openGraph: {
    title: 'Sobre a Volkano Fitness - Excelência em Equipamentos',
    description: 'Saiba mais sobre nossa fábrica, nossa missão e como produzimos equipamentos de alta performance.',
    url: 'https://volkanofitness.com.br/sobre-nos',
  }
};

const SobrePage = () => {
  return (
    <>
      <Header />
      <div className="pt-20">
        <SobreNosSection />
      </div>
    </>
  );
};

export default SobrePage;