import { Suspense } from 'react';
import Header from '../../../components/header-section';
import EquipamentosSection from '../../../components/equipamentos-store';
import FooterSection from '../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volkano Black - Design e Robustez',
  description: 'Linha Volkano Black: Equipamentos com design premium e estrutura robusta.',
};

export default function VolkanoBlackPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div>Carregando...</div>}>
          <EquipamentosSection categoria="Volkano Black" />
        </Suspense>
      </main>
      <FooterSection />
    </>
  );
}