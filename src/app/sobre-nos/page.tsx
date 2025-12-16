import Header from '../../components/header-section';
import SobreNosSection from '../../components/sobre-nos-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nós - Volkano',
  description: 'Conheça a Volkano: inovação e qualidade em equipamentos de musculação no Brasil.',
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