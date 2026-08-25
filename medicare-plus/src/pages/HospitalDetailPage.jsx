import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Clock, Phone, Activity, Cross, Users } from 'lucide-react';
import { DUMMY_HOSPITALS } from '../data/hospitals';

const DUMMY_DOCTORS = [
  { id: 1, name: "Dr. Sarah Jenkins", speciality: "Cardiologist", exp: "15 years", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 2, name: "Dr. Michael Chen", speciality: "Neurologist", exp: "10 years", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 3, name: "Dr. Emily Ramirez", speciality: "Pediatrician", exp: "8 years", img: "https://images.unsplash.com/photo-1594824432258-2904b50c058c?auto=format&fit=crop&q=80&w=300&h=300" }
];

const DUMMY_REVIEWS = [
  { id: 1, name: "John Doe", rating: 5, date: "August 12, 2026", text: "Excellent care and very clean facilities. The doctors are highly professional." },
  { id: 2, name: "Mary Smith", rating: 4, date: "July 28, 2026", text: "Good experience overall, though the wait time was a bit long in the emergency room." },
  { id: 3, name: "James Wilson", rating: 5, date: "June 15, 2026", text: "Top-notch medical equipment and a very friendly nursing staff. Highly recommend." }
];

const HospitalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const hospital = DUMMY_HOSPITALS.find(h => h.id === parseInt(id));

  if (!hospital) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Hospital not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] md:h-[50vh] w-full">
        <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/hospitals')}
          className="absolute top-24 left-4 md:left-8 flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hospitals
        </button>

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-6 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col items-start gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${hospital.isOpen ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
              <Clock className="w-4 h-4" />
              {hospital.isOpen ? 'Open Now' : 'Closed'}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {hospital.name}
            </h1>
            <div className="flex items-center text-slate-200 gap-2 text-lg">
              <MapPin className="w-5 h-5" />
              <span>{hospital.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* About Section */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About the Hospital</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {hospital.name} is a premier healthcare facility dedicated to providing state-of-the-art medical services. 
              Equipped with modern technology and staffed by renowned specialists, we ensure the highest standard of patient care. 
              Our commitment is to your health, safety, and well-being.
            </p>
          </section>

          {/* Specialities */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Specialities</h2>
            <div className="flex flex-wrap gap-3">
              {[hospital.speciality, 'Neurology', 'Orthopedics', 'Dermatology'].map((spec, i) => (
                <span key={i} className="px-4 py-2 bg-sky-100 text-primary rounded-full font-semibold">
                  {spec}
                </span>
              ))}
            </div>
          </section>

          {/* Facilities */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Facilities Available</h2>
            <div className="flex flex-wrap gap-4">
              {['ICU', 'Ambulance', 'Pharmacy', 'Lab', 'Emergency 24/7'].map((facility, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-100 shadow-sm rounded-xl text-slate-700 font-medium">
                  <Activity className="w-5 h-5 text-secondary" />
                  {facility}
                </div>
              ))}
            </div>
          </section>

          {/* Doctors Section */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Doctors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {DUMMY_DOCTORS.map(doc => (
                <div key={doc.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                  <img src={doc.img} alt={doc.name} className="w-20 h-20 rounded-full object-cover mb-4 mx-auto border-2 border-primary/20" />
                  <h3 className="font-bold text-slate-900 text-center mb-1">{doc.name}</h3>
                  <p className="text-primary text-sm font-semibold text-center mb-1">{doc.speciality}</p>
                  <p className="text-slate-500 text-sm text-center mb-4">{doc.exp} experience</p>
                  <button className="w-full py-2 bg-slate-50 text-slate-700 hover:bg-primary hover:text-white rounded-xl font-medium transition-colors">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">What Patients Say</h2>
            <div className="space-y-6">
              {DUMMY_REVIEWS.map(review => (
                <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-slate-900">{review.name}</h4>
                      <p className="text-slate-400 text-sm">{review.date}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600">{review.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Sticky Card */}
        <div>
          <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col gap-6">
            
            <div className="flex justify-between items-center pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold text-slate-900">{hospital.rating}</span>
                </div>
                <span className="text-slate-500 text-sm">Based on 1,284 reviews</span>
              </div>
            </div>

            <div className="space-y-4 text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p>{hospital.location}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="font-medium">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Mon - Sat: 8:00 AM - 8:00 PM</p>
                  <p className="text-emerald-600 font-medium text-sm mt-1">Emergency: 24/7</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <button className="w-full py-3.5 bg-secondary hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-0.5">
                Book Appointment
              </button>
              <button className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Emergency Contact
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailPage;
