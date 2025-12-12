import Image from 'next/image';
import Header from '../components/header-section';
import HeroSection from '../components/hero-section';
import EquipamentosSection from '../components/equipamentos-section';
import SobreSection from '../components/sobre-section';
import RepresentantesSection from '../components/representantes-section';
import VendasSection from '../components/vendas-section';
import DepoimentosSection from '../components/depoimentos-section';
import DownloadSection from '../components/download-section';

const HomePage = () => {
  return (
    <>
    <Header />
    <HeroSection />
    <EquipamentosSection />
    <SobreSection />
    <RepresentantesSection />
    <VendasSection />
    <DepoimentosSection />
    <DownloadSection />
    </>
  );
};

export default HomePage;