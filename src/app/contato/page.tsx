import Header from '../../components/header-section';
import ContatoSection from '../../components/contato-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato - Volkano',
  description: 'Entre em contato com a Volkano para suporte e informações sobre nossos produtos de musculação.',
};

const ContatoPage = () => {
  return (
    <>
      <Header />
      <div className="pt-20">
        <ContatoSection />
      </div>
    </>
  );
};

export default ContatoPage;