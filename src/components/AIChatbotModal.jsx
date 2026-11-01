import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  ExternalLink, 
  HelpCircle, 
  CheckCircle2, 
  Sprout, 
  Tractor, 
  RefreshCw 
} from 'lucide-react';

const SUGGESTED_QUERIES = [
  { label: '🌾 How do I list my wheat crop?', type: 'tier1', text: 'How do I list my harvested wheat on the platform?' },
  { label: '🚜 How to hire a JCB or tractor?', type: 'tier1', text: 'How can I hire a tractor or JCB with a certified operator?' },
  { label: '📊 What is current MSP for Soybean?', type: 'tier1', text: 'What is the government MSP benchmark for Soybean in Maharashtra?' },
  { label: '🐛 Crop disease: Pink bollworm on cotton', type: 'tier2_agri', text: 'My cotton crop is infested with pink bollworm. Which pesticide should I spray?' },
  { label: '⚖️ Legal: Buyer defaulted on payment', type: 'tier2_legal', text: 'A buyer unloaded my produce lot but is refusing to pay the remaining balance. Can I file a complaint?' },
];

export function AIChatbotModal({ isOpen, onClose, onOpenProduceModal, onNavigateToTab }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Namaste! I am **Kisan Sahayak (किसान सहायक)**, your AI guide for Kisan Setu. I can assist you with publishing produce lots, discovering farm machinery, and navigating platform features.\n\n*Note: In accordance with our safety guardrails, queries regarding crop diseases, chemical pesticide dosages, or legal disputes are routed directly to certified government helplines.*",
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (userText) => {
    const query = userText || inputText.trim();
    if (!query) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const qLower = query.toLowerCase();
      let botResponse = {};

      // Check for Tier 2: Agronomic / Chemical / Disease
      if (
        qLower.includes('bollworm') || 
        qLower.includes('pesticide') || 
        qLower.includes('disease') || 
        qLower.includes('spray') || 
        qLower.includes('fertilizer dosage') ||
        qLower.includes('fungus') ||
        qLower.includes('insect')
      ) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          isTier2: true,
          tierType: 'agri',
          text: `**⚠️ Safety Triage Notice (Tier-2 Agronomic Query)**\n\nPrescribing chemical pesticides, fungicides, or crop diagnostics requires certified ground inspection. To protect your crop yield and environmental safety, Kisan Setu redirects this inquiry to certified government agronomists:`,
          helplineName: 'Kisan Call Center (Ministry of Agriculture)',
          helplineNumber: '1800-180-1551',
          helplineDesc: 'Toll-free, 24x7 support in Hindi, Marathi, and 20 other regional languages by verified agricultural scientists.',
          timestamp: 'Just now'
        };
      } 
      // Check for Tier 2: Legal / Payment Disputes
      else if (
        qLower.includes('default') || 
        qLower.includes('cheat') || 
        qLower.includes('police') || 
        qLower.includes('court') || 
        qLower.includes('lawyer') || 
        qLower.includes('refusing to pay') ||
        qLower.includes('fraud')
      ) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          isTier2: true,
          tierType: 'legal',
          text: `**⚠️ Safety Triage Notice (Tier-2 Legal / Dispute Resolution)**\n\nContractual breaches and non-payment require statutory arbitration under the State Agricultural Produce Marketing (Regulation) Act and District Legal Services Authority:`,
          helplineName: 'APMC Grievance Cell & National Legal Services',
          helplineNumber: '15100',
          helplineDesc: 'Free legal counseling for Indian farmers. You can also file a formal breach report with your local Saoner/Nagpur APMC Secretary.',
          timestamp: 'Just now'
        };
      } 
      // Tier 1: Listing wheat / produce
      else if (qLower.includes('wheat') || qLower.includes('list') || qLower.includes('harvest') || qLower.includes('produce')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: `### How to List Agricultural Produce on Kisan Setu:\n\n1. Go to the **Producer Desk** or click the yellow **"List Harvest Lot"** button.\n2. Enter the crop name (e.g. *Sharbati Wheat*), category, and variety.\n3. Specify total available volume (e.g. *150 Quintals*) and Minimum Order Quantity (MOQ).\n4. Enter your expected farm gate price per quintal. The platform will automatically benchmark it against official Mandi MSP rates.\n5. Select a photo or preset, and click **Publish** to make it instantly visible to bulk buyers!`,
          actionType: 'produce_modal',
          actionText: 'Open Produce Listing Form',
          timestamp: 'Just now'
        };
      } 
      // Tier 1: Equipment / Machinery
      else if (qLower.includes('tractor') || qLower.includes('jcb') || qLower.includes('harvester') || qLower.includes('machinery') || qLower.includes('hire')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: `### Hiring Farm Machinery on Kisan Setu:\n\n- Visit the **Farm Machinery** tab.\n- Filter by equipment category: *Tractors, Harvesters, JCBs, Tillers, or Agri-Drones*.\n- Choose between **"Turnkey Service (With Certified Operator)"** or **"Self-Drive Rental"**.\n- Check the service radius (typically 25–40 km from base hub).\n- Click **"Book / Inquire"** to initiate instant bilateral chat with the equipment owner!`,
          actionType: 'nav_equipment',
          actionText: 'Go to Machinery Catalog',
          timestamp: 'Just now'
        };
      } 
      // Tier 1: MSP / Soybean
      else if (qLower.includes('msp') || qLower.includes('price') || qLower.includes('soybean') || qLower.includes('mandi')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: `### Government Mandi MSP Benchmarks (Current Season):\n\n- **Soybean (Yellow):** ₹4,892 / Quintal (Govt MSP)\n- **Sharbati Wheat (Grade A):** ₹2,425 / Quintal\n- **Cotton (Medium Staple):** ₹7,121 / Quintal\n- **Tur / Arhar Dal:** ₹7,550 / Quintal\n\n*Kisan Setu allows farmers to negotiate prices at or above Mandi rates, eliminating the 15-20% commission fee charged by traditional arthiyas (middlemen).*`,
          timestamp: 'Just now'
        };
      } 
      // General Help
      else {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: `Thank you for reaching out! You can use Kisan Setu to:\n\n- **Sell Crops Directly**: Post harvest lots without middlemen.\n- **Procure Bulk Lots**: Search verified crops with clear quantity, variety, and location.\n- **Rent Heavy Machinery**: Find tractors, harvesters, and JCBs within a 35 km radius.\n- **Negotiate**: Use the Messaging Hub to send counter-offers and confirm logistics.\n\nTry clicking one of the suggested query chips below or ask anything specific!`,
          timestamp: 'Just now'
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-gray-100 flex flex-col h-[650px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 p-4 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Bot className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">Kisan Sahayak (किसान सहायक)</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 text-[10px] font-semibold text-emerald-200 border border-emerald-400/30">
                  AI Guide
                </span>
              </div>
              <p className="text-xs text-emerald-100">Platform Navigator & Dual-Tier Safety Triage Assistant</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-emerald-50/50 border-b border-emerald-100/60 overflow-x-auto flex items-center gap-2 text-xs">
          <span className="text-[10px] font-bold text-emerald-900 uppercase shrink-0">Try asking:</span>
          {SUGGESTED_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q.text)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                q.type.startsWith('tier2') 
                  ? 'bg-amber-100 text-amber-900 border border-amber-200 hover:bg-amber-200'
                  : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gray-50/40">
          {messages.map((m) => {
            const isBot = m.sender === 'bot';
            return (
              <div key={m.id} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
                <div
                  className={`max-w-[88%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isBot 
                      ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none' 
                      : 'bg-emerald-800 text-white rounded-br-none'
                  }`}
                >
                  <div className="whitespace-pre-line prose-xs">{m.text}</div>

                  {/* Special Tier-2 Escalation Alert Card */}
                  {m.isTier2 && (
                    <div className="mt-3 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
                        <PhoneCall className="w-4 h-4 text-amber-700 animate-pulse" />
                        {m.helplineName}
                      </div>
                      <div className="text-base font-black text-amber-900 tracking-wide">
                        📞 {m.helplineNumber}
                      </div>
                      <p className="text-[11px] text-amber-800 leading-snug">
                        {m.helplineDesc}
                      </p>
                    </div>
                  )}

                  {/* Action Button if available */}
                  {m.actionType === 'produce_modal' && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenProduceModal();
                      }}
                      className="mt-3 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <Sprout className="w-3.5 h-3.5" />
                      {m.actionText}
                    </button>
                  )}

                  {m.actionType === 'nav_equipment' && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToTab('equipment');
                      }}
                      className="mt-3 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <Tractor className="w-3.5 h-3.5" />
                      {m.actionText}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-gray-400 italic p-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
              <span>Kisan Sahayak is generating guidance...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-gray-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about listings, Mandi rates, machinery, or safety..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
