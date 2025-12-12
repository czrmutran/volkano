// components/SiteBackground.tsx
export default function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Camada de base (preto) */}
      <div className="absolute inset-0 bg-black" />

      {/* Borrões / glows laranja */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-orange-500/25 blur-[140px]" />
      <div className="absolute top-[35vh] -right-40 h-[640px] w-[640px] rounded-full bg-orange-500/20 blur-[160px]" />
      <div className="absolute bottom-[-220px] left-[20vw] h-[720px] w-[720px] rounded-full bg-orange-500/15 blur-[180px]" />

      {/* Textura leve (opcional) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)] opacity-40" />
    </div>
  );
}
