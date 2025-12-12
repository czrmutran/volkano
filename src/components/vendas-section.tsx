"use client";

export default function VendasSection() {
  return (
    <section
      id="vendas"
      className="relative overflow-hidden bg-black/80 via-black/90 to-black/80 py-24 text-white"
    >
      {/* Glow sutil de fundo */}
      <div className="container relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        <h2 className="mb-6 font-montserrat text-4xl font-black uppercase md:text-5xl">
          Preocupado com o <span className="text-orange-500">pós-venda?</span>
        </h2>

        <p className="mb-12 max-w-2xl text-white/70">
          Suporte de verdade faz toda a diferença no dia a dia da sua academia.
        </p>

        {/* Benefícios */}
        <div className="mb-14 flex flex-wrap justify-center gap-4">
          {[
            "Resposta em até 12 horas",
            "Peças de reposição rápidas e eficazes",
            "Técnicos certificados e especializados",
          ].map((item) => (
            <div
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500 hover:text-black hover:shadow-lg hover:shadow-orange-500/20"
            >
              {item}
            </div>
          ))}
        </div>

        <p className="mb-12 max-w-2xl text-white/70 leading-relaxed">
          Com a <span className="font-semibold text-white">Volkano</span>, você
          tem suporte total e tranquilidade garantida. Nossa política de
          pós-venda é referência no mercado e garante sua satisfação em cada
          etapa. Não deixe que um pós-venda ruim afete sua academia.
        </p>

        {/* CTA */}
        <button className="rounded-full bg-orange-500 px-10 py-4 font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-orange-400 hover:shadow-xl hover:shadow-orange-500/30">
          FALAR COM UM REPRESENTANTE
        </button>
      </div>
    </section>
  );
}
