import React from 'react';
import { MessageSquare, Camera, Activity } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-slate-800 pb-12">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col space-y-4">
            <a href="#" className="text-2xl font-bold flex items-center gap-2 text-white">
              <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
              MediCare+
            </a>
            <p className="text-slate-400 max-w-xs leading-relaxed">
              Your trusted partner in health. Seamlessly connect with the best healthcare professionals around you.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:items-center">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3 flex flex-col">
              <li><a href="#" className="text-slate-400 hover:text-secondary transition-colors duration-200">Home</a></li>
              <li><a href="#" className="text-slate-400 hover:text-secondary transition-colors duration-200">Hospitals</a></li>
              <li><a href="#" className="text-slate-400 hover:text-secondary transition-colors duration-200">Doctors</a></li>
              <li><a href="#" className="text-slate-400 hover:text-secondary transition-colors duration-200">About</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col md:items-end">
            <h3 className="text-lg font-semibold mb-4 text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Activity className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
        
        {/* Copyright */}
        <div className="text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MediCare+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
