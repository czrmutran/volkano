import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full bg-black/80 pt-20 min-h-[52svh] md:min-h-[100svh] overflow-hidden"
    >
      {/* Mobile – imagem inteira */}
      <Image
        src="/banner_principal_mobile.webp"
        alt="Banner principal da Volkano"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="md:hidden object-contain"
      />

      {/* Desktop */}
      <Image
        src="/banner_principal_desktop.webp"
        alt="Banner principal da Volkano"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="hidden md:block object-cover object-[center_60%]"
      />
    </section>
  );
}
