import { Suspense } from 'react';
import Header from '../../../../components/header-section';
import EquipamentosSection from '../../../../components/equipamentos-store';
import FooterSection from '../../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Força Variável - Resistência Progressiva',
  description: 'Linha Força Variável: Equipamentos com resistência progressiva para treinos mais eficazes.',
};

export default function ForcaVariavelPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div>Carregando...</div>}>
          <EquipamentosSection categoria="Força Variável" />
        </Suspense>
      </main>
      <FooterSection />
    </>
  );
}