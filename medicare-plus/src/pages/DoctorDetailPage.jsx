import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Clock, Phone, Calendar, MessageCircle, CheckCircle2 } from 'lucide-react';
import { DUMMY_DOCTORS } from '../data/doctors';

const timeSlots = [
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '12:00 PM', available: true },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: false },
  { time: '04:00 PM', available: true },
];

const next7Days = Array.from({ length: 7 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return {
    dateStr: d.toISOString().split('T')[0],
    display: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  };
});

const DUMMY_REVIEWS = [
  { id: 1, name: "Alice Brown", rating: 5, date: "August 20, 2026", text: "Dr. Jenkins is amazing. Very thorough and kind during the consultation." },
  { id: 2, name: "Tom Clark", rating: 5, date: "July 12, 2026", text: "Highly recommend. Explained everything clearly and didn't rush the appointment." },
  { id: 3, name: "Sarah Williams", rating: 4, date: "June 30, 2026", text: "Great doctor, but I had to wait about 20 minutes past my appointment time." }
];

const DoctorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = DUMMY_DOCTORS.find(d => d.id === parseInt(id));

  const [selectedDate, setSelectedDate] = useState(next7Days[0].dateStr);
  const [selectedTime, setSelectedTime] = useState('');
  const [showToast, setShowToast] = useState(false);

  if (!doctor) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Doctor not found</h2>
      </div>
    );
  }

  const handleBookAppointment = () => {
    if (!selectedTime) return;
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-20 animate-fade-in">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 md:right-8 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <CheckCircle2 className="w-6 h-6" />
          <div>
            <p className="font-bold">Appointment Confirmed!</p>
            <p className="text-sm text-emerald-50">Dr. {doctor.name.replace('Dr. ', '')} on {selectedDate} at {selectedTime}</p>
          </div>
        </div>
      )}

      {/* Profile Hero Section */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-emerald-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
          
          <button 
            onClick={() => navigate('/doctors')}
            className="absolute top-4 left-4 md:left-8 flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-medium bg-white/50 px-4 py-2 rounded-full border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Doctors
          </button>

          <div className="mt-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left w-full md:w-auto">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-primary/10" 
              />
              <div className="mt-2 md:mt-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
                  {doctor.name}
                </h1>
                <p className="text-lg text-primary font-bold mb-3">{doctor.speciality} • <span className="text-slate-600 font-medium">{doctor.hospital}</span></p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start items-center">
                  <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    {doctor.rating} <span className="text-yellow-600/80 font-medium ml-1">(124 Reviews)</span>
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold border border-slate-200">
                    {doctor.experience} Years Experience
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 border ${doctor.availability === 'Available Today' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
                    <Clock className="w-4 h-4" />
                    {doctor.availability}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto md:min-w-[250px] bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-center md:text-right mb-2">
                <p className="text-slate-500 text-sm font-medium mb-1">Consultation Fee</p>
                <p className="text-3xl font-extrabold text-slate-900">₹500</p>
              </div>
              <button 
                onClick={() => {
                  document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 bg-secondary hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md shadow-emerald-200 transition-all transform hover:-translate-y-0.5 flex justify-center items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>
              <button className="w-full py-3 bg-white hover:bg-slate-50 text-primary border-2 border-primary font-bold rounded-xl transition-all flex justify-center items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Chat with Doctor
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Details & Booking */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* About Section */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About the Doctor</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {doctor.name} is a highly respected {doctor.speciality.toLowerCase()} with over {doctor.experience} years of clinical experience. Known for a patient-centric approach, they specialize in complex diagnostics and innovative treatment plans, ensuring the highest level of care for every individual.
            </p>
          </section>

          {/* Qualifications & More */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Education & Qualifications</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="font-bold text-slate-700">MBBS</p>
                    <p className="text-slate-500 text-sm">AIIMS, New Delhi</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="font-bold text-slate-700">MD - {doctor.speciality}</p>
                    <p className="text-slate-500 text-sm">Johns Hopkins University</p>
                  </div>
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Languages Spoken</h2>
              <div className="flex flex-wrap gap-2">
                {['English', 'Hindi', 'Kannada'].map(lang => (
                  <span key={lang} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-full font-medium shadow-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Awards & Recognitions</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-600">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span>Best {doctor.speciality} Award - Medical Association (2023)</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span>Excellence in Patient Care (2021)</span>
              </li>
            </ul>
          </section>

          <hr className="border-slate-200" />

          {/* Appointment Booking UI */}
          <section id="booking-section" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Book an Appointment
            </h2>
            
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Step 1 — Select Date</h3>
              <div className="flex overflow-x-auto gap-3 pb-2 snap-x scrollbar-hide">
                {next7Days.map((dateObj) => (
                  <button
                    key={dateObj.dateStr}
                    onClick={() => setSelectedDate(dateObj.dateStr)}
                    className={`flex-shrink-0 px-6 py-4 rounded-xl font-bold transition-all border snap-start ${
                      selectedDate === dateObj.dateStr 
                        ? 'bg-primary text-white border-primary shadow-md transform -translate-y-0.5' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50 hover:bg-sky-50'
                    }`}
                  >
                    {dateObj.display}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Step 2 — Select Time Slot</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`py-3 px-4 rounded-xl font-bold transition-all border ${
                      !slot.available 
                        ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed opacity-70 line-through' 
                        : selectedTime === slot.time 
                          ? 'bg-secondary text-white border-secondary shadow-md transform -translate-y-0.5' 
                          : 'bg-white text-slate-700 border-slate-200 hover:border-secondary hover:bg-emerald-50'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Step 3 — Confirm</h3>
              <button
                disabled={!selectedTime}
                onClick={handleBookAppointment}
                className={`w-full py-4 rounded-xl font-extrabold text-lg transition-all ${
                  selectedTime 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200 transform hover:-translate-y-1' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {selectedTime ? 'Confirm Appointment' : 'Select a Time Slot'}
              </button>
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
            
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Practice Location</h3>

            <div className="space-y-5 text-slate-700">
              <div>
                <p className="font-bold text-slate-900 mb-1">{doctor.hospital}</p>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">123 Health Avenue, Medical District, New York, NY 10001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Working Hours</p>
                  <p className="text-sm">Mon - Sat: 10:00 AM - 6:00 PM</p>
                  <p className="text-sm">Sun: Closed</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Reception</p>
                  <p className="font-bold text-slate-900">+1 (555) 987-6543</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;
