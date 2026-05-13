/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import ResultsView from './components/ResultsView';
import { generateCareerMatches, CareerRecommendation } from './services/aiService';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Sparkles, AlertCircle, LogIn, LogOut, User as UserIcon, Compass } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { auth, signInWithGoogle, db, OperationType, handleFirestoreError } from './lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { CompassLogo } from './components/Icons';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const [view, setView] = useState<'landing' | 'onboarding' | 'loading' | 'results'>('landing');
  const [profile, setProfile] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load existing profile if user logs in
  useEffect(() => {
    async function loadProfile() {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data());
            // If they already have a profile, we could skip onboarding but let's keep it simple for now
          }
        } catch (err) {
          console.error("Error loading profile", err);
        }
      }
    }
    loadProfile();
  }, [user]);

  const handleOnboardingComplete = async (data: any) => {
    setProfile(data);
    setView('loading');
    setError(null);
    
    try {
      const results = await generateCareerMatches(data);
      if (results.length === 0) {
        throw new Error("No career paths could be determined.");
      }
      
      // Save to Firebase if logged in
      if (user) {
        const path = `users/${user.uid}`;
        try {
          await setDoc(doc(db, 'users', user.uid), {
            ...data,
            uid: user.uid,
            updatedAt: serverTimestamp(),
            createdAt: profile?.createdAt || serverTimestamp()
          }, { merge: true });
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, path);
        }
      }

      setRecommendations(results);
      setView('results');
    } catch (err) {
      console.error(err);
      setError("AI Engine is busy. Please try again.");
      setView('onboarding');
    }
  };

  const reset = () => {
    setView('onboarding');
    setProfile(null);
    setRecommendations([]);
    setError(null);
  };

  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error("Sign in error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError("Sign-in cancelled. Please keep the popup open.");
      } else if (err.message?.includes('INTERNAL ASSERTION FAILED')) {
        setError("Auth system error. Please refresh the page and try again.");
      } else {
        setError("Sign-in failed. Please try again.");
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-modern-bg relative">
      {/* Global Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex justify-between items-center bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-onyx text-spring-green rounded-xl flex items-center justify-center shadow-2xl">
            <CompassLogo size={22} />
          </div>
          <span className="text-xl font-display font-black tracking-tighter text-onyx hidden sm:block">PathFinder AI</span>
        </div>
        
        <div className="flex items-center gap-4">
          {!user ? (
            <button 
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="flex items-center gap-3 bg-white px-6 py-2.5 rounded-full border border-gray-100 shadow-sm text-[11px] font-bold text-onyx uppercase tracking-[0.2em] hover:border-onyx transition-all group disabled:opacity-50"
            >
              <LogIn size={16} className={`text-gray-400 group-hover:text-onyx transition-colors ${isSigningIn ? 'animate-pulse' : ''}`} /> 
              {isSigningIn ? 'Connecting...' : 'Log In'}
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-xl px-4 py-2 rounded-full border border-white shadow-lg">
              <div className="w-8 h-8 rounded-full bg-onyx text-spring-green flex items-center justify-center text-[11px] font-bold shadow-inner uppercase">
                {user.displayName?.[0] || <UserIcon size={14} />}
              </div>
              <button 
                onClick={() => auth.signOut()}
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-onyx transition-all"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[150] w-full max-w-xs bg-white border-l-4 border-red-500 p-4 rounded-xl flex gap-3 items-center shadow-2xl"
          >
            <AlertCircle size={20} className="text-red-500 shrink-0" />
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-wider text-onyx/40 mb-0.5">Notification</p>
              <p className="text-sm font-bold text-onyx leading-tight">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-onyx/20 hover:text-onyx transition-colors">
              <Loader2 size={16} className="rotate-45" />
            </button>
          </motion.div>
        )}

        {view === 'landing' && (
          <motion.div
            key="landing-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingPage onStart={() => setView('onboarding')} profile={profile} />
          </motion.div>
        )}

        {view === 'onboarding' && (
          <motion.div
            key="onboarding-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Onboarding onComplete={handleOnboardingComplete} initialProfile={profile} />
          </motion.div>
        )}

        {view === 'loading' && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-8 bg-modern-bg modern-grid overscroll-none"
          >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="w-56 h-56 rounded-full border-2 border-dashed border-onyx/5 shrink-0"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative group">
                    {/* Glowing effect */}
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-spring-green/30 rounded-[2.5rem] blur-[30px]" 
                    />
                    
                    <div className="w-28 h-28 bg-onyx rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(7,25,30,0.4)] flex items-center justify-center relative overflow-hidden ring-1 ring-white/10">
                      <div className="absolute inset-0 modern-grid opacity-10" />
                      
                      <motion.div
                        animate={{ 
                          rotate: [-10, 10, -10]
                        }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="text-spring-green relative z-10"
                      >
                        <CompassLogo size={48} />
                      </motion.div>

                      {/* Moving light sweep */}
                      <motion.div 
                        animate={{ x: [-100, 200] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center space-y-8 max-w-sm">
                <div className="space-y-3">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 text-onyx/40 font-black uppercase tracking-[0.4em] text-[10px]"
                  >
                    <Sparkles size={14} className="text-spring-green" /> PathFinder Engine Active
                  </motion.div>
                  <h2 className="text-4xl font-display font-black text-onyx leading-tight tracking-tight italic">
                    Mapping Your <br /> Future Path
                  </h2>
                </div>

                <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-[280px] mx-auto">
                  PathFinder AI is synthesizing coordinate points for your <span className="text-onyx font-bold italic">{profile?.educationLevel}</span> roadmap.
                </p>

                {/* Progress Tracking */}
                <div className="space-y-4 pt-4">
                  <div className="h-1.5 w-full bg-onyx/5 rounded-full overflow-hidden max-w-[240px] mx-auto relative group">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6, ease: "easeInOut" }}
                      className="h-full bg-spring-green shadow-[0_0_15px_#02f5a1]"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {[
                      "Analyzing Skills Profile",
                      "Locating High-Yield Careers",
                      "Calibrating Academic Nodes",
                      "Finalizing Your Roadmap"
                    ].map((text, i) => (
                      <motion.div
                        key={text}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: [0, 1, 1, 0.2], x: 0 }}
                        transition={{ 
                          delay: i * 1.5,
                          duration: 1.5,
                          times: [0, 0.2, 0.8, 1]
                        }}
                        className="text-[10px] font-black text-onyx/50 uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-spring-green" /> {text}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'results' && (
          <motion.div
            key="results-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultsView 
              recommendations={recommendations} 
              profile={profile} 
              onReset={reset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
