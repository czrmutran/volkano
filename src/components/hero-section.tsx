import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative mt-20 h-[calc(100vh-1px)] w-full">
      {/* Mobile */}
      <Image
        src="/banner_principal_mobile.webp"
        alt="Banner principal da Volkano"
        fill
        className="object-cover object-center md:hidden"
        quality={100}
        priority
      />

      {/* Desktop */}
      <Image
        src="/banner_principal_desktop.webp"
        alt="Banner principal da Volkano"
        fill
        className="hidden object-cover object-[center_60%] md:block"
        quality={100}
        priority
      />
    </section>
  );
}
