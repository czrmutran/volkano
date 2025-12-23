import { Suspense } from 'react';
import Header from '../../components/header-section';
import FooterSection from '../../components/footer';
import type { Metadata } from 'next';
import EquipamentosStore from '../../components/equipamentos-store';

export const metadata: Metadata = {
  title: 'Equipamentos - Volkano',
  description: 'Descubra a excelência dos equipamentos Volkano: design inovador, performance superior e durabilidade incomparável para elevar seus treinos ao próximo nível.',
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