import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getLinkClass = (path, isEmergency = false) => {
    const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
    
    if (isEmergency) {
      return `block px-4 py-2 font-bold rounded-full transition-colors duration-200 ${
        isActive ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700'
      }`;
    }

    return `block px-4 py-2 font-medium transition-colors duration-200 ${
      isActive 
        ? 'text-primary border-b-2 border-primary' 
        : 'text-slate-600 hover:text-primary'
    }`;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hospitals', path: '/hospitals' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
              MediCare+
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className={getLinkClass(link.path)}>
                {link.name}
              </Link>
            ))}
            <Link to="/emergency" className={getLinkClass('/emergency', true)}>
              Emergency
            </Link>
          </div>

          <div className="hidden md:flex">
            <button className="bg-primary hover:bg-sky-600 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-sky-200">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 border-b border-slate-100 bg-white' : 'max-h-0'}`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg font-medium ${location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path)) ? 'bg-sky-50 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/emergency" 
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 rounded-lg font-bold ${location.pathname === '/emergency' ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-600 hover:bg-rose-100'}`}
          >
            Emergency
          </Link>
          <div className="pt-4">
            <button className="w-full bg-primary hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-medium transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
