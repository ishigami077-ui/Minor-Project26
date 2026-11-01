import React from 'react';
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
  ShieldCheck
} from 'lucide-react';

export function Header({
  activeRole,
  onRoleChange,
  activeTab,
  onTabChange,
  unreadCount,
  onOpenReportModal,
  onOpenChatbot
}) {
  const roles = [
    { id: 'farmer', label: 'Farmer Mode', icon: Wheat, desc: 'List crops, rent machines' },
    { id: 'customer', label: 'Bulk Buyer', icon: Store, desc: 'Procure bulk farm-gate lots' },
    { id: 'provider', label: 'Equipment Hub', icon: Tractor, desc: 'Rent JCBs, Tractors & Harvesters' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-amber-400 text-emerald-950 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
            B.Tech CSE Capstone
          </span>
          <span>Kisan Setu Prototype • G H Raisoni University, Saikheda</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-emerald-100">
          <button
            onClick={onOpenReportModal}
            className="hover:text-white underline decoration-emerald-400 underline-offset-2 flex items-center gap-1 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            Project Report (32 Pages)
          </button>
          <span>•</span>
          <button
            onClick={() => {
              if (window.confirm('Reset prototype data to default mock records?')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="hover:text-white flex items-center gap-1 cursor-pointer"
            title="Reset localStorage records"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Data
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => onTabChange('marketplace')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Wheat className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">Kisan Setu</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                  किसान सेतु
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Digital Agri-Marketplace & Mechanization Hub</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onTabChange('marketplace')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'marketplace'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-4 h-4 text-emerald-600" />
              Produce Market
            </button>

            <button
              onClick={() => onTabChange('equipment')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'equipment'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Tractor className="w-4 h-4 text-amber-600" />
              Machinery & Rentals
            </button>

            {activeRole === 'farmer' && (
              <button
                onClick={() => onTabChange('farmer-desk')}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'farmer-desk'
                    ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Wheat className="w-4 h-4 text-emerald-600" />
                My Farm Listings
              </button>
            )}

            <button
              onClick={() => onTabChange('messages')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 relative cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Direct Chat
              {unreadCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onTabChange('network')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'network'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-purple-600" />
              Followed Network
            </button>

            <button
              onClick={() => onTabChange('architecture')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-slate-600" />
              4-Tier Architecture
            </button>
          </nav>

          {/* Right Action Area: Role Selector & AI Trigger */}
          <div className="flex items-center gap-2.5">
            {/* AI Assistant Quick Pill */}
            <button
              onClick={onOpenChatbot}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
              <span>AI Sahayak (सहायक)</span>
            </button>

            {/* Persona Switcher Dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-200/80 cursor-pointer transition-all">
                <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                  {activeRole === 'farmer' ? '🌾' : activeRole === 'customer' ? '🛒' : '🚜'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold leading-tight capitalize flex items-center gap-1">
                    {activeRole === 'farmer'
                      ? 'Farmer Portal'
                      : activeRole === 'customer'
                      ? 'Bulk Buyer Desk'
                      : 'Equipment Provider'}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium leading-none">Switch Persona</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
              </div>

              {/* Persona Options Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 hidden group-hover:block transition-all z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Select Active Stakeholder Role
                </div>
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = activeRole === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => onRoleChange(r.id)}
                      className={`w-full px-3 py-2.5 flex items-start gap-3 hover:bg-slate-50 text-left transition-colors cursor-pointer ${
                        isSelected ? 'bg-emerald-50/60 font-semibold' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 flex items-center gap-1">
                          {r.label}
                          {isSelected && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />}
                        </div>
                        <div className="text-xs text-slate-500">{r.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 bg-slate-50 py-2 px-1 text-[11px] font-semibold text-slate-600">
        <button
          onClick={() => onTabChange('marketplace')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'marketplace' ? 'text-emerald-700 font-bold' : ''}`}
        >
          <Store className="w-4 h-4" />
          <span>Produce</span>
        </button>
        <button
          onClick={() => onTabChange('equipment')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'equipment' ? 'text-amber-700 font-bold' : ''}`}
        >
          <Tractor className="w-4 h-4" />
          <span>Machinery</span>
        </button>
        {activeRole === 'farmer' && (
          <button
            onClick={() => onTabChange('farmer-desk')}
            className={`flex flex-col items-center gap-0.5 ${activeTab === 'farmer-desk' ? 'text-emerald-700 font-bold' : ''}`}
          >
            <Wheat className="w-4 h-4" />
            <span>My Farm</span>
          </button>
        )}
        <button
          onClick={() => onTabChange('messages')}
          className={`flex flex-col items-center gap-0.5 relative ${activeTab === 'messages' ? 'text-blue-700 font-bold' : ''}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => onTabChange('architecture')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'architecture' ? 'text-purple-700 font-bold' : ''}`}
        >
          <Layers className="w-4 h-4" />
          <span>System</span>
        </button>
      </div>
    </header>
  );
}
