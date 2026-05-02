import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Activity, Users, HeartPulse } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="px-6 py-12 md:py-24 max-w-4xl mx-auto w-full text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100"
        >
          <Shield className="w-3 h-3" />
          <span>Secure Health Data Management</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-slate-900"
        >
          Your health,<br />
          <span className="text-emerald-600">securely stored.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 max-w-xl mx-auto"
        >
          MedVault bridges the gap between patients and doctors with a mobile-first platform designed for efficiency and absolute privacy.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button 
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
          >
            Get Started
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-medium hover:bg-slate-50 transition-colors shadow-sm">
            Learn More
          </button>
        </motion.div>
      </header>

      {/* Feature Grid */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-row-4 lg:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Real-time Tracking</h3>
            <p className="text-slate-500">Monitor your vital signs and health metrics with instant updates and beautiful visualizations.</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Doctor Connectivity</h3>
            <p className="text-slate-500">Securely share your medical history with verified healthcare professionals in one tap.</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Blood Bank Sync</h3>
            <p className="text-slate-500">Emergency access to your blood group and medical needs when every second counts.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 px-6 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm">© 2026 MedVault. All rights reserved.</p>
      </footer>
    </div>
  );
}
