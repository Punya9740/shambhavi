import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Award, User, LogOut } from 'lucide-react';

export default function Profile() {
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
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-xl mx-auto bg-white min-h-screen shadow-2xl shadow-slate-200/20 flex flex-col">
        {/* Header */}
        <div className="p-6 flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Profile Info</h1>
        </div>

        {/* Hero */}
        <div className="p-8 text-center space-y-4">
          <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] mx-auto flex items-center justify-center text-emerald-600 border-2 border-emerald-100">
            <User className="w-12 h-12" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{userData?.name}</h2>
            <p className="text-emerald-600 font-medium capitalize flex items-center justify-center gap-1">
              <Award className="w-4 h-4" />
              {userData?.role} Account
            </p>
          </div>
        </div>

        {/* Info List */}
        <div className="flex-1 p-6 space-y-6">
          <div className="space-y-4">
             <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="font-medium text-slate-700">{userData?.email}</p>
                </div>
             </div>

             <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Address</p>
                  <p className="font-medium text-slate-700 leading-snug">{profile?.address}</p>
                </div>
             </div>

             {userData?.role === 'patient' && (
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center space-y-0.5">
                      <p className="text-xs font-bold text-emerald-700 uppercase">Blood Group</p>
                      <p className="text-2xl font-black text-emerald-800">{profile?.bloodGroup}</p>
                   </div>
                   <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center space-y-0.5">
                      <p className="text-xs font-bold text-blue-700 uppercase">Age</p>
                      <p className="text-2xl font-black text-blue-800">{profile?.age}</p>
                   </div>
                </div>
             )}

             {userData?.role === 'doctor' && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-0.5">
                   <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Credentials</p>
                   <p className="font-bold text-emerald-900 text-lg">{profile?.degree}</p>
                </div>
             )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={logout}
            className="w-full py-4 flex items-center justify-center gap-2 bg-rose-50 text-rose-600 rounded-2xl font-bold hover:bg-rose-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
