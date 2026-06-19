import React from 'react';

// DEFINIMOS LAS PROPS PARA QUE TYPESCRIPT NO COMENTA ERRORES
interface NavbarProps {
  lang: 'es' | 'en';
  setLang: (lang: 'es' | 'en') => void;
  user: { name: string; role: 'client' | 'worker' } | null;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function Navbar({ lang, setLang, user, onLoginClick, onRegisterClick }: NavbarProps) {
  return (
    <nav className="w-full bg-[#0F1328]/80 backdrop-blur-md border-b border-white/10 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="text-xl font-black tracking-wider text-white">
          CorDex<span className="text-orange-500">.</span>
        </div>

        {/* CONTROLES (IDIOMA Y ACCESO) */}
        <div className="flex items-center gap-4">
          
          {/* BOTÓN INTERACTIVO DE IDIOMA */}
          <button 
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="px-3 py-1.5 rounded-lg bg-[#1A2240] border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            🌐 {lang === 'es' ? 'EN' : 'ES'}
          </button>

          {/* MENÚ DE USUARIO O INGRESO */}
          {user ? (
            <span className="text-sm text-orange-400 font-semibold">
              👋 {lang === 'es' ? 'Hola' : 'Hello'}, {user.name}
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={onLoginClick}
                className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors cursor-pointer"
              >
                {lang === 'es' ? 'Ingresar' : 'Login'}
              </button>
              <button 
                onClick={onRegisterClick}
                className="px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all cursor-pointer"
              >
                {lang === 'es' ? 'Registrarse' : 'Sign Up'}
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}