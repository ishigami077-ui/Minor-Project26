import React, { useState, useRef, useEffect } from 'react';
import {
  Wheat,
  Tractor,
  Store,
  MessageSquare,
  Users,
  FileText,
  Layers,
  ChevronDown,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Languages,
  Check
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      
      {/* 1. Top Utility Strip */}
      <div className="bg-stone-900 text-stone-300 text-[11px] py-1.5 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-emerald-900/90 text-emerald-300 font-semibold text-[10px] uppercase tracking-wider border border-emerald-700/50">
              B.Tech CSE Capstone
            </span>
            <span className="truncate text-stone-300 font-medium">
              {t('brand.universityNotice')}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-medium">
            <button
              onClick={onOpenReportModal}
              className="text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('brand.viewReport')}</span>
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

      {/* 2. Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Tagline */}
          <div
            onClick={() => onTabChange('marketplace')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-colors">
              <Wheat className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-stone-900 leading-none">
                  {lang === 'hi' ? 'किसान सेतु' : 'Kisan Setu'}
                </span>
                <span className="text-xs font-semibold text-emerald-800 tracking-normal opacity-80">
                  {lang === 'hi' ? 'Kisan Setu' : 'किसान सेतु'}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium mt-0.5 hidden sm:block leading-none">
                {t('brand.tagline')}
              </p>
            </div>
          </div>

          {/* Navigation Items (Clean, No-Wrap Horizontal List) */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-100/90 p-1 rounded-xl border border-stone-200/80">
            <button
              onClick={() => onTabChange('marketplace')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'marketplace'
                  ? 'bg-white text-emerald-900 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('nav.produceMarket')}</span>
            </button>

            <button
              onClick={() => onTabChange('equipment')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'equipment'
                  ? 'bg-white text-emerald-900 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Tractor className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('nav.machinery')}</span>
            </button>

            {activeRole === 'farmer' && (
              <button
                onClick={() => onTabChange('farmer-desk')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'farmer-desk'
                    ? 'bg-white text-emerald-900 shadow-xs border border-stone-200'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Wheat className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t('nav.farmerDesk')}</span>
              </button>
            )}

            <button
              onClick={() => onTabChange('messages')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 relative whitespace-nowrap cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-white text-emerald-900 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              <span>{t('nav.messages')}</span>
              {unreadCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onTabChange('network')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'network'
                  ? 'bg-white text-emerald-900 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-purple-600" />
              <span>{t('nav.network')}</span>
            </button>

            <button
              onClick={() => onTabChange('architecture')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-white text-emerald-900 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-stone-600" />
              <span>{t('nav.architecture')}</span>
            </button>
          </nav>

          {/* Right Action Tools: Language Segment, Persona Switcher, AI Button */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Elegant Language Segmented Switcher */}
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
                className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100/70 text-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-200/80 cursor-pointer transition-all text-xs font-bold"
              >
                <span className="text-sm">{currentRoleObj.icon}</span>
                <span className="hidden sm:inline leading-tight">{currentRoleObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-800" />
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

          </div>

        </div>

        {/* Mobile Navigation Drawer Bar (visible on < lg screens) */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-stone-100 text-xs font-bold no-scrollbar">
          <button
            onClick={() => onTabChange('marketplace')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
              activeTab === 'marketplace' ? 'bg-emerald-800 text-white' : 'text-stone-600 bg-stone-100'
            }`}
          >
            {t('nav.produceMarket')}
          </button>
          <button
            onClick={() => onTabChange('equipment')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
              activeTab === 'equipment' ? 'bg-emerald-800 text-white' : 'text-stone-600 bg-stone-100'
            }`}
          >
            {t('nav.machinery')}
          </button>
          {activeRole === 'farmer' && (
            <button
              onClick={() => onTabChange('farmer-desk')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
                activeTab === 'farmer-desk' ? 'bg-emerald-800 text-white' : 'text-stone-600 bg-stone-100'
              }`}
            >
              {t('nav.farmerDesk')}
            </button>
          )}
          <button
            onClick={() => onTabChange('messages')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
              activeTab === 'messages' ? 'bg-emerald-800 text-white' : 'text-stone-600 bg-stone-100'
            }`}
          >
            {t('nav.messages')} {unreadCount > 0 ? `(${unreadCount})` : ''}
          </button>
          <button
            onClick={() => onTabChange('network')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
              activeTab === 'network' ? 'bg-emerald-800 text-white' : 'text-stone-600 bg-stone-100'
            }`}
          >
            {t('nav.network')}
          </button>
          <button
            onClick={() => onTabChange('architecture')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
              activeTab === 'architecture' ? 'bg-emerald-800 text-white' : 'text-stone-600 bg-stone-100'
            }`}
          >
            {t('nav.architecture')}
          </button>
        </div>

      </div>

    </header>
  );
}
