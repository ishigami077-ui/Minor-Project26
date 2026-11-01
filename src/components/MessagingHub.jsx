import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Phone, 
  CheckCheck, 
  Clock, 
  Sparkles, 
  User, 
  Tractor, 
  Sprout, 
  ShieldCheck, 
  DollarSign, 
  Tag, 
  PackageCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { useLanguage } from '../i18n/LanguageContext';

export function MessagingHub({ onShowNotification, activeConversationId }) {
  const { lang, t } = useLanguage();
  const currentUser = storageService.getCurrentUser();
  const [conversations, setConversations] = useState(storageService.getConversations());
  const [selectedConvId, setSelectedConvId] = useState(activeConversationId || conversations[0]?.id);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeConversationId) {
      setSelectedConvId(activeConversationId);
    }
  }, [activeConversationId]);

  const activeConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const content = textToSend || inputText.trim();
    if (!content || !activeConv) return;

    const userMessage = {
      id: `MSG-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: content,
      timestamp: lang === 'hi' ? 'अभी' : 'Just now'
    };

    const updated = storageService.addMessage(activeConv.id, userMessage);
    setConversations(updated);
    setInputText('');

    // Simulate counterparty reply with bilingual awareness
    setIsTyping(true);
    setTimeout(() => {
      let replyText = lang === 'hi'
        ? "नमस्ते! आपका प्रस्ताव प्राप्त हुआ। यदि आप सावनेर मंडी यार्ड से परिवहन की व्यवस्था करते हैं तो मुझे यह दर मान्य है।"
        : "Namaste! Received your note. I can honor this rate if you arrange transport from Saoner Mandi yard.";
      
      const cLower = content.toLowerCase();
      if (cLower.includes('sample') || cLower.includes('नमूना') || cLower.includes('quality') || cLower.includes('गुणवत्ता')) {
        replyText = lang === 'hi'
          ? "जी हाँ, 250 ग्राम सीलबंद नमूना तैयार है। आप या आपके सर्वेक्षक सावनेर में जांच कर सकते हैं अथवा मैं कूरियर कर सकता हूँ।"
          : "Sure! I have 250g sealed samples ready. You or your surveyor can inspect it at Saoner market or I can courier it.";
      } else if (cLower.includes('counter') || cLower.includes('₹') || cLower.includes('offer') || cLower.includes('प्रस्ताव')) {
        replyText = lang === 'hi'
          ? "आपके जवाबी प्रस्ताव के लिए धन्यवाद। वर्तमान मंडी दरों को ध्यान में रखते हुए, हम मध्य मार्ग निकाल सकते हैं। लदान पर 50% अग्रिम भुगतान तय करें?"
          : "Thank you for the counter-proposal. Considering current APMC Mandi rates, let us meet in the middle at fair market price. 50% advance on loading?";
      } else if (cLower.includes('dispatch') || cLower.includes('रवानगी') || cLower.includes('delivery')) {
        replyText = lang === 'hi'
          ? "सौदे की पुष्टि होते ही 48 घंटे में लॉरी लोडिंग करा दी जाएगी। स्थानीय ट्रांसपोर्ट यूनियन से ट्रक की दर ₹110 प्रति क्विंटल है।"
          : "Loading can be guaranteed within 48 hours of confirmation. Freight via local transport union is ₹110 per quintal within 80km.";
      } else if (activeConv.itemTitle?.toLowerCase().includes('jcb') || activeConv.itemTitle?.toLowerCase().includes('tractor') || activeConv.itemTitle?.includes('ट्रैक्टर')) {
        replyText = lang === 'hi'
          ? "मशीन और हमारे अनुभवी चालक कल सुबह 7:00 बजे आपके खेत पर पहुँच सकते हैं। कृपया डीजल उपलब्ध रखें अथवा सरकारी पंप दर पर देय होगा।"
          : "The machine and our certified driver can reach your field tomorrow by 7:00 AM sharp. Please ensure diesel is kept ready or billed at pump rates.";
      }

      const replyMsg = {
        id: `MSG-${Date.now() + 1}`,
        senderId: activeConv.participant?.id || 'PARTNER-SIM',
        senderName: activeConv.participant?.name || 'Seller',
        text: replyText,
        timestamp: lang === 'hi' ? 'अभी' : 'Just now'
      };

      const finalConvs = storageService.addMessage(activeConv.id, replyMsg);
      setConversations(finalConvs);
      setIsTyping(false);
      onShowNotification(lang === 'hi' ? `${activeConv.participant?.name} से नया संदेश` : `New message from ${activeConv.participant?.name}`);
    }, 1100);
  };

  const handleQuickOffer = (action) => {
    if (action === 'SAMPLE') {
      handleSendMessage(lang === 'hi' 
        ? "क्या आप 250 ग्राम गुणवत्ता निरीक्षण नमूना भेज सकते हैं या नमी मीटर रीडिंग का वीडियो साझा कर सकते हैं?" 
        : "Could you dispatch a 250g grain quality inspection sample or share high-resolution video of moisture meter reading?");
    } else if (action === 'DISPATCH') {
      handleSendMessage(lang === 'hi'
        ? "क्या आप अनुबंध पुष्टि के 48 घंटे के भीतर लदान और रवानगी की गारंटी दे सकते हैं?"
        : "Can you guarantee loading and dispatch within 48 hours upon contract confirmation?");
    } else if (action === 'OFFER_MINUS_50') {
      handleSendMessage(lang === 'hi'
        ? "मेरा औपचारिक जवाबी प्रस्ताव: तत्काल पूर्ण-लॉट खरीद हेतु उद्धृत मांग मूल्य से ₹50 कम प्रति क्विंटल।"
        : "My formal counter-offer: ₹50 below listed asking price per unit for immediate full-lot buyout.");
    } else if (action === 'ACCEPT') {
      handleSendMessage(lang === 'hi'
        ? "हमें आपकी उद्धृत दर स्वीकार है। कृपया टोकन अग्रिम हेतु प्रोफॉर्मा समझौता और बैंक विवरण भेजें।"
        : "We accept your quoted rate. Please send formal proforma agreement and bank details for token advance.");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden flex flex-col md:flex-row h-[750px] animate-fade-in">
      
      {/* Left Sidebar: Conversations List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-stone-200/80 flex flex-col shrink-0 bg-stone-50/50">
        
        {/* Sidebar Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200/80 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-800" />
              {t('messaging.title')}
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
              {conversations.length} {t('messaging.activeBadge')}
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-1">{t('messaging.subtitle')}</p>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
          {conversations.map((conv) => {
            const isSelected = conv.id === activeConv?.id;
            return (
              <button
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                className={`w-full text-left p-4 transition-all flex items-start gap-3.5 hover:bg-emerald-50/40 cursor-pointer ${
                  isSelected ? 'bg-emerald-50/80 border-l-4 border-emerald-700' : 'bg-white'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={conv.participant?.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80'}
                    alt={conv.participant?.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-stone-200"
                  />
                  <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[9px] ${
                    conv.participant?.role === 'farmer' ? 'bg-emerald-700 text-white' : 'bg-amber-600 text-white'
                  }`}>
                    {conv.participant?.role === 'farmer' ? '🌱' : '🚜'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h3 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                      {conv.participant?.name}
                    </h3>
                    <span className="text-[10px] text-stone-400 shrink-0 font-medium">
                      {conv.lastTimestamp}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 truncate mb-1">
                    <Tag className="w-2.5 h-2.5" /> {conv.itemTitle}
                  </div>

                  <p className="text-xs text-stone-500 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Footer */}
        <div className="p-3 bg-stone-100/70 border-t border-stone-200/80 text-[11px] text-stone-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{t('messaging.encryptedNote')}</span>
        </div>
      </div>

      {/* Right Pane: Active Chat Window */}
      {activeConv ? (
        <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
          
          {/* Chat Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200/80 flex items-center justify-between bg-white z-10 shadow-2xs">
            <div className="flex items-center gap-3">
              <img
                src={activeConv.participant?.avatar}
                alt={activeConv.participant?.name}
                className="w-11 h-11 rounded-2xl object-cover border border-stone-200 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-stone-900">{activeConv.participant?.name}</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    <ShieldCheck className="w-3 h-3" /> {lang === 'hi' ? 'सत्यापित' : 'Verified'}
                  </span>
                </div>
                <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                  <span>Re: <strong className="text-stone-800">{activeConv.itemTitle}</strong></span>
                  <span>&bull;</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {t('messaging.online')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onShowNotification(lang === 'hi' ? `${activeConv.participant?.name} को कॉल किया जा रहा है...` : `Simulating direct call with ${activeConv.participant?.name}...`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t('messaging.callDirectly')}</span>
              </button>
            </div>
          </div>

          {/* Quick Negotiation Action Pills */}
          <div className="px-4 py-2 bg-emerald-50/50 border-b border-emerald-100/70 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
            <span className="text-[10px] font-extrabold text-emerald-950 uppercase shrink-0">{t('messaging.quickActionLabel')}</span>
            <button
              onClick={() => handleQuickOffer('OFFER_MINUS_50')}
              className="px-2.5 py-1 rounded-full bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100 font-bold transition-colors shrink-0 cursor-pointer text-xs"
            >
              {t('messaging.offerMinus50')}
            </button>
            <button
              onClick={() => handleQuickOffer('SAMPLE')}
              className="px-2.5 py-1 rounded-full bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100 font-bold transition-colors shrink-0 cursor-pointer text-xs"
            >
              {t('messaging.requestSample')}
            </button>
            <button
              onClick={() => handleQuickOffer('DISPATCH')}
              className="px-2.5 py-1 rounded-full bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100 font-bold transition-colors shrink-0 cursor-pointer text-xs"
            >
              {t('messaging.confirmDispatch')}
            </button>
            <button
              onClick={() => handleQuickOffer('ACCEPT')}
              className="px-2.5 py-1 rounded-full bg-emerald-800 text-white hover:bg-emerald-700 font-bold transition-colors shrink-0 cursor-pointer text-xs"
            >
              {t('messaging.acceptRate')}
            </button>
          </div>

          {/* Messages Feed Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/40">
            {activeConv.messages?.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[11px] text-stone-400 font-medium px-1">
                    <span>{isMe ? (lang === 'hi' ? 'आप' : 'You') : msg.senderName}</span>
                    <span>&bull;</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      isMe
                        ? 'bg-emerald-900 text-white rounded-br-xs'
                        : 'bg-white border border-stone-200/90 text-stone-800 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-stone-500 italic p-2">
                <span className="w-2 h-2 rounded-full bg-emerald-700 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-700 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-700 animate-bounce [animation-delay:0.4s]" />
                <span>{activeConv.participant?.name} {lang === 'hi' ? 'उत्तर लिख रहे हैं...' : 'is typing response...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Box */}
          <div className="p-3 sm:p-4 bg-white border-t border-stone-200/90">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={t('messaging.typePlaceholder')}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-2xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">{t('messaging.sendBtn')}</span>
              </button>
            </form>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-stone-400">
          <p>{t('messaging.emptyPrompt')}</p>
        </div>
      )}

    </div>
  );
}
