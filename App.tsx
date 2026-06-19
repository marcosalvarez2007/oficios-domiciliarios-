import React, { useState } from 'react';

// Componentes Principales
import Navbar from './components/Navbar';
import ServicesGrid from './components/Services'; // Apunta a tu Services.tsx
import ConstructionSection from './components/ConstructionSection';
import HowItWorks from './components/HowItWorks';
import SubscriptionPlans from './components/SubscriptionPlans';
import Footer from './components/Footer';
import CustomerSupportChat from './components/CustomerSupportChat';

// Módulos Nuevos que agregamos
import AiBudgetEstimator from './components/AiBudgetEstimator';
import BeforeAfterSlider from './components/BeforeAfterSlider';

// MODALES: Nombres e importaciones corregidos según tus archivos reales
import ClientAuthModal from './components/ClientAuthModal';
import WorkerRegModal from './components/WorkerRegModal'; // <--- Cambiado de WorkerRegistrationModal a WorkerRegModal
import ServiceRequestModal from './components/ServiceRequestModal';
import ConstructionContactModal from './components/ConstructionContactModal';

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [user, setUser] = useState<{ name: string; role: 'client' | 'worker' } | null>(null);

  // Mantenemos los nombres de las llaves del estado para el control
  const [modals, setModals] = useState({
    clientAuth: false,
    workerRegister: false, // Controla el modal de trabajadores
    serviceRequest: false,
    constructionContact: false,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const toggleModal = (modalName: keyof typeof modals, isOpen: boolean) => {
    setModals((prev) => ({ ...prev, [modalName]: isOpen }));
  };

  const handleServiceSelect = (category: string) => {
    setSelectedCategory(category);
    toggleModal('serviceRequest', true);
  };

  return (
    <div className="min-h-screen bg-[#07091A] text-slate-100 font-sans antialiased">
      
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        user={user}
        onLoginClick={() => toggleModal('clientAuth', true)}
        onRegisterClick={() => toggleModal('workerRegister', true)}
      />

      <main>
        {/* Sección Hero Integrada */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-[#07091A]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-orange-500/10 to-transparent blur-3xl pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-6">
              ✨ {lang === 'es' ? 'Gran Servicio' : 'Great Service'}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              {lang === 'es' ? 'Conectá con Profesionales de Confianza' : 'Connect with Trusted Professionals'}
              <span className="block mt-2 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                CorDex
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 mb-10">
              {lang === 'es' 
                ? 'La plataforma definitiva para contratar servicios para el hogar, mantenimiento industrial y grandes obras de construcción.' 
                : 'The ultimate platform to hire home services, industrial maintenance, and major construction works.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => handleServiceSelect(lang === 'es' ? 'General' : 'General')}
                className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
              >
                {lang === 'es' ? 'Solicitar un Servicio' : 'Request a Service'}
              </button>
              <a href="#services" className="px-8 py-3.5 rounded-xl bg-[#1A2240] hover:bg-[#232D54] text-slate-200 font-semibold text-sm border border-white/10 transition-all">
                {lang === 'es' ? 'Explorar Rubros' : 'Explore Categories'}
              </a>
            </div>
          </div>
        </section>

        {/* Buscador de IA */}
        <div className="px-4 pb-16 max-w-7xl mx-auto -mt-8 relative z-10">
          <AiBudgetEstimator lang={lang} onFindWorker={handleServiceSelect} />
        </div>

        {/* Grilla de Oficios */}
        <section id="services" className="py-20 bg-[#0c0f2b]/50 border-y border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ServicesGrid lang={lang} onSelectService={handleServiceSelect} />
          </div>
        </section>

        <HowItWorks lang={lang} />

        {/* Construcción con el Slider dinámico adentro */}
        <ConstructionSection lang={lang} onContactClick={() => toggleModal('constructionContact', true)}>
          <BeforeAfterSlider lang={lang} />
        </ConstructionSection>

        <SubscriptionPlans lang={lang} />
      </main>

      <Footer lang={lang} />
      <CustomerSupportChat lang={lang} />

      {/* RENDER DE LOS MODALES CORREGIDOS */}
      {modals.clientAuth && (
        <ClientAuthModal 
          isOpen={modals.clientAuth} 
          onClose={() => toggleModal('clientAuth', false)} 
          onSuccess={(userData: any) => { 
            setUser(userData); 
            toggleModal('clientAuth', false); 
          }} 
        />
      )}
      
      {/* Usamos el nombre real de tu componente: WorkerRegModal */}
      {modals.workerRegister && (
        <WorkerRegModal 
          isOpen={modals.workerRegister} 
          onClose={() => toggleModal('workerRegister', false)} 
        />
      )}
      
      {modals.serviceRequest && (
        <ServiceRequestModal 
          isOpen={modals.serviceRequest} 
          category={selectedCategory} 
          onClose={() => toggleModal('serviceRequest', false)} 
        />
      )}
      
      {modals.constructionContact && (
        <ConstructionContactModal 
          isOpen={modals.constructionContact} 
          onClose={() => toggleModal('constructionContact', false)} 
        />
      )}
    </div>
  );
}