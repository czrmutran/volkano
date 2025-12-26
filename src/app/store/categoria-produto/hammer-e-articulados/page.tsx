import { Suspense } from 'react';
import Header from '../../../../components/header-section';
import EquipamentosStore from '../../../../components/equipamentos-store';
import Footer from '../../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hammer e Articulados - Volkano',
  description: 'Linha Hammer e Articulados: Treino de força pura.',
};

export default function HammerArticuladosPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div>Carregando...</div>}>
          <EquipamentosStore categoria="Hammer e Articulados" />
        </Suspense>
      </main>
    </>
  );
}
