import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with soft gradient and SVG pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-emerald-50 -z-10"></div>
      
      {/* Decorative SVG pattern */}
      <div className="absolute inset-0 opacity-[0.03] -z-10" 
           style={{ backgroundImage: 'radial-gradient(#10b981 2px, transparent 2px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-4xl mx-auto mt-12 md:mt-0">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-secondary font-semibold text-sm mb-6 animate-pulse">
            Modern Healthcare For You
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
            Your Health, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Our Priority
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover a seamless way to manage your well-being. Find top-rated hospitals and specialist doctors near you, instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/hospitals')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary hover:bg-sky-600 text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-sky-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              Find Hospitals Nearby
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 hover:text-primary font-semibold border border-slate-200 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Find a Doctor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
