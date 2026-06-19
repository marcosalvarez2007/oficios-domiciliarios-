import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// Definimos la estructura de datos de un profesional para TypeScript
interface Profesional {
  id: number;
  nombre: string;
  rubro: string;
  telefono: string;
  localidad: string;
  descripcion: string;
}

export default function Servicios() {
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const [filtroRubro, setFiltroRubro] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Traer los datos de Supabase apenas se monta el componente
  useEffect(() => {
    async function obtenerProfesionales() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profesionales')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setProfesionales(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los profesionales');
      } finally {
        setLoading(false);
      }
    }

    obtenerProfesionales();
  }, []);

  // Filtrar la lista según el rubro seleccionado
  const profesionalesFiltrados = filtroRubro === 'Todos'
    ? profesionales
    : profesionales.filter(p => p.rubro === filtroRubro);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Profesionales Disponibles
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Encontrá mano de obra calificada y recomendada en tu zona.
            </p>
          </div>

          {/* Filtros de Rubro */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {['Todos', 'Electricista', 'Plomero', 'Gasista', 'Albañil', 'Pintor'].map((rubro) => (
              <button
                key={rubro}
                onClick={() => setFiltroRubro(rubro)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  filtroRubro === rubro
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {rubro}
              </button>
            ))}
          </div>
        </div>

        {/* Estados de Carga o Error */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-500 font-medium text-sm animate-pulse">Cargando profesionales desde Supabase...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl text-center max-w-md mx-auto text-sm">
            {error}
          </div>
        )}

        {/* Listado de Tarjetas */}
        {!loading && !error && (
          profesionalesFiltrados.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs">
              <p className="text-slate-500 font-medium text-sm">
                No hay profesionales registrados en el rubro <span className="font-bold text-slate-800">"{filtroRubro}"</span> todavía.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profesionalesFiltrados.map((p) => (
                <div 
                  key={p.id} 
                  className="bg-white rounded-xl shadow-xs border border-slate-100 hover:shadow-md transition-all p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Etiqueta de Rubro */}
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md mb-4">
                      {p.rubro}
                    </span>
                    
                    {/* Nombre */}
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1">
                      {p.nombre}
                    </h3>
                    
                    {/* Localidad */}
                    <p className="text-xs text-slate-400 font-medium flex items-center mb-3">
                      📍 {p.localidad}
                    </p>
                    
                    {/* Descripción */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {p.descripcion || 'Sin descripción detallada disponible por el momento.'}
                    </p>
                  </div>

                  {/* Botón de Contacto */}
                  <div className="border-t border-slate-100 pt-4 mt-auto">
                    <a
                      href={`https://wa.me/${p.telefono}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      💬 Contactar (WhatsApp)
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

      </div>
    </div>
  );
}