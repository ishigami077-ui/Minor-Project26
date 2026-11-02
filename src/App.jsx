import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProduceMarketplace } from './components/ProduceMarketplace';
import { EquipmentMarketplace } from './components/EquipmentMarketplace';
import { LiveMandiSection } from './components/LiveMandiSection';
import { LiveWeatherSection } from './components/LiveWeatherSection';
import { FarmerDashboard } from './components/FarmerDashboard';
import { MessagingHub } from './components/MessagingHub';
import { FollowedFeed } from './components/FollowedFeed';
import { ArchitectureView } from './components/ArchitectureView';
import { AddProduceModal } from './components/AddProduceModal';
import { AddEquipmentModal } from './components/AddEquipmentModal';
import { AIChatbotModal } from './components/AIChatbotModal';
import { ReportModal } from './components/ReportModal';
import { storageService } from './services/storageService';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { 
  Bot, 
  Sparkles, 
  Wheat, 
  Scale,
  CloudSun,
  GraduationCap, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Heart,
  GitBranch
} from 'lucide-react';

function MainApp() {
  const { lang, t } = useLanguage();
  const [activeRole, setActiveRole] = useState(storageService.getActiveRole() || 'farmer');
  const [activeTab, setActiveTab] = useState('marketplace');
  
  // Cross-Navigation & Search Filter
  const [produceFilterTerm, setProduceFilterTerm] = useState('');

  // Data State
  const [produceList, setProduceList] = useState(storageService.getProduceListings());
  const [equipmentList, setEquipmentList] = useState(storageService.getEquipmentListings());
  const [conversations, setConversations] = useState(storageService.getConversations());
  const [follows, setFollows] = useState(storageService.getFollows());
  
  // Modals & Navigation State
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isAddProduceOpen, setIsAddProduceOpen] = useState(false);
  const [isAddEquipmentOpen, setIsAddEquipmentOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  // Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleRoleChange = (newRole) => {
    storageService.setActiveRole(newRole);
    setActiveRole(newRole);
    const roleName = newRole === 'farmer' ? t('personas.farmer') : newRole === 'customer' ? t('personas.customer') : t('personas.provider');
    showNotification(lang === 'hi' ? `भूमिका बदली गई: ${roleName}` : `Switched persona to ${roleName}`);
  };

  const handleRefreshData = () => {
    setProduceList(storageService.getProduceListings());
    setEquipmentList(storageService.getEquipmentListings());
    setConversations(storageService.getConversations());
    setFollows(storageService.getFollows());
  };

  const handleContactItem = (item) => {
    const convId = storageService.startOrGetConversationWithItem(item, storageService.getCurrentUser());
    handleRefreshData();
    setActiveConversationId(convId);
    setActiveTab('messages');
    showNotification(lang === 'hi' ? `"${item.cropName || item.title}" हेतु बातचीत विंडो खुली` : `Opened negotiation channel for "${item.cropName || item.title}"`);
  };

  const handleToggleFollow = (target) => {
    const updated = storageService.toggleFollow(target);
    setFollows(updated);
    const isNow = updated.some(f => f.id === target.id);
    showNotification(isNow 
      ? (lang === 'hi' ? `${target.name} का अनुसरण प्रारंभ किया` : `Added ${target.name} to followed network`)
      : (lang === 'hi' ? `${target.name} का अनुसरण समाप्त किया` : `Removed ${target.name} from followed network`));
  };

  const isFollowing = (id) => follows.some(f => f.id === id);

  const handleNavigateToProduceWithCrop = (cropName) => {
    setProduceFilterTerm(cropName);
    setActiveTab('marketplace');
    showNotification(
      lang === 'hi'
        ? `बाज़ार में "${cropName}" के सक्रिय लॉट खोजे जा रहे हैं`
        : `Searching marketplace for "${cropName}" lots`
    );
  };

  return (
    <div className={`min-h-screen w-full max-w-full bg-[#faf9f6] flex flex-col text-stone-850 antialiased font-sans ${lang === 'hi' ? 'hindi-text' : ''}`}>
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 animate-in slide-in-from-top-4 fade-in duration-200">
          <div className="bg-stone-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-xl border border-stone-850 flex items-center gap-3 text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Global Header */}
      <Header
        activeRole={activeRole}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadCount={conversations.filter(c => c.unread).length}
        onOpenReportModal={() => setIsReportOpen(true)}
        onOpenChatbot={() => setIsChatbotOpen(true)}
      />

      {/* Dynamic Workspace Container - Full Width, Fluid, Centered */}
      <main className="flex-1 w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8">
        {activeTab === 'marketplace' && (
          <ProduceMarketplace
            produceList={produceList}
            onContactFarmer={handleContactItem}
            onToggleFollow={handleToggleFollow}
            isFollowing={isFollowing}
            onOpenAddProduceModal={() => setIsAddProduceOpen(true)}
            activeRole={activeRole}
            initialSearchTerm={produceFilterTerm}
          />
        )}

        {activeTab === 'equipment' && (
          <EquipmentMarketplace
            equipmentList={equipmentList}
            onBookEquipment={handleContactItem}
            onOpenAddEquipmentModal={() => setIsAddEquipmentOpen(true)}
            activeRole={activeRole}
          />
        )}

        {activeTab === 'mandi' && (
          <LiveMandiSection
            onNavigateToProduceWithCrop={handleNavigateToProduceWithCrop}
          />
        )}

        {activeTab === 'weather' && (
          <LiveWeatherSection />
        )}

        {activeTab === 'farmer-desk' && (
          <FarmerDashboard
            produceListings={produceList}
            onRefresh={handleRefreshData}
            onOpenAddModal={() => setIsAddProduceOpen(true)}
            onNavigateToTab={setActiveTab}
            onNavigateToMessages={() => setActiveTab('messages')}
            onShowNotification={showNotification}
          />
        )}

        {activeTab === 'messages' && (
          <MessagingHub
            onShowNotification={showNotification}
            activeConversationId={activeConversationId}
          />
        )}

        {activeTab === 'network' && (
          <FollowedFeed
            onNavigateToMessages={() => setActiveTab('messages')}
            onShowNotification={showNotification}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureView
            onOpenReportModal={() => setIsReportOpen(true)}
          />
        )}
      </main>

      {/* Floating Kisan Sahayak Assistant Button */}
      <aside aria-label="AI Platform Assistant" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-emerald-500/40 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
          </div>
          <span>{t('brand.aiAssistantBtn')}</span>
          <span className="text-[10px] bg-amber-400 text-stone-950 font-black px-1.5 py-0.2 rounded-full">
            AI
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-ping" />
        </button>
      </aside>

      {/* Global Modals */}
      <AddProduceModal
        isOpen={isAddProduceOpen}
        onClose={() => setIsAddProduceOpen(false)}
        onProduceAdded={handleRefreshData}
        onShowNotification={showNotification}
      />

      <AddEquipmentModal
        isOpen={isAddEquipmentOpen}
        onClose={() => setIsAddEquipmentOpen(false)}
        onEquipmentAdded={handleRefreshData}
        onShowNotification={showNotification}
      />

      <AIChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onOpenProduceModal={() => setIsAddProduceOpen(true)}
        onNavigateToTab={setActiveTab}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* Footer - Full Width, Centered */}
      <footer className="bg-white border-t border-stone-200 mt-16 py-10 w-full">
        <div className="w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-stone-100">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <Wheat className="w-5 h-5 text-emerald-800 shrink-0" />
                <span className="font-extrabold text-base text-stone-900">
                  {lang === 'hi' ? 'किसान सेतु (Kisan Setu)' : 'Kisan Setu (किसान सेतु)'}
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full shrink-0">
                  Minor Project 2026
                </span>
              </div>
              <p className="text-xs text-stone-500 max-w-xl leading-relaxed">
                {t('footer.desc')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-stone-600 shrink-0">
              <button 
                onClick={() => setActiveTab('mandi')}
                className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Scale className="w-4 h-4 text-emerald-700" />
                <span>{t('nav.mandi')}</span>
              </button>
              <button 
                onClick={() => setActiveTab('weather')}
                className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CloudSun className="w-4 h-4 text-sky-600" />
                <span>{t('nav.weather')}</span>
              </button>
              <button 
                onClick={() => setIsReportOpen(true)}
                className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                <span>{t('brand.viewReport')}</span>
              </button>
              <button 
                onClick={() => setActiveTab('architecture')}
                className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4 text-stone-600" />
                <span>{t('nav.architecture')}</span>
              </button>
              <a 
                href="https://github.com/ishigami077-ui/Minor-Project26" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-stone-900 flex items-center gap-1.5 transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-3 font-medium">
            <div>
              {t('footer.universityAttribution')}
            </div>
            <div>
              {t('footer.studentsAttribution')}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
