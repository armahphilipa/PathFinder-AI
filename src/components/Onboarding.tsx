/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  GraduationCap, 
  Heart, 
  Target, 
  Languages,
  CheckCircle2,
  Phone,
  ArrowRight,
  BrainCircuit,
  Lightbulb
} from 'lucide-react';
import { CompassLogo } from './Icons';

type Step = 'language' | 'profile' | 'academic' | 'aptitude' | 'interests' | 'goals';

export default function Onboarding({ onComplete, initialProfile }: { onComplete: (data: any) => void, initialProfile?: any }) {
  const steps: Step[] = ['language', 'profile', 'academic', 'aptitude', 'interests', 'goals'];

  const [formData, setFormData] = useState({
    language: initialProfile?.language || '',
    name: initialProfile?.name || '',
    age: initialProfile?.age || '',
    region: initialProfile?.region || '',
    educationLevel: initialProfile?.educationLevel || '',
    grades: initialProfile?.grades || {} as Record<string, string>,
    aptitudeAnswers: initialProfile?.aptitudeAnswers || {} as Record<number, number>,
    interests: initialProfile?.interests || [] as string[],
    pathwayType: initialProfile?.pathwayType || '',
    incomeTarget: initialProfile?.incomeTarget || '',
    financialNeed: initialProfile?.financialNeed || false,
    phone: initialProfile?.phone || ''
  });

  const isStepComplete = (s: Step, data: typeof formData) => {
    switch (s) {
      case 'language': return !!data.language;
      case 'profile': return !!(data.name && data.age && data.region && data.educationLevel);
      case 'academic': return Object.keys(data.grades).length >= 4;
      case 'aptitude': return Object.keys(data.aptitudeAnswers).length >= 21; // fixed count from aptitudeQuestions
      case 'interests': return data.interests.length >= 3;
      case 'goals': return !!(data.pathwayType && data.incomeTarget && data.phone);
      default: return false;
    }
  };

  const getInitialStep = () => {
    if (!initialProfile) return 'language';
    const firstIncomplete = steps.find(s => !isStepComplete(s, formData));
    return firstIncomplete || 'language';
  };

  const [step, setStep] = useState<Step>(getInitialStep());
  const currentStepIndex = steps.indexOf(step);

  const aptitudeQuestions = [
    {
      id: 1,
      type: 'mcq',
      text: "I'm working on a research project for class. I'm most confident about...",
      options: [
        "Bringing in data to support my thesis",
        "Understanding complex jargon in the research",
        "Getting all work done days before the deadline",
        "Tying work to a real-life issue",
        "Making sure work hits all rubric goals",
        "Using technology to make the presentation engaging"
      ]
    },
    {
      id: 2,
      type: 'mcq',
      text: "I work best when...",
      options: [
        "I feel my work has a bigger impact",
        "I find patterns or trends from information",
        "I use technology to get things done",
        "I can plan and organize my work",
        "I feel I'm doing something right or moral",
        "I have to analyze from numbers"
      ]
    },
    {
      id: 3,
      type: 'mcq',
      text: "Friends come to me for advice when they need help with...",
      options: [
        "Fixing technology or computers",
        "Choosing what new items to buy",
        "Practical and logical advice",
        "Editing an essay or reviewing a project",
        "Staying up to date on the news",
        "Their career and life goals"
      ]
    },
    {
      id: 4,
      type: 'mcq',
      text: "When speaking or presenting to a group, I feel...",
      options: [
        "Comfortable with data and analysis",
        "Nervous but ensure facts are right",
        "Neutral if I have the right technology",
        "Comfortable and confident",
        "Confident if well-prepared",
        "Willing to do it for a good cause"
      ]
    },
    {
      id: 5,
      type: 'mcq',
      text: "During a group project, I'm taking on the role of...",
      options: [
        "The analyst (charts and numbers)",
        "The researcher (details and sources)",
        "The tech person (slides and tools)",
        "The problem-solver (societal relevance)",
        "The organizer (assigning roles)",
        "The strategist (overall look and feel)"
      ]
    },
    {
      id: 6,
      type: 'mcq',
      text: "To reason with my parents for extra time out, I would...",
      options: [
        "Show them it's more cost-effective",
        "Explain that friendship is vital for the community",
        "Show them I've scheduled my homework first",
        "Demo a new app to track where I am",
        "Compare spending time with hours of TV/Phone",
        "Explain it's essential for my well-being"
      ]
    },
    {
      id: 7,
      type: 'mcq',
      text: "Before I started my current path, my teachers thought I should study...",
      options: [
        "Political Science",
        "Law",
        "Math",
        "Computer Science",
        "Business",
        "Economics"
      ]
    },
    {
      id: 8,
      type: 'mcq',
      text: "I would describe myself as...",
      options: [
        "Analytical and detail-oriented",
        "Organized and motivated",
        "Diplomatic and helpful",
        "Innovative and tech-savvy",
        "Persuasive and logical",
        "Curious and methodical"
      ]
    },
    {
      id: 9,
      type: 'mcq',
      text: "When I experience a challenge or problem, I solve it by...",
      options: [
        "Considering the larger impact first",
        "Looking for technology to help",
        "Analyzing exactly what's going wrong",
        "Changing my plans to adapt",
        "Adjusting strategy based on feedback",
        "Doing extensive research on details"
      ]
    },
    {
      id: 10,
      type: 'mcq',
      text: "The assignments I'm best at include...",
      options: [
        "Charts and graphs",
        "Tight deadlines and group work",
        "Numbers and equations",
        "Technical components",
        "Social relevance and history",
        "Thorough articles"
      ]
    },
    {
      id: 11,
      type: 'mcq',
      text: "If I have an hour to kill, I'm going to spend it by...",
      options: [
        "Catching up on the news",
        "Making an infographic",
        "Playing logic puzzles or sudoku",
        "Learning about a new topic",
        "Reading a biography",
        "Checking off my to-do list"
      ]
    },
    {
      id: 12,
      type: 'likert',
      text: "I express myself best through writing, art, or music."
    },
    {
      id: 13,
      type: 'likert',
      text: "When making a decision, I let my heart guide me more than my thoughts."
    },
    {
      id: 14,
      type: 'likert',
      text: "I'm more comfortable working with words than I am with numbers."
    },
    {
      id: 15,
      type: 'likert',
      text: "I am open to changing my plans when new opportunities arise."
    },
    {
      id: 16,
      type: 'likert',
      text: "I prefer open-ended questions that require creative thinking."
    },
    {
      id: 17,
      type: 'likert',
      text: "I daydream often and let my thoughts wander."
    },
    {
      id: 18,
      type: 'likert',
      text: "I see the big picture before focusing on the small details."
    },
    {
      id: 19,
      type: 'likert',
      text: "I can easily envision potential future scenarios or possibilities."
    },
    {
      id: 20,
      type: 'likert',
      text: "I prefer working alone versus working collaboratively."
    },
    {
      id: 21,
      type: 'likert',
      text: "I am more motivated by the process of learning than by reaching a specific goal."
    }
  ];

  const likertOptions = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setStep(steps[currentStepIndex + 1]);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1]);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const regions = [
    'Greater Accra', 'Ashanti', 'Western', 'Northern', 'Eastern', 
    'Central', 'Bono', 'Bono East', 'Ahafo', 'Upper East', 
    'Upper West', 'Volta', 'Oti', 'Savannah', 'North East', 'Western North'
  ];

  const educationLevels = [
    'JHS Graduate', 'SHS Student', 'SHS Graduate', 'TVET Student', 'TVET Graduate', 'Tertiary Student', 'Tertiary Graduate'
  ];

  const languages = [
    { id: 'en', name: 'English', local: 'English' },
    { id: 'tw', name: 'Twi', local: 'Akan' },
    { id: 'ha', name: 'Hausa', local: 'Hausa' },
    { id: 'ew', name: 'Ewe', local: 'Eʋegbe' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-modern-bg modern-grid pt-20">
      {/* Header / Progress Bar */}
      <div className="px-6 py-4 border-b border-onyx/5 bg-white/5 backdrop-blur-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex gap-2 flex-1">
            {steps.map((s, idx) => (
              <div 
                key={s}
                className={`transition-all duration-500 ease-out h-1 rounded-full ${
                  idx <= currentStepIndex ? 'w-full bg-spring-green shadow-[0_0_10px_rgba(2,245,161,0.3)]' : 'w-4 bg-onyx/5'
                }`}
              />
            ))}
          </div>
          <span className="ml-8 text-[10px] font-bold text-onyx/40 uppercase tracking-[0.3em] whitespace-nowrap">
            {currentStepIndex + 1} / {steps.length}
          </span>
        </div>
      </div>

      <main className="flex-1 px-6 py-10 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {step === 'language' && (
              <motion.div
                key="language"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <div className="w-16 h-1 bg-spring-green rounded-full shadow-[0_0_10px_rgba(2,245,161,0.5)]" />
                  <h1 className="text-4xl font-bold text-onyx leading-none">
                    Start Your <br/> Journey
                  </h1>
                  <p className="text-gray-500 font-medium leading-relaxed">Choose your preferred language for personalized career guidance.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {languages.map((lang, idx) => (
                    <motion.button
                      key={lang.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => {
                        updateField('language', lang.id);
                        setTimeout(nextStep, 200);
                      }}
                      className={`choice-chip group py-2.5 px-6 ${
                        formData.language === lang.id ? 'choice-chip-active' : 'choice-chip-inactive shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`p-3 rounded-full transition-all ${formData.language === lang.id ? 'bg-spring-green text-onyx scale-110' : 'bg-gray-50 text-gray-400 group-hover:text-onyx'}`}>
                          <Languages size={20} />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-sm text-onyx">{lang.local}</div>
                          <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">{lang.name}</div>
                        </div>
                      </div>
                      {formData.language === lang.id ? (
                        <div className="bg-onyx text-spring-green p-1.5 rounded-full">
                          <CheckCircle2 size={18} />
                        </div>
                      ) : (
                        <ArrowRight size={20} className="text-gray-200 group-hover:text-onyx group-hover:translate-x-1 transition-all" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <div className="w-16 h-1 bg-spring-green rounded-full shadow-[0_0_10px_rgba(2,245,161,0.5)]" />
                  <h2 className="text-2xl font-bold text-onyx leading-tight">Identity Details</h2>
                  <p className="text-gray-500 font-medium">We customize recommendations for your region.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.25em] ml-5">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Ama Serwaa"
                      className="input-field"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.25em] ml-5">Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => updateField('age', e.target.value)}
                        placeholder="20"
                        className="input-field"
                      />
                    </div>
                    <div className="flex-[2] space-y-2 relative">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.25em] ml-5">Region</label>
                      <select
                        value={formData.region}
                        onChange={(e) => updateField('region', e.target.value)}
                        className="input-field appearance-none cursor-pointer pr-12"
                      >
                        <option value="">Select Region</option>
                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <div className="absolute bottom-6 right-6 pointer-events-none text-gray-300">
                        <MapPin size={18} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.25em] ml-5">Education Level</label>
                    <div className="grid grid-cols-1 gap-2">
                       {educationLevels.map(level => (
                        <button
                          key={level}
                          onClick={() => updateField('educationLevel', level)}
                          className={`p-4 rounded-full border text-left font-bold text-sm transition-all shadow-sm ${
                            formData.educationLevel === level 
                              ? 'border-spring-green bg-spring-green/10 text-onyx ring-1 ring-spring-green' 
                              : 'border-gray-50 bg-white hover:border-gray-200 text-gray-500'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex gap-4">
                  <button onClick={prevStep} className="btn-secondary flex-none aspect-square p-0 w-16 border-onyx/20 shadow-lg bg-white/80 hover:bg-white hover:border-onyx transition-all">
                    <ChevronLeft size={24} strokeWidth={2.5} className="text-onyx" />
                  </button>
                  <button 
                    onClick={nextStep}
                    disabled={!formData.name || !formData.age || !formData.region || !formData.educationLevel}
                    className="btn-primary flex-1"
                  >
                    {isStepComplete('profile', formData) && initialProfile ? 'Verify & Continue' : 'Continue'} <ChevronRight size={20} />
                  </button>
                  {isStepComplete('profile', formData) && (
                    <button onClick={nextStep} className="text-[10px] font-bold text-onyx/40 hover:text-onyx transition-colors px-4 border border-onyx/10 rounded-full">
                      Skip
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {step === 'academic' && (
              <motion.div
                key="academic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <div className="w-16 h-1 bg-spring-green rounded-full shadow-[0_0_10px_rgba(2,245,161,0.5)]" />
                  <h2 className="text-2xl font-bold text-onyx leading-tight">Strength Map</h2>
                  <p className="text-gray-500 font-medium">Rate core subjects (1 = Best, 5 = Struggling)</p>
                </div>

                <div className="space-y-12">
                  {['Mathematics', 'English Language', 'Integrated Science', 'Social Studies'].map((subject, sIdx) => (
                    <motion.div 
                      key={subject} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: sIdx * 0.1 }}
                      className="space-y-5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-spring-green/10 flex items-center justify-center text-onyx shadow-inner">
                          <CheckCircle2 size={20} />
                        </div>
                        <label className="text-[13px] font-bold text-onyx uppercase tracking-widest">{subject}</label>
                      </div>
                      <div className="grid grid-cols-5 gap-3">
                        {['1', '2', '3', '4', '5'].map((grade) => (
                          <button
                            key={grade}
                            onClick={() => updateField('grades', { ...formData.grades, [subject]: grade })}
                            className={`py-5 rounded-[1.5rem] border font-bold transition-all ${
                              formData.grades[subject] === grade
                                ? 'border-spring-green bg-spring-green text-onyx shadow-lg shadow-spring-green/20'
                                : 'border-gray-50 bg-white hover:border-gray-200 text-gray-400'
                            }`}
                          >
                            {grade}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-8 flex gap-4">
                  <button onClick={prevStep} className="btn-secondary flex-none aspect-square p-0 w-16 border-onyx/20 shadow-lg bg-white/80 hover:bg-white hover:border-onyx transition-all">
                    <ChevronLeft size={24} strokeWidth={2.5} className="text-onyx" />
                  </button>
                  <button 
                    onClick={nextStep}
                    className="btn-primary flex-1"
                  >
                    Skills Review <ChevronRight size={20} />
                  </button>
                  {isStepComplete('academic', formData) && (
                    <button onClick={nextStep} className="text-[10px] font-bold text-onyx/40 hover:text-onyx transition-colors px-4 border border-onyx/10 rounded-full">
                      Skip
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {step === 'aptitude' && (
              <motion.div
                key="aptitude"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <div className="w-16 h-1 bg-spring-green rounded-full shadow-[0_0_10px_rgba(2,245,161,0.5)]" />
                  <div className="inline-flex items-center gap-2 bg-onyx text-spring-green px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">
                    <BrainCircuit size={14} strokeWidth={3} /> Mindset Scan
                  </div>
                  <h2 className="text-2xl font-bold text-onyx leading-tight">Quick Scenario</h2>
                  <p className="text-gray-500 font-medium leading-relaxed">Choose the option closest to your heart.</p>
                </div>

                <div className="space-y-16">
                  {aptitudeQuestions.map((q, qIdx) => (
                    <motion.div 
                      key={q.id} 
                      className="space-y-8"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: qIdx * 0.1 }}
                    >
                      <div className="flex gap-5">
                       <span className="text-3xl font-display font-medium text-onyx/10 shrink-0">
                          {q.id < 10 ? `0${q.id}` : q.id}
                       </span>
                       <p className="font-medium text-[15px] text-onyx leading-snug pt-1 tracking-tight">{q.text}</p>
                    </div>

                      <div className="ml-10">
                      {q.type === 'mcq' ? (
                        <div className="grid grid-cols-1 gap-3">
                          {q.options?.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => updateField('aptitudeAnswers', { ...formData.aptitudeAnswers, [q.id]: oIdx })}
                              className={`p-3 rounded-[1.25rem] border-2 text-left text-sm font-normal transition-all relative ${
                                formData.aptitudeAnswers[q.id] === oIdx
                                  ? 'border-onyx bg-onyx text-white shadow-xl'
                                  : 'border-gray-50 bg-white hover:border-gray-100 text-gray-500'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                  formData.aptitudeAnswers[q.id] === oIdx ? 'border-spring-green bg-spring-green' : 'border-gray-200'
                                }`}>
                                  {formData.aptitudeAnswers[q.id] === oIdx && <div className="w-2 h-2 bg-onyx rounded-full" />}
                                </div>
                                {opt}
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-6">
                          <div className="grid grid-cols-5 gap-3">
                            {likertOptions.map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                onClick={() => updateField('aptitudeAnswers', { ...formData.aptitudeAnswers, [q.id]: oIdx })}
                                className={`flex flex-col items-center gap-2 group transition-all`}
                              >
                                <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                                  formData.aptitudeAnswers[q.id] === oIdx 
                                    ? 'border-spring-green bg-spring-green shadow-[0_0_15px_rgba(2,245,161,0.4)] scale-110' 
                                    : 'border-gray-100 bg-white group-hover:border-gray-200'
                                }`}>
                                  {formData.aptitudeAnswers[q.id] === oIdx && <div className="w-2.5 h-2.5 bg-onyx rounded-full" />}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-tight text-center leading-[1.2] transition-colors ${
                                  formData.aptitudeAnswers[q.id] === oIdx ? 'text-onyx' : 'text-gray-400'
                                }`}>
                                  {opt.split(' ').map((w, idx) => <span key={idx} className="block">{w}</span>)}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-8 flex gap-4">
                  <button onClick={prevStep} className="btn-secondary flex-none aspect-square p-0 w-16 border-onyx/20 shadow-lg bg-white/80 hover:bg-white hover:border-onyx transition-all">
                    <ChevronLeft size={24} strokeWidth={2.5} className="text-onyx" />
                  </button>
                  <button 
                    onClick={nextStep}
                    disabled={Object.keys(formData.aptitudeAnswers).length < aptitudeQuestions.length}
                    className="btn-accent flex-1 shadow-spring-green/30"
                  >
                    Continue <ChevronRight size={20} />
                  </button>
                  {isStepComplete('aptitude', formData) && (
                    <button onClick={nextStep} className="text-[10px] font-bold text-onyx/40 hover:text-onyx transition-colors px-4 border border-onyx/10 rounded-full">
                      Skip
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {step === 'interests' && (
              <motion.div
                key="interests"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <div className="w-16 h-1 bg-spring-green rounded-full shadow-[0_0_10px_rgba(2,245,161,0.5)]" />
                  <h2 className="text-2xl font-bold text-onyx leading-tight">What Excites You?</h2>
                  <p className="text-gray-500 font-medium">Pick at least 3 things you love doing.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    'Coding & Software', 'Farming & Agriculture', 'Building & Designing',
                    'Cooking & Hospitality', 'Electricals & Solar', 'Fashion & Tailoring',
                    'Nursing & Healthcare', 'Teaching', 'Business & Sales',
                    'Art & Drawing', 'Mechanics & Engines', 'Music & Media'
                  ].map((interest, idx) => (
                    <motion.button
                      key={interest}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => toggleInterest(interest)}
                      className={`px-8 py-4 rounded-full border font-bold text-sm transition-all whitespace-nowrap shadow-sm hover:scale-105 active:scale-95 ${
                        formData.interests.includes(interest)
                          ? 'border-onyx bg-onyx text-white shadow-xl shadow-onyx/20'
                          : 'border-gray-50 bg-white text-gray-500 hover:border-gray-200'
                      }`}
                    >
                      {interest}
                    </motion.button>
                  ))}
                </div>

                <div className="pt-8 flex gap-4">
                  <button onClick={prevStep} className="btn-secondary flex-none aspect-square p-0 w-16 border-onyx/20 shadow-lg bg-white/80 hover:bg-white hover:border-onyx transition-all">
                    <ChevronLeft size={24} strokeWidth={2.5} className="text-onyx" />
                  </button>
                  <button 
                    onClick={nextStep}
                    disabled={formData.interests.length < 3}
                    className="btn-primary flex-1"
                  >
                    Final Goals <ChevronRight size={20} />
                  </button>
                  {isStepComplete('interests', formData) && (
                    <button onClick={nextStep} className="text-[10px] font-bold text-onyx/40 hover:text-onyx transition-colors px-4 border border-onyx/10 rounded-full">
                      Skip
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {step === 'goals' && (
              <motion.div
                key="goals"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <div className="w-16 h-1 bg-spring-green rounded-full shadow-[0_0_10px_rgba(2,245,161,0.5)]" />
                  <h2 className="text-2xl font-bold text-onyx leading-tight">Personal Ambition</h2>
                  <p className="text-gray-500 font-medium">How do you envision success in Ghana?</p>
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.25em] ml-5">Path Preference</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['University', 'TVET / Vocational'].map(path => (
                        <button
                          key={path}
                          onClick={() => updateField('pathwayType', path)}
                          className={`p-10 rounded-[2.5rem] border font-bold text-sm transition-all text-center flex flex-col items-center gap-6 ${
                            formData.pathwayType === path
                              ? 'border-onyx bg-onyx text-white shadow-2xl scale-105'
                              : 'border-gray-50 bg-white text-gray-400 hover:border-gray-200 shadow-sm'
                          }`}
                        >
                          {path === 'University' ? <GraduationCap size={48} strokeWidth={1} /> : <Target size={48} strokeWidth={1} />}
                          <span className="uppercase tracking-widest text-[11px]">{path}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.25em] ml-5">Dream Monthly Income (GHS)</label>
                    <div className="relative group">
                      <div className="absolute left-7 top-1/2 -translate-y-1/2 font-bold text-onyx/20 text-lg">GHS</div>
                      <input
                        type="text"
                        value={formData.incomeTarget}
                        onChange={(e) => updateField('incomeTarget', e.target.value)}
                        placeholder="5000"
                        className="input-field pl-20"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => updateField('financialNeed', !formData.financialNeed)}
                    className={`flex items-center justify-between p-6 rounded-full border transition-all ${
                      formData.financialNeed ? 'border-spring-green bg-spring-green/5' : 'border-gray-50 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`p-4 rounded-full ${formData.financialNeed ? 'bg-spring-green text-onyx shadow-lg shadow-spring-green/20' : 'bg-gray-50 text-gray-300'}`}>
                        <Heart size={24} />
                      </div>
                      <div className="text-left font-medium text-onyx">Financial Assistance Needed</div>
                    </div>
                    <div className={`w-16 h-9 rounded-full transition-all relative p-1 leading-none ${formData.financialNeed ? 'bg-spring-green' : 'bg-gray-100'}`}>
                      <div className={`w-7 h-7 bg-white rounded-full transition-all shadow-md ${formData.financialNeed ? 'translate-x-7' : 'translate-x-0'}`} />
                    </div>
                  </button>

                  <div className="space-y-4">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.25em] ml-5">WhatsApp Number</label>
                    <div className="flex gap-4">
                      <div className="bg-onyx text-white p-5 rounded-full font-bold text-sm flex items-center justify-center min-w-[90px] shadow-lg">+233</div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="24XXXXXXX"
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-10 flex gap-4">
                  <button onClick={prevStep} className="btn-secondary flex-none aspect-square p-0 w-16 border-onyx/20 shadow-lg bg-white/80 hover:bg-white hover:border-onyx transition-all">
                    <ChevronLeft size={24} strokeWidth={2.5} className="text-onyx" />
                  </button>
                  <button 
                    onClick={nextStep}
                    className="btn-accent flex-1 shadow-spring-green/40 active:scale-95 py-6"
                  >
                    GENERATE CAREER GPS <Lightbulb size={24} className="animate-pulse" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-12 px-6 text-center opacity-40">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <CompassLogo size={18} className="text-spring-green" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-onyx">PathFinder AI</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] max-w-[250px] leading-relaxed">Pioneering the Future of Professional Mapping in Ghana</p>
        </div>
      </footer>
    </div>
  );

}
