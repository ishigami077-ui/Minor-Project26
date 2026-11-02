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
import { useLanguage } from '../i18n/LanguageContext';

export function ArchitectureView({ onOpenReportModal }) {
  const { lang, t } = useLanguage();
  const [selectedLayer, setSelectedLayer] = useState(0);

  const layers = [
    {
      id: 'presentation',
      title: lang === 'hi' ? 'स्तर 1: प्रस्तुति स्तर (Presentation Tier)' : 'Layer 1: Presentation Layer',
      subtitle: lang === 'hi' ? 'क्लाइंट इंटरफ़ेस एवं फॉर्म वर्कफ़्लो' : 'Client Interfaces & Form Workflows',
      icon: Layout,
      color: 'emerald',
      description: lang === 'hi' 
        ? 'प्रतिक्रियाशील वेब प्रस्तुति स्तर जो आधुनिक रिएक्ट 19 और टेलविंड सीएसएस इंजन से तैयार किया गया है। किसानों, थोक खरीदारों और मशीनरी प्रदाताओं हेतु विशेषीकृत उच्च-कंट्रास्ट इंटरफ़ेस एवं देवनागरी टाइपोग्राफी प्रदान करता है।'
        : 'Responsive web presentation layer engineered with modern React 19 and Tailwind CSS. Provides specialized interfaces for Farmers, Bulk Buyers, and Machinery Operators, with high-contrast UI and Devanagari typography support.',
      technologies: ['React 19 (Hooks & Context)', 'Tailwind CSS v4 Engine', 'Lucide Vector System', 'Devanagari Font (Plus Jakarta & Noto Sans)', 'Accessible Mobile-First Viewports'],
      responsibilities: lang === 'hi' ? [
        'फसल एवं मशीनरी खोज कैटलॉग - लाइव सर्च एवं बहु-आयामी फ़िल्टरिंग सहित',
        'किसान डेस्क - सक्रिय फसल लॉट, न्यूनतम मात्रा और खेत मांग मूल्य प्रबंधन',
        'द्विपक्षीय सीधी बातचीत विंडो - त्वरित जवाबी प्रस्ताव (-₹50/क्विंटल) चिप्स सहित',
        'किसान सहायक AI इंटरफ़ेस - द्वि-स्तरीय आपातकालीन सुरक्षा दिशानिर्देश सहित'
      ] : [
        'Produce & Machinery listing discovery catalogs with live search and multi-facet filtering',
        'Farmer Producer Desk for managing active harvest lots, MOQ, and expected gate prices',
        'Direct bilateral negotiation chat interface with rapid price counter-offer pills',
        'Floating Kisan Sahayak AI assistant interface with Tier-2 emergency escalation modal'
      ],
      reportRef: 'Chapter 3 (System Architecture), Section 3.1 & Chapter 4 (Implementation)'
    },
    {
      id: 'application',
      title: lang === 'hi' ? 'स्तर 2: एप्लिकेशन स्तर (Application Tier)' : 'Layer 2: Application Layer',
      subtitle: lang === 'hi' ? 'व्यापार नियम एवं भूमिका-आधारित अभिगम' : 'Business Rules & Access Control',
      icon: Cpu,
      color: 'blue',
      description: lang === 'hi'
        ? 'मुख्य व्यापारिक तर्क स्तर जो स्थिति परिवर्तन, फसल प्रविष्टि सत्यापन, भूमिका परिवर्तन (किसान / खरीदार / मशीनरी प्रदाता) और द्वि-स्तरीय AI सुरक्षा ट्राइएज को नियंत्रित करता है।'
        : 'The core business logic tier managing state transitions, listing validation schemas, role switching (Farmer / Buyer / Machinery Provider), and the dual-tier AI query triage system.',
      technologies: ['State Machine Controllers', 'Role-Based Access Control (RBAC)', 'Dual-Tier Guardrail Pipeline', 'APMC Mandi Price Benchmarking Engine'],
      responsibilities: lang === 'hi' ? [
        'मानकीकृत फसल व मशीनरी डेटा स्कीमा लागू करना (किस्म, नमी, कटाई तिथि, एचपी, सेवा दायरा)',
        'द्वि-स्तरीय AI सुरक्षा: सामान्य प्रश्नों का त्वरित उत्तर; फसल रोग व कानूनी विवादों को हेल्पलाइन पर भेजना',
        'द्विपक्षीय बातचीत की स्थिति और मध्यस्थता मूल्य गणना',
        'अनुसरण नेटवर्क एवं नई फसल अधिसूचना प्रेषण'
      ] : [
        'Enforcing standardized listing schemas (crops: variety, unit, MOQ, harvest date; machinery: HP, radius, operator type)',
        'Dual-Tier AI Guardrail: Serves navigation & listing queries directly; routes plant pathology and legal conflicts to certified hotlines',
        'Simulated negotiation counter-offer state transitions and pricing arbitrage calculations',
        'Follower graph management and harvest alert dispatching'
      ],
      reportRef: 'Chapter 3, Section 3.2 (Application Business Rules) & Section 3.4 (AI Guardrail Triage)'
    },
    {
      id: 'data',
      title: lang === 'hi' ? 'स्तर 3: डेटा स्तर (Data Tier)' : 'Layer 3: Data Layer',
      subtitle: lang === 'hi' ? 'स्थायी अभिलेख एवं डेटा भंडारण' : 'Persistent Records & LocalStore Engine',
      icon: Database,
      color: 'amber',
      description: lang === 'hi'
        ? 'स्थानीय डेटा परत जो मानकीकृत JSON अभिलेखों द्वारा शून्य-विलंबता के साथ ऑफ़लाइन डेटा संरक्षण और लेन-देन अपडेट सुनिश्चित करती है।'
        : 'Persistent client-side data layer powered by standardized JSON entities, ensuring robust zero-latency offline-first state preservation, transactional updates, and exportable schemas.',
      technologies: ['HTML5 LocalStorage Storage Engine', 'Normalized JSON Schemas', 'Reactive Data Hooks', 'Full-state Factory Reset Dispatcher'],
      responsibilities: lang === 'hi' ? [
        'फसल लॉट भंडार स्थिति टैग सहित (AVAILABLE, NEGOTIATING, SOLD)',
        'मशीनरी बेड़ा रजिस्ट्री परिचालन दायरा और सेवा शर्तों सहित',
        'अपठित संदेश गणना सहित द्विपक्षीय बातचीत इतिहास',
        'पसंदीदा स्थानीय किसानों और कस्टम हायरिंग केंद्रों का नेटवर्क'
      ] : [
        'Produce lot store with status tags (AVAILABLE, NEGOTIATING, SOLD)',
        'Machinery registry with operational radii and service terms',
        'Bilateral conversation history with unread count tracking',
        'Follow graph preserving connections to preferred local growers and hiring hubs'
      ],
      reportRef: 'Chapter 3, Section 3.3 (Data Architecture & ER Modeling)'
    },
    {
      id: 'external',
      title: lang === 'hi' ? 'स्तर 4: बाह्य सेवा स्तर (External Services Tier)' : 'Layer 4: External Services Layer',
      subtitle: lang === 'hi' ? 'एकीकरण, टेलीमेट्री एवं सुरक्षा सीमा' : 'Integrations, Telemetry & Escrow Roadmap',
      icon: Cloud,
      color: 'purple',
      description: lang === 'hi'
        ? 'बाह्य सेवा सीमा जो प्लेटफ़ॉर्म को AI सहायक, सरकारी एगमार्कनेट मंडी टेलीमेट्री, क्लाउड मीडिया और प्रमाणित सरकारी किसान कॉल सेंटर से जोड़ती है।'
        : 'External service boundaries connecting the platform to external AI assistants, government mandi price telemetry (Agmarknet), cloud media assets, and certified agronomic hotlines.',
      technologies: ['Kisan Sahayak AI Knowledge Base', 'Govt Kisan Call Center Gateway (1800-180-1551)', 'Agmarknet Mandi Price Feeds', 'Cloud Image CDN Presets', 'Future UPI / Escrow Sandbox'],
      responsibilities: lang === 'hi' ? [
        'एआई ऑनबोर्डिंग एवं फसल प्रविष्टि मार्गदर्शन सुरक्षा नियमों सहित',
        'आपातकालीन हेल्पलाइन जो किसानों को सीधे कृषि वैज्ञानिकों से जोड़ती है',
        'नागपुर, सावनेर और विदर्भ मंडियों हेतु वास्तविक समय एमएसपी टेलीमेट्री',
        'क्लाउड-होस्टेड उच्च-रिज़ॉल्यूशन कृषि मीडिया वितरण'
      ] : [
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
    <div className="w-full max-w-full space-y-8 animate-fade-in">
      
      {/* 1. Architecture Hero Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-emerald-300" />
              {t('architecture.badge')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {t('architecture.title')}
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {t('architecture.subtitle')}
            </p>
          </div>

          <button
            onClick={onOpenReportModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-emerald-300" />
            <span>{t('architecture.viewReportBtn')}</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive 4-Layer Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          const isSelected = selectedLayer === index;
          return (
            <button
              key={layer.id}
              onClick={() => setSelectedLayer(index)}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between h-36 relative overflow-hidden cursor-pointer ${
                isSelected 
                  ? 'border-emerald-700 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600/30' 
                  : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                  isSelected ? 'text-emerald-900' : 'text-stone-400'
                }`}>
                  Layer {index + 1}
                </span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-emerald-800 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className={`text-xs sm:text-sm font-bold leading-snug ${isSelected ? 'text-emerald-950' : 'text-stone-800'}`}>
                  {layer.title}
                </h3>
                <p className="text-[11px] text-stone-500 mt-0.5 truncate">{layer.subtitle}</p>
              </div>

              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-700" />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Active Layer Detailed Analysis Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
              <Zap className="w-3.5 h-3.5 text-emerald-700" />
              {t('architecture.activeInspection')} &middot; {activeLayerData.title}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              {activeLayerData.subtitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
              {activeLayerData.description}
            </p>
          </div>

          <div className="text-xs bg-stone-50 border border-stone-200 p-3 rounded-2xl shrink-0">
            <span className="text-stone-400 block font-medium">{t('architecture.reportRefLabel')}</span>
            <strong className="text-emerald-900 font-semibold">{activeLayerData.reportRef}</strong>
          </div>
        </div>

        {/* Responsibilities & Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              {t('architecture.responsibilitiesTitle')}
            </h3>
            <ul className="space-y-2.5">
              {activeLayerData.responsibilities.map((resp, i) => (
                <li key={i} className="text-xs sm:text-sm text-stone-700 bg-stone-50/80 p-3.5 rounded-2xl border border-stone-100 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5 mb-3">
                <Cpu className="w-4 h-4 text-blue-700" />
                {t('architecture.techStackTitle')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeLayerData.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Special Highlight for External / Dual-tier Guardrail */}
            {selectedLayer === 3 && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
                  <PhoneCall className="w-4 h-4 text-amber-700" />
                  {t('architecture.guardrailCardTitle')}
                </div>
                <p className="text-xs leading-relaxed text-amber-900/80">
                  {t('architecture.guardrailCardDesc')}
                </p>
              </div>
            )}

            {/* Future Scope roadmap */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
              <span className="font-bold text-stone-900 block">{t('architecture.phase2Title')}</span>
              <p className="leading-relaxed">{t('architecture.phase2Desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Platform Architectural Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs text-center">
          <p className="text-[11px] text-stone-500 font-bold uppercase tracking-wider">{t('architecture.statArbitrageTitle')}</p>
          <p className="text-2xl font-black text-emerald-800 mt-1">15% – 25%</p>
          <span className="text-[11px] text-stone-500">Delivered directly to farmer</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs text-center">
          <p className="text-[11px] text-stone-500 font-bold uppercase tracking-wider">{t('architecture.statIdleTitle')}</p>
          <p className="text-2xl font-black text-amber-700 mt-1">~40%</p>
          <span className="text-[11px] text-stone-500">Via custom hiring matching</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs text-center">
          <p className="text-[11px] text-stone-500 font-bold uppercase tracking-wider">{t('architecture.statDiscoveryTitle')}</p>
          <p className="text-2xl font-black text-blue-800 mt-1">&lt; 48 Hours</p>
          <span className="text-[11px] text-stone-500">From listing to direct bilateral contact</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs text-center">
          <p className="text-[11px] text-stone-500 font-bold uppercase tracking-wider">{t('architecture.statGuardrailTitle')}</p>
          <p className="text-2xl font-black text-purple-800 mt-1">100% Triage</p>
          <span className="text-[11px] text-stone-500">Statutory hotline escalation</span>
        </div>
      </div>

    </div>
  );
}
