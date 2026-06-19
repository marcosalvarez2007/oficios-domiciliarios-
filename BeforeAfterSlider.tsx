import React, { useState, useRef } from 'react';

interface BeforeAfterSliderProps {
  lang: 'es' | 'en';
}

export default function BeforeAfterSlider({ lang }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 px-4">
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-amber-400 tracking-widest uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          {lang === 'es' ? 'Casos de Éxito CorDex' : 'CorDex Success Cases'}
        </span>
        <h3 className="text-2xl font-bold text-white mt-3">
          {lang === 'es' ? 'Efecto Real de Nuestras Obras' : 'Real Impact of Our Works'}
        </h3>
      </div>

      {/* Contenedor del Slider */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden select-none shadow-2xl border border-white/10 cursor-ew-resize"
      >
        {/* Imagen del Después (Fondo Completo) */}
        <div className="absolute inset-0 w-full h-full bg-slate-800">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
            alt="Después CorDex" 
            className="w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute bottom-4 right-4 bg-[#07091A]/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 text-xs font-bold text-orange-400">
            {lang === 'es' ? 'OBRA TERMINADA ✨' : 'COMPLETED WORK ✨'}
          </div>
        </div>

        {/* Imagen del Antes (Capa recortada por la posición del slider) */}
        <div 
          className="absolute inset-0 h-full overflow-hidden bg-slate-900"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80" 
            alt="Antes CorDex" 
            className="absolute inset-0 h-full object-cover pointer-events-none"
            style={{ width: containerRef.current?.getBoundingClientRect().width }}
          />
          <div className="absolute bottom-4 left-4 bg-[#07091A]/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 text-xs font-bold text-slate-400 whitespace-nowrap">
            {lang === 'es' ? 'ESTADO INICIAL 🛠️' : 'INITIAL STATE 🛠️'}
          </div>
        </div>

        {/* Línea divisoria y tirador del slider */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-orange-500 shadow-lg pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-orange-500 border-2 border-white shadow-xl flex items-center justify-center text-white text-xs font-bold">
            ↔
          </div>
        </div>
      </div>
    </div>
  );
}