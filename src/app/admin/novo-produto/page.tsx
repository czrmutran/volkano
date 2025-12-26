"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import Header from "../../../components/header-section";
import FooterSection from "../../../components/footer";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

const CATEGORIAS = [
  "Volkano Pro",
  "Volkano Infinity",
  "Volkano Black",
  "Volkano Prime",
  "Hammer e Articulados",
  "Força Variável",
  "Suportes",
];

export default function NovoProdutoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    categoria: CATEGORIAS[0],
    descricao: "",
    video_url: "",
    slug: "",
  });
  
  const [imagens, setImagens] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.nome) {
      const generatedSlug = formData.nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      
      // Only auto-update if user hasn't manually edited slug (simple check: if it matches partial auto-gen)
      // Or just simple: always update if user didn't touch it?
      // Let's keep it simple: if slug is empty or matches previous auto-gen, update it.
      // For now, I'll just update it if the user hasn't typed in the slug field manually yet.
      // Better yet: just let the user edit it, but pre-fill it.
      // Actually, let's just use a simple function to generate it on change of name if slug is empty.
    }
  }, [formData.nome]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = generateSlug(name);
    setFormData((prev) => ({
      ...prev,
      nome: name,
      slug: prev.slug === "" || prev.slug === generateSlug(prev.nome) ? slug : prev.slug
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const newFiles = Array.from(e.target.files);
    
    // Upload imediato para simplificar
    const uploadedUrls: string[] = [];

    for (const file of newFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `produtos/${fileName}`;

      try {
        const { error: uploadError } = await supabase.storage
          .from('produtos')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Erro no upload:', uploadError);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('produtos')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      } catch (err) {
        console.error('Erro inesperado no upload:', err);
      }
    }

    setImagens((prev) => [...prev, ...uploadedUrls]);
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setImagens((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.categoria) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("produtos").insert({
        nome: formData.nome,
        codigo: formData.codigo || null,
        categoria: formData.categoria,
        descricao: formData.descricao,
        video_url: formData.video_url || null,
        slug: formData.slug || null,
        imagens: imagens,
      });

      if (error) throw error;

      alert("Produto cadastrado com sucesso!");
      router.push("/store");
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      alert("Erro ao salvar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-24 pb-20 text-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-black uppercase mb-8">
            Novo <span className="text-orange-500">Produto</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10">
            {/* Nome */}
            <div>
              <label className="block text-sm font-bold mb-2 text-white/70">Nome do Produto *</label>
              <input
                type="text"
                value={formData.nome}
                onChange={handleNameChange}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 focus:border-orange-500 focus:outline-none transition"
                placeholder="Ex: Supino Reto"
                required
              />
            </div>

            {/* Slug (URL) */}
            <div>
              <label className="block text-sm font-bold mb-2 text-white/70">URL Personalizada (Slug)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 focus:border-orange-500 focus:outline-none transition font-mono text-sm text-orange-500"
                placeholder="ex: supino-reto-profissional"
              />
              <p className="text-xs text-white/30 mt-1">Deixe em branco para gerar automaticamente.</p>
            </div>

            {/* Código e Categoria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-white/70">Código</label>
                <input
                  type="text"
                  value={formData.codigo}
                  onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 focus:border-orange-500 focus:outline-none transition"
                  placeholder="Ex: PRO-01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-white/70">Categoria *</label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 focus:border-orange-500 focus:outline-none transition text-white"
                >
                  {CATEGORIAS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-bold mb-2 text-white/70">Descrição</label>
              <textarea
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 focus:border-orange-500 focus:outline-none transition min-h-[120px]"
                placeholder="Descreva o equipamento..."
              />
            </div>

            {/* Vídeo do YouTube */}
            <div>
              <label className="block text-sm font-bold mb-2 text-white/70">Vídeo do YouTube (Opcional)</label>
              <input
                type="text"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 focus:border-orange-500 focus:outline-none transition"
                placeholder="Ex: https://www.youtube.com/watch?v=..."
              />
            </div>

            {/* Upload de Imagens */}
            <div>
              <label className="block text-sm font-bold mb-2 text-white/70">Imagens</label>
              
              <div className="flex flex-wrap gap-4 mb-4">
                {imagens.map((url, idx) => (
                  <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/20 group">
                    <Image
                      src={url}
                      alt={`Preview ${idx}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                
                <label className={`w-24 h-24 rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:text-orange-500 transition ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                  {uploading ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>
                      <Upload size={24} className="mb-1" />
                      <span className="text-[10px] uppercase font-bold">Adicionar</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                </label>
              </div>
              <p className="text-xs text-white/40">
                Formatos aceitos: JPG, PNG, WEBP. Clique para selecionar.
              </p>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || uploading}
                className="w-full bg-orange-500 text-black font-bold py-4 rounded-full hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "SALVANDO..." : "CADASTRAR PRODUTO"}
              </button>
            </div>

          </form>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
