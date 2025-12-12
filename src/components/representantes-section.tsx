"use client";

import Image from "next/image";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const brands = [
  { name: "SkyFit", logo: "/logo-skyfit.webp" },
  { name: "AD3", logo: "/logo-AD3.webp" },
  { name: "Arena", logo: "/logo-arena.webp" },
  { name: "PHD", logo: "/logo-PHD.webp" },
  { name: "Renato Cariani", logo: "/logo-renato-cariani.webp" },
  { name: "Sardinhas", logo: "/logo-sardinhas.webp" },
];

export default function RepresentantesSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const [loopWidth, setLoopWidth] = useState(0);

  // contador de hovers (pausa enquanto > 0)
  const [hoverCount, setHoverCount] = useState(0);
  const paused = hoverCount > 0;

  const marquee = useMemo(() => [...brands, ...brands, ...brands], []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => setLoopWidth(el.scrollWidth / 2);

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // velocidade em px/s
  const speed = 40;

  useAnimationFrame((_, delta) => {
    if (paused || !loopWidth) return;

    const next = x.get() - (speed * delta) / 1000;

    if (Math.abs(next) >= loopWidth) {
      x.set(0);
    } else {
      x.set(next);
    }
  });

  return (
    <section className="bg-black/80 py-24 sm:py-10 lg:py-18">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="font-montserrat font-black text-2xl md:text-4xl text-white uppercase tracking-wide">
          Presente nas <span className="text-orange-500">maiores academias</span> do Brasil
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* respiro pra não cortar no hover */}
        <div className="py-8 md:py-10">
          <motion.div
            ref={trackRef}
            className="flex flex-nowrap items-center gap-8 md:gap-14 will-change-transform"
            style={{ x, width: "fit-content" }}
          >
            {marquee.map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="flex-shrink-0 overflow-visible" aria-hidden={index >= brands.length}>
                <motion.div
                  className="relative h-14 w-52 md:h-16 md:w-60 overflow-visible"
                  onHoverStart={() => setHoverCount((c) => c + 1)}
                  onHoverEnd={() => setHoverCount((c) => Math.max(0, c - 1))}
                >
                  <div className="relative h-full w-full cursor-pointer transition-transform duration-300 ease-out hover:scale-125">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      sizes="240px"
                      priority={index < 6}
                      className="object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                    />
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
