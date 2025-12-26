import { Suspense } from 'react';
import Header from '../../../../components/header-section';
import EquipamentosStore from '../../../../components/equipamentos-store';
import Footer from '../../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Força Variável - Volkano',
  description: 'Linha Força Variável: Versatilidade para sua academia.',
};

export default function ForcaVariavelPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div>Carregando...</div>}>
          <EquipamentosStore categoria="Força Variável" />
        </Suspense>
      </main>
    </>
  );
}
