"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowRight, X } from "lucide-react";
import { posts } from "../data/blog-posts";

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

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
          className="object-contain md:object-cover"
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
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-zinc-900 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    <span className="text-white/10 font-black text-4xl">V</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 z-10">
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
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-2 text-orange-500 text-sm font-bold hover:gap-3 transition-all"
                  >
                    LER ARTIGO <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de Leitura */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-white/20"
              >
                <X size={20} />
              </button>

              <div className="relative h-64 w-full bg-white/5 overflow-hidden rounded-t-2xl">
                {selectedPost.image ? (
                  <Image
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                    <span className="text-6xl font-black text-white/10">V</span>
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="mb-6 flex items-center gap-4 text-sm text-white/50">
                  <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-500">
                    {selectedPost.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{selectedPost.date}</span>
                  </div>
                </div>

                <h2 className="mb-6 text-3xl font-bold text-white">
                  {selectedPost.title}
                </h2>

                <div className="space-y-4 text-lg text-white/70">
                  <p className="font-medium text-white">{selectedPost.excerpt}</p>
                  {selectedPost.content}
                </div>

                {/* Formulário de Comentários */}
                <div className="mt-16 border-t border-white/10 pt-10">
                  <h3 className="text-2xl font-bold text-white mb-8">Deixe um comentário</h3>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label htmlFor="comment" className="block text-sm font-bold text-white/70 mb-2">Comentário</label>
                      <textarea
                        id="comment"
                        rows={5}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all resize-y"
                        placeholder="Escreva seu comentário aqui..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-white/70 mb-2">Nome *</label>
                        <input
                          type="text"
                          id="name"
                          required
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-white/70 mb-2">Email *</label>
                        <input
                          type="email"
                          id="email"
                          required
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="website" className="block text-sm font-bold text-white/70 mb-2">Website</label>
                        <input
                          type="url"
                          id="website"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="save-info"
                          type="checkbox"
                          className="h-4 w-4 rounded border-white/10 bg-white/5 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                        />
                      </div>
                      <label htmlFor="save-info" className="text-sm text-white/60 cursor-pointer select-none leading-6">
                        Salvar meus dados neste navegador para a próxima vez que eu comentar.
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="rounded-full bg-orange-500 px-8 py-4 font-bold text-black transition-all hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-105"
                    >
                      Publicar Comentário
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
