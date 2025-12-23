"use client";

import { useEffect, useState } from "react";
import Header from "../../components/header-section";
import Image from "next/image";
import Link from "next/link";
import { Trash2, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK_VENDAS } from "../../components/constants";

type Equipamento = {
  id: string;
  nome: string;
  codigo?: string | null;
  desc: string;
  img: string;
  alt: string;
  linha: string;
};

export default function RequestQuotePage() {
  const [items, setItems] = useState<Equipamento[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("volkano_orcamento");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("volkano_orcamento", JSON.stringify(items));
    } catch {}
  }, [items]);

  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));
  const clearAll = () => setItems([]);

  const message = () => {
    const lines = items.map((i, idx) => `${idx + 1}. ${i.nome} (${i.linha})`);
    const info = [
      `Nome: ${nome || "-"}`,
      `Telefone: ${telefone || "-"}`,
      `Email: ${email || "-"}`,
      `Cidade: ${cidade || "-"}`,
    ];
    return `Olá! Gostaria de solicitar um orçamento dos seguintes equipamentos:\n\n${lines.join(
      "\n",
    )}\n\n${info.join("\n")}`;
  };

  const whatsappLink = `${WHATSAPP_LINK_VENDAS}?text=${encodeURIComponent(message())}`;

  return (
    <>
      <Header />
      <main className="pt-20 bg-black text-white">
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_360px] gap-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-between p-6">
                <h1 className="text-3xl font-black">Seu Orçamento</h1>
                <div className="flex items-center gap-3">
                  <Link
                    href="/store"
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-orange-500 hover:text-black transition"
                  >
                    Selecionar mais
                  </Link>
                  {items.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-red-500 hover:text-black transition"
                    >
                      Limpar
                    </button>
                  )}
                </div>
              </div>

              {items.length === 0 ? (
                <div className="p-8 text-white/70">
                  <p className="mb-4">Seu carrinho de orçamento está vazio.</p>
                  <Link
                    href="/store"
                    className="inline-flex rounded-full bg-orange-500 px-6 py-3 font-bold text-black hover:bg-orange-400 transition"
                  >
                    Ver equipamentos
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-white/10">
                  {items.map((item) => (
                    <li key={item.id} className="p-6 flex items-center gap-4">
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                        <Image
                          src={item.img}
                          alt={item.alt}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-extrabold">{item.nome}</p>
                        {item.codigo && (
                          <p className="text-xs text-orange-500 font-bold mt-1">
                            Cód: {item.codigo}
                          </p>
                        )}
                        <p className="text-xs text-white/50 mt-1">{item.linha}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-full bg-white/5 p-2 border border-white/10 text-white/70 hover:bg-red-500 hover:text-black hover:border-red-500 transition"
                        aria-label="Remover"
                      >
                        <Trash2 size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-4">
              <p className="text-sm font-semibold text-white/70">Seus dados</p>
              <div className="space-y-3">
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome"
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  type="email"
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="Celular"
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  <input
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="Cidade"
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <a
                href={items.length === 0 ? undefined : whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-center gap-2 rounded-full px-6 py-4 font-bold transition ${
                  items.length === 0
                    ? "bg-white/10 text-white/40 cursor-not-allowed"
                    : "bg-orange-500 text-black hover:bg-orange-400"
                }`}
              >
                <MessageCircle size={20} />
                Enviar pelo WhatsApp
              </a>

              <a
                href={`mailto:vendas@volkanofitness.com.br?subject=${encodeURIComponent(
                  "Solicitação de orçamento",
                )}&body=${encodeURIComponent(message())}`}
                className="group flex items-center justify-center gap-2 rounded-full px-6 py-4 font-bold transition border border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Enviar por E-mail
              </a>

              <div className="text-xs text-white/40">Itens: {items.length}</div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
