"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const equipamentos = [
  {
    desc: "Força e amplitude de movimento.",
    img: "/articulados.png",
    alt: "Equipamentos articulados",
    href: "/store/categoria-produto/hammer-e-articulados",
  },
  {
    desc: "Performance para treinos intensos.",
    img: "/infinity.png",
    alt: "Volkano Infinity",
    href: "/store/categoria-produto/volkano-infinity",
  },
  {
    desc: "Robustez e design premium.",
    img: "/black.png",
    alt: "Volkano Black",
    href: "/store/categoria-produto/volkano-black",
  },
  {
    desc: "Versatilidade e acabamento top.",
    img: "/prime.png",
    alt: "Volkano Prime",
    href: "/store/categoria-produto/volkano-prime",
  },
  {
    desc: "Linha profissional de alto nível.",
    img: "/volkano-pro.png",
    alt: "Volkano Pro",
    href: "/store/categoria-produto/volkanopro",
  },
];

export default function EquipamentosSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="bg-black/80 py-16 sm:py-6 lg:py-14 overflow-hidden" id="equipamentos">
      <div className="container mx-auto px-4">
        {/* Título + subtítulo */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-wide text-white">
            +200 EQUIPAMENTOS
          </h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            Linhas pensadas para academias, estúdios e home gyms — com foco em
            durabilidade, performance e design.
          </p>

          {/* mini “badges” */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="cursor-default rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition-colors duration-300 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400">
              Estrutura reforçada
            </span>
            <span className="cursor-default rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition-colors duration-300 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400">
              Acabamento premium
            </span>
            <span className="cursor-default rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition-colors duration-300 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400">
              Suporte especializado
            </span>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 min-w-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {equipamentos.map((item) => (
            <motion.div
              key={item.desc}
              variants={itemVariants}
              className="w-full h-full transition-transform duration-300 ease-in-out md:hover:scale-105"
            >
              <Link
                href={item.href}
                className="group relative flex min-w-0 flex-col h-full w-full overflow-hidden rounded-md border border-white/15 bg-black/80"
              >
                {/* Imagem com proporção tipo poster (mais “quadrada”) */}
                <div className="relative w-full aspect-[3/4] bg-white">
                  <Image
                    src={item.img}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    quality={90}
                    unoptimized
                  />

                  {/* Overlay bem mais leve (pra parecer com a 2ª imagem) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>

                {/* Rodapé do card (menos “flutuante”, mais clean) */}
                <div className="flex flex-1 items-start justify-between gap-3 px-4 py-4">
                  <p className="text-sm font-semibold text-white/90 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-14 flex justify-center">
          <a
            href="/store"
            className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-orange-500 bg-transparent px-8 py-4 text-sm font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            Mais Equipamentos
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}