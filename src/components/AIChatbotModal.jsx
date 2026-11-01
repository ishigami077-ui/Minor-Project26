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
import { useLanguage } from '../i18n/LanguageContext';

export function AIChatbotModal({ isOpen, onClose, onOpenProduceModal, onNavigateToTab }) {
  const { lang, t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      sender: 'bot',
      text: t('ai.welcome'),
      timestamp: lang === 'hi' ? 'अभी' : 'Just now'
    }
  ]);

  // When language changes, update the initial welcome message if it's the only one
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{
          id: 'welcome',
          sender: 'bot',
          text: t('ai.welcome'),
          timestamp: lang === 'hi' ? 'अभी' : 'Just now'
        }];
      }
      return prev;
    });
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const suggestedQueries = [
    { label: t('ai.chipWheat'), type: 'tier1', text: lang === 'hi' ? 'किसान सेतु पर अपनी कटी हुई गेहूं की फसल कैसे दर्ज करें?' : 'How do I list my harvested wheat on the platform?' },
    { label: t('ai.chipMachinery'), type: 'tier1', text: lang === 'hi' ? 'प्रमाणित चालक के साथ ट्रैक्टर या जेसीबी कैसे किराए पर लें?' : 'How can I hire a tractor or JCB with a certified operator?' },
    { label: t('ai.chipMsp'), type: 'tier1', text: lang === 'hi' ? 'महाराष्ट्र में सोयाबीन का न्यूनतम समर्थन मूल्य (MSP) क्या है?' : 'What is the government MSP benchmark for Soybean in Maharashtra?' },
    { label: t('ai.chipBollworm'), type: 'tier2_agri', text: lang === 'hi' ? 'कपास की फसल में गुलाबी सुंडी का भारी प्रकोप है, कौन सा कीटनाशक छिड़कें?' : 'My cotton crop is infested with pink bollworm. Which pesticide should I spray?' },
    { label: t('ai.chipLegal'), type: 'tier2_legal', text: lang === 'hi' ? 'खरीदार ने खेत से माल उठा लिया लेकिन भुगतान नहीं किया, क्या कानूनी कार्रवाई संभव है?' : 'A buyer unloaded my produce lot but is refusing to pay the remaining balance. Can I file a complaint?' },
  ];

  const handleSend = (userText) => {
    const query = userText || inputText.trim();
    if (!query) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: lang === 'hi' ? 'अभी' : 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const qLower = query.toLowerCase();
      let botResponse = {};

      // Tier 2: Agronomic / Chemical / Disease
      if (
        qLower.includes('bollworm') || 
        qLower.includes('सुंडी') ||
        qLower.includes('pesticide') || 
        qLower.includes('कीटनाशक') ||
        qLower.includes('disease') || 
        qLower.includes('रोग') ||
        qLower.includes('spray') || 
        qLower.includes('छिड़काव') ||
        qLower.includes('fungus') ||
        qLower.includes('insect')
      ) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          isTier2: true,
          tierType: 'agri',
          text: lang === 'hi' 
            ? `**⚠️ सुरक्षा दिशानिर्देश सूचना (स्तर-2 कृषि रोग एवं रासायनिक परामर्श)**\n\nरासायनिक कीटनाशक, फफूंदनाशक या रोग निदान की सटीक सलाह हेतु खेत का प्रत्यक्ष निरीक्षण अनिवार्य है। आपकी फसल सुरक्षा और पर्यावरण संतुलन हेतु, किसान सेतु इस प्रश्न को सीधे प्रमाणित सरकारी कृषि वैज्ञानिकों को निर्देशित करता है:`
            : `**⚠️ Safety Triage Notice (Tier-2 Agronomic Query)**\n\nPrescribing chemical pesticides, fungicides, or crop diagnostics requires certified ground inspection. To protect your crop yield and environmental safety, Kisan Setu redirects this inquiry to certified government agronomists:`,
          helplineName: lang === 'hi' ? 'किसान कॉल सेंटर (कृषि एवं किसान कल्याण मंत्रालय)' : 'Kisan Call Center (Ministry of Agriculture)',
          helplineNumber: '1800-180-1551',
          helplineDesc: lang === 'hi' 
            ? 'निःशुल्क (टोल-फ्री), 24x7 सेवा - हिंदी, मराठी और 20 अन्य क्षेत्रीय भाषाओं में प्रमाणित कृषि वैज्ञानिकों द्वारा सलाह।'
            : 'Toll-free, 24x7 support in Hindi, Marathi, and 20 other regional languages by verified agricultural scientists.',
          timestamp: lang === 'hi' ? 'अभी' : 'Just now'
        };
      } 
      // Tier 2: Legal / Disputes
      else if (
        qLower.includes('default') || 
        qLower.includes('भुगतान') ||
        qLower.includes('cheat') || 
        qLower.includes('धोखा') ||
        qLower.includes('police') || 
        qLower.includes('court') || 
        qLower.includes('कानूनी') ||
        qLower.includes('refusing to pay')
      ) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          isTier2: true,
          tierType: 'legal',
          text: lang === 'hi'
            ? `**⚠️ सुरक्षा दिशानिर्देश सूचना (स्तर-2 कानूनी मध्यस्थता एवं विवाद)**\n\nअनुबंध उल्लंघन और भुगतान विवादों का समाधान राज्य कृषि उपज मंडी (विनियमन) अधिनियम और जिला विधिक सेवा प्राधिकरण के वैधानिक नियमों के तहत किया जाता है:`
            : `**⚠️ Safety Triage Notice (Tier-2 Legal / Dispute Resolution)**\n\nContractual breaches and non-payment require statutory arbitration under the State Agricultural Produce Marketing (Regulation) Act and District Legal Services Authority:`,
          helplineName: lang === 'hi' ? 'एपीएमसी शिकायत निवारण प्रकोष्ठ एवं राष्ट्रीय विधिक सेवा' : 'APMC Grievance Cell & National Legal Services',
          helplineNumber: '15100',
          helplineDesc: lang === 'hi'
            ? 'भारतीय किसानों के लिए निःशुल्क कानूनी परामर्श। आप अपने नजदीकी सावनेर/नागपुर एपीएमसी सचिव के पास भी औपचारिक शिकायत दर्ज कर सकते हैं।'
            : 'Free legal counseling for Indian farmers. You can also file a formal breach report with your local Saoner/Nagpur APMC Secretary.',
          timestamp: lang === 'hi' ? 'अभी' : 'Just now'
        };
      } 
      // Tier 1: Listing crops
      else if (qLower.includes('wheat') || qLower.includes('गेहूं') || qLower.includes('list') || qLower.includes('दर्ज') || qLower.includes('harvest') || qLower.includes('फसल')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: lang === 'hi'
            ? `### किसान सेतु पर फसल लॉट दर्ज करने की प्रक्रिया:\n\n1. **किसान प्रबंधन डेस्क** पर जाएं या पीले **"नई फसल लॉट दर्ज करें"** बटन पर क्लिक करें।\n2. फसल का नाम (जैसे *शरबती गेहूं*) और किस्म चुनें।\n3. उपलब्ध कुल मात्रा (जैसे *150 क्विंटल*) और न्यूनतम ऑर्डर मात्रा (MOQ) दर्ज करें।\n4. अपनी अपेक्षित खेत मांग दर (₹/क्विंटल) भरें। प्लेटफ़ॉर्म स्वतः स्थानीय मंडी भाव से तुलना प्रदर्शित करेगा।\n5. फोटो चुनकर **प्रकाशित करें** पर क्लिक करें। आपकी फसल तुरंत सभी थोक खरीदारों को दिखाई देगी!`
            : `### How to List Agricultural Produce on Kisan Setu:\n\n1. Go to the **Producer Desk** or click the yellow **"List New Harvest Lot"** button.\n2. Enter the crop name (e.g. *Sharbati Wheat*), category, and variety.\n3. Specify total available volume (e.g. *150 Quintals*) and Minimum Order Quantity (MOQ).\n4. Enter your expected farm gate price per quintal. The platform will automatically benchmark it against official Mandi MSP rates.\n5. Select a photo or preset, and click **Publish** to make it instantly visible to bulk buyers!`,
          actionType: 'produce_modal',
          actionText: lang === 'hi' ? 'फसल सूची फॉर्म खोलें' : 'Open Produce Listing Form',
          timestamp: lang === 'hi' ? 'अभी' : 'Just now'
        };
      } 
      // Tier 1: Equipment / Machinery
      else if (qLower.includes('tractor') || qLower.includes('ट्रैक्टर') || qLower.includes('jcb') || qLower.includes('जेसीबी') || qLower.includes('harvester') || qLower.includes('हार्वेस्टर') || qLower.includes('मशीन')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: lang === 'hi'
            ? `### किसान सेतु पर कृषि मशीनरी किराए पर लेने की प्रक्रिया:\n\n- **कृषि उपकरण एवं किराया** टैब पर जाएँ।\n- मशीनरी श्रेणी चुनें: *ट्रैक्टर, कम्बाइन हार्वेस्टर, जेसीबी, रोटावेटर या कृषि ड्रोन*।\n- **"टर्नकी सेवा (अनुभवी चालक सहित)"** अथवा **"स्वयं-चालन किराया"** विकल्प चुनें।\n- सेवा का दायरा (15 से 40 किमी) देखें।\n- उपकरण स्वामी से तत्काल सीधी बातचीत हेतु **"बुकिंग / संपर्क"** पर क्लिक करें!`
            : `### Hiring Farm Machinery on Kisan Setu:\n\n- Visit the **Machinery & Rentals** tab.\n- Filter by equipment category: *Tractors, Harvesters, JCBs, Tillers, or Agri-Drones*.\n- Choose between **"Turnkey Service (With Certified Operator)"** or **"Self-Drive Rental"**.\n- Check the service radius (typically 25–40 km from base hub).\n- Click **"Book / Inquire"** to initiate instant bilateral chat with the equipment owner!`,
          actionType: 'nav_equipment',
          actionText: lang === 'hi' ? 'मशीनरी कैटलॉग देखें' : 'Go to Machinery Catalog',
          timestamp: lang === 'hi' ? 'अभी' : 'Just now'
        };
      } 
      // Tier 1: MSP
      else if (qLower.includes('msp') || qLower.includes('भाव') || qLower.includes('मूल्य') || qLower.includes('soybean') || qLower.includes('सोयाबीन') || qLower.includes('मंडी')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: lang === 'hi'
            ? `### वर्तमान सत्र के सरकारी मंडी न्यूनतम समर्थन मूल्य (MSP):\n\n- **सोयाबीन (पीला):** ₹4,892 / क्विंटल (सरकारी MSP)\n- **शरबती गेहूं (ग्रेड A):** ₹2,425 / क्विंटल\n- **कपास (मध्यम रेशा):** ₹7,121 / क्विंटल\n- **तुअर / अरहर दाल:** ₹7,550 / क्विंटल\n\n*किसान सेतु पर किसान सीधे थोक खरीदारों से सौदे करते हैं, जिससे पारंपरिक आढ़तियों की 15-20% दलाली समाप्त होती है और किसानों को मंडी से बेहतर मूल्य मिलता है।*`
            : `### Government Mandi MSP Benchmarks (Current Season):\n\n- **Soybean (Yellow):** ₹4,892 / Quintal (Govt MSP)\n- **Sharbati Wheat (Grade A):** ₹2,425 / Quintal\n- **Cotton (Medium Staple):** ₹7,121 / Quintal\n- **Tur / Arhar Dal:** ₹7,550 / Quintal\n\n*Kisan Setu allows farmers to negotiate prices at or above Mandi rates, eliminating the 15-20% commission fee charged by traditional arthiyas (middlemen).*`,
          timestamp: lang === 'hi' ? 'अभी' : 'Just now'
        };
      } 
      // General
      else {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: lang === 'hi'
            ? `संपर्क करने के लिए धन्यवाद! आप किसान सेतु का उपयोग निम्न कार्यों हेतु कर सकते हैं:\n\n- **फसल सीधे बेचें**: बिना बिचौलियों के थोक लॉट प्रकाशित करें।\n- **थोक उपज खरीदें**: किस्म, मात्रा और स्थान के आधार पर पारदर्शी खरीद।\n- **भारी मशीनरी किराए पर लें**: 35 किमी के दायरे में चालक सहित ट्रैक्टर व जेसीबी प्राप्त करें।\n- **सीधी बातचीत**: चैट हब में जवाबी प्रस्ताव भेजें।\n\nसुझाए गए विकल्पों पर क्लिक करें अथवा अपना प्रश्न पूछें!`
            : `Thank you for reaching out! You can use Kisan Setu to:\n\n- **Sell Crops Directly**: Post harvest lots without middlemen.\n- **Procure Bulk Lots**: Search verified crops with clear quantity, variety, and location.\n- **Rent Heavy Machinery**: Find tractors, harvesters, and JCBs within a 35 km radius.\n- **Negotiate**: Use the Messaging Hub to send counter-offers and confirm logistics.\n\nTry clicking one of the suggested query chips below or ask anything specific!`,
          timestamp: lang === 'hi' ? 'अभी' : 'Just now'
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 flex flex-col h-[650px] overflow-hidden">
        
        {/* Header */}
        <div className="bg-emerald-900 p-4 sm:p-5 text-white flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Bot className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">{t('ai.title')}</h3>
                <span className="px-2 py-0.2 rounded-full bg-emerald-950/80 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                  {t('ai.tag')}
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 leading-tight">{t('ai.subtitle')}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-stone-50 border-b border-stone-200/80 overflow-x-auto flex items-center gap-2 text-xs no-scrollbar">
          <span className="text-[10px] font-extrabold text-stone-500 uppercase shrink-0">{t('ai.tryAsking')}</span>
          {suggestedQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q.text)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                q.type.startsWith('tier2') 
                  ? 'bg-amber-100 text-amber-950 border border-amber-300 hover:bg-amber-200'
                  : 'bg-white text-emerald-900 border border-stone-200 hover:bg-emerald-50'
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-stone-50/30">
          {messages.map((m) => {
            const isBot = m.sender === 'bot';
            return (
              <div key={m.id} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
                <div
                  className={`max-w-[88%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    isBot 
                      ? 'bg-white border border-stone-200/90 text-stone-800 rounded-tl-xs' 
                      : 'bg-emerald-900 text-white rounded-br-xs'
                  }`}
                >
                  <div className="whitespace-pre-line prose-xs">{m.text}</div>

                  {/* Special Tier-2 Escalation Alert Card */}
                  {m.isTier2 && (
                    <div className="mt-3.5 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
                        <PhoneCall className="w-4 h-4 text-amber-700 animate-pulse" />
                        {m.helplineName}
                      </div>
                      <div className="text-base font-black text-amber-950 tracking-wide">
                        📞 {m.helplineNumber}
                      </div>
                      <p className="text-[11px] text-amber-900/80 leading-snug">
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
                      className="mt-3 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
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
                      className="mt-3 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
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
            <div className="flex items-center gap-2 text-xs text-stone-400 italic p-2">
              <span className="w-2 h-2 rounded-full bg-emerald-700 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-emerald-700 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-emerald-700 animate-bounce [animation-delay:0.4s]" />
              <span>{t('ai.generating')}</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-stone-200/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={t('ai.inputPlaceholder')}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-2xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm transition-colors shadow-2xs cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
