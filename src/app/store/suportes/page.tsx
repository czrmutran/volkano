import Header from '../../../components/header-section';
import EquipamentosSection from '../../../components/equipamentos-store';
import FooterSection from '../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suportes e Acessórios - Volkano',
  description: 'Conheça nossa linha de suportes, racks e acessórios para organizar e potencializar sua academia.',
};

export default function SuportesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <EquipamentosSection categoria="Suportes" />
      </main>
      <FooterSection />
    </>
  );
}