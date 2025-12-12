"use client";

export default function DownloadSection() {
  return (
    <section id="download" className="bg-black/80 py-24 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Lado Esquerdo: Título e Texto */}
          <div>
            <h2 className="mb-6 font-montserrat text-4xl font-black uppercase md:text-5xl">
              Faça download do nosso <span className="text-orange-500">catálogo</span> completo
            </h2>
            <p className="text-lg text-white/70">
              Nosso catálogo destaca os mais modernos equipamentos da VOLKANO, e inclui todos os produtos do nosso portfólio.
            </p>
          </div>

          {/* Lado Direito: Formulário */}
          <div className="rounded-2xl bg-white/5 p-8 backdrop-blur-sm border border-white/10">
            <form className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/80">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/80">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/80">
                    Celular
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    autoComplete="tel"
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="mb-2 block text-sm font-medium text-white/80">
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="city"
                    autoComplete="address-level2"
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Sua cidade"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-orange-500 py-4 font-bold text-black transition-all hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20"
              >
                BAIXAR CATÁLOGO
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}