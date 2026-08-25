import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Clock, Building2, Stethoscope } from 'lucide-react';
import { DUMMY_DOCTORS } from '../data/doctors';

const SPECIALITIES = [
  { name: 'Cardiologist', icon: '🫀' },
  { name: 'Neurologist', icon: '🧠' },
  { name: 'Orthopedic', icon: '🦴' },
  { name: 'Pediatrician', icon: '👶' },
  { name: 'General Physician', icon: '🩺' },
  { name: 'Dermatologist', icon: '✨' }
];

const DoctorsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialityFilter, setSpecialityFilter] = useState('All');
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');

  const filteredDoctors = DUMMY_DOCTORS.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpeciality = specialityFilter === 'All' || doctor.speciality === specialityFilter;
    
    let matchesExperience = true;
    if (experienceFilter === '0-5 years') matchesExperience = doctor.experience <= 5;
    else if (experienceFilter === '5-10 years') matchesExperience = doctor.experience > 5 && doctor.experience <= 10;
    else if (experienceFilter === '10+ years') matchesExperience = doctor.experience > 10;

    const matchesAvailability = availabilityFilter === 'All' || doctor.availability === availabilityFilter;

    return matchesSearch && matchesSpeciality && matchesExperience && matchesAvailability;
  });

  return (
    <div className="pt-20 min-h-screen bg-slate-50 pb-16">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-emerald-50 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Find the Right Doctor
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse from 1000+ verified and experienced doctors. Filter by speciality, experience, and availability.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Top Specialities Quick Filter */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-3 snap-x scrollbar-hide">
          <button 
            onClick={() => setSpecialityFilter('All')}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all ${specialityFilter === 'All' ? 'bg-primary text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-sky-50'}`}
          >
            All Specialities
          </button>
          {SPECIALITIES.map((spec, i) => (
            <button 
              key={i}
              onClick={() => setSpecialityFilter(spec.name)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 snap-start ${specialityFilter === spec.name ? 'bg-primary text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-sky-50'}`}
            >
              <span>{spec.icon}</span>
              {spec.name}
            </button>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by doctor name or speciality..." 
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <select 
              className="px-4 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary text-slate-700 font-medium"
              value={specialityFilter}
              onChange={(e) => setSpecialityFilter(e.target.value)}
            >
              <option value="All">All Specialities</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Orthopedic">Orthopedic</option>
              <option value="General Physician">General Physician</option>
            </select>
            <select 
              className="px-4 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary text-slate-700 font-medium"
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
            >
              <option value="All">Any Experience</option>
              <option value="0-5 years">0-5 years</option>
              <option value="5-10 years">5-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
            <select 
              className="px-4 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary text-slate-700 font-medium"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="All">Any Availability</option>
              <option value="Available Today">Available Today</option>
              <option value="Available This Week">Available This Week</option>
            </select>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 group-hover:border-primary/20 transition-colors" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1 leading-tight">{doctor.name}</h3>
                    <span className="inline-block px-3 py-1 bg-sky-100 text-primary rounded-full text-xs font-bold tracking-wide mb-2">
                      {doctor.speciality}
                    </span>
                    <div className="flex items-center gap-1 text-slate-700 font-semibold text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {doctor.rating}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center text-slate-600 gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span>{doctor.hospital}</span>
                  </div>
                  <div className="flex items-center text-slate-600 gap-2 text-sm">
                    <Stethoscope className="w-4 h-4 text-slate-400" />
                    <span>{doctor.experience} years experience</span>
                  </div>
                  <div className="flex items-center text-slate-600 gap-2 text-sm">
                    <Clock className={`w-4 h-4 ${doctor.availability === 'Available Today' ? 'text-emerald-500' : doctor.availability === 'Busy' ? 'text-rose-500' : 'text-amber-500'}`} />
                    <span className={`font-medium ${doctor.availability === 'Available Today' ? 'text-emerald-600' : doctor.availability === 'Busy' ? 'text-rose-500' : 'text-amber-600'}`}>
                      {doctor.availability}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => navigate(`/doctors/${doctor.id}`)}
                    className="w-full py-2.5 rounded-xl bg-slate-50 text-slate-700 font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4 text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No doctors found</h3>
            <p className="text-slate-500">Try adjusting your filters to find who you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
