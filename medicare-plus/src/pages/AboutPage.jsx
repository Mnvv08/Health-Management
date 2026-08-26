import React, { useState } from 'react';
import { CheckCircle2, Search, HandHeart, CalendarCheck, Briefcase, MessageSquare, Mail, Phone, CheckCircle } from 'lucide-react';

const TEAM = [
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    bio: "Passionate about creating intuitive healthcare experiences.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    name: "Rahul Verma",
    role: "Lead Developer",
    bio: "Building robust systems to connect patients and doctors.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    name: "Dr. Ananya Rao",
    role: "Medical Advisor",
    bio: "Ensuring our platform meets the highest clinical standards.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300"
  }
];

const AboutPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50 pb-16 animate-fade-in">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-emerald-50 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            About MediCare+
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We are on a mission to make quality healthcare accessible, transparent, and seamless for everyone.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-24">
        
        {/* Our Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <div className="relative w-full max-w-md h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl flex items-center justify-center p-8">
              <HandHeart className="w-40 h-40 text-primary opacity-80" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              At MediCare+, we believe finding the right medical care shouldn't be stressful. Our platform bridges the gap between patients and healthcare providers, ensuring you get the care you need, when you need it most.
            </p>
            <ul className="space-y-4">
              {[
                "Connect patients with the right doctors instantly",
                "Make hospital discovery simple and fast",
                "Provide emergency help when it matters most"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">How MediCare+ Works</h2>
            <p className="text-slate-600">Three simple steps to better health</p>
          </div>
          
          <div className="flex flex-col md:flex-row relative justify-between gap-8 md:gap-0">
            {/* Desktop Dotted Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-200"></div>

            <div className="relative flex flex-col items-center text-center flex-1 z-10">
              <div className="w-24 h-24 rounded-full bg-sky-50 flex items-center justify-center mb-6 shadow-sm border border-sky-100">
                <Search className="w-10 h-10 text-primary" />
              </div>
              <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Step 1</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Search</h3>
              <p className="text-slate-600 max-w-xs">Find top-rated hospitals or specialist doctors near you based on your needs.</p>
            </div>

            <div className="relative flex flex-col items-center text-center flex-1 z-10">
              <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                <HandHeart className="w-10 h-10 text-secondary" />
              </div>
              <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Step 2</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Choose</h3>
              <p className="text-slate-600 max-w-xs">Compare facilities, read patient reviews, and pick the best option for you.</p>
            </div>

            <div className="relative flex flex-col items-center text-center flex-1 z-10">
              <div className="w-24 h-24 rounded-full bg-sky-50 flex items-center justify-center mb-6 shadow-sm border border-sky-100">
                <CalendarCheck className="w-10 h-10 text-primary" />
              </div>
              <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Step 3</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Book</h3>
              <p className="text-slate-600 max-w-xs">Confirm your appointment instantly and get ready for your visit.</p>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Meet the Team</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">The dedicated people working behind the scenes to make healthcare simple.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl text-center shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-4 border-slate-50" />
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-slate-600 text-sm mb-6">{member.bio}</p>
                <div className="flex items-center justify-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#0A66C2] hover:text-white transition-colors">
                    <Briefcase className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#1DA1F2] hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold mb-4">Get In Touch</h2>
              <p className="text-slate-400 mb-8 max-w-md">
                Have a question, feedback, or need support? Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Email Us</p>
                    <p className="font-bold">support@medicareplus.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Call Us (Toll Free)</p>
                    <p className="font-bold">1-800-MEDICARE</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 text-slate-900 shadow-xl">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thanks! 🎉</h3>
                  <p className="text-slate-600">We've received your message and will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Your Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-slate-50" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-slate-50" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Message</label>
                    <textarea required rows="4" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-slate-50 resize-none" placeholder="How can we help you?"></textarea>
                  </div>
                  <button type="submit" className="w-full py-3 bg-secondary hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-0.5">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
