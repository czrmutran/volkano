"use client";

import { useState } from "react";
import Header from "../../components/header-section";
import Image from "next/image";
import Link from "next/link";
import { Trash2, MessageCircle, Minus, Plus } from "lucide-react";
import { WHATSAPP_LINK_VENDAS } from "../../components/constants";
import { useCart } from "../../context/cart-context";
import { supabase } from "../../lib/supabase";
import {
  maskPhone,
  maskCPF,
  maskCNPJ,
  validateCPF,
  validateCNPJ,
} from "../../components/utils";

export default function RequestQuotePage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [docType, setDocType] = useState<"CPF" | "CNPJ">("CPF");
  const [documento, setDocumento] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "E-mail inválido";
    if (!telefone.trim()) newErrors.telefone = "Telefone é obrigatório";
    if (!cidade.trim()) newErrors.cidade = "Cidade é obrigatória";

    if (!documento.trim()) {
      newErrors.documento = `${docType} é obrigatório`;
    } else {
      const isValid =
        docType === "CPF" ? validateCPF(documento) : validateCNPJ(documento);
      if (!isValid) newErrors.documento = `${docType} inválido`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const message = () => {
    const lines = cart.map(
      (i, idx) => {
        const codigoInfo = i.codigo ? ` (Cód: ${i.codigo})` : "";
        return `${idx + 1}. ${i.nome}${codigoInfo} (${i.linha}) - Qtd: ${i.quantity || 1}`;
      }
    );

    const intro = nome
      ? `Olá! Me chamo ${nome} e gostaria de solicitar um orçamento dos seguintes equipamentos:`
      : `Olá! Gostaria de solicitar um orçamento dos seguintes equipamentos:`;

    return `${intro}\n\n${lines.join("\n")}`;
  };

  const whatsappLink = `${WHATSAPP_LINK_VENDAS}?text=${encodeURIComponent(
    message()
  )}`;

  const emailLink = `mailto:comercial@volkanofitness.com.br?subject=${encodeURIComponent(
    "Solicitação de orçamento"
  )}&body=${encodeURIComponent(message())}`;

  const saveOrcamento = async (canal: "Whatsapp" | "Email") => {
    try {
      setLoading(true);
      await supabase.from("orcamentos_info").insert([
        {
          nome,
          email,
          telefone,
          cidade,
          documento,
          tipo_documento: docType,
          canal_contato: canal,
          itens: cart,
        },
      ]);
    } catch (error) {
      console.error("Erro ao salvar orçamento:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    await saveOrcamento("Whatsapp");
    window.open(whatsappLink, "_blank");
  };

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    await saveOrcamento("Email");
    window.location.href = emailLink;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefone(maskPhone(e.target.value));
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (docType === "CPF") setDocumento(maskCPF(val));
    else setDocumento(maskCNPJ(val));
  };

  return (
    <>
      <Header />
      <main className="pt-20 bg-black text-white min-h-screen">
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
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-red-500 hover:text-black transition"
                    >
                      Limpar
                    </button>
                  )}
                </div>
              </div>

              {cart.length === 0 ? (
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
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="p-6 flex flex-col md:flex-row md:items-center gap-6"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 bg-white">
                          <Image
                            src={item.img}
                            alt={item.alt}
                            fill
                            className="object-cover"
                            sizes="80px"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-extrabold truncate pr-2">
                            {item.nome}
                          </p>
                          {item.codigo && (
                            <p className="text-xs text-orange-500 font-bold mt-1">
                              Cód: {item.codigo}
                            </p>
                          )}
                          <p className="text-xs text-white/50 mt-1 truncate">
                            {item.linha}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-6 md:justify-end">
                        {/* Quantidade Control */}
                        <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1 border border-white/10">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, (item.quantity || 1) - 1)
                            }
                            className="p-1 text-white/50 hover:text-white disabled:opacity-30"
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, (item.quantity || 1) + 1)
                            }
                            className="p-1 text-white/50 hover:text-white"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-full bg-white/5 p-2 border border-white/10 text-white/70 hover:bg-red-500 hover:text-black hover:border-red-500 transition flex-shrink-0"
                          aria-label="Remover"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-4 h-fit sticky top-24">
              <p className="text-sm font-semibold text-white/70">Seus dados</p>
              <div className="space-y-3">
                {/* Nome */}
                <div>
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome completo"
                    className={`w-full rounded-lg border ${
                      errors.nome ? "border-red-500" : "border-white/10"
                    } bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition`}
                  />
                  {errors.nome && (
                    <p className="text-xs text-red-500 mt-1 ml-1">
                      {errors.nome}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    type="email"
                    className={`w-full rounded-lg border ${
                      errors.email ? "border-red-500" : "border-white/10"
                    } bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 ml-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Telefone e Cidade */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      value={telefone}
                      onChange={handlePhoneChange}
                      placeholder="Celular"
                      maxLength={15}
                      className={`w-full rounded-lg border ${
                        errors.telefone ? "border-red-500" : "border-white/10"
                      } bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition`}
                    />
                    {errors.telefone && (
                      <p className="text-xs text-red-500 mt-1 ml-1">
                        {errors.telefone}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      placeholder="Cidade"
                      className={`w-full rounded-lg border ${
                        errors.cidade ? "border-red-500" : "border-white/10"
                      } bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition`}
                    />
                    {errors.cidade && (
                      <p className="text-xs text-red-500 mt-1 ml-1">
                        {errors.cidade}
                      </p>
                    )}
                  </div>
                </div>

                {/* CPF/CNPJ */}
                <div className="space-y-2">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="docType"
                        checked={docType === "CPF"}
                        onChange={() => {
                          setDocType("CPF");
                          setDocumento("");
                        }}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-white/70">CPF</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="docType"
                        checked={docType === "CNPJ"}
                        onChange={() => {
                          setDocType("CNPJ");
                          setDocumento("");
                        }}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-white/70">CNPJ</span>
                    </label>
                  </div>
                  <input
                    value={documento}
                    onChange={handleDocumentChange}
                    placeholder={
                      docType === "CPF" ? "000.000.000-00" : "00.000.000/0000-00"
                    }
                    maxLength={docType === "CPF" ? 14 : 18}
                    className={`w-full rounded-lg border ${
                      errors.documento ? "border-red-500" : "border-white/10"
                    } bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition`}
                  />
                  {errors.documento && (
                    <p className="text-xs text-red-500 mt-1 ml-1">
                      {errors.documento}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleWhatsAppClick}
                disabled={cart.length === 0 || loading}
                className={`group flex items-center justify-center gap-2 rounded-full px-6 py-4 font-bold transition w-full ${
                  cart.length === 0
                    ? "bg-white/10 text-white/40 cursor-not-allowed"
                    : "bg-orange-500 text-black hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20"
                }`}
              >
                <MessageCircle size={20} />
                {loading ? "Salvando..." : "Enviar pelo WhatsApp"}
              </button>

              <button
                onClick={handleEmailClick}
                disabled={cart.length === 0 || loading}
                className="group flex items-center justify-center gap-2 rounded-full px-6 py-4 font-bold transition border border-white/10 bg-white/5 text-white hover:bg-white/10 w-full disabled:opacity-50"
              >
                {loading ? "Salvando..." : "Enviar por E-mail"}
              </button>

              <div className="text-xs text-white/40 text-center">
                Total de itens: {
                  cart.reduce((acc, item) => acc + (item.quantity || 1), 0)
                }
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
