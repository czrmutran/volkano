import Header from '../../components/header-section';
import ContatoSection from '../../components/contato-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fale Conosco | Suporte e Vendas',
  description: 'Entre em contato com a equipe Volkano Fitness. Solicite orçamentos, tire dúvidas sobre equipamentos ou fale com nosso suporte técnico.',
  openGraph: {
    title: 'Fale com a Volkano Fitness',
    url: 'https://volkanofitness.com.br/contato',
  }
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