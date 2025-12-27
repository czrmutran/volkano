import { Suspense } from 'react';
import Header from '../../../../components/header-section';
import EquipamentosStore from '../../../../components/equipamentos-store';
import Footer from '../../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volkano Prime - Equipamentos',
  description: 'Linha Volkano Prime: Custo-benefício e qualidade.',
};

export default function VolkanoPrimePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div>Carregando...</div>}>
          <EquipamentosStore categoria="Volkano Prime" />
        </Suspense>
      </main>
    </>
  );
}
