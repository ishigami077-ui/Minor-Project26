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

export function MessagingHub({ onShowNotification, activeConversationId }) {
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
      timestamp: 'Just now'
    };

    const updated = storageService.addMessage(activeConv.id, userMessage);
    setConversations(updated);
    setInputText('');

    // Simulate counterparty reply
    setIsTyping(true);
    setTimeout(() => {
      let replyText = "Namaste! Received your note. I can honor this rate if you arrange transport from Saoner Mandi yard.";
      
      if (content.toLowerCase().includes('sample') || content.toLowerCase().includes('quality')) {
        replyText = "Sure! I have 250g sealed samples ready. You or your surveyor can inspect it at Saoner market or I can courier it.";
      } else if (content.toLowerCase().includes('counter') || content.toLowerCase().includes('₹') || content.toLowerCase().includes('offer')) {
        replyText = "Thank you for the counter-proposal. Considering current APMC Mandi rates, let us meet in the middle at fair market price. 50% advance on loading?";
      } else if (content.toLowerCase().includes('delivery') || content.toLowerCase().includes('truck')) {
        replyText = "We have access to 10-wheeler lorries through local transport union. Estimated freight is ₹110 per quintal within 80km.";
      } else if (activeConv.itemTitle?.toLowerCase().includes('jcb') || activeConv.itemTitle?.toLowerCase().includes('tractor')) {
        replyText = "The machine and our certified driver can reach your field tomorrow by 7:00 AM sharp. Please ensure diesel is kept ready or we can bill it at standard pump rates.";
      }

      const replyMsg = {
        id: `MSG-${Date.now() + 1}`,
        senderId: activeConv.participant?.id || 'PARTNER-SIM',
        senderName: activeConv.participant?.name || 'Seller',
        text: replyText,
        timestamp: 'Just now'
      };

      const finalConvs = storageService.addMessage(activeConv.id, replyMsg);
      setConversations(finalConvs);
      setIsTyping(false);
      onShowNotification(`New message from ${activeConv.participant?.name}`);
    }, 1100);
  };

  const handleQuickOffer = (action) => {
    if (action === 'SAMPLE') {
      handleSendMessage("Could you dispatch a 250g grain quality inspection sample or share high-resolution video of moisture meter reading?");
    } else if (action === 'DISPATCH') {
      handleSendMessage("Can you guarantee loading and dispatch within 48 hours upon contract confirmation?");
    } else if (action === 'OFFER_MINUS_50') {
      handleSendMessage("My formal counter-offer: ₹50 below listed asking price per unit for immediate full-lot buyout.");
    } else if (action === 'ACCEPT') {
      handleSendMessage("We accept your quoted rate. Please send formal proforma agreement and bank details for token advance.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-[750px]">
      
      {/* Left Sidebar: Conversations List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col shrink-0 bg-gray-50/50">
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              Direct Negotiation Hub
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {conversations.length} Active
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Direct communication between farmers, buyers & providers</p>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {conversations.map((conv) => {
            const isSelected = conv.id === activeConv?.id;
            return (
              <button
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                className={`w-full text-left p-4 transition-all flex items-start gap-3.5 hover:bg-emerald-50/40 ${
                  isSelected ? 'bg-emerald-50/80 border-l-4 border-emerald-600' : 'bg-white'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={conv.participant?.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80'}
                    alt={conv.participant?.name}
                    className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                  />
                  <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[9px] ${
                    conv.participant?.role === 'farmer' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                  }`}>
                    {conv.participant?.role === 'farmer' ? '🌱' : '🚜'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h3 className="text-sm font-bold text-gray-900 truncate">
                      {conv.participant?.name}
                    </h3>
                    <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                      {conv.lastTimestamp}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 truncate mb-1">
                    <Tag className="w-2.5 h-2.5" /> {conv.itemTitle}
                  </div>

                  <p className="text-xs text-gray-500 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Footer */}
        <div className="p-3 bg-gray-100/70 border-t border-gray-200 text-[11px] text-gray-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Encrypted negotiation channel protected by Kisan Setu terms.</span>
        </div>
      </div>

      {/* Right Pane: Active Chat Window */}
      {activeConv ? (
        <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white z-10 shadow-xs">
            <div className="flex items-center gap-3">
              <img
                src={activeConv.participant?.avatar}
                alt={activeConv.participant?.name}
                className="w-11 h-11 rounded-xl object-cover border border-gray-200 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-gray-900">{activeConv.participant?.name}</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    <ShieldCheck className="w-3 h-3" /> Verified {activeConv.participant?.role === 'farmer' ? 'Farmer' : 'Provider'}
                  </span>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                  <span>Re: <strong className="text-gray-800">{activeConv.itemTitle}</strong></span>
                  <span>&bull;</span>
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onShowNotification(`Simulating call with ${activeConv.participant?.name}...`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Call Directly
              </button>
            </div>
          </div>

          {/* Quick Negotiation Action Pills */}
          <div className="px-4 py-2 bg-emerald-50/40 border-b border-emerald-100/60 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[11px] font-bold text-emerald-900 uppercase shrink-0">Quick Action:</span>
            <button
              onClick={() => handleQuickOffer('OFFER_MINUS_50')}
              className="px-2.5 py-1 rounded-full bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-semibold transition-colors shrink-0"
            >
              Counter: -₹50 / Qtl
            </button>
            <button
              onClick={() => handleQuickOffer('SAMPLE')}
              className="px-2.5 py-1 rounded-full bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-semibold transition-colors shrink-0"
            >
              Request 250g Quality Sample
            </button>
            <button
              onClick={() => handleQuickOffer('DISPATCH')}
              className="px-2.5 py-1 rounded-full bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-semibold transition-colors shrink-0"
            >
              Confirm 48-hr Dispatch
            </button>
            <button
              onClick={() => handleQuickOffer('ACCEPT')}
              className="px-2.5 py-1 rounded-full bg-emerald-700 text-white hover:bg-emerald-800 font-bold transition-colors shrink-0"
            >
              Accept Quoted Rate
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/30">
            {activeConv.messages?.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[11px] text-gray-400 font-medium px-1">
                    <span>{isMe ? 'You' : msg.senderName}</span>
                    <span>&bull;</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-xs ${
                      isMe
                        ? 'bg-emerald-800 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-gray-500 italic p-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                <span>{activeConv.participant?.name} is typing response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Box */}
          <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={`Type a negotiation message or inquiry for ${activeConv.participant?.name}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-gray-400">
          <p>Select a conversation from the left to start negotiating.</p>
        </div>
      )}

    </div>
  );
}
