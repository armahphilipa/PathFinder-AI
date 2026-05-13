/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Target, 
  Briefcase, 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Award, 
  Download, 
  Share2, 
  Loader2,
  GraduationCap,
  Clock,
  Flag,
  ChevronRight,
  Circle
} from 'lucide-react';
import { CareerRecommendation } from '../services/aiService';
import { 
  fetchScholarships, 
  matchScholarships, 
  Scholarship, 
  ScholarshipMatch 
} from '../services/scholarshipService';
import { 
  fetchInstitutions, 
  Institution 
} from '../services/institutionService';
import React, { useState, useEffect } from 'react';
import { Search, Filter, School } from 'lucide-react';
import DownloadModal from './DownloadModal';
import { exportToPdf } from '../lib/pdfExport';

interface CareerCardProps {
  career: CareerRecommendation;
  isUnlocked: boolean;
  onUnlock: () => void;
}

const CareerCard: React.FC<CareerCardProps> = ({ career, isUnlocked, onUnlock }) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (idx: number) => {
    const newSet = new Set(completedSteps);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setCompletedSteps(newSet);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'education': return <GraduationCap size={16} />;
      case 'skill': return <Sparkles size={16} />;
      case 'experience': return <Briefcase size={16} />;
      case 'milestone': return <Flag size={16} />;
      default: return <Circle size={16} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 20 }}
      className="bg-white rounded-[3rem] p-10 shadow-[0_30px_60px_-15px_rgba(7,25,30,0.08)] border border-gray-50 flex flex-col gap-8 group relative overflow-hidden"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-gray-50 text-gray-400 border border-gray-100">
              {career.pathwayType}
            </span>
            {career.futureProof && (
              <span className="bg-spring-green/10 text-onyx px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 border border-spring-green/20">
                <TrendingUp size={12} /> High Growth
              </span>
            )}
          </div>
          <h3 className="text-4xl font-bold text-onyx tracking-tighter leading-[1.1]">
            {career.title}
          </h3>
          <div className="text-[11px] font-bold text-gray-400 flex items-center gap-3 uppercase tracking-widest">
            <div className="w-8 h-8 rounded-full bg-onyx text-spring-green flex items-center justify-center">
              <Briefcase size={16} />
            </div>
            {career.sector}
          </div>
        </div>
        <div className="bg-onyx text-white p-6 rounded-[2rem] flex flex-col items-center justify-center min-w-[90px] shadow-2xl -rotate-6 group-hover:rotate-0 transition-all duration-500">
          <span className="text-[10px] font-bold text-spring-green tracking-widest mb-1">MATCH</span>
          <span className="text-3xl font-bold leading-none">{career.matchScore}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 py-8 border-y border-gray-100 bg-gray-50/30 -mx-10 px-10">
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Est. Reward</div>
          <div className="font-bold text-onyx text-2xl">GHS {career.salaryRange}</div>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confidence</div>
          <div className="font-bold text-onyx text-2xl">{career.confidenceScore}%</div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="text-sm text-gray-500 leading-relaxed font-medium pl-6 border-l-2 border-spring-green">
            {career.rationale}
          </div>
          <div className="bg-onyx/5 p-6 rounded-2xl border border-onyx/5">
            <p className="text-[13px] font-bold text-onyx mb-2 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={14} className="text-spring-green" /> Pro Tip
            </p>
            <p className="text-xs text-gray-500 leading-relaxed italic">{career.details}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] ml-2">
            {isUnlocked ? 'Detailed Implementation Guide' : 'Growth Roadmap'}
          </label>
          <div className="space-y-5">
            {(!isUnlocked ? career.roadmapPreview.slice(0, 3) : career.fullRoadmapSteps).map((step: any, sIdx: number) => {
              const isFullStep = typeof step === 'object';
              const stepTitle = isFullStep ? step.title : step;
              const isCompleted = completedSteps.has(sIdx);

              return (
                <div 
                  key={sIdx} 
                  onClick={() => toggleStep(sIdx)}
                  className={`flex items-start gap-5 group/step cursor-pointer p-4 rounded-2xl transition-all ${
                    isCompleted ? 'bg-spring-green/5 opacity-60' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-[11px] transition-all shadow-sm ${
                    isCompleted 
                      ? 'bg-spring-green text-onyx scale-90' 
                      : 'bg-onyx text-white group-hover/step:bg-spring-green group-hover/step:text-onyx group-hover/step:scale-110'
                  }`}>
                    {isCompleted ? <CheckCircle2 size={16} strokeWidth={3} /> : (isFullStep ? getIcon(step.type) : sIdx + 1)}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between gap-2 max-w-full">
                      <span className={`text-[15px] font-bold leading-snug transition-all ${
                        isCompleted ? 'text-onyx/40 line-through' : 'text-onyx/80'
                      }`}>
                        {stepTitle}
                      </span>
                      {isFullStep && (
                        <div className="flex items-center gap-1.5 shrink-0 bg-onyx/5 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase text-onyx/40">
                          <Clock size={10} /> {step.estimatedTime}
                        </div>
                      )}
                    </div>
                    {isFullStep && (
                      <p className={`mt-2 text-xs leading-relaxed transition-all ${
                        isCompleted ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-6">
        {isUnlocked ? (
          <div className="bg-spring-green/5 border border-spring-green/20 rounded-[2rem] p-6 text-center space-y-3">
            <div className="flex justify-center text-spring-green">
              <CheckCircle2 size={32} />
            </div>
            <p className="text-sm font-bold text-onyx">Full Roadmap Unlocked</p>
            <p className="text-xs text-gray-400 font-medium">Click steps to track your progress as you complete your goals.</p>
          </div>
        ) : (
          <button 
            onClick={onUnlock}
            className="btn-primary w-full py-6 text-sm flex items-center justify-center gap-3"
          >
            Unlock Full Access <ArrowRight size={20} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

interface ResultsViewProps {
  recommendations: CareerRecommendation[];
  profile: any;
  onReset: () => void;
}

export default function ResultsView({ recommendations, profile, onReset }: ResultsViewProps) {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [matches, setMatches] = useState<ScholarshipMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAllScholarships, setShowAllScholarships] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  
  // Institution states
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    async function getScholarshipMatches() {
      setLoading(true);
      try {
        const [allScholarships, allInstitutions] = await Promise.all([
          fetchScholarships(),
          fetchInstitutions()
        ]);
        
        setScholarships(allScholarships);
        setInstitutions(allInstitutions);
        setFilteredInstitutions(allInstitutions);
        
        const careerTitles = recommendations.map(r => r.title);
        const matchedResults = await matchScholarships(profile, careerTitles, allScholarships);
        setMatches(matchedResults.filter(m => m.matchScore > 30));
      } catch (error) {
        console.error("Failed to match data:", error);
      } finally {
        setLoading(false);
      }
    }
    getScholarshipMatches();
  }, [profile, recommendations]);

  useEffect(() => {
    const filtered = institutions.filter(inst => {
      const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inst.programmes.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesRegion = filterRegion === 'All' || inst.region === filterRegion;
      const matchesType = filterType === 'All' || inst.type === filterType;
      return matchesSearch && matchesRegion && matchesType;
    });
    setFilteredInstitutions(filtered);
  }, [searchTerm, filterRegion, filterType, institutions]);

  const regions = ['All', 'Greater Accra', 'Ashanti', 'Northern', 'Volta', 'Western', 'Eastern', 'Central'];
  const types = ['All', 'University', 'TVET / Polytechnic', 'TVET / Vocational'];

  const handleShare = () => {
    const topCareer = recommendations[0]?.title || "my career path";
    const appUrl = window.location.origin;
    const text = `I just mapped my future with PathFinder AI! My top career match is ${topCareer}. Check out your professional map here: ${appUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const [unlockedPaths, setUnlockedPaths] = useState<string[]>([]);
  const toggleUnlock = (id: string) => {
    if (!unlockedPaths.includes(id)) {
      setUnlockedPaths([...unlockedPaths, id]);
    }
  };

  const handleDownloadConfirm = async (options: {
    includeRecommendations: boolean;
    includeScholarships: boolean;
    includeInstitutions: boolean;
  }) => {
    // To support selective export, we can add temp classes to hide sections
    if (!options.includeRecommendations) document.getElementById('career-recommendations')?.classList.add('hidden-for-export');
    if (!options.includeScholarships) document.getElementById('scholarship-section')?.classList.add('hidden-for-export');
    if (!options.includeInstitutions) document.getElementById('institution-section')?.classList.add('hidden-for-export');
    
    // Hide fixed elements during export
    document.querySelector('.fixed')?.classList.add('hidden-for-export');

    try {
      await exportToPdf('results-container', {
        includeRecommendations: options.includeRecommendations,
        includeScholarships: options.includeScholarships,
        includeInstitutions: options.includeInstitutions,
        userName: profile.name
      });
    } finally {
      // Clean up
      document.querySelectorAll('.hidden-for-export').forEach(el => el.classList.remove('hidden-for-export'));
    }
  };

  const handleDownload = () => {
    setIsDownloadModalOpen(true);
  };

  const matchedScholarships = matches.map(match => {
    const schol = scholarships.find(s => s.id === match.scholarshipId);
    return schol ? { ...schol, ...match } : null;
  }).filter(Boolean);

  return (
    <div id="results-container" className="min-h-screen bg-modern-bg modern-grid pb-32 pt-24">
      {/* Hero Header */}
      <div className="modern-gradient text-white px-6 py-20 rounded-b-[4rem] relative overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 p-12 opacity-5 rotate-12 scale-150">
          <Sparkles size={400} strokeWidth={0.5} />
        </div>
        <div className="max-w-md mx-auto relative z-10 space-y-8">
          <div className="inline-flex items-center gap-3 bg-spring-green text-onyx px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-[0_8px_20px_rgba(2,245,161,0.3)]">
            <Sparkles size={14} strokeWidth={3} /> Career GPS Active
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold leading-[0.9] tracking-tighter">
              Akwaaba, <br/> <span className="text-spring-green">{profile.name.split(' ')[0]}</span>
            </h1>
            <p className="text-white/60 font-medium text-lg leading-relaxed max-w-[90%]">
              We've identified 3 professional paths tailored for your success in {profile.region}.
            </p>
          </div>
        </div>
      </div>

      <main className="px-6 -mt-10">
        <div className="max-w-md mx-auto space-y-8">
          <div id="career-recommendations" className="space-y-8">
            {recommendations.map((career) => {
              const careerId = career.id || career.title;
              const isUnlocked = unlockedPaths.includes(careerId);
              return (
                <CareerCard 
                  key={careerId}
                  career={career}
                  isUnlocked={isUnlocked}
                  onUnlock={() => toggleUnlock(careerId)}
                />
              );
            })}
          </div>

          {/* Call to Action - Adinkra Gye Nyame Symbol could be hinted here */}
          <motion.div 
            id="scholarship-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-onyx text-white rounded-[3rem] p-12 text-center space-y-8 shadow-[0_40px_80px_-15px_rgba(7,25,30,0.3)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none modern-grid" />
            <div className="w-24 h-24 bg-spring-green text-onyx rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-12 group-hover:rotate-0 transition-all">
              <Award size={48} strokeWidth={1} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold tracking-tight leading-none text-spring-green">
                {loading ? 'Finding Grants...' : `${matchedScholarships.length} Scholarships Found`}
              </h3>
              <p className="text-base text-white/50 font-medium leading-relaxed">
                {loading 
                  ? 'Consulting Ghana\'s funding ontology for your profile...'
                  : `We've identified grants in ${profile.region} that match your profile.`
                }
              </p>
            </div>
            {!showAllScholarships && (
              <button 
                onClick={() => setShowAllScholarships(matchedScholarships.length > 0)}
                disabled={loading || matchedScholarships.length === 0}
                className="btn-accent w-full py-6 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'View My Matches'} <Sparkles size={20} className="ml-2" />
              </button>
            )}
          </motion.div>

          {showAllScholarships && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-6"
            >
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.4em] text-center">Your Curated Funding</h4>
              {matchedScholarships.map((schol: any, sIdx) => (
                <motion.div
                  key={schol.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sIdx * 0.1 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50 space-y-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-spring-green uppercase tracking-widest">{schol.provider}</span>
                      <h5 className="text-2xl font-bold text-onyx leading-tight">{schol.title}</h5>
                    </div>
                    <div className="bg-spring-green/10 text-onyx px-4 py-2 rounded-2xl font-bold text-xs">
                      {schol.matchScore}% Match
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 py-4 border-y border-gray-50">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-gray-300 uppercase">Value</div>
                      <div className="font-bold text-sm text-onyx">{schol.value}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-gray-300 uppercase">Deadline</div>
                      <div className="font-bold text-sm text-onyx">{new Date(schol.deadline).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 italic font-medium">
                    "{schol.reason}"
                  </div>

                  <button className="w-full btn-secondary py-4 text-sm">
                    View Requirements
                  </button>
                </motion.div>
              ))}
              <button 
                onClick={() => setShowAllScholarships(false)}
                className="w-full text-[10px] font-bold text-gray-400 uppercase tracking-widest py-4"
              >
                Hide Matches
              </button>
            </motion.div>
          )}

          {/* Educational Institutions Section */}
          <motion.div
            id="institution-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8 pt-12"
          >
            <div className="space-y-2 text-center">
              <h3 className="text-4xl font-bold text-onyx tracking-tighter">Educational Partners</h3>
              <p className="text-gray-400 font-medium">Find where to study your recommended paths.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-gray-50 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="text" 
                  placeholder="Search program or institution..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-16 pr-6 text-sm font-medium focus:ring-2 focus:ring-spring-green/50 transition-all outline-none"
                />
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <Filter size={14} className="text-gray-400 shrink-0" />
                  {regions.map(r => (
                    <button
                      key={r}
                      onClick={() => setFilterRegion(r)}
                      className={`px-4 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest shrink-0 transition-all ${
                        filterRegion === r ? 'bg-onyx text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <School size={14} className="text-gray-400 shrink-0" />
                  {types.map(t => (
                    <button
                      key={t}
                      onClick={() => setFilterType(t)}
                      className={`px-4 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest shrink-0 transition-all ${
                        filterType === t ? 'bg-onyx text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredInstitutions.slice(0, 5).map((inst, iIdx) => (
                <motion.div
                  key={inst.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: iIdx * 0.05 }}
                  className="bg-white p-5 rounded-[2rem] shadow-md border border-gray-50 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                       <h5 className="font-bold text-onyx">{inst.name}</h5>
                       {inst.isVerified && <CheckCircle2 size={14} className="text-spring-green" />}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <MapPin size={12} /> {inst.region}
                      <span className="w-1 h-1 bg-gray-200 rounded-full" />
                      {inst.type}
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Connecting to ${inst.name} Admissions Portal...`)}
                    className="p-3 bg-gray-50 rounded-xl text-onyx hover:bg-onyx hover:text-white transition-all"
                  >
                    <ArrowRight size={18} />
                  </button>
                </motion.div>
              ))}
              {filteredInstitutions.length === 0 && (
                <div className="text-center py-12 text-gray-300 font-bold uppercase text-[10px] tracking-widest bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-100">
                  No partners found matching filters
                </div>
              )}
            </div>
          </motion.div>

          <button 
            onClick={onReset}
            className="w-full py-12 text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em] hover:text-onyx transition-all"
          >
            Reset GPS Assessment
          </button>
        </div>
      </main>

      {/* Floating Action Menu */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-onyx/90 backdrop-blur-3xl border border-white/5 p-2 rounded-full shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)] z-50">
        <button 
          onClick={handleDownload}
          className="p-5 bg-white/5 rounded-full hover:bg-white/10 transition-all text-white active:scale-90"
        >
          <Download size={24} strokeWidth={1.5} />
        </button>
        <div className="h-10 w-[1px] bg-white/10 mx-2" />
        <button 
          onClick={handleShare}
          className="flex items-center gap-4 px-10 py-5 bg-spring-green text-onyx rounded-full font-bold shadow-lg hover:shadow-spring-green/40 hover:-translate-y-1 active:scale-95 transition-all"
        >
          <Share2 size={24} strokeWidth={2.5} /> <span className="uppercase text-[11px] tracking-[0.2em] pt-0.5">Secure Share</span>
        </button>
      </div>
      
      <DownloadModal 
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onConfirm={handleDownloadConfirm}
        userName={profile.name}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .hidden-for-export {
          display: none !important;
        }
      `}} />
    </div>
  );
}
