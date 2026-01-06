"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Loader2, CheckCircle, Download } from "lucide-react";
import { maskPhone } from "./utils";

export default function DownloadSection() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    if (id === "telefone") {
      setFormData((prev) => ({ ...prev, [id]: maskPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validação
    if (!formData.nome || !formData.email || !formData.telefone || !formData.cidade) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);

      // 1. Salvar no Supabase
      const { error: supabaseError } = await supabase
        .from("leads_catalogo")
        .insert([
          {
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            cidade: formData.cidade,
          },
        ]);

      if (supabaseError) {
        throw supabaseError;
      }

      // 2. Download do Arquivo
      const link = document.createElement("a");
      link.href = "/catalogo-volkano-2024.pdf";
      link.download = "Catalogo_Volkano_2024.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccess(true);
      setFormData({ nome: "", email: "", telefone: "", cidade: "" });
      
    } catch (err: any) {
      console.error("Erro ao processar download:", err);
      // Tenta extrair mensagem de erro mais detalhada se disponível
      const errorMessage = err.message || err.error_description || JSON.stringify(err);
      console.error("Detalhes do erro:", errorMessage);
      
      // FALLBACK: Se o erro for de tabela inexistente, permitir o download mesmo assim (para evitar bloqueio total)
      // Mas exibir um erro no console/aviso
      // Verifica vários padrões de erro comuns que indicam falha no banco (tabela inexistente, 404, etc)
      // Como o objetivo principal é o usuário baixar o catálogo, liberamos em caso de falha no lead
      if (
        errorMessage.includes("relation") || 
        errorMessage.includes("does not exist") || 
        errorMessage.includes("Could not find the table") ||
        errorMessage === "{}" ||
        // Adicionando verificação para objetos de erro vazios ou genéricos do Supabase
        !errorMessage || 
        errorMessage === '""'
      ) {
         console.warn("Tabela 'leads_catalogo' não encontrada ou erro genérico. Liberando download como fallback.");
         
         const link = document.createElement("a");
         link.href = "/catalogo-volkano-2024.pdf";
         link.download = "Catalogo_Volkano_2024.pdf";
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);

         setSuccess(true);
         return; 
      }

      setError("Ocorreu um erro ao salvar seus dados. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

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
            {success ? (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
                <div className="mb-4 rounded-full bg-green-500/10 p-4 text-green-500">
                  <CheckCircle size={48} />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">Download Iniciado!</h3>
                <p className="text-white/60 mb-6">
                  Seu catálogo deve começar a baixar automaticamente. Se não começar,{" "}
                  <a href="/catalogo-volkano-2024.pdf" download className="text-orange-500 hover:underline">
                    clique aqui
                  </a>.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  Voltar ao formulário
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                    {error}
                  </div>
                )}
                
                <div>
                  <label htmlFor="nome" className="mb-2 block text-sm font-medium text-white/80">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/80">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="telefone" className="mb-2 block text-sm font-medium text-white/80">
                      Celular *
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      autoComplete="tel"
                      required
                      className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="cidade" className="mb-2 block text-sm font-medium text-white/80">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      id="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      autoComplete="address-level2"
                      required
                      className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                      placeholder="Sua cidade"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-4 font-bold text-black transition-all hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Processando...
                    </>
                  ) : (
                    <>
                      <Download size={20} /> BAIXAR CATÁLOGO
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}