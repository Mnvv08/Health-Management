import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-20 px-4 text-center animate-fade-in">
      <div className="w-24 h-24 bg-sky-100 text-primary rounded-full flex items-center justify-center mb-8 mx-auto shadow-sm">
        <Stethoscope className="w-12 h-12" />
      </div>
      <h1 className="text-6xl font-black text-slate-900 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-slate-800 mb-4">Oops! Page not found 😅</h2>
      <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button 
        onClick={() => navigate('/')}
        className="px-8 py-4 bg-primary hover:bg-sky-600 text-white font-bold rounded-full shadow-lg shadow-sky-200 transition-all transform hover:-translate-y-1"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;
