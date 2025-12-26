import { Suspense } from 'react';
import Header from '../../../../components/header-section';
import EquipamentosStore from '../../../../components/equipamentos-store';
import Footer from '../../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volkano Pro - Equipamentos',
  description: 'Linha Volkano Pro: Alta performance e durabilidade.',
};

export default function VolkanoProPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div>Carregando...</div>}>
          <EquipamentosStore categoria="Volkano Pro" />
        </Suspense>
      </main>
    </>
  );
}
