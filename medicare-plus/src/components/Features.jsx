import React from 'react';
import { Building2, Stethoscope, CalendarCheck, PhoneCall } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'Find Nearby Hospitals',
      description: 'Locate top-rated hospitals near you instantly and get directions.',
      icon: <Building2 className="w-8 h-8 text-primary" />,
      bgColor: 'bg-sky-50'
    },
    {
      title: 'Top Doctors',
      description: 'Browse verified and experienced doctors across various specialties.',
      icon: <Stethoscope className="w-8 h-8 text-secondary" />,
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Book Appointments',
      description: 'Schedule your visits with ease and manage your bookings online.',
      icon: <CalendarCheck className="w-8 h-8 text-primary" />,
      bgColor: 'bg-sky-50'
    },
    {
      title: 'Emergency Help',
      description: 'Quick access to emergency contacts, ambulances, and urgent care.',
      icon: <PhoneCall className="w-8 h-8 text-secondary" />,
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Everything You Need, <span className="text-primary">In One Place</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We provide all the tools necessary to ensure you get the best medical care whenever and wherever you need it.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
