import { Suspense } from 'react';
import Header from '../../../../components/header-section';
import EquipamentosSection from '../../../../components/equipamentos-store';
import FooterSection from '../../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volkano Pro - Equipamentos Profissionais',
  description: 'Linha Volkano Pro: A elite dos equipamentos de musculação para alta performance.',
};

export default function VolkanoProPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Passamos a categoria fixa para filtrar automaticamente */}
        <Suspense fallback={<div>Carregando...</div>}>
          <EquipamentosSection categoria="Volkano Pro" />
        </Suspense>
      </main>
      <FooterSection />
    </>
  );
}