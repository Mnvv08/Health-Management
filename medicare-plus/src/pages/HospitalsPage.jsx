import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DUMMY_HOSPITALS } from '../data/hospitals';

const HospitalsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialityFilter, setSpecialityFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredHospitals = DUMMY_HOSPITALS.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          hospital.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpeciality = specialityFilter === 'All' || hospital.speciality === specialityFilter;
    
    let matchesRating = true;
    if (ratingFilter === '4★ & above') matchesRating = hospital.rating >= 4.0;
    else if (ratingFilter === '3★ & above') matchesRating = hospital.rating >= 3.0;

    return matchesSearch && matchesSpeciality && matchesRating;
  });

  return (
    <div className="pt-20 min-h-screen bg-slate-50 pb-16 animate-fade-in">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-emerald-50 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Hospitals Near You
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find the best hospitals in your area. Browse by speciality, rating, and location.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Search by hospital name or location..." 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-slate-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <select 
              className="px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-700 font-medium"
              value={specialityFilter}
              onChange={(e) => setSpecialityFilter(e.target.value)}
            >
              <option value="All">All Specialities</option>
              <option value="General">General</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Orthopedic">Orthopedic</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Emergency">Emergency</option>
            </select>
            <select 
              className="px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-700 font-medium"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="All">All Ratings</option>
              <option value="4★ & above">4★ & above</option>
              <option value="3★ & above">3★ & above</option>
            </select>
          </div>
        </div>

        {/* Hospital Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-[400px]">
                <div className="h-48 bg-slate-200 animate-pulse"></div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="h-6 bg-slate-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2"></div>
                  <div className="flex gap-3 mt-2">
                    <div className="h-6 bg-slate-200 rounded-full animate-pulse w-20"></div>
                    <div className="h-6 bg-slate-200 rounded animate-pulse w-24"></div>
                  </div>
                  <div className="mt-auto h-10 bg-slate-200 rounded-xl animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredHospitals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredHospitals.map(hospital => (
              <div key={hospital.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm font-bold text-slate-800 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {hospital.rating}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">{hospital.name}</h3>
                  </div>
                  
                  <div className="flex items-center text-slate-500 mb-4 gap-1.5 text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{hospital.location}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-sky-100 text-primary rounded-full text-xs font-semibold tracking-wide">
                      {hospital.speciality}
                    </span>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${hospital.isOpen ? 'text-emerald-600' : 'text-rose-500'}`}>
                      <Clock className="w-3.5 h-3.5" />
                      {hospital.isOpen ? 'Open Now' : 'Closed'}
                    </span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => navigate(`/hospitals/${hospital.id}`)}
                      className="w-full py-2.5 rounded-xl bg-slate-50 text-slate-700 font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4 text-slate-400">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No hospitals found</h3>
            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalsPage;
