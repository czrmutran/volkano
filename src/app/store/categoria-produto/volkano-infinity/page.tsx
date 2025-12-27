import { Suspense } from 'react';
import Header from '../../../../components/header-section';
import EquipamentosStore from '../../../../components/equipamentos-store';
import Footer from '../../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volkano Infinity - Equipamentos',
  description: 'Linha Volkano Infinity: Design futurista e biomecânica perfeita.',
};

export default function VolkanoInfinityPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div>Carregando...</div>}>
          <EquipamentosStore categoria="Volkano Infinity" />
        </Suspense>
      </main>
    </>
  );
}
