"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import Header from "../../../components/header-section";
import FooterSection from "../../../components/footer";
import { Upload, X, Loader2, FileJson, Type, Box, Layers } from "lucide-react";
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

const BULK_TEMPLATE = `[
  {
    "nome": "Nome do Produto",
    "categoria": "Volkano Pro",
    "codigo": "COD123",
    "descricao": "Descrição do produto...",
    "imagens": ["https://exemplo.com/imagem.jpg"],
    "video_url": ""
  }
]`;

export default function NovoProdutoPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"single" | "bulk">("single");
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
  const [bulkData, setBulkData] = useState("");
  const [isDragging, setIsDragging] = useState(false);

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

  const processFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of files) {
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const newFiles = Array.from(e.target.files);
    await processFiles(newFiles);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Evita que o evento dispare ao passar por cima de filhos (ícone, texto)
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      // Opcional: filtrar apenas imagens
      const imageFiles = files.filter(file => file.type.startsWith('image/'));
      
      if (imageFiles.length > 0) {
        await processFiles(imageFiles);
      }
    }
  };

  const removeImage = (index: number) => {
    setImagens((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkData.trim()) {
      alert("Cole o JSON dos produtos.");
      return;
    }

    setLoading(true);

    try {
      let parsed;
      try {
        parsed = JSON.parse(bulkData);
      } catch (e) {
        throw new Error("Erro ao ler JSON. Verifique a formatação.");
      }

      if (!Array.isArray(parsed)) {
        throw new Error("O JSON deve ser uma lista (array) de produtos.");
      }

      // Processar cada produto
      const productsToInsert = parsed.map((p: any) => {
        if (!p.nome || !p.categoria) {
          throw new Error(`Produto "${p.nome || 'sem nome'}" inválido: Nome e Categoria são obrigatórios.`);
        }
        
        return {
          nome: p.nome,
          codigo: p.codigo || null,
          categoria: p.categoria,
          descricao: p.descricao || "",
          video_url: p.video_url || null,
          slug: p.slug || generateSlug(p.nome),
          imagens: Array.isArray(p.imagens) ? p.imagens : [],
        };
      });

      const { error } = await supabase.from("produtos").insert(productsToInsert);
      if (error) throw error;

      alert(`${productsToInsert.length} produtos cadastrados com sucesso!`);
      router.push("/store");
    } catch (err: any) {
      console.error("Erro no cadastro em lote:", err);
      alert(err.message || "Erro ao salvar produtos.");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkData.trim()) {
      alert("Cole o JSON dos produtos.");
      return;
    }

    setLoading(true);

    try {
      let parsed;
      try {
        parsed = JSON.parse(bulkData);
      } catch (e) {
        throw new Error("Erro ao ler JSON. Verifique a formatação.");
      }

      if (!Array.isArray(parsed)) {
        throw new Error("O JSON deve ser uma lista (array) de produtos.");
      }

      // Processar cada produto
      const productsToInsert = parsed.map((p: any) => {
        if (!p.nome || !p.categoria) {
          throw new Error(`Produto "${p.nome || 'sem nome'}" inválido: Nome e Categoria são obrigatórios.`);
        }
        
        return {
          nome: p.nome,
          codigo: p.codigo || null,
          categoria: p.categoria,
          descricao: p.descricao || "",
          video_url: p.video_url || null,
          slug: p.slug || generateSlug(p.nome),
          imagens: Array.isArray(p.imagens) ? p.imagens : [],
        };
      });

      const { error } = await supabase.from("produtos").insert(productsToInsert);
      if (error) throw error;

      alert(`${productsToInsert.length} produtos cadastrados com sucesso!`);
      router.push("/store");
    } catch (err: any) {
      console.error("Erro no cadastro em lote:", err);
      alert(err.message || "Erro ao salvar produtos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-24 pb-20 text-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black uppercase">
              Novo <span className="text-orange-500">Produto</span>
            </h1>
          </div>

          {/* Mode Switcher */}
          <div className="bg-white/5 p-1 rounded-lg flex gap-1 mb-8 border border-white/10">
            <button
              onClick={() => setMode("single")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md font-bold text-sm transition ${
                mode === "single"
                  ? "bg-orange-500 text-black shadow-lg"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Box size={18} /> Cadastro Individual
            </button>
            <button
              onClick={() => setMode("bulk")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md font-bold text-sm transition ${
                mode === "bulk"
                  ? "bg-orange-500 text-black shadow-lg"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers size={18} /> Cadastro em Lote (JSON)
            </button>
          </div>

          {mode === "single" ? (
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
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
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
                  
                  <label 
                  className={`w-24 h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition relative overflow-hidden ${
                    uploading ? 'opacity-50 pointer-events-none' : ''
                  } ${
                    isDragging 
                      ? 'border-orange-500 bg-orange-500/10 scale-105' 
                      : 'border-white/20 hover:border-orange-500 hover:text-orange-500'
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {uploading ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>
                      <Upload size={24} className={`mb-1 transition-transform ${isDragging ? 'scale-110' : ''}`} />
                      <span className="text-[10px] uppercase font-bold text-center px-1">
                        {isDragging ? 'Solte aqui' : 'Adicionar ou Arraste'}
                      </span>
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
          ) : (
            <form onSubmit={handleBulkSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                  <FileJson size={20} />
                  <h3>Instruções</h3>
                </div>
                <p className="text-sm text-white/70 mb-2">
                  Cole abaixo uma lista de produtos no formato JSON. O sistema irá gerar os slugs automaticamente se não forem fornecidos.
                </p>
                <div className="bg-black/40 p-3 rounded border border-white/10 font-mono text-xs text-white/60 overflow-x-auto">
                  <pre>{BULK_TEMPLATE}</pre>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-white/70">Dados JSON</label>
                <textarea
                  value={bulkData}
                  onChange={(e) => setBulkData(e.target.value)}
                  className="w-full h-96 rounded-lg bg-black/40 border border-white/10 px-4 py-3 focus:border-orange-500 focus:outline-none transition font-mono text-xs leading-relaxed"
                  placeholder="Cole seu JSON aqui..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 text-black font-bold py-4 rounded-full hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "PROCESSAR LOTE"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <FooterSection />
    </>
  );
}
