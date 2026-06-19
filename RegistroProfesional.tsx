import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function RegistroProfesional() {
  const [nombre, setNombre] = useState('');
  const [rubro, setRubro] = useState('Electricista'); // Rubro inicial por defecto
  const [telefono, setTelefono] = useState('');
  const [localidad, setLocalidad] = useState('Córdoba');
  const [descripcion, setDescripcion] = useState('');

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);

    try {
      // Mandamos los datos directo a la tabla 'profesionales' de Supabase
      const { data, error } = await supabase
        .from('profesionales')
        .insert([
          { 
            nombre, 
            rubro, 
            telefono, 
            localidad, 
            descripcion 
          }
        ]);

      if (error) throw error;

      setMensaje({ tipo: 'exito', texto: '¡Perfil profesional creado con éxito en Gran Servicio!' });
      
      // Limpiamos los campos del formulario
      setNombre('');
      setTelefono('');
      setDescripcion('');
    } catch (error: any) {
      setMensaje({ tipo: 'error', texto: error.message || 'Error al guardar el profesional.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full border border-slate-100">
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Unirse como Profesional</h2>
          <p className="text-sm text-slate-500 mt-2">Completá tus datos para empezar a recibir ofertas de trabajo.</p>
        </div>

        {mensaje && (
          <div className={`p-3 rounded-lg text-sm font-medium mb-4 text-center ${
            mensaje.tipo === 'exito' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre Completo</label>
            <input 
              type="text" 
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Carlos Gómez"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Rubro</label>
              <select 
                value={rubro}
                onChange={(e) => setRubro(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="Electricista">Electricista</option>
                <option value="Plomero">Plomero</option>
                <option value="Gasista">Gasista</option>
                <option value="Albañil">Albañil</option>
                <option value="Pintor">Pintor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Teléfono / WhatsApp</label>
              <input 
                type="text" 
                placeholder="Ej: 3516554433"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Localidad / Zona de cobertura</label>
            <input 
              type="text" 
              required
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
              placeholder="Ej: Córdoba Capital"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Descripción del Servicio</label>
            <textarea 
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Contanos un poco sobre tu experiencia, trabajos que realizás o garantías..."
              className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg shadow-sm transition-all text-sm cursor-pointer"
          >
            {loading ? 'Guardando en la base de datos...' : 'Registrar Perfil'}
          </button>
        </form>

      </div>
    </div>
  );
}