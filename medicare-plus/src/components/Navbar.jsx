import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
              MediCare+
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium">Home</Link>
            <Link to="/hospitals" className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium">Hospitals</Link>
            <Link to="/doctors" className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium">Doctors</Link>
            <Link to="/about" className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium">About</Link>
          </div>
          <div className="hidden md:flex">
            <button className="bg-primary hover:bg-sky-600 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-sky-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
