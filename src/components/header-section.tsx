"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Início" },
  { href: "#equipamentos", label: "Equipamentos" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#download", label: "Contato" },
  { href: "#blog", label: "Blog" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Fechar com ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();

      if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.querySelector(href);
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    }

    setIsMenuOpen(false);
  };

  const headerClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4
    ${
      isScrolled || isMenuOpen
        ? "bg-black/55 backdrop-blur-xl shadow-lg"
        : "bg-black/20 backdrop-blur-md"
    }`;

  const linkColorClasses =
    isScrolled || isMenuOpen
      ? "text-white hover:text-orange-500"
      : "text-white hover:text-orange-300";

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" onClick={(e) => handleLinkClick(e, "#home")}>
          <Image
            src="/logo_header.webp"
            alt="Logo da Volkano"
            width={140}
            height={35}
            priority
          />
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              onClick={(e) => handleLinkClick(e, link.href)}
              key={link.label}
              href={link.href}
              className="group relative font-medium text-white transition-colors duration-300 hover:text-red-500"
            >
              {link.label}
              <span className="absolute bottom-[-2px] left-0 h-0.5 w-full origin-left scale-x-0 transform bg-red-500 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Botão Menu Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className={`transition-colors ${linkColorClasses}`}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MENU MOBILE (Sidebar Premium) */}
      <div className="md:hidden">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-[60] bg-black/70 transition-opacity duration-300
            ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar */}
        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={`fixed top-0 right-0 z-[70] h-dvh w-[82%] max-w-sm
            bg-gradient-to-b from-black via-black/95 to-zinc-950
            border-l border-white/10 shadow-2xl
            transition-transform duration-300 ease-out
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Cabeçalho da Sidebar */}
          <div className="flex items-center justify-between px-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <div className="leading-tight">
                <p className="text-white font-semibold">Volkano</p>
                <p className="text-white/60 text-xs">Equipamentos Fitness</p>
              </div>
            </div>

            {/* X fechar */}
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fechar menu"
              className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 text-white/90
                         flex items-center justify-center hover:bg-white/10 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Divisor */}
          <div className="mx-6 mt-5 h-px bg-white/10" />

          {/* Links */}
          <nav className="px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group flex items-center justify-between rounded-2xl px-4 py-4
                           text-white/90 hover:text-white
                           hover:bg-white/5 transition"
              >
                <span className="text-lg font-semibold tracking-wide">
                  {link.label}
                </span>
                <ChevronRight
                  size={18}
                  className="text-white/30 group-hover:text-orange-400 group-hover:translate-x-0.5 transition"
                />
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </header>
  );
}
