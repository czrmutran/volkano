import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <section className="relative w-full h-[calc(100vh-1px)] mt-20">
        <Image
          src="/banner_principal_desktop.webp"
          alt="Banner principal da Volkano"
          fill
          className="object-cover object-[center_60%]"
          quality={100}
          priority
        />
      </section>
    </>
  );
}