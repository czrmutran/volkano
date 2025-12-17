import { Suspense } from 'react';
import Header from '../../../components/header-section';
import EquipamentosSection from '../../../components/equipamentos-store';
import FooterSection from '../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volkano Prime - Versatilidade e Design',
  description: 'Linha Volkano Prime: Equipamentos versáteis com design e acabamento premium.',
};

export default function VolkanoPrimePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div>Carregando...</div>}>
          <EquipamentosSection categoria="Volkano Prime" />
        </Suspense>
      </main>
      <FooterSection />
    </>
  );
}