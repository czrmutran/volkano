"use client";

import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { WHATSAPP_LINK_ATENDIMENTO, WHATSAPP_LINK_FINANCEIRO, WHATSAPP_LINK_VENDAS } from "./constants";

export default function ContatoSection() {
  return (
    <section id="contato" className="bg-black text-white py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 font-montserrat text-4xl font-black uppercase md:text-5xl">
              Entre em <span className="text-orange-500">Contato</span>
            </h2>
            <p className="mb-12 text-lg text-white/70">
              Estamos prontos para atender você. Tire suas dúvidas, solicite um orçamento ou venha nos visitar.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-white/5 p-3 text-orange-500 border border-white/10">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">Telefone</h3>
                  <p className="text-white/70 hover:text-orange-500 transition-colors">
                    <a href="tel:+555530240126">(55) 3024-0126</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-white/5 p-3 text-orange-500 border border-white/10">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">E-mail</h3>
                  <p className="text-white/70 hover:text-orange-500 transition-colors">
                    <a href="mailto:vendas@volkanofitness.com.br">vendas@volkanofitness.com.br</a>
                  </p>
                  <p className="text-white/70 hover:text-orange-500 transition-colors">
                    <a href="mailto:atendimento@volkanofitness.com.br">atendimento@volkanofitness.com.br</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-white/5 p-3 text-orange-500 border border-white/10">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">Endereço</h3>
                  <p className="text-white/70">
                    BR 285 – esquina – R. Siqueira Couto<br />
                    FaçaBurtet, Ijuí – RS, 98700-000
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Opções de WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm flex flex-col justify-center"
          >
            <h3 className="mb-8 text-2xl font-bold text-center">Fale conosco pelo WhatsApp</h3>
            <div className="flex flex-col gap-4">
              <a
                href={WHATSAPP_LINK_VENDAS}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl bg-white/5 p-6 transition-all hover:bg-orange-500 hover:text-black border border-white/10 hover:border-orange-500"
              >
                <span className="font-bold text-lg">Vendas</span>
                <MessageCircle className="h-6 w-6" />
              </a>

              <a
                href={WHATSAPP_LINK_ATENDIMENTO}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl bg-white/5 p-6 transition-all hover:bg-orange-500 hover:text-black border border-white/10 hover:border-orange-500"
              >
                <span className="font-bold text-lg">Atendimento</span>
                <MessageCircle className="h-6 w-6" />
              </a>

              <a
                href={WHATSAPP_LINK_FINANCEIRO}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl bg-white/5 p-6 transition-all hover:bg-orange-500 hover:text-black border border-white/10 hover:border-orange-500"
              >
                <span className="font-bold text-lg">Financeiro</span>
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
