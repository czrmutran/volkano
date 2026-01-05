import { Suspense } from 'react';
import Header from '../../components/header-section';
import type { Metadata } from 'next';
import EquipamentosStore from '../../components/equipamentos-store';

export const metadata: Metadata = {
  title: 'Loja de Equipamentos | Catálogo Completo',
  description: 'Explore nosso catálogo completo de equipamentos de musculação. Linhas Volkano Pro, Infinity, Prime, Black, Hammer e muito mais. Solicite seu orçamento.',
  openGraph: {
    title: 'Catálogo de Equipamentos Volkano Fitness',
    description: 'Confira nossa linha completa de aparelhos profissionais para academia. Qualidade e biomecânica superior.',
    url: 'https://volkanofitness.com.br/store',
  }
};

const StorePage = () => {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div>Carregando...</div>}>
          <EquipamentosStore />
        </Suspense>
      </main>
    </>
  );
};

export default StorePage;