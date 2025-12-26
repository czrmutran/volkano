import { Suspense } from 'react';
import Header from '../../../../components/header-section';
import EquipamentosStore from '../../../../components/equipamentos-store';
import Footer from '../../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suportes e Acessórios - Volkano',
  description: 'Suportes e Acessórios: Organização e funcionalidade.',
};

export default function SuportesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div>Carregando...</div>}>
          <EquipamentosStore categoria="Suportes" />
        </Suspense>
      </main>
    </>
  );
}
