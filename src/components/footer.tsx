"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle, Youtube } from "lucide-react";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#equipamentos", label: "Equipamentos" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#contato", label: "Contato" },
  { href: "/blog", label: "Blog" },
];

const socialLinks = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://wa.me/555530240126",
    label: "WhatsApp",
    icon: MessageCircle,
  },
  {
    href: "https://youtube.com",
    label: "YouTube",
    icon: Youtube,
  },
];

export default function FooterSection() {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-black py-16 text-white border-t border-white/10">
      {/* linha superior sutil + glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-[-140px] h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Coluna 1: Logo + Endereço */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="relative mb-6 h-12 w-48">
              <Image
                src="/logo_header.webp"
                alt="Volkano"
                fill
                className="object-contain"
                quality={100}
              />
            </div>

            <p className="text-sm text-white/70 leading-relaxed">
              BR 285 – esquina – R. Siqueira Couto <br />
              FaçaBurtet, Ijuí – RS, 98700-000
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <p className="mb-4 text-sm font-semibold tracking-wider text-white/80 uppercase">
              Navegação
            </p>

            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm text-white/70 transition-colors hover:text-orange-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Coluna 3: Contato + Redes */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <p className="mb-4 text-sm font-semibold tracking-wider text-white/80 uppercase">
              Contato
            </p>

            <div className="flex flex-col gap-2 text-sm text-white/70">
              <a
                href="tel:+555530240126"
                className="font-semibold text-white transition-colors hover:text-orange-400"
              >
                (55) 3024-0126
              </a>
              <a
                href="mailto:vendas@volkanofitness.com.br"
                className="transition-colors hover:text-orange-400"
              >
                vendas@volkanofitness.com.br
              </a>
              <a
                href="mailto:atendimento@volkanofitness.com.br"
                className="transition-colors hover:text-orange-400"
              >
                atendimento@volkanofitness.com.br
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:-translate-y-0.5 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-400"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col gap-3 items-center text-center md:flex-row md:justify-between">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Volkano. Todos os direitos reservados.
          </p>
          <p className="text-sm text-white/30">
            Equipamentos fitness com suporte de verdade.
          </p>
        </div>
      </div>
    </footer>
  );
}
