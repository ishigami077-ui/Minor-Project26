import React from 'react';
import { 
  X, 
  FileText, 
  Download, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Users, 
  Calendar, 
  BookOpen,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function ReportModal({ isOpen, onClose }) {
  const { lang, t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-emerald-950 p-6 sm:p-7 text-white flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                {t('report.badge')}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {t('report.title')}
              </h2>
              <p className="text-xs text-stone-300 mt-0.5">{t('report.sub')}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Executive Overview */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4 text-emerald-700" />
              {t('report.abstractTitle')}
            </div>
            <h3 className="text-base font-extrabold text-emerald-950">
              Kisan Setu: A Digital Agricultural Marketplace and Farmer Support Platform
            </h3>
            <p className="text-xs sm:text-sm text-emerald-900/80 leading-relaxed">
              {t('report.abstractText')}
            </p>
          </div>

          {/* Download Strip for PDF and DOCX */}
          <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-700" />
                {t('report.downloadTitle')}
              </h4>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {t('report.specsTag')}
              </span>
            </div>
            
            <p className="text-xs text-stone-600 leading-relaxed">
              {t('report.formatNote')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="./docs/Kisan_Setu_Project_Report_Updated_31_October_2026.pdf"
                download="Kisan_Setu_Project_Report_Updated_31_October_2026.pdf"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600 hover:shadow-xs text-stone-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center">
                    PDF
                  </div>
                  <div>
                    <div className="text-xs font-bold group-hover:text-emerald-800 transition-colors">
                      {t('report.pdfTitle')}
                    </div>
                    <div className="text-[10px] text-stone-400">{t('report.pdfSub')}</div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-stone-400 group-hover:text-emerald-700" />
              </a>

              <a
                href="./docs/Kisan_Setu_Project_Report_Updated_31_October_2026.docx"
                download="Kisan_Setu_Project_Report_Updated_31_October_2026.docx"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-blue-600 hover:shadow-xs text-stone-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    DOCX
                  </div>
                  <div>
                    <div className="text-xs font-bold group-hover:text-blue-800 transition-colors">
                      {t('report.docxTitle')}
                    </div>
                    <div className="text-[10px] text-stone-400">{t('report.docxSub')}</div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-stone-400 group-hover:text-blue-700" />
              </a>
            </div>
          </div>

          {/* Project Team & Mentorship */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-white space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-700" />
                {t('report.teamTitle')}
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-800 font-medium">
                <li className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50">
                  <span>Misty Jamabholkar</span>
                  <span className="font-mono text-stone-500 text-[11px]">GHRUS25011020008</span>
                </li>
                <li className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50">
                  <span>Namrata Jaiswal</span>
                  <span className="font-mono text-stone-500 text-[11px]">GHRUS25011020001</span>
                </li>
                <li className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50">
                  <span>Naved Mansuri</span>
                  <span className="font-mono text-stone-500 text-[11px]">GHRUS25011020035</span>
                </li>
                <li className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50">
                  <span>Neel Tawre</span>
                  <span className="font-mono text-stone-500 text-[11px]">GHRUS25011020061</span>
                </li>
              </ul>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-white space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-700" />
                {t('report.facultyTitle')}
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">{t('report.supervisorLabel')}</span>
                  <strong className="text-stone-900 text-sm">{t('report.supervisorName')}</strong>
                  <span className="text-stone-500 block text-[11px] mt-0.5">{t('report.deptName')}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">{t('report.hodLabel')}</span>
                  <strong className="text-stone-900 text-sm">{t('report.hodName')}</strong>
                  <span className="text-stone-500 block text-[11px] mt-0.5">{t('report.deptName')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Chapters */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden text-xs">
            <div className="bg-stone-100 p-3 font-bold text-stone-800 flex items-center justify-between">
              <span>{t('report.chaptersTitle')}</span>
              <span className="text-stone-500 font-normal">32 Pages</span>
            </div>
            <div className="divide-y divide-stone-100 bg-white">
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 1:</strong> Introduction, Motivation & Problem Formulation</span>
                <span className="text-stone-400">Pages 1–4</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 2:</strong> Literature Review & Existing Agricultural Systems</span>
                <span className="text-stone-400">Pages 5–8</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 3:</strong> Four-Tier System Architecture & AI Guardrail Triage</span>
                <span className="text-stone-400">Pages 9–14</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 4:</strong> Methodologies, Data Schemas & Implementation</span>
                <span className="text-stone-400">Pages 15–20</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 5:</strong> Verification, Testing & Security Validation</span>
                <span className="text-stone-400">Pages 21–24</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 6:</strong> Results, Impact Analysis & Agronomic Telemetry</span>
                <span className="text-stone-400">Pages 25–28</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 7:</strong> Future Scope (Escrow, CV Grading & Regional Voice)</span>
                <span className="text-stone-400">Pages 29–30</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 8:</strong> Conclusion & Academic Summary</span>
                <span className="text-stone-400">Pages 31–32</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {t('report.closeBtn')}
          </button>
        </div>

      </div>
    </div>
  );
}
