"use client";

import { motion } from "framer-motion";

export default function SobreSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-black/80 py-24 text-white sm:py-6 lg:py-14" id="sobre">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 items-center gap-20 md:grid-cols-2">
          {/* Texto */}
          <motion.div className="max-w-xl" variants={itemVariants}>
            <h2 className="font-montserrat font-black uppercase leading-none tracking-tight md:-tracking-[0.06em]">
              <span className="block text-3xl text-orange-500 sm:text-4xl md:text-6xl md:whitespace-nowrap">
                Qualidade Volkano
              </span>
              <span className="mt-1 block text-2xl text-white sm:text-3xl md:text-5xl md:whitespace-nowrap">
                Excelência para todos
              </span>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-white/80">
              Acreditamos que a excelência{" "}
              <strong className="text-white">não é privilégio da elite</strong>.
              <br />
              Nossos equipamentos de musculação são{" "}
              <strong className="text-white">projetados</strong> com a mesma{" "}
              <strong className="text-white">
                qualidade e durabilidade
              </strong>{" "}
              que atendem atletas de alto nível, para que todos de iniciantes a
              experientes alcancem seus objetivos com{" "}
              <strong className="text-white">
                segurança e performance máxima
              </strong>.
            </p>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="#contato"
                className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-all duration-300 hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/40"
              >
                Falar com representante
              </a>
            </div>
          </motion.div>

          {/* Vídeo */}
          <motion.div
            className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/60"
            variants={itemVariants}
          >
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/VMlev_VN-e8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Glow sutil */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-orange-500/10" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
