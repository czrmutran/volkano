"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "A importância da biomecânica nos equipamentos",
    excerpt: "Entenda como a biomecânica correta previne lesões e potencializa os resultados dos seus alunos.",
    date: "15 Out, 2023",
    category: "Tecnologia",
  },
  {
    id: 2,
    title: "Manutenção preventiva: economize a longo prazo",
    excerpt: "Dicas essenciais para aumentar a vida útil dos seus equipamentos e evitar gastos inesperados.",
    date: "22 Out, 2023",
    category: "Gestão",
  },
  {
    id: 3,
    title: "Tendências do mercado fitness para o próximo ano",
    excerpt: "O que esperar do futuro das academias e como preparar seu negócio para as novidades.",
    date: "05 Nov, 2023",
    category: "Mercado",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="bg-black text-white pb-24 overflow-hidden">
      {/* Hero Image */}
      <motion.div
        className="relative w-full h-[400px] md:h-[500px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/blog.png"
          alt="Capa do Blog Volkano"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Title and Subtitle */}
        <div className="flex flex-col items-center text-center mt-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-montserrat text-4xl md:text-6xl font-black uppercase mb-6">
              Blog <span className="text-orange-500">Volkano</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Conteúdo exclusivo para quem vive o mundo fitness. Dicas de gestão,
              treino, manutenção e as últimas novidades da Volkano.
            </p>
          </motion.div>
        </div>

        {/* Lista de Posts */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-orange-500/50 transition-colors"
            >
              <div className="h-48 bg-white/10 relative overflow-hidden group">
                {/* Placeholder de imagem para os posts */}
                <div className="absolute inset-0 bg-zinc-900 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    <span className="text-white/10 font-black text-4xl">V</span>
                </div>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>Equipe Volkano</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-white/60 text-sm mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-white/5">
                  <button className="flex items-center gap-2 text-orange-500 text-sm font-bold hover:gap-3 transition-all">
                    LER ARTIGO <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
