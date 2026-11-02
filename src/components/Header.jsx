import React, { useState, useRef, useEffect } from 'react';
import {
  Wheat,
  Tractor,
  Store,
  Scale,
  CloudSun,
  MessageSquare,
  Users,
  FileText,
  Layers,
  ChevronDown,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Check,
  Menu,
  X,
  Bot
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function Header({
  activeRole,
  onRoleChange,
  activeTab,
  onTabChange,
  unreadCount,
  onOpenReportModal,
  onOpenChatbot
}) {
  const { lang, setLanguage, t } = useLanguage();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsRoleDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles = [
    { id: 'farmer', label: t('personas.farmer'), desc: t('personas.farmerDesc'), icon: '🌾' },
    { id: 'customer', label: t('personas.customer'), desc: t('personas.customerDesc'), icon: '🏢' },
    { id: 'provider', label: t('personas.provider'), desc: t('personas.providerDesc'), icon: '🚜' }
  ];

  const currentRoleObj = roles.find((r) => r.id === activeRole) || roles[0];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'marketplace', label: t('nav.produceMarket'), icon: Store, color: 'text-emerald-600' },
    { id: 'equipment', label: t('nav.machinery'), icon: Tractor, color: 'text-amber-600' },
    { id: 'mandi', label: t('nav.mandi'), icon: Scale, color: 'text-emerald-700', badge: 'live' },
    { id: 'weather', label: t('nav.weather'), icon: CloudSun, color: 'text-sky-600' },
    ...(activeRole === 'farmer'
      ? [{ id: 'farmer-desk', label: t('nav.farmerDesk'), icon: Wheat, color: 'text-emerald-700' }]
      : []),
    { id: 'messages', label: t('nav.messages'), icon: MessageSquare, color: 'text-blue-600', count: unreadCount },
    { id: 'network', label: t('nav.network'), icon: Users, color: 'text-purple-600' },
    { id: 'architecture', label: t('nav.architecture'), icon: Layers, color: 'text-stone-600' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] w-full">
      
      {/* 1. Top Utility Strip */}
      <div className="bg-stone-900 text-stone-300 text-[11px] py-1.5 px-3 sm:px-6 lg:px-8 border-b border-stone-800 w-full">
        <div className="w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto flex items-center justify-between gap-3 overflow-hidden">
          <div className="flex items-center gap-2 truncate min-w-0">
            <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-emerald-900/90 text-emerald-300 font-semibold text-[10px] uppercase tracking-wider border border-emerald-700/50 shrink-0">
              B.Tech CSE Capstone
            </span>
            <span className="truncate text-stone-300 font-medium">
              {t('brand.universityNotice')}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0 font-medium">
            <button
              onClick={onOpenReportModal}
              className="text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{t('brand.viewReport')}</span>
              <span className="sm:hidden">Report</span>
            </button>
            <span className="text-stone-700">•</span>
            <button
              onClick={() => {
                if (window.confirm(t('brand.resetConfirm'))) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-1 cursor-pointer"
              title={t('brand.resetData')}
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">{t('brand.resetData')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Actions Header Bar */}
      <div className="w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-16 gap-3">
          
          {/* Brand Logo & Tagline */}
          <div
            onClick={() => handleTabClick('marketplace')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0 min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-colors shrink-0">
              <Wheat className="w-5 h-5 text-amber-300" />
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-stone-900 leading-none">
                  {lang === 'hi' ? 'किसान सेतु' : 'Kisan Setu'}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-emerald-800 tracking-normal opacity-80 hidden xs:inline">
                  {lang === 'hi' ? 'Kisan Setu' : 'किसान सेतु'}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium mt-0.5 hidden md:block leading-none truncate max-w-xs">
                {t('brand.tagline')}
              </p>
            </div>
          </div>

          {/* Right Action Tools: Language, AI Button, Persona Switcher, Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Language Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-lg bg-stone-100 border border-stone-200/90 text-xs font-semibold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  lang === 'hi'
                    ? 'bg-white text-emerald-900 shadow-xs font-hindi'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="हिंदी में बदलें"
              >
                हिंदी
              </button>
            </div>

            {/* AI Assistant Quick Pill */}
            <button
              onClick={onOpenChatbot}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 text-amber-950 border border-amber-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('brand.aiAssistantBtn')}</span>
            </button>

            {/* Persona Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-1.5 sm:gap-2 bg-emerald-50 hover:bg-emerald-100/70 text-emerald-950 px-2.5 sm:px-3 py-1.5 rounded-xl border border-emerald-200/80 cursor-pointer transition-all text-xs font-bold"
              >
                <span className="text-sm">{currentRoleObj.icon}</span>
                <span className="hidden md:inline leading-tight truncate max-w-[120px]">{currentRoleObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-100">
                    {t('personas.switchLabel')}
                  </div>
                  <div className="divide-y divide-stone-50 mt-1">
                    {roles.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          onRoleChange(r.id);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                          activeRole === r.id ? 'bg-emerald-50 text-emerald-950' : 'hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <span className="text-xl shrink-0 mt-0.5">{r.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold flex items-center justify-between">
                            <span>{r.label}</span>
                            {activeRole === r.id && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">{r.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>
      </div>

      {/* 3. Primary Horizontal Navigation Bar (Fluid, Full Width, No Overflow) */}
      <div className="border-t border-stone-200/80 bg-stone-50/70 backdrop-blur-xs w-full">
        <div className="w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1.5 text-xs font-bold w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-white text-emerald-900 shadow-xs border border-stone-200'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span>{item.label}</span>
                  {item.badge === 'live' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
                  )}
                  {item.count > 0 && (
                    <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse ml-0.5">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 4. Responsive Mobile Drawer (when hamburger clicked) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                  <span className="truncate">{item.label}</span>
                  {item.badge === 'live' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-auto" />
                  )}
                  {item.count > 0 && (
                    <span className="ml-auto px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px]">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick AI Button in mobile drawer */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenChatbot();
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs border border-amber-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{t('brand.aiAssistantBtn')}</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
