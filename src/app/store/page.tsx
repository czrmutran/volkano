import Header from '../../components/header-section';
import EquipamentosSection from '../../components/equipamentos-store';
import FooterSection from '../../components/footer';
import type { Metadata } from 'next';
import EquipamentosStore from '../../components/equipamentos-store';

export const metadata: Metadata = {
  title: 'Equipamentos - Volkano',
  description: 'Descubra a excelência dos equipamentos Volkano: design inovador, performance superior e durabilidade incomparável para elevar seus treinos ao próximo nível.',
};

const SobrePage = () => {
  return (
    <>
      <Header />
      <main className="pt-20">
        <EquipamentosStore />
      </main>
      <FooterSection />
    </>
  );
};

export default SobrePage;