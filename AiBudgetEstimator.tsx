import React, { useState } from 'react';

interface AiBudgetEstimatorProps {
  lang: 'es' | 'en';
  onFindWorker: (category: string) => void;
}

export default function AiBudgetEstimator({ lang, onFindWorker }: AiBudgetEstimatorProps) {
  const [prompt, setPrompt] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ category: string; urgency: string; icon: string } | null>(null);

  const handleAiAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setAnalyzing(true);
    setResult(null);

    // Simulamos el procesamiento de lenguaje natural en 2 segundos
    setTimeout(() => {
      const text = prompt.toLowerCase();
      let category = lang === 'es' ? 'Servicios Generales' : 'General Services';
      let icon = '🛠️';
      let urgency = lang === 'es' ? 'Media' : 'Medium';

      if (text.includes('plomero') || text.includes('agua') || text.includes('caño') || text.includes('filtración') || text.includes('canilla')) {
        category = lang === 'es' ? 'Plomería' : 'Plumbing';
        icon = '🚰';
        if (text.includes('urgente') || text.includes('inundación') || text.includes('ahora')) urgency = lang === 'es' ? 'Crítica 🚨' : 'Critical 🚨';
      } else if (text.includes('luz') || text.includes('cable') || text.includes('electricista') || text.includes('corto') || text.includes('enchufe')) {
        category = lang === 'es' ? 'Electricidad' : 'Electrical';
        icon = '⚡';
        if (text.includes('corto') || text.includes('fuego') || text.includes('sin luz')) urgency = lang === 'es' ? 'Alta ⚠️' : 'High ⚠️';
      } else if (text.includes('gas') || text.includes('estufa') || text.includes('calefón') || text.includes('pérdida')) {
        category = lang === 'es' ? 'Gasista' : 'Gas Fitter';
        icon = '🔥';
        urgency = lang === 'es' ? 'Alta ⚠️' : 'High ⚠️';
      } else if (text.includes('pintar') || text.includes('pared') || text.includes('pintor')) {
        category = lang === 'es' ? 'Pintura' : 'Painting';
        icon = '🎨';
        urgency = lang === 'es' ? 'Baja' : 'Low';
      }

      setResult({ category, urgency, icon });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 p-6 rounded-2xl border border-white/10 bg-[#0F1328]/60 backdrop-blur-md shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2 py-1 rounded-md bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/20">
          AI Features
        </span>
        <h3 className="text-lg font-bold text-white">
          {lang === 'es' ? 'Asistente de Presupuesto Rápido' : 'AI Quick Budget Assistant'}
        </h3>
      </div>
      
      <p className="text-sm text-slate-400 mb-4">
        {lang === 'es' 
          ? 'Describí en un renglón lo que necesitás arreglar o construir y nuestra IA te guiará al instante.' 
          : 'Describe in one line what you need to fix or build and our AI will guide you instantly.'}
      </p>

      <form onSubmit={handleAiAnalysis} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={lang === 'es' ? "Ej: Tengo una pérdida de agua urgente en la canilla de la cocina..." : "E.g., I have an urgent water leak in the kitchen faucet..."}
          className="flex-1 px-4 py-3 rounded-xl bg-[#1A2240] border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
          disabled={analyzing}
        />
        <button
          type="submit"
          disabled={analyzing || !prompt.trim()}
          className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/40 text-white font-semibold text-sm transition-all shadow-md shadow-orange-500/10 cursor-pointer whitespace-nowrap"
        >
          {analyzing ? (lang === 'es' ? 'Analizando...' : 'Analyzing...') : (lang === 'es' ? 'Procesar con IA' : 'Process with AI')}
        </button>
      </form>

      {/* Resultado del análisis */}
      {result && (
        <div className="mt-6 p-4 rounded-xl bg-[#151B35] border border-white/5 animate-fade-in flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-3xl p-2 rounded-lg bg-[#1A2240] border border-white/10">
              {result.icon}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">
                {lang === 'es' ? 'Categoría Detectada' : 'Detected Category'}
              </p>
              <h4 className="text-base font-bold text-white">{result.category}</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'es' ? `Prioridad sugerida: ` : `Suggested priority: `}
                <span className="font-semibold text-amber-400">{result.urgency}</span>
              </p>
            </div>
          </div>
          
          <button
            onClick={() => onFindWorker(result.category)}
            className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-[#07091A] font-bold text-xs tracking-wide transition-all shadow-sm"
          >
            {lang === 'es' ? 'Ver Profesionales Disponibles →' : 'See Available Pros →'}
          </button>
        </div>
      )}
    </div>
  );
}