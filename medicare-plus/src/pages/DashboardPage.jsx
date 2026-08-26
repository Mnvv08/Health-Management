import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyAppointments, cancelAppointment } from '../api/appointmentService';
import { User, Droplets, Calendar, Clock, MapPin, Building2, Stethoscope, Search, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getMyAppointments();
        setAppointments(data.appointments || []);
      } catch (err) {
        setError('Failed to load your appointments.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await cancelAppointment(id);
        // Refresh list
        const data = await getMyAppointments();
        setAppointments(data.appointments || []);
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to cancel appointment');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (!user) return null; // Handled by ProtectedRoute

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Profile Card & Quick Actions */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          
          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-sky-100 to-emerald-50"></div>
            
            <div className="relative z-10 w-28 h-28 rounded-full bg-white p-1 shadow-lg mb-4 mt-8">
              <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden">
                {user.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12" />
                )}
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 relative z-10">{user.name}</h2>
            <p className="text-slate-500 mb-6 relative z-10">{user.email}</p>
            
            <div className="w-full grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center border border-slate-100">
                <Droplets className="w-6 h-6 text-rose-500 mb-2" />
                <span className="text-sm text-slate-500">Blood Group</span>
                <span className="font-bold text-slate-900">{user.bloodGroup || 'Not set'}</span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center border border-slate-100">
                <User className="w-6 h-6 text-sky-500 mb-2" />
                <span className="text-sm text-slate-500">Age / Gender</span>
                <span className="font-bold text-slate-900">{user.age ? `${user.age}Y` : '-'} / {user.gender ? user.gender.charAt(0) : '-'}</span>
              </div>
            </div>
            
            <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <button onClick={() => navigate('/doctors')} className="w-full flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-primary/50 hover:bg-sky-50 transition-all text-left">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-primary">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Find a Doctor</p>
                  <p className="text-sm text-slate-500">Book a new appointment</p>
                </div>
              </button>
              <button onClick={() => navigate('/hospitals')} className="w-full flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-secondary/50 hover:bg-emerald-50 transition-all text-left">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-secondary">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Find a Hospital</p>
                  <p className="text-sm text-slate-500">Browse nearby facilities</p>
                </div>
              </button>
              <button onClick={() => navigate('/emergency')} className="w-full flex items-center gap-3 p-4 rounded-xl border border-rose-100 hover:border-rose-300 hover:bg-rose-50 transition-all text-left">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-rose-700">Emergency Help</p>
                  <p className="text-sm text-rose-500">Call ambulance instantly</p>
                </div>
              </button>
            </div>
          </div>
          
        </div>

        {/* Right Column: Appointments List */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-full">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                My Appointments
              </h2>
              <button onClick={() => navigate('/doctors')} className="text-primary font-bold hover:text-sky-600 transition-colors">
                Book New
              </button>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-slate-100 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12 text-rose-500 font-medium">
                {error}
              </div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <Calendar className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No appointments yet</h3>
                <p className="text-slate-500 mb-6">You haven't booked any medical consultations.</p>
                <button onClick={() => navigate('/doctors')} className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-sky-200 hover:-translate-y-0.5 transition-transform">
                  Find a Doctor
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map(app => (
                  <div key={app._id} className="p-6 border border-slate-100 rounded-2xl flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                    
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                        {app.doctor.photo ? (
                          <img src={app.doctor.photo} alt={app.doctor.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Stethoscope className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{app.doctor.name}</h4>
                        <p className="text-primary text-sm font-semibold mb-2">{app.doctor.speciality}</p>
                        <div className="flex flex-col gap-1 text-slate-600 text-sm">
                          <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {app.hospital?.name}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {app.hospital?.location?.address || 'Location Details'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 gap-4">
                      <div className="text-left md:text-right">
                        <div className="flex items-center md:justify-end gap-1.5 text-slate-900 font-bold mb-1">
                          <Calendar className="w-4 h-4 text-primary" />
                          {new Date(app.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center md:justify-end gap-1.5 text-slate-600 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          {app.timeSlot}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                        
                        {(app.status === 'confirmed' || app.status === 'pending') && (
                          <button 
                            onClick={() => handleCancel(app._id)}
                            className="ml-auto px-3 py-1 text-rose-500 hover:bg-rose-50 rounded-lg text-sm font-bold transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
