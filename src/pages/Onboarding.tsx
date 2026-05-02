import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';
import { handleFirestoreError } from '../lib/error-handler';
import { OperationType } from '../types';

export default function Onboarding() {
  const { user, userData, refreshUserData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form states
  const [patientData, setPatientData] = useState({
    bloodGroup: '',
    gender: '',
    age: '',
    address: ''
  });

  const [doctorData, setDoctorData] = useState({
    degree: '',
    address: ''
  });

  if (!user || !userData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (userData.role === 'patient') {
        await setDoc(doc(db, 'patients', user.uid), {
          ...patientData,
          age: parseInt(patientData.age)
        });
      } else {
        await setDoc(doc(db, 'doctors', user.uid), doctorData);
      }

      // Update user record to onboarded
      await updateDoc(doc(db, 'users', user.uid), {
        onboarded: true,
        updatedAt: serverTimestamp()
      });

      await refreshUserData();
      navigate('/dashboard');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${userData.role}s/${user.uid}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white md:bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white md:p-12 md:rounded-[3rem] md:shadow-2xl md:shadow-slate-200/50 space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Complete your profile</h1>
          <p className="text-slate-500">We need a few more details to set up your {userData.role} account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {userData.role === 'patient' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Blood Group</label>
                <select 
                  required
                  value={patientData.bloodGroup}
                  onChange={e => setPatientData(prev => ({ ...prev, bloodGroup: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                >
                  <option value="">Select</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Gender</label>
                <select 
                  required
                  value={patientData.gender}
                  onChange={e => setPatientData(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Age</label>
                <input 
                  type="number"
                  required
                  min="0"
                  max="150"
                  placeholder="25"
                  value={patientData.age}
                  onChange={e => setPatientData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Home Address</label>
                <textarea 
                  required
                  placeholder="123 Health St, Wellness City"
                  value={patientData.address}
                  onChange={e => setPatientData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none min-h-[100px]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Medical Degree / Specialization</label>
                <input 
                  type="text"
                  required
                  placeholder="MD, Cardiology"
                  value={doctorData.degree}
                  onChange={e => setDoctorData(prev => ({ ...prev, degree: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Clinic / Hospital Address</label>
                <textarea 
                  required
                  placeholder="Central Medical Complex, Block A2"
                  value={doctorData.address}
                  onChange={e => setDoctorData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none min-h-[120px]"
                />
              </div>
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-lg shadow-emerald-100"
          >
            {loading ? 'Saving Profile...' : 'Complete Registration'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
