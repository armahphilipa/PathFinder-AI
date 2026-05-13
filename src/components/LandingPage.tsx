/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Menu, 
  Sparkles,
  BookOpen,
  TrendingUp,
  MapPin,
  CircleDollarSign,
  ClipboardList,
  Languages,
  CheckCircle2,
  Quote,
  LayoutGrid,
  Clock
} from 'lucide-react';
import { CompassLogo } from './Icons';

interface LandingPageProps {
  onStart: () => void;
  profile?: any;
}

export default function LandingPage({ onStart, profile }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-onyx selection:bg-spring-green/30 selection:text-onyx uppercase-none tracking-normal">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-spring-green/10 text-onyx/80 rounded-full text-xs font-bold border border-spring-green/20"
          >
            AI-Powered Career Guidance for Ghana
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-[1.05]"
          >
            Your Career GPS for <br/> a <span className="text-[#02F5A1]">Brighter Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-semibold"
          >
            Whether you dream of becoming a Software Engineer or a Master Craftsman, PathFinder AI shows you exactly how to get there with personalized roadmaps, real salary data, and scholarship matching.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={onStart}
              className="w-full sm:w-auto bg-[#07191E] text-white font-bold py-5 px-12 rounded-2xl flex items-center justify-center gap-2 hover:bg-onyx/90 transition-all shadow-xl active:scale-95 text-base"
            >
              {profile ? 'Resume Journey' : 'Start Your Journey'} <ArrowRight size={20} />
            </button>
            <button className="w-full sm:w-auto bg-white text-onyx font-bold py-5 px-12 rounded-2xl border border-gray-100 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95 text-base shadow-sm">
              Explore Pathways
            </button>
          </motion.div>

          {/* Path Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-8 space-y-4"
          >
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-5 py-2.5 bg-white border border-gray-100 rounded-full text-[13px] font-bold flex items-center gap-2 shadow-sm">
                <BookOpen size={16} className="text-[#02F5A1]" /> Academic Paths
              </span>
              <span className="px-5 py-2.5 bg-white border border-gray-100 rounded-full text-[13px] font-bold flex items-center gap-2 shadow-sm">
                <ToolIcon size={16} className="text-orange-400" /> Vocational Paths
              </span>
            </div>
            <div className="inline-block px-6 py-2 bg-[#FDF2D9] text-[#B48B1E] rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm italic">
              Both Equally Valued
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 max-w-4xl mx-auto border-t border-gray-50 mt-12"
          >
            {[
              { val: "500+", label: "Career Paths" },
              { val: "50+", label: "Institutions" },
              { val: "GHS 5M+", label: "In Scholarships" },
              { val: "16", label: "Regions Covered" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-4xl font-display font-black text-onyx tracking-tighter">{stat.val}</div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50/30 px-6">
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none">
              Everything You Need to <br className="hidden md:block" /> Find Your Path
            </h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
              PathFinder AI combines cutting-edge technology with deep understanding of Ghana's education system and job market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BrainIcon, title: "AI-Powered Matching", desc: "Our intelligent algorithm analyzes your grades, interests, and location to recommend careers with the highest success potential for you." },
              { icon: MapPin, title: "Region-Specific Insights", desc: "Get career recommendations tailored to your region's job market. Whether you're in Accra or Tamale, we show opportunities near you." },
              { icon: CircleDollarSign, title: "Real Salary Data", desc: "No more guessing. See actual salary ranges in Ghana Cedis for every career path, so you can make informed decisions." },
              { icon: ClipboardList, title: "Step-by-Step Roadmaps", desc: "From where you are to where you want to be. Get a clear action plan with training options, timelines, and costs." },
              { icon: Languages, title: "Local Language Support", desc: "Access PathFinder AI in English, Twi, Hausa, or Ewe. Your career guidance in your mother tongue." },
              { icon: TrendingUp, title: "Future-Proof Careers", desc: "We highlight careers with 15%+ growth projection in Ghana, helping you invest in skills that will be in demand." }
            ].map((feat, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-onyx mb-8 shadow-sm">
                  <feat.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-[#02F5A1] transition-colors">{feat.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-semibold">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Paths Comparison */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="text-center space-y-8">
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none">Two Paths, Equal <br/> Opportunities</h2>
            <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Whether you choose university or vocational training, PathFinder AI helps you build a successful career. Both paths lead to dignity and prosperity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Academic Column */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100/50 shadow-xl space-y-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-spring-green/10 text-spring-green rounded-2xl flex items-center justify-center animate-pulse-slow">
                  <BookOpen size={30} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-onyx">Academic Pathways</h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Univ degrees & certifications</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: "Software Developer", sal: "GHS 3,500 - 12,000/month", growth: "+25%" },
                  { title: "Medical Doctor", sal: "GHS 5,000 - 20,000/month", growth: "+12%" },
                  { title: "Data Analyst", sal: "GHS 3,000 - 9,000/month", growth: "+22%" },
                  { title: "Civil Engineer", sal: "GHS 3,500 - 12,000/month", growth: "+15%" }
                ].map((job, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-50 group hover:bg-white hover:shadow-lg hover:border-spring-green/30 transition-all cursor-default">
                    <div>
                      <div className="font-bold text-onyx text-base">{job.title}</div>
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mt-0.5">{job.sal}</div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-spring-green/10 text-spring-green rounded-full text-[10px] font-black shadow-inner">
                      <TrendingUp size={12} /> {job.growth}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vocational Column */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100/50 shadow-xl space-y-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-orange-400/10 text-orange-400 rounded-2xl flex items-center justify-center">
                  <ToolIcon size={30} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-onyx">Vocational Pathways</h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">TVET & apprenticeships</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Solar Technician", sal: "GHS 2,500 - 6,000/month", growth: "+35%" },
                  { title: "Fashion Designer", sal: "GHS 1,500 - 8,000/month", growth: "+18%" },
                  { title: "Electrician", sal: "GHS 2,000 - 5,000/month", growth: "+16%" },
                  { title: "Agricultural Technician", sal: "GHS 1,500 - 4,000/month", growth: "+20%" }
                ].map((job, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-50 group hover:bg-white hover:shadow-lg hover:border-orange-400/30 transition-all cursor-default">
                    <div>
                      <div className="font-bold text-onyx text-base">{job.title}</div>
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mt-0.5">{job.sal}</div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-400/10 text-orange-400 rounded-full text-[10px] font-black shadow-inner">
                      <TrendingUp size={12} /> {job.growth}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <p className="text-gray-400 mb-8 font-semibold tracking-tight">Explore 500+ career paths across all sectors of Ghana's economy</p>
            <button onClick={onStart} className="text-onyx font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 mx-auto hover:text-spring-green transition-all group">
              Discover your perfect match <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Stories of Success */}
      <section className="py-32 px-6 bg-gray-50/40">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none">Stories of Success</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
              Real Ghanaian students who found their path with PathFinder AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "I was torn between Computer Science and Accounting. PathFinder AI showed me the tech sector growth in Ghana and connected me with a STEM scholarship. Now I'm studying what I love!",
                author: "Ama Mensah",
                role: "SHS Graduate, now Software Engineering Student",
                location: "Kumasi",
                initials: "AM"
              },
              {
                quote: "Everyone told me vocational training was a dead end. PathFinder AI showed me Solar Technicians earn GHS 4,000+ monthly in the Western Region. I completed my certification and now I'm earning more than many graduates!",
                author: "Kofi Asante",
                role: "Solar Technician",
                location: "Takoradi",
                initials: "KA"
              },
              {
                quote: "Being from the North, I thought good careers were only in Accra. PathFinder AI showed me agri-tech opportunities right here and found me the Agricultural Youth Development Fund to pay for my training.",
                author: "Fatima Ibrahim",
                role: "Agribusiness Student",
                location: "Tamale",
                initials: "FI"
              }
            ].map((story, i) => (
              <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-50 flex flex-col gap-10 relative overflow-hidden group">
                <Quote className="absolute top-10 right-10 text-spring-green/5 group-hover:text-spring-green/10 transition-colors" size={120} strokeWidth={1} />
                <p className="text-gray-600 leading-relaxed font-bold text-base relative z-10 italic">
                  "{story.quote}"
                </p>
                <div className="flex items-center gap-5 mt-auto relative z-10">
                  <div className="w-14 h-14 bg-spring-green text-onyx rounded-2xl flex items-center justify-center font-black text-lg shadow-lg">
                    {story.initials}
                  </div>
                  <div>
                    <div className="font-bold text-onyx text-base">{story.author}</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight mt-0.5">{story.role}</div>
                    <div className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-0.5">{story.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 pb-48">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#07191E] rounded-[3.5rem] p-12 md:p-24 text-center text-white space-y-12 shadow-2xl relative overflow-hidden">
            {/* Subtle Gradient Glow matching the brand color */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#02F5A1]/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-[1.1]">Ready to Discover <br /> Your Path?</h2>
              <p className="text-lg md:text-xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
                Join thousands of Ghanaian students who are building their futures with data-driven career guidance. It only takes 10 minutes.
              </p>
            </div>

            <div className="space-y-10 relative z-10">
              <button 
                onClick={onStart}
                className="bg-[#EFBF04] text-[#07191E] font-medium md:font-bold md:py-6 md:px-16 rounded-[2rem] text-lg md:text-2xl flex items-center justify-center gap-6 mx-auto hover:bg-[#FCD116] transition-all transform hover:scale-105 active:scale-95 shadow-xl"
              >
                Start Free Assessment <ArrowRight size={32} strokeWidth={2} />
              </button>
              
              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                  <div className="flex items-center gap-2.5 text-white/80 text-sm font-bold">
                    <CheckCircle2 size={20} className="text-[#02F5A1]" /> 100% Free
                  </div>
                  <div className="flex items-center gap-2.5 text-white/80 text-sm font-bold">
                    <Clock size={20} className="text-[#02F5A1]" /> 10 Minutes
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-white/80 text-sm font-bold">
                  <CheckCircle2 size={20} className="text-[#02F5A1]" /> No Sign-up Required to Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#07191E] border-t border-white/5 pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full modern-grid opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
            <div className="space-y-8 lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#02F5A1] border border-white/10">
                  <CompassLogo size={22} />
                </div>
                <span className="text-2xl font-display font-black tracking-tighter text-white">PathFinder AI</span>
              </div>
              <p className="text-base text-white/40 font-semibold leading-relaxed max-w-sm">
                Career GPS for Young Ghanaians. Empowering the next generation with data-driven career guidance.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-3 gap-12">
              <div className="space-y-8">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-spring-green">Pathways</h4>
                <ul className="space-y-5 text-sm text-white/40 font-bold">
                  <li><a href="#" className="hover:text-white transition-colors">Academic Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Vocational Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Institutions</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Scholarships</a></li>
                </ul>
              </div>
              <div className="space-y-8">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-spring-green">Resources</h4>
                <ul className="space-y-5 text-sm text-white/40 font-bold">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Career Tips</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div className="space-y-8">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-spring-green">Languages</h4>
                <ul className="space-y-5 text-sm text-white/40 font-bold">
                  <li><a href="#" className="hover:text-white transition-colors">English</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Twi</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Hausa</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Ewe</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">© 2026 PathFinder AI. All rights reserved.</p>
            <div className="flex gap-10 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ToolIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="m14.7 6.08 1.13 1.13-2.12 2.12 2.12 2.12 2.12-2.12 1.13 1.13c.39.39.39 1.02 0 1.41l-4.24 4.24a1 1 0 0 1-1.41 0L9.19 11.89a1 1 0 0 1 0-1.41l4.24-4.24c.39-.39 1.02-.39 1.41 0Z" />
      <path d="m5.47 21 3.53-3.53" />
      <path d="M5.8 15.6 4.22 17.18a2.12 2.12 0 0 0 0 3l.1.1a2.12 2.12 0 0 0 3 0L8.9 18.7" />
    </svg>
  );
}

function BrainIcon({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M9.5 2a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5Z" />
      <path d="M14.5 2a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5Z" />
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" />
    </svg>
  );
}

