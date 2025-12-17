"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowRight, X } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Como Aumentar a Retenção de Alunos na Sua Academia",
    excerpt: "Atrair novos alunos para a academia é essencial, mas manter esses alunos motivados e matriculados é o verdadeiro desafio para o crescimento sustentável do seu negócio. A retenção de alunos não apenas reduz os custos de aquisição de novos clientes, mas também cria uma comunidade forte e engajada. Neste artigo, exploramos estratégias eficazes para aumentar a satisfação dos alunos e garantir que eles permaneçam por muito mais tempo.",
    date: "31 Jan, 2025",
    category: "Gestão",
    content: (
      <>
        <h3 className="text-xl font-bold text-white mt-6 mb-2">1. Crie um Ambiente Acolhedor e Ofereça Suporte Personalizado</h3>
        <p className="mb-4">Desde o primeiro dia, a experiência do aluno na academia deve ser positiva e memorável. Um ambiente amigável e bem estruturado pode fazer toda a diferença na permanência dos alunos. Para isso:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong className="text-white">Ofereça um atendimento de excelência:</strong> Cumprimentar os alunos pelo nome e estar disponível para esclarecer dúvidas cria um vínculo mais forte.</li>
          <li><strong className="text-white">Elabore planos de treino personalizados:</strong> Não adianta oferecer treinos genéricos. Cada aluno tem objetivos diferentes, e um planejamento adequado aumenta as chances de engajamento.</li>
          <li><strong className="text-white">Acompanhamento individualizado:</strong> Treinadores devem estar atentos ao progresso dos alunos, fornecendo feedbacks e ajustes conforme necessário.</li>
          <li><strong className="text-white">Espaço bem estruturado e organizado:</strong> Iluminação adequada, limpeza impecável e equipamentos em bom estado transmitem profissionalismo e cuidado.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6 mb-2">2. Fidelização Através de Programas de Recompensas</h3>
        <p className="mb-4">Uma estratégia eficiente para manter os alunos ativos é implementar programas de fidelização. Isso incentiva a permanência e cria um diferencial competitivo. Algumas ideias incluem:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong className="text-white">Benefícios exclusivos para alunos antigos:</strong> Descontos progressivos para alunos que se mantêm matriculados por mais de 6 meses ou 1 ano.</li>
          <li><strong className="text-white">Aulas específicas para membros fidelizados:</strong> Como aulas de alta intensidade, masterclasses com especialistas ou workshops exclusivos.</li>
          <li><strong className="text-white">Sistema de pontos:</strong> Os alunos acumulam pontos por presença e engajamento, podendo trocá-los por brindes, sessões de personal trainer ou descontos em suplementos.</li>
          <li><strong className="text-white">Descontos para indicação:</strong> Um programa de indicação bem estruturado ajuda a atrair novos alunos enquanto premia os que já estão engajados.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6 mb-2">3. Estabeleça um Canal de Feedback Contínuo</h3>
        <p className="mb-4">A melhor maneira de entender o que precisa ser melhorado na sua academia é ouvindo seus alunos. Para isso:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong className="text-white">Crie pesquisas de satisfação periódicas:</strong> Utilize ferramentas simples como formulários online ou caixas de sugestões na academia.</li>
          <li><strong className="text-white">Abra espaço para críticas construtivas:</strong> Mostre que as opiniões dos alunos são levadas a sério e implemente melhorias baseadas no feedback.</li>
          <li><strong className="text-white">Treine sua equipe para escutar ativamente os alunos:</strong> Um instrutor atencioso pode perceber insatisfações antes que um aluno decida cancelar sua matrícula.</li>
          <li><strong className="text-white">Utilize redes sociais e grupos exclusivos:</strong> Criar uma comunidade no WhatsApp ou no Facebook permite uma interação maior entre alunos e equipe.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6 mb-2">4. Promova Eventos Sociais e Competições Internas</h3>
        <p className="mb-4">O senso de comunidade é um fator poderoso na retenção de alunos. Quando um aluno se sente parte de algo maior, ele tende a permanecer fiel. Algumas ações para fortalecer isso incluem:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong className="text-white">Desafios fitness:</strong> Criar desafios de emagrecimento, ganho de força ou resistência incentiva a competição amigável e aumenta a motivação.</li>
          <li><strong className="text-white">Eventos temáticos:</strong> Organizar eventos como “Noite do CrossFit”, “Maratona de Zumba” ou “Treino Funcional ao Ar Livre” pode atrair mais engajamento.</li>
          <li><strong className="text-white">Happy hours e confraternizações:</strong> Criar momentos sociais fora do ambiente da academia estreita laços entre os alunos.</li>
          <li><strong className="text-white">Parcerias com estabelecimentos locais:</strong> Montar parcerias com lojas de suplementos, estéticas ou clínicas pode gerar benefícios para seus alunos, tornando a experiência mais completa.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6 mb-2">5. Invista em Tecnologia e Facilite a Experiência do Aluno</h3>
        <p className="mb-4">A tecnologia pode ser uma grande aliada na retenção de alunos, tornando a experiência mais dinâmica e prática. Algumas soluções incluem:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong className="text-white">Aplicativos para acompanhamento de treinos:</strong> Apps que registram treinos e progresso aumentam a motivação dos alunos.</li>
          <li><strong className="text-white">Sistema de agendamento online:</strong> Facilita a marcação de aulas e evita superlotação.</li>
          <li><strong className="text-white">Automatização de pagamentos:</strong> Reduz o risco de inadimplência e simplifica a vida do aluno.</li>
          <li><strong className="text-white">Treinos virtuais:</strong> Disponibilizar conteúdo online para alunos que viajam ou têm rotina corrida pode ser um diferencial.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6 mb-2">Conclusão</h3>
        <p className="mb-4">Manter os alunos engajados e motivados é essencial para o crescimento e sucesso da sua academia. Ao investir em um ambiente acolhedor, programas de fidelização, feedback constante, eventos sociais e tecnologia, você fortalece a relação com seus clientes e garante uma base de alunos mais fiel.</p>
        <p>Se você deseja implementar estratégias personalizadas para aumentar a retenção e melhorar a gestão da sua academia, entre em contato com a nossa equipe! Podemos ajudar você a transformar sua academia em um verdadeiro ponto de referência no mercado.</p>
      </>
    ),
  },
  {
    id: 2,
    title: "O que os alunos mais procuram em uma academia moderna?",
    excerpt: "O mercado fitness está em constante evolução e os alunos têm se tornado mais exigentes. Para atrair e reter clientes, é essencial entender o que eles realmente valorizam em uma academia moderna.",
    date: "16 Jan, 2025",
    category: "Gestão",
    content: (
      <>
        <h3 className="text-xl font-bold text-white mt-6 mb-2">1. Equipamentos Tecnológicos e Eficientes</h3>
        <p className="mb-6">Alunos querem resultados rápidos e seguros. Equipamentos biarticulados, como os da Volkano Fitness, são projetados para oferecer movimentos naturais e ativação muscular eficiente.</p>

        <h3 className="text-xl font-bold text-white mt-6 mb-2">2. Ambiente Atraente e Bem Planejado</h3>
        <p className="mb-6">Um espaço organizado, limpo e moderno faz toda a diferença na experiência do cliente. Aposte em layouts funcionais e equipamentos que otimizam o espaço.</p>

        <h3 className="text-xl font-bold text-white mt-6 mb-2">3. Personalização e Atendimento Humanizado</h3>
        <p className="mb-6">Alunos desejam se sentir valorizados. Ofereça programas personalizados e instrutores treinados para atender as necessidades individuais de cada cliente.</p>

        <h3 className="text-xl font-bold text-white mt-6 mb-2">4. Segurança e Conforto nos Treinos</h3>
        <p className="mb-6">Ergonomia e qualidade nos equipamentos são essenciais para evitar lesões e oferecer treinos mais confortáveis e eficazes.</p>

        <p className="mt-8 font-semibold text-white">
          Sua academia está alinhada às expectativas do mercado moderno? Conheça a linha de equipamentos Volkano Fitness e transforme a experiência dos seus alunos!
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: "Por que o barato sai caro? O impacto de equipamentos de baixa qualidade na sua academia.",
    excerpt: "Muitas academias acabam optando por equipamentos de baixo custo para economizar no momento da compra. No entanto, essa escolha pode sair muito mais cara a longo prazo, prejudicando a reputação do negócio e a experiência dos alunos.",
    date: "10 Jan, 2025",
    category: "Mercado",
    content: (
      <>
        <h3 className="text-xl font-bold text-white mt-6 mb-2">1. Manutenção Frequente e Custos Ocultos</h3>
        <p className="mb-6">Equipamentos baratos frequentemente apresentam problemas de durabilidade, demandando manutenção constante. Isso não só gera gastos imprevistos, como também interrompe o funcionamento da academia, causando insatisfação nos alunos.</p>

        <h3 className="text-xl font-bold text-white mt-6 mb-2">2. Experiência do Aluno Comprometida</h3>
        <p className="mb-6">Alunos querem resultados e segurança. Equipamentos de baixa qualidade podem ser desconfortáveis, apresentar movimentos instáveis e até causar lesões, afastando clientes e prejudicando a retenção.</p>

        <h3 className="text-xl font-bold text-white mt-6 mb-2">3. Perda de Credibilidade da Academia</h3>
        <p className="mb-6">Equipamentos que não funcionam adequadamente ou aparentam ser ultrapassados podem passar a impressão de que a academia não se preocupa com seus alunos, afetando a reputação do negócio.</p>

        <h3 className="text-xl font-bold text-white mt-6 mb-2">4. Benefícios de Investir em Qualidade</h3>
        <p className="mb-6">Com equipamentos premium, como os da Volkano Fitness, você garante durabilidade, segurança e resultados eficientes para seus clientes, além de reduzir os custos operacionais ao longo do tempo.</p>

        <p className="mt-8 font-semibold text-white">
          Investir em equipamentos de qualidade não é gasto, é planejamento estratégico. Fale com um consultor da Volkano Fitness e descubra como nossos equipamentos podem transformar sua academia!
        </p>
      </>
    ),
  },
];

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

              <div className="relative h-64 w-full bg-white/5">
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                  <span className="text-6xl font-black text-white/10">V</span>
                </div>
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
