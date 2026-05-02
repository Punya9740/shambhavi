import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { Stethoscope, User, ArrowLeft } from 'lucide-react';

export default function Login() {
  const { signIn } = useAuth();
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signIn(role);
      navigate('/onboarding');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
      >
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to MedVault</h1>
          <p className="text-slate-500">Select your account type to continue</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setRole('patient')}
            className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all gap-3 ${
              role === 'patient' 
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md shadow-emerald-100/50' 
                : 'border-slate-100 bg-slate-50 text-slate-400 grayscale hover:grayscale-0'
            }`}
          >
            <User className="w-8 h-8" />
            <span className="font-semibold text-sm">Patient</span>
          </button>

          <button 
            onClick={() => setRole('doctor')}
            className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all gap-3 ${
              role === 'doctor' 
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md shadow-emerald-100/50' 
                : 'border-slate-100 bg-slate-50 text-slate-400 grayscale hover:grayscale-0'
            }`}
          >
            <Stethoscope className="w-8 h-8" />
            <span className="font-semibold text-sm">Doctor</span>
          </button>
        </div>

        <div className="space-y-4 pt-4">
          <button 
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-medium hover:bg-slate-800 transition-colors shadow-lg"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 bg-white rounded-full p-0.5" />
            Continue with Google
          </button>
          
          <p className="text-center text-xs text-slate-400 px-6">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
