import Header from '../../../components/header-section';
import EquipamentosSection from '../../../components/equipamentos-store';
import FooterSection from '../../../components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hammer e Articulados - Força e Biomecânica',
  description: 'Linha Hammer e Articulados: Equipamentos robustos com foco em força e biomecânica avançada.',
};

export default function HammerArticuladosPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <EquipamentosSection categoria="Hammer e Articulados" />
      </main>
      <FooterSection />
    </>
  );
}