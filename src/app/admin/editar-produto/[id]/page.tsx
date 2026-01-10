"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import Header from "../../../../components/header-section";
import FooterSection from "../../../../components/footer";
import { Upload, X, Loader2, ArrowLeft, Plus, Trash2, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Força a renderização dinâmica para evitar 404 em rotas não geradas estaticamente
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

export default function EditarProdutoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([]);
  const [features, setFeatures] = useState<{ image: string; text: string }[]>([]);
  const [featureUploading, setFeatureUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    async function fetchProduto() {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("produtos")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          setFormData({
            nome: data.nome,
            codigo: data.codigo || "",
            categoria: data.categoria,
            descricao: data.descricao || "",
            video_url: data.video_url || "",
            slug: data.slug || "",
          });
          setImagens(data.imagens || []);
          
          if (data.especificacoes) {
            const loadedSpecs = Object.entries(data.especificacoes).map(([key, value]) => ({
              key,
              value: String(value)
            }));
            setSpecs(loadedSpecs);
          }

          if (data.caracteristicas && Array.isArray(data.caracteristicas)) {
            setFeatures(data.caracteristicas);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar produto:", err);
        alert("Erro ao carregar produto.");
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    }

    fetchProduto();
  }, [id, router]);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeImage = (index: number) => {
    setImagens((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const handleFeatureFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setFeatureUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `feat_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `produtos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('produtos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('produtos')
        .getPublicUrl(filePath);

      setFeatures([...features, { image: publicUrl, text: "" }]);
    } catch (err) {
      console.error("Erro no upload da característica:", err);
      alert("Erro ao enviar imagem.");
    } finally {
      setFeatureUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const handleFeatureTextChange = (index: number, text: string) => {
    const newFeatures = [...features];
    newFeatures[index].text = text;
    setFeatures(newFeatures);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.categoria) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    setSaving(true);

    try {
      const specsObj = specs.reduce((acc, item) => {
        if (item.key.trim()) acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string>);

      const { error } = await supabase
        .from("produtos")
        .update({
          nome: formData.nome,
          codigo: formData.codigo || null,
          categoria: formData.categoria,
          descricao: formData.descricao,
          video_url: formData.video_url || null,
          slug: formData.slug || null,
          imagens: imagens,
          especificacoes: specsObj,
          caracteristicas: features,
        })
        .eq("id", id);

      if (error) throw error;

      alert("Produto atualizado com sucesso!");
      router.push("/admin");
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      alert("Erro ao atualizar produto.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-24 pb-20 text-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link href="/admin" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 transition">
            <ArrowLeft size={20} /> Voltar
          </Link>

          <h1 className="text-3xl font-black uppercase mb-8">
            Editar <span className="text-orange-500">Produto</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10">
            {/* Nome */}
            <div>
              <label className="block text-sm font-bold mb-2 text-white/70">Nome do Produto *</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 focus:border-orange-500 focus:outline-none transition"
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
              <p className="text-xs text-white/30 mt-1">Deixe em branco para usar o padrão.</p>
              {formData.slug && (
                <div className="mt-3">
                  <Link 
                    href={`/produto/${formData.slug}`} 
                    target="_blank" 
                    className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 text-sm font-bold transition"
                  >
                    <ExternalLink size={16} /> 
                    Visualizar Produto na Loja
                  </Link>
                </div>
              )}
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
                  <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/20 group bg-white">
                    <Image
                      src={url}
                      alt={`Preview ${idx}`}
                      fill
                      className="object-contain p-1"
                      unoptimized
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
                  onDragEnter={(e) => setIsDragging(true)}
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
            </div>

            {/* Especificações Técnicas */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-white/70">Especificações Técnicas</label>
                <button
                  type="button"
                  onClick={handleAddSpec}
                  className="text-xs flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded transition"
                >
                  <Plus size={12} /> Adicionar Campo
                </button>
              </div>
              
              <div className="space-y-2">
                {specs.map((spec, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
                      placeholder="Característica (ex: Altura)"
                      className="flex-1 rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none transition"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                      placeholder="Valor (ex: 200cm)"
                      className="flex-1 rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(idx)}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {specs.length === 0 && (
                  <p className="text-xs text-white/30 italic">Nenhuma especificação adicionada.</p>
                )}
              </div>
            </div>

            {/* Características Visuais (Cards) */}
            <div>
              <label className="block text-sm font-bold mb-2 text-white/70">Detalhes (Cards com Foto)</label>
              
              <div className="space-y-3 mb-3">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="relative w-16 h-16 bg-white rounded overflow-hidden flex-shrink-0">
                      <Image 
                        src={feat.image} 
                        alt="Feature" 
                        fill 
                        className="object-contain p-1"
                        unoptimized 
                      />
                    </div>
                    <input
                      type="text"
                      value={feat.text}
                      onChange={(e) => handleFeatureTextChange(idx, e.target.value)}
                      placeholder="Texto da característica (ex: Acabamento em Inox)"
                      className="flex-1 bg-transparent border-b border-white/10 focus:border-orange-500 outline-none text-sm py-2 transition"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="p-2 text-white/30 hover:text-red-500 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <label className={`inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg cursor-pointer transition text-sm font-bold ${featureUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                {featureUploading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                {featureUploading ? "Enviando..." : "Adicionar Detalhe"}
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFeatureFileChange}
                  disabled={featureUploading}
                />
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4 flex gap-4">
              <Link
                href="/admin"
                className="flex-1 bg-white/10 text-white font-bold py-4 rounded-full hover:bg-white/20 transition text-center"
              >
                CANCELAR
              </Link>
              <button
                type="submit"
                disabled={saving || uploading}
                className="flex-[2] bg-orange-500 text-black font-bold py-4 rounded-full hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "SALVANDO..." : "SALVAR ALTERAÇÕES"}
              </button>
            </div>

          </form>
        </div>
      </main>
    </>
  );
}
