"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Maicon Rodrigues",
    comment: "Sou parceiro da Volkano desde o início da empresa, quando as primeiras máquinas e protótipos foram trazidos aqui para a Boa Forma. Eles foram testados, ajustados e, a partir daí, colocados em produção,  sempre buscando atender aos mínimos detalhes,  desde o acabamento até o perfeito funcionamento. Acompanhei todo esse período de formação da empresa e sempre ficou muito claro que a Volkano.",
    image: "/depoimento-1.webp",
  },
  {
    id: 2,
    name: "Guilherme Fagundes",
    comment: "Muito além de equipamentos e máquinas, a Volkano constrói sonhos. Através da arte da musculação, as máquinas produzidas por eles são o que há de melhor no Brasil.  Como empresário, como homem, a Volkano está presente diariamente em minha vida e na vida de milhares de pessoas. Em nome da Academia KingClub, agradeço a vocês por  Como empresário, como homem, a Volkano está presente diariamente em minha vida e na vida de milhares de pessoas. Em nome da Academia KingClub, agradeço a vocês por  Estamos juntos. É apenas o começo!​",
    image: "/depoimento-2.webp",
  },
  {
    id: 3,
    name: "Eduardo Braga Wolff",
    comment: "Desde 2016, quando fui atendido pelo \"chefe\", Zé me vendeu mais do que uma ideia, ele me vendeu  uma empresa sólida, com uma visão de evolução.  Ele aderiu completamente à ideia da academia... após muitas vendas e parcerias, juntamente com a evolução para Volkano, nossa academia evoluiu no mesmo ano para Arena.",
    image: "/depoimento-3.webp",
  },
];

export default function DepoimentosSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      className="bg-black/80 py-20 text-white" 
      id="depoimentos"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center font-montserrat text-4xl font-black uppercase md:text-5xl">
          O que dizem nossos clientes
        </h2>

        <div className="mx-auto max-w-4xl">
          {/* Conteúdo do Carrossel */}
          <div className="flex flex-col items-center text-center transition-opacity duration-500">
            <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-orange-500 shadow-lg shadow-orange-500/20">
              <Image
                src={testimonials[currentIndex].image}
                alt={`Foto de ${testimonials[currentIndex].name}`}
                fill
                className="object-cover"
                quality={100}
              />
            </div>
            
            <p className="mb-6 text-xl font-light italic text-gray-300 md:text-2xl">
              "{testimonials[currentIndex].comment}"
            </p>
            
            <h3 className="text-xl font-bold text-white">{testimonials[currentIndex].name}</h3>
          </div>

          {/* Indicadores (Dots) */}
          <div className="mt-10 flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-all mx-1 p-2 box-content ${
                  index === currentIndex ? "w-8 bg-orange-500" : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}