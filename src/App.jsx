import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProduceMarketplace } from './components/ProduceMarketplace';
import { EquipmentMarketplace } from './components/EquipmentMarketplace';
import { FarmerDashboard } from './components/FarmerDashboard';
import { MessagingHub } from './components/MessagingHub';
import { FollowedFeed } from './components/FollowedFeed';
import { ArchitectureView } from './components/ArchitectureView';
import { AddProduceModal } from './components/AddProduceModal';
import { AddEquipmentModal } from './components/AddEquipmentModal';
import { AIChatbotModal } from './components/AIChatbotModal';
import { ReportModal } from './components/ReportModal';
import { storageService } from './services/storageService';
import { 
  Bot, 
  Sparkles, 
  Wheat, 
  GraduationCap, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Heart,
  Github
} from 'lucide-react';

export default function App() {
  const [activeRole, setActiveRole] = useState(storageService.getActiveRole() || 'farmer');
  const [activeTab, setActiveTab] = useState('marketplace');
  
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
    }, 3800);
  };

  const handleRoleChange = (newRole) => {
    storageService.setActiveRole(newRole);
    setActiveRole(newRole);
    showNotification(`Switched persona to ${newRole === 'farmer' ? 'Farmer Mode' : newRole === 'customer' ? 'Bulk Buyer Desk' : 'Equipment Provider'}`);
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
    showNotification(`Opened negotiation channel for "${item.cropName || item.title}"`);
  };

  const handleToggleFollow = (target) => {
    const updated = storageService.toggleFollow(target);
    setFollows(updated);
    const isNow = updated.some(f => f.id === target.id);
    showNotification(isNow ? `Added ${target.name} to followed network` : `Removed ${target.name} from followed network`);
  };

  const isFollowing = (id) => follows.some(f => f.id === id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased font-sans">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 text-xs sm:text-sm font-medium">
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

      {/* Dynamic Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'marketplace' && (
          <ProduceMarketplace
            produceList={produceList}
            onContactFarmer={handleContactItem}
            onToggleFollow={handleToggleFollow}
            isFollowing={isFollowing}
            onOpenAddProduceModal={() => setIsAddProduceOpen(true)}
            activeRole={activeRole}
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
          className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-700 to-green-600 text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-emerald-400/40"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="hidden sm:inline">Kisan Sahayak</span>
          <span className="text-xs bg-amber-400 text-gray-950 font-black px-1.5 py-0.5 rounded-full">
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

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Wheat className="w-5 h-5 text-emerald-600" />
                <span className="font-extrabold text-base text-slate-900">Kisan Setu (किसान सेतु)</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Minor Project 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-xl">
                Digital Agricultural Marketplace and Farmer Support Platform designed for direct farm-gate commodity trade, agricultural equipment custom hiring, and safe AI onboarding.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <button 
                onClick={() => setIsReportOpen(true)}
                className="hover:text-emerald-700 flex items-center gap-1 transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                University Project Report (32 Pages)
              </button>
              <button 
                onClick={() => setActiveTab('architecture')}
                className="hover:text-emerald-700 flex items-center gap-1 transition-colors"
              >
                <Layers className="w-4 h-4 text-blue-600" />
                4-Layer Architecture
              </button>
              <a 
                href="https://github.com/ishigami077-ui/Minor-Project26" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-slate-900 flex items-center gap-1 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub Repository
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-3">
            <div>
              Department of Computer Science and Engineering &middot; <strong>G H Raisoni University, Saikheda</strong>
            </div>
            <div>
              Students: Misty J. &middot; Namrata J. &middot; Naved M. &middot; Neel T. &middot; Supervised by: <strong>Dr. Rahul Khokale</strong>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
