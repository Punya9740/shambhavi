import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';
import { 
  LogOut, 
  User, 
  Calendar, 
  ClipboardList, 
  Bell, 
  Search,
  Activity,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { userData, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userData) return;
      const collection = userData.role === 'patient' ? 'patients' : 'doctors';
      const snap = await getDoc(doc(db, collection, userData.uid));
      if (snap.exists()) {
        setProfile(snap.data());
      }
      setLoading(false);
    };
    fetchProfile();
  }, [userData]);

  if (loading) return null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Mobile Top Nav */}
      <nav className="flex items-center justify-between p-4 bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="font-bold text-slate-800">MedVault</span>
        </div>
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-slate-400" />
          <button 
            onClick={() => navigate('/profile')}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden"
          >
            <User className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      </nav>

      <main className="flex-1 p-6 space-y-8 max-w-lg mx-auto w-full">
        {/* Welcome Card */}
        <section className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Hi, {userData?.name.split(' ')[0]}</h2>
          <p className="text-slate-500 text-sm">Welcome back to your {userData?.role} portal.</p>
        </section>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="bg-emerald-600 p-5 rounded-3xl text-white space-y-4 shadow-lg shadow-emerald-200"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              {userData?.role === 'patient' ? <Plus className="w-6 h-6" /> : <ClipboardList className="w-6 h-6" />}
            </div>
            <p className="font-semibold text-sm leading-tight">
              {userData?.role === 'patient' ? 'Book New Appointment' : 'View Patient Records'}
            </p>
          </motion.div>

          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="bg-white p-5 rounded-3xl border border-slate-100 space-y-4 shadow-sm"
          >
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
              <Calendar className="w-6 h-6" />
            </div>
            <p className="font-semibold text-sm leading-tight text-slate-800">
              Check Schedules
            </p>
          </motion.div>
        </div>

        {/* Info Card */}
        <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Your Summary</h3>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          
          <div className="space-y-3">
            {userData?.role === 'patient' ? (
              <>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-400 text-sm">Blood Group</span>
                  <span className="font-bold text-emerald-600">{profile?.bloodGroup}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-400 text-sm">Age</span>
                  <span className="font-semibold text-slate-700">{profile?.age} years</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-400 text-sm">Specialization</span>
                  <span className="font-bold text-emerald-600">{profile?.degree}</span>
                </div>
              </>
            )}
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-400 text-sm">Registered For</span>
              <span className="font-semibold text-slate-700">14 days</span>
            </div>
          </div>
        </section>

        {/* Quick Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input 
            type="text" 
            placeholder={userData?.role === 'patient' ? "Find a doctor..." : "Search patients..."}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm"
          />
        </div>
      </main>

      {/* Bottom Nav */}
      <div className="mt-auto bg-white border-t border-slate-100 px-8 py-4 flex justify-between items-center sticky bottom-0">
        <button className="text-emerald-600 flex flex-col items-center gap-1">
          <Activity className="w-6 h-6" />
          <span className="text-[10px] font-bold">Health</span>
        </button>
        <button className="text-slate-300 flex flex-col items-center gap-1">
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] font-medium">Events</span>
        </button>
        <button 
          onClick={logout}
          className="text-slate-300 flex flex-col items-center gap-1"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-[10px] font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
