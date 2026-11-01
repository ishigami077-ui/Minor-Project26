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

export function ReportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-gray-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-emerald-950 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                Academic Project Documentation &middot; B.Tech CSE
              </span>
              <h2 className="text-xl font-black text-white">
                Kisan Setu Project Report
              </h2>
              <p className="text-xs text-gray-300">G H Raisoni University &middot; Updated 31 October 2026</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Executive Overview */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <Award className="w-4 h-4 text-emerald-700" />
              Project Title & Abstract
            </div>
            <h3 className="text-base font-extrabold text-emerald-950">
              Kisan Setu: A Digital Agricultural Marketplace and Farmer Support Platform
            </h3>
            <p className="text-xs sm:text-sm text-emerald-900/80 leading-relaxed">
              A comprehensive 32-page B.Tech Major/Minor Project Report documenting a four-tier online platform connecting primary agricultural producers with bulk buyers and heavy machinery providers. It mitigates intermediary exploitation, ensures fair APMC Mandi benchmarking, provides custom machinery hiring within operational radii, and incorporates dual-tier AI safety guardrails.
            </p>
          </div>

          {/* Download Strip for PDF and DOCX */}
          <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-700" />
                Download University Submission Copies
              </h4>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                32 Pages &middot; Formatted & Verified
              </span>
            </div>
            
            <p className="text-xs text-gray-600">
              The project report is compiled in accordance with standard university dissertation guidelines, formatted in Times New Roman with 1.5 line spacing, standard 1.25" left margin, certified declaration, certificate, and 8 structured chapters.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="./docs/Kisan_Setu_Project_Report_Updated_31_October_2026.pdf"
                download="Kisan_Setu_Project_Report_Updated_31_October_2026.pdf"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-gray-200 hover:border-emerald-500 hover:shadow-sm text-gray-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center">
                    PDF
                  </div>
                  <div>
                    <div className="text-xs font-bold group-hover:text-emerald-700 transition-colors">
                      Complete Project Report (PDF)
                    </div>
                    <div className="text-[11px] text-gray-400">Print-Ready with Title & Certificate</div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
              </a>

              <a
                href="./docs/Kisan_Setu_Project_Report_Updated_31_October_2026.docx"
                download="Kisan_Setu_Project_Report_Updated_31_October_2026.docx"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-gray-200 hover:border-blue-500 hover:shadow-sm text-gray-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    DOCX
                  </div>
                  <div>
                    <div className="text-xs font-bold group-hover:text-blue-700 transition-colors">
                      Editable Document (Word DOCX)
                    </div>
                    <div className="text-[11px] text-gray-400">Microsoft Word XML Format</div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </a>
            </div>
          </div>

          {/* Project Team & Mentorship */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-600" />
                Student Project Team
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-800 font-medium">
                <li className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <span>Misty Jamabholkar</span>
                  <span className="font-mono text-gray-500 text-[11px]">GHRUS25011020008</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <span>Namrata Jaiswal</span>
                  <span className="font-mono text-gray-500 text-[11px]">GHRUS25011020001</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <span>Naved Mansuri</span>
                  <span className="font-mono text-gray-500 text-[11px]">GHRUS25011020035</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <span>Neel Tawre</span>
                  <span className="font-mono text-gray-500 text-[11px]">GHRUS25011020061</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600" />
                Faculty & Administration
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-gray-50">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Project Supervisor</span>
                  <strong className="text-gray-900 text-sm">Dr. Rahul Khokale</strong>
                  <span className="text-gray-500 block text-[11px]">Department of Computer Science and Engineering</span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Head of Department (HOD)</span>
                  <strong className="text-gray-900 text-sm">Mr. Dheeraj Ghagre</strong>
                  <span className="text-gray-500 block text-[11px]">Department of Computer Science and Engineering</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Chapters */}
          <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
            <div className="bg-gray-100 p-3 font-bold text-gray-800 flex items-center justify-between">
              <span>Report Outline (8 Chapters)</span>
              <span className="text-gray-500 font-normal">32 Pages</span>
            </div>
            <div className="divide-y divide-gray-100 bg-white">
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 1:</strong> Introduction, Motivation & Problem Formulation</span>
                <span className="text-gray-400">Pages 1–4</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 2:</strong> Literature Review & Existing Agricultural Systems</span>
                <span className="text-gray-400">Pages 5–8</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 3:</strong> Four-Tier System Architecture & AI Guardrail Triage</span>
                <span className="text-gray-400">Pages 9–14</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 4:</strong> Methodologies, Data Schemas & Implementation</span>
                <span className="text-gray-400">Pages 15–20</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 5:</strong> Verification, Testing & Security Validation</span>
                <span className="text-gray-400">Pages 21–24</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 6:</strong> Results, Impact Analysis & Agronomic Telemetry</span>
                <span className="text-gray-400">Pages 25–28</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 7:</strong> Future Scope (Escrow, CV Grading & Regional Voice)</span>
                <span className="text-gray-400">Pages 29–30</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span><strong>Chapter 8:</strong> Conclusion & Future Directions</span>
                <span className="text-gray-400">Pages 31–32</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-900 text-white font-bold text-xs hover:bg-gray-800 transition-colors"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
}
