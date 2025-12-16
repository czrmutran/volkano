"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SobreNosSection() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <Section4 />
    </>
  );
}

function HeroSection() {
  return (
    <section className="bg-black text-white py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Seção 1 */}
        <div className="mb-16 text-left">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-montserrat text-4xl font-black uppercase tracking-tight md:text-5xl lg:text-6xl"
          >
            ORGULHO NACIONAL,{" "}
            <span className="text-orange-500">
              <br />
              QUALIDADE ACIMA DA <br /> MÉDIA
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg text-white/70 max-w-3xl"
          >
            Nossa fábrica brasileira une o <strong className="text-white">melhor</strong> dos dois{" "}
            <strong className="text-white">mundos</strong>: a paixão <br /> e expertise local com
            padrões de qualidade que <strong className="text-white">superam as <br /> expectativas
            nacionais.</strong>
          </motion.p>
        </div>

        <div className="flex flex-col items-center justify-center">
          {/* Seção 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl space-y-10 text-left w-full"
          >
            {/* Título */}
            <h2 className="font-montserrat text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-orange-500">
              A força motriz do fitness brasileiro, pioneira em biarticulados.
            </h2>

            {/* Parágrafo 1 */}
            <p className="text-white text-lg md:text-xl leading-relaxed">
              Referência nacional em equipamentos profissionais para academias, a{" "}
              <strong className="font-semibold">Volkano impulsiona o desempenho de todos</strong>, desde
              iniciantes até a elite do esporte.{" "}
              <strong className="font-semibold">Robustez, durabilidade e precisão</strong> são marcas
              registradas de cada uma das{" "}
              <strong className="font-semibold">mais de 240 máquinas</strong> do nosso catálogo, projetadas
              para extrair o máximo da sua performance.{" "}
              <strong className="font-semibold">Pioneira na revolução dos equipamentos biarticulados no
              Brasil.</strong>
            </p>

            {/* Parágrafo 2 */}
            <p className="text-white text-lg md:text-xl leading-relaxed">
              Nossa fábrica em{" "}
              <strong className="font-semibold">Ijuí, Rio Grande do Sul</strong>, é o coração pulsante da
              marca. Em mais de{" "}
              <strong className="font-semibold">22.500 mil metros quadrados</strong> de área própria, uma{" "}
              <strong className="font-semibold">equipe de + de 100 profissionais</strong> apaixonados
              transformam cada detalhe em excelência, do design à montagem final.
            </p>

            {/* Parágrafo 3 */}
            <p className="text-white text-lg md:text-xl leading-relaxed">
              Nosso compromisso com a <strong className="font-semibold">qualidade</strong> e a{" "}
              <strong className="font-semibold">busca constante por inovação</strong> nos consolidaram como
              líderes. Cada máquina que sai da Volkano carrega além da força do bodybuilding, a{" "}
              <strong className="font-semibold">
                promessa de resultados excepcionais, durabilidade incomparável
              </strong>{" "}
              e a paixão que nos move.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Seção 3 */
function StatsSection() {
  return (
    <section className="bg-orange-500 text-black py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-12">
            {/* Título Pequeno */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b-2 border-black/20 pb-2 inline-block">
                A VOLKANO EM NÚMEROS
              </h3>

              <AnimatedTitle />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <StatItem value="+30.000" label="Equipamentos Entregues" />
              <StatItem value="#1" label="Em Vendas" />
              <StatItem value="+240" label="Equipamentos em Linha" />
            </div>
          </div>

          {/* Depoimentos (Lado Direito) */}
          <div className="w-full max-w-md mx-auto lg:max-w-none">
            <TestimonialsCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}

const WORDS = ["PIONEIRA", "NÚMERO 1"];

function AnimatedTitle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-baseline gap-3">
      {/* Palavra animada */}
      <span className="relative inline-grid overflow-hidden align-bottom leading-none">
        {/* Reservar largura do maior texto */}
        <span className="invisible font-montserrat text-4xl md:text-6xl font-black uppercase leading-none">
          NÚMERO 1
        </span>

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="absolute left-0 top-0 font-montserrat text-4xl md:text-6xl font-black uppercase text-white leading-none"
          >
            {WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* Texto fixo */}
      <span className="font-montserrat text-4xl md:text-6xl font-black uppercase text-black">
        no Brasil em biarticulados
      </span>
    </div>
  );
}

function Section4() {
  return (
    <section className="bg-black text-white py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Título */}
            <h2 className="font-montserrat text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.95]">
              NÓS ENTENDEMOS
              <br />
              <span className="text-orange-500">SEUS DESAFIOS</span>
            </h2>

            {/* Texto */}
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Com mais de{" "}
              <span className="text-white font-black">11 anos de experiência</span>{" "}
              no mercado, entendemos profundamente os desafios enfrentados pelas academias e
              nosso{" "}
              <span className="text-white font-black">
                principal objetivo é ajudá-lo a superá-los!
              </span>
            </p>

            {/* Detalhe visual */}
            <div className="h-[2px] w-24 bg-orange-500 rounded-full" />
          </motion.div>

          {/* Imagem (Lado Direito) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] md:h-[500px] w-full lg:-ml-16"
          >
            <Image
              src="/icons.png"
              alt="Ícone Volkano"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="border-l-4 border-black pl-4"
    >
      <div className="text-4xl font-black mb-1">{value}</div>
      <div className="text-sm font-bold uppercase tracking-wide opacity-80">
        {label}
      </div>
    </motion.div>
  );
}

const TESTIMONIALS = [
  {
    id: 1,
    name: "Maicon Rodrigues",
    comment: "Sou parceiro da Volkano desde o início da empresa, quando as primeiras máquinas e protótipos foram trazidos aqui para a Boa Forma. Eles foram testados, ajustados e, a partir daí, colocados em produção,  sempre buscando atender aos mínimos detalhes,  desde o acabamento até o perfeito funcionamento. Acompanhei todo esse período de formação da empresa e sempre ficou muito claro que a Volkano.",
    image: "/depoimento-1.webp",
  },
  {
    id: 2,
    name: "Guilherme Fagundes",
    comment: "Muito além de equipamentos e máquinas, a Volkano constrói sonhos. Através da arte da musculação, as máquinas produzidas por eles são o que há de melhor no Brasil.  Como empresário, como homem, a Volkano está presente diariamente em minha vida e na vida de milhares de pessoas. Em nome da Academia KingClub, agradeço a vocês por  Como empresário, como homem, a Volkano está presente diariamente em minha vida e na vida de milhares de pessoas. Em nome da Academia KingClub, agradeço a vocês por  Estamos juntos. É apenas o começo!",
    image: "/depoimento-2.webp",
  },
  {
    id: 3,
    name: "Eduardo Braga Wolff",
    comment: "Desde 2016, quando fui atendido pelo \"chefe\", Zé me vendeu mais do que uma ideia, ele me vendeu  uma empresa sólida, com uma visão de evolução.  Ele aderiu completamente à ideia da academia... após muitas vendas e parcerias, juntamente com a evolução para Volkano, nossa academia evoluiu no mesmo ano para Arena.",
    image: "/depoimento-3.webp",
  },
];

function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white px-8 pt-8 pb-16 rounded-3xl shadow-2xl border border-black/10 relative overflow-hidden h-[520px] lg:h-[450px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative w-20 h-20 mb-6 rounded-full overflow-hidden border-2 border-orange-500 shadow-lg shadow-orange-500/20">
            <Image
              src={TESTIMONIALS[index].image}
              alt={TESTIMONIALS[index].name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          
          <p className="text-white/90 italic mb-6 text-sm leading-relaxed">
            "{TESTIMONIALS[index].comment}"
          </p>
          
          <div>
            <h4 className="font-bold text-orange-500 text-lg">{TESTIMONIALS[index].name}</h4>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-0 w-full flex justify-center gap-2 z-10">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-orange-500" : "w-1.5 bg-white/20"
            }`}
            aria-label={`Ir para depoimento ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
