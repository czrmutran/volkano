import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative mt-20 w-full bg-black
                 h-[34svh] md:h-[calc(100vh-1px)]"
    >
      {/* Mobile */}
      <Image
        src="/banner_principal_mobile.png"
        alt="Banner principal da Volkano"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="md:hidden object-cover object-top"
      />

      {/* Desktop */}
      <Image
        src="/banner_principal_desktop.png"
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
