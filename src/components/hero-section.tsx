import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative mt-20 w-full bg-black
                 h-[34svh] md:h-auto"
    >
      {/* Mobile */}
      <Image
        src="/banner_principal_mobile_2.webp"
        alt="Banner principal da Volkano"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="md:hidden object-cover object-top"
        unoptimized
      />

      {/* Desktop */}
      <Image
        src="/banner_principal_desktop_2.webp"
        alt="Banner principal da Volkano"
        width={1920}
        height={1080}
        priority
        quality={100}
        sizes="100vw"
        className="hidden md:block w-full h-auto"
        unoptimized
      />
    </section>
  );
}
