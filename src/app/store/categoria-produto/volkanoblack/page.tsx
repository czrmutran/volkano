import { Suspense } from 'react';
import Header from '../../../../components/header-section';
import EquipamentosStore from '../../../../components/equipamentos-store';
import Footer from '../../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volkano Black - Equipamentos',
  description: 'Linha Volkano Black: Robustez e elegância.',
};

export default function VolkanoBlackPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div>Carregando...</div>}>
          <EquipamentosStore categoria="Volkano Black" />
        </Suspense>
      </main>
    </>
  );
}
