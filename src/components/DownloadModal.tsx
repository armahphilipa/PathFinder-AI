/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Check, Download, Loader2, ListChecks, GraduationCap, School } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (options: {
    includeRecommendations: boolean;
    includeScholarships: boolean;
    includeInstitutions: boolean;
  }) => Promise<void>;
  userName: string;
}

export default function DownloadModal({ isOpen, onClose, onConfirm, userName }: DownloadModalProps) {
  const [options, setOptions] = useState({
    includeRecommendations: true,
    includeScholarships: true,
    includeInstitutions: true,
  });
  const [isExporting, setIsExporting] = useState(false);

  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await onConfirm(options);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-onyx/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-6 top-[15%] md:left-1/2 md:-translate-x-1/2 md:max-w-md bg-white rounded-[3rem] p-10 shadow-2xl z-[101] overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-spring-green" />
            
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-onyx tracking-tighter">Export Roadmap</h3>
                <p className="text-gray-400 font-medium text-sm">Select sections for {userName}'s PDF map.</p>
              </div>
              <button onClick={onClose} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-all">
                <X size={20} className="text-onyx" />
              </button>
            </div>

            <div className="space-y-4 mb-10">
              <button
                onClick={() => toggleOption('includeRecommendations')}
                className={`w-full flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all ${
                  options.includeRecommendations ? 'border-onyx bg-onyx/5 shadow-md' : 'border-gray-50 bg-white opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${options.includeRecommendations ? 'bg-onyx text-spring-green' : 'bg-gray-50 text-gray-300'}`}>
                    <ListChecks size={20} />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm text-onyx">Career Paths</div>
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">3 recommendations</div>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${options.includeRecommendations ? 'bg-spring-green border-spring-green' : 'border-gray-200'}`}>
                  {options.includeRecommendations && <Check size={14} className="text-onyx" />}
                </div>
              </button>

              <button
                onClick={() => toggleOption('includeScholarships')}
                className={`w-full flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all ${
                  options.includeScholarships ? 'border-onyx bg-onyx/5 shadow-md' : 'border-gray-50 bg-white opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${options.includeScholarships ? 'bg-onyx text-spring-green' : 'bg-gray-50 text-gray-300'}`}>
                    <GraduationCap size={20} />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm text-onyx">Funding & Grants</div>
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Matched scholarships</div>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${options.includeScholarships ? 'bg-spring-green border-spring-green' : 'border-gray-200'}`}>
                  {options.includeScholarships && <Check size={14} className="text-onyx" />}
                </div>
              </button>

              <button
                onClick={() => toggleOption('includeInstitutions')}
                className={`w-full flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all ${
                  options.includeInstitutions ? 'border-onyx bg-onyx/5 shadow-md' : 'border-gray-50 bg-white opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${options.includeInstitutions ? 'bg-onyx text-spring-green' : 'bg-gray-50 text-gray-300'}`}>
                    <School size={20} />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm text-onyx">Educational Partners</div>
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Studying in {userName.split(' ')[0]}'s region</div>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${options.includeInstitutions ? 'bg-spring-green border-spring-green' : 'border-gray-200'}`}>
                  {options.includeInstitutions && <Check size={14} className="text-onyx" />}
                </div>
              </button>
            </div>

            <button
              onClick={handleDownload}
              disabled={isExporting || (!options.includeRecommendations && !options.includeScholarships && !options.includeInstitutions)}
              className="btn-primary w-full py-6 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 className="animate-spin" size={24} /> Minting PDF...
                </>
              ) : (
                <>
                  <Download size={24} /> Generate Roadmap
                </>
              )}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
