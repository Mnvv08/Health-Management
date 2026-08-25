import React, { useState } from 'react';
import { Phone, MapPin, AlertTriangle, Copy, ChevronDown, CheckCircle2, ChevronUp } from 'lucide-react';

const NEAREST_HOSPITALS = [
  {
    id: 1,
    name: "City Central Emergency Unit",
    location: "Downtown, New York",
    distance: "1.2 km away",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 5,
    name: "Emergency Care Unit",
    location: "Downtown, New York",
    distance: "2.5 km away",
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 7,
    name: "Metro Trauma Center",
    location: "Midtown, New York",
    distance: "3.8 km away",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600&h=400"
  }
];

const FIRST_AID_TIPS = [
  {
    id: 1,
    title: "🫀 Heart Attack",
    steps: [
      "Have the person sit down, rest, and try to keep calm.",
      "Loosen any tight clothing.",
      "Ask if they take any chest pain medicine, such as nitroglycerin.",
      "If the pain does not go away promptly with rest or within 3 minutes of taking nitroglycerin, call emergency medical help."
    ]
  },
  {
    id: 2,
    title: "🩸 Heavy Bleeding",
    steps: [
      "Remove any obvious dirt or debris from the wound. Don't remove large or deeply embedded objects.",
      "Apply direct pressure on the wound with a sterile bandage, clean cloth, or even a piece of clothing.",
      "Maintain pressure by binding the wound tightly with a bandage or piece of clean cloth and adhesive tape.",
      "Immobilize the injured body part once the bleeding has stopped. Leave the bandages in place."
    ]
  },
  {
    id: 3,
    title: "🦴 Fracture",
    steps: [
      "Stop any bleeding by applying pressure to the wound with a sterile bandage or clean cloth.",
      "Immobilize the injured area. Don't try to realign the bone or push a bone that's sticking out back in.",
      "Apply ice packs to limit swelling and help relieve pain. Don't apply ice directly to the skin.",
      "Treat for shock. If the person feels faint or is breathing in short, rapid breaths, lay them down with their head slightly lower than their trunk and elevate their legs."
    ]
  },
  {
    id: 4,
    title: "😮 Choking",
    steps: [
      "Give 5 back blows. Stand to the side and just behind a choking adult. For a child, kneel down behind. Place one arm across the person's chest for support. Bend the person over at the waist so that the upper body is parallel with the ground. Deliver five separate back blows between the person's shoulder blades with the heel of your hand.",
      "Give 5 abdominal thrusts (Heimlich maneuver). Perform five abdominal thrusts (also known as the Heimlich maneuver).",
      "Alternate between 5 blows and 5 thrusts until the blockage is dislodged."
    ]
  }
];

const EMERGENCY_CONTACTS = [
  { name: "National Emergency", number: "112" },
  { name: "Ambulance", number: "108" },
  { name: "Women Helpline", number: "1091" },
  { name: "Child Helpline", number: "1098" },
  { name: "Poison Control", number: "1800-116-117" }
];

const EmergencyPage = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [copiedNumber, setCopiedNumber] = useState(null);

  const toggleAccordion = (id) => {
    if (expandedAccordion === id) {
      setExpandedAccordion(null);
    } else {
      setExpandedAccordion(id);
    }
  };

  const handleCopy = (number) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50 pb-16">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-rose-50 via-white to-red-50 py-12 border-b border-rose-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4 text-red-600 animate-pulse">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight flex items-center justify-center gap-3">
            🚨 Emergency Help
          </h1>
          <p className="text-lg text-rose-700 font-medium max-w-2xl mx-auto">
            Quick access to emergency services near you. In case of immediate life-threatening situations, dial the national emergency number.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* SOS Quick Action Section */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-8 md:p-12">
            
            <div className="flex flex-col items-center justify-center mb-12">
              <div className="relative flex items-center justify-center group cursor-pointer" onClick={() => window.location.href = "tel:112"}>
                {/* Ping Animation Layer */}
                <div className="absolute w-40 h-40 md:w-56 md:h-56 bg-red-400 rounded-full animate-ping opacity-75"></div>
                
                {/* Inner Static Pulse Layer */}
                <div className="absolute w-48 h-48 md:w-64 md:h-64 bg-red-100 rounded-full animate-pulse"></div>
                
                {/* Main SOS Button */}
                <button className="relative w-32 h-32 md:w-44 md:h-44 bg-gradient-to-br from-red-500 to-rose-600 rounded-full text-white font-black text-4xl md:text-6xl shadow-2xl shadow-red-300 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 border-4 border-white">
                  SOS
                </button>
              </div>
              <p className="mt-8 text-xl font-bold text-slate-800">Tap to Call Emergency Services</p>
              <p className="text-rose-600 font-bold text-2xl mt-1">112</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Ambulance', num: '108', icon: '🚑', color: 'from-orange-400 to-red-500' },
                { name: 'Fire Brigade', num: '101', icon: '🚒', color: 'from-orange-500 to-orange-600' },
                { name: 'Police', num: '100', icon: '🚓', color: 'from-blue-500 to-indigo-600' }
              ].map((service, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl shadow-md text-white`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{service.name}</h3>
                      <p className="text-2xl font-extrabold text-slate-700">{service.num}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.location.href = `tel:${service.num}`}
                    className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-colors shadow-sm"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearest Emergency Hospitals */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-rose-500" />
            Nearest Emergency Hospitals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEAREST_HOSPITALS.map(hospital => (
              <div key={hospital.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-rose-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-rose-500 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md font-bold text-white text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    24/7 Emergency
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">{hospital.name}</h3>
                  <div className="flex items-center text-slate-600 mb-1 gap-1.5 text-sm font-medium">
                    <MapPin className="w-4 h-4 flex-shrink-0 text-slate-400" />
                    <span>{hospital.location}</span>
                  </div>
                  <div className="text-rose-600 font-bold text-sm mb-6 pl-5.5">
                    {hospital.distance}
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-3">
                    <button 
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + ' ' + hospital.location)}`, '_blank')}
                      className="w-full py-3 rounded-xl bg-slate-50 text-slate-700 font-bold hover:bg-slate-200 transition-colors duration-200"
                    >
                      Get Directions
                    </button>
                    <button 
                      onClick={() => window.location.href = `tel:5550000000`}
                      className="w-full py-3 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 font-bold hover:bg-rose-500 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call Hospital
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info Sections - Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* First Aid Tips */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">🚑</span>
              Quick First Aid Guide
            </h2>
            <div className="space-y-3">
              {FIRST_AID_TIPS.map((tip) => (
                <div key={tip.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => toggleAccordion(tip.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                  >
                    <span className="font-bold text-lg text-slate-900">{tip.title}</span>
                    {expandedAccordion === tip.id ? (
                      <ChevronUp className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out ${expandedAccordion === tip.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                  >
                    <div className="p-6 pt-0 bg-slate-50 border-t border-slate-100">
                      <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        {tip.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Emergency Contacts Table */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6 text-rose-500" />
              Important Emergency Contacts
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <tbody>
                  {EMERGENCY_CONTACTS.map((contact, idx) => (
                    <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{contact.name}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-extrabold text-rose-600 text-lg mr-4">{contact.number}</span>
                        <div className="inline-flex relative">
                          <button 
                            onClick={() => handleCopy(contact.number)}
                            className="p-2 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                            aria-label="Copy to clipboard"
                          >
                            {copiedNumber === contact.number ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                          </button>
                          {/* Copy Tooltip */}
                          {copiedNumber === contact.number && (
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded">
                              Copied!
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

export default EmergencyPage;
