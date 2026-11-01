import React, { useState } from 'react';
import { 
  Layers, 
  Layout, 
  Cpu, 
  Database, 
  Cloud, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowDown, 
  ExternalLink, 
  FileText, 
  TrendingUp, 
  Zap, 
  Sparkles,
  Server,
  Lock,
  PhoneCall
} from 'lucide-react';

export function ArchitectureView({ onOpenReportModal }) {
  const [selectedLayer, setSelectedLayer] = useState(0);

  const layers = [
    {
      id: 'presentation',
      title: 'Layer 1: Presentation Layer',
      subtitle: 'Client Interfaces & Form Workflows',
      icon: Layout,
      color: 'emerald',
      description: 'Responsive web presentation layer engineered with modern React and Tailwind CSS. Provides specialized interfaces for Farmers, Bulk Buyers, and Machinery Operators, with high-contrast UI and Devanagari typography support.',
      technologies: ['React 19 (Hooks & Context)', 'Tailwind CSS v4 Engine', 'Lucide Vector System', 'Devanagari Font (Plus Jakarta / Mukta)', 'Accessible Mobile-First Viewports'],
      responsibilities: [
        'Produce & Machinery listing discovery catalogs with live search and multi-facet filtering',
        'Farmer Producer Desk for managing active harvest lots, MOQ, and expected gate prices',
        'Direct bilateral negotiation chat interface with rapid price counter-offer pills',
        'Floating Kisan Sahayak AI assistant interface with Tier-2 emergency escalation modal'
      ],
      reportRef: 'Chapter 3 (System Architecture), Section 3.1 & Chapter 4 (Implementation)'
    },
    {
      id: 'application',
      title: 'Layer 2: Application Layer',
      subtitle: 'Business Rules & Access Control',
      icon: Cpu,
      color: 'blue',
      description: 'The core business logic tier managing state transitions, listing validation schemas, role switching (Farmer / Buyer / Machinery Provider), and the dual-tier AI query triage system.',
      technologies: ['State Machine Controllers', 'Role-Based Access Control (RBAC)', 'Dual-Tier Guardrail Pipeline', 'APMC Mandi Price Benchmarking Engine'],
      responsibilities: [
        'Enforcing standardized listing schemas (crops: variety, unit, MOQ, harvest date; machinery: HP, radius, operator type)',
        'Dual-Tier AI Guardrail: Serves navigation & listing queries directly; routes plant pathology and legal conflicts to certified hotlines',
        'Simulated negotiation counter-offer state transitions and pricing arbitrage calculations',
        'Follower graph management and harvest alert dispatching'
      ],
      reportRef: 'Chapter 3, Section 3.2 (Application Business Rules) & Section 3.4 (AI Guardrail Triage)'
    },
    {
      id: 'data',
      title: 'Layer 3: Data Layer',
      subtitle: 'Persistent Records & LocalStore Engine',
      icon: Database,
      color: 'amber',
      description: 'Persistent client-side data layer powered by standardized JSON entities, ensuring robust zero-latency offline-first state preservation, transactional updates, and exportable schemas.',
      technologies: ['HTML5 LocalStorage Storage Engine', 'Normalized JSON Schemas', 'Reactive Data Hooks', 'Full-state Factory Reset Dispatcher'],
      responsibilities: [
        'Produce lot store with status tags (AVAILABLE, NEGOTIATING, SOLD)',
        'Machinery registry with operational radii and service terms',
        'Bilateral conversation history with unread count tracking',
        'Follow graph preserving connections to preferred local growers and hiring hubs'
      ],
      reportRef: 'Chapter 3, Section 3.3 (Data Architecture & ER Modeling)'
    },
    {
      id: 'external',
      title: 'Layer 4: External Services Layer',
      subtitle: 'Integrations, Telemetry & Escrow Roadmap',
      icon: Cloud,
      color: 'purple',
      description: 'External service boundaries connecting the platform to external AI assistants, government mandi price telemetry (Agmarknet), cloud media assets, and certified agronomic hotlines.',
      technologies: ['Kisan Sahayak AI Knowledge Base', 'Govt Kisan Call Center Gateway (1800-180-1551)', 'Agmarknet Mandi Price Feeds', 'Cloud Image CDN Presets', 'Future UPI / Escrow Sandbox'],
      responsibilities: [
        'AI Onboarding & listing guidance with agricultural triage boundaries',
        'Emergency escalation hotline linking farmers directly to Ministry of Agriculture agronomists',
        'Dynamic Mandi MSP price feeds for Nagpur, Saoner, Kalmeshwar, and Vidarbha markets',
        'Cloud-hosted high-resolution agricultural asset delivery'
      ],
      reportRef: 'Chapter 3, Section 3.4 (External Integrations) & Chapter 6 (Future Scope)'
    }
  ];

  const activeLayerData = layers[selectedLayer];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              B.Tech Project Architecture
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Kisan Setu 4-Layer System Architecture
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Designed and documented in the official B.Tech Project Report by students at G H Raisoni University. Explore each tier's security boundary, data flow, and operational responsibilities below.
            </p>
          </div>

          <button
            onClick={onOpenReportModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all shrink-0"
          >
            <FileText className="w-4 h-4" />
            View University Project Report
          </button>
        </div>
      </div>

      {/* Interactive 4-Layer Stack Navigator */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          const isSelected = selectedLayer === index;
          return (
            <button
              key={layer.id}
              onClick={() => setSelectedLayer(index)}
              className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between h-32 relative overflow-hidden ${
                isSelected 
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-400/20' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-xs font-extrabold uppercase tracking-wider ${
                  isSelected ? 'text-emerald-800' : 'text-gray-500'
                }`}>
                  Layer {index + 1}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className={`text-sm font-bold leading-tight ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                  {layer.title.split(': ')[1]}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5 truncate">{layer.subtitle}</p>
              </div>

              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Layer Deep Dive Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <Zap className="w-3.5 h-3.5" />
              Active Inspection &middot; {activeLayerData.title}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              {activeLayerData.subtitle}
            </h2>
            <p className="text-sm text-gray-600 mt-1 max-w-3xl">
              {activeLayerData.description}
            </p>
          </div>

          <div className="text-xs bg-gray-50 border border-gray-200 p-3 rounded-xl shrink-0">
            <span className="text-gray-400 block font-medium">Project Report Cross-Reference:</span>
            <strong className="text-emerald-800 font-semibold">{activeLayerData.reportRef}</strong>
          </div>
        </div>

        {/* Responsibilities & Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Core Architecture Responsibilities
            </h3>
            <ul className="space-y-2.5">
              {activeLayerData.responsibilities.map((resp, i) => (
                <li key={i} className="text-sm text-gray-700 bg-gray-50/80 p-3 rounded-xl border border-gray-100 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 mb-3">
                <Cpu className="w-4 h-4 text-blue-600" />
                Underlying Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeLayerData.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Special Highlight for External / Dual-tier Guardrail */}
            {selectedLayer === 3 && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <PhoneCall className="w-4 h-4 text-amber-700" />
                  Dual-Tier AI Guardrail Triage Boundary (Section 3.4)
                </div>
                <p className="text-xs leading-relaxed text-amber-800">
                  The prototype implements a strict protocol dividing queries into Tier 1 (platform navigation & pricing benchmarks) and Tier 2 (pathology diagnostics & contract disputes). Tier 2 queries trigger an instant safety card pointing to the official Government Kisan Call Center at <strong>1800-180-1551</strong>.
                </p>
              </div>
            )}

            {/* Future Scope roadmap */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-1">
              <span className="font-bold text-gray-900 block">Proposed Phase-2 System Enhancements:</span>
              <p>Escrow payment contracts, GPS telemetry for fleet tractors, automated grading computer vision, and Marathi voice interfaces.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry / Impact Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 font-semibold uppercase">Intermediary Markup Elimination</p>
          <p className="text-2xl font-black text-emerald-700 mt-1">15% – 25%</p>
          <span className="text-[11px] text-gray-500">Savings delivered to both parties</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 font-semibold uppercase">Machinery Idle Time Reduction</p>
          <p className="text-2xl font-black text-amber-700 mt-1">~40%</p>
          <span className="text-[11px] text-gray-500">Via custom hiring radius matching</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 font-semibold uppercase">Discovery-to-Deal Time</p>
          <p className="text-2xl font-black text-blue-700 mt-1">&lt; 48 Hours</p>
          <span className="text-[11px] text-gray-500">From listing to direct bilateral contact</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-xs text-gray-500 font-semibold uppercase">Dual-Tier Safety Guardrails</p>
          <p className="text-2xl font-black text-purple-700 mt-1">100% Triage</p>
          <span className="text-[11px] text-gray-500">Zero unverified medical/legal advice</span>
        </div>
      </div>

    </div>
  );
}
