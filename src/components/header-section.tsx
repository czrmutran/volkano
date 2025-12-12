"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#equipamentos", label: "Equipamentos" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#contato", label: "Contato" },
  { href: "#blog", label: "Blog" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    // Fecha o menu mobile após o clique
    setIsMenuOpen(false);
  };

  // Header escuro no topo, branco ao rolar / abrir menu
  const headerClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 
  ${isScrolled || isMenuOpen 
    ? "bg-black/50 backdrop-blur-xl shadow-lg py-2" 
    : "bg-black/20 backdrop-blur-md py-4"
  }`;

  const linkColorClasses =
    isScrolled || isMenuOpen
      ? "text-white hover:text-orange-500"
      : "text-white hover:text-orange-300";

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className={`transition-colors ${linkColorClasses}`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-2xl font-semibold text-gray-800 hover:text-orange-500"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
