import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importación necesaria para redirigir
import { supabase } from '../lib/supabaseClient';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);
  
  const navigate = useNavigate(); // Inicializamos el enrutador de navegación

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);

    try {
      if (isSignUp) {
        // Lógica de Registro en Supabase Auth
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMensaje({ 
          tipo: 'exito', 
          texto: '¡Registro exitoso! Revisá tu correo para confirmar la cuenta si es necesario.' 
        });
      } else {
        // Lógica de Inicio de Sesión en Supabase Auth
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        setMensaje({ 
          tipo: 'exito', 
          texto: '¡Bienvenido de nuevo!' 
        });

        // Redirige automáticamente al Home tras 1.5 segundos de éxito
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error: any) {
      setMensaje({ 
        tipo: 'error', 
        texto: error.message || 'Ocurrió un error inesperado.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-slate-100">
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            {isSignUp 
              ? 'Registrate para buscar o publicar servicios en Córdoba.' 
              : 'Ingresá tus credenciales para acceder a tu panel.'}
          </p>
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
            <label className="block text-sm font-semibold text-slate-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg shadow-sm transition-all text-sm cursor-pointer mt-2"
          >
            {loading ? 'Procesando...' : isSignUp ? 'Registrarse' : 'Ingresar'}
          </button>
        </form>

        <div className="text-center mt-6 border-t border-slate-100 pt-4">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMensaje(null);
            }}
            className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors cursor-pointer"
          >
            {isSignUp ? '¿Ya tenés cuenta? Iniciá sesión' : '¿No tenés cuenta? Registrate acá'}
          </button>
        </div>

      </div>
    </div>
  );
}