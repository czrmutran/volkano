import { Suspense } from 'react';
import Header from '../../../components/header-section';
import EquipamentosSection from '../../../components/equipamentos-store';
import FooterSection from '../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volkano Infinity - Performance Infinita',
  description: 'Linha Volkano Infinity: Biomecânica avançada para treinos intensos.',
};

export default function VolkanoInfinityPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div>Carregando...</div>}>
          <EquipamentosSection categoria="Volkano Infinity" />
        </Suspense>
      </main>
      <FooterSection />
    </>
  );
}