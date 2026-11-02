import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Sprout, 
  Tractor, 
  MapPin, 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Bell, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { useLanguage } from '../i18n/LanguageContext';

export function FollowedFeed({ onNavigateToMessages, onShowNotification }) {
  const { lang, t } = useLanguage();
  const [follows, setFollows] = useState(storageService.getFollows());
  const [filterType, setFilterType] = useState('ALL');

  const handleToggle = (item) => {
    const updated = storageService.toggleFollow(item);
    setFollows(updated);
    const isNow = updated.some(f => f.id === item.id);
    onShowNotification(isNow ? `${item.name} followed` : `${item.name} unfollowed`);
  };

  const displayedFollows = follows.filter(f => {
    if (filterType === 'ALL') return true;
    return f.type?.toUpperCase() === filterType;
  });

  const recommendations = [
    {
      id: 'REC-1',
      name: lang === 'hi' ? 'विदर्भ ऑर्गेनिक दलहन उत्पादक कंपनी' : 'Vidarbha Organic Pulses Producer Co.',
      type: 'farmer',
      location: 'Katol, Nagpur, Maharashtra',
      crops: lang === 'hi' ? 'जैविक तुअर दाल, चना, मूंग' : 'Organic Tur Dal, Chana, Moong',
      rating: 4.95,
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    {
      id: 'REC-2',
      name: lang === 'hi' ? 'श्री राम कस्टम हायरिंग सेंटर (ड्रोन एवं हार्वेस्टर)' : 'Shree Ram Custom Hiring Center (Drones & Harvesters)',
      type: 'provider',
      location: 'Kalmeshwar, Nagpur',
      crops: lang === 'hi' ? '6 कृषि ड्रोन एवं 3 कम्बाइन हार्वेस्टर' : 'Fleet of 6 Drones & 3 Claas Harvesters',
      rating: 4.88,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    {
      id: 'REC-3',
      name: lang === 'hi' ? 'सावनेर संतरा एवं सिट्रस किसान संघ' : 'Saoner Citrus & Orange Farmers Alliance',
      type: 'farmer',
      location: 'Saoner, Nagpur',
      crops: lang === 'hi' ? 'जीआई टैग नागपुरी संतरा' : 'GI Tagged Nagpur Mandarin Oranges',
      rating: 4.92,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      verified: true
    }
  ];

  return (
    <div className="w-full max-w-full space-y-8 animate-fade-in">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-stone-900 rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            {t('network.badge')}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t('network.title')}
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {t('network.subtitle')}
          </p>
        </div>
      </div>

      {/* 2. Filter Navigation Strip */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          {['ALL', 'FARMER', 'PROVIDER'].map(tType => (
            <button
              key={tType}
              onClick={() => setFilterType(tType)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === tType 
                  ? 'bg-emerald-800 text-white shadow-xs' 
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {tType === 'ALL'
                ? t('network.allFollows')
                : tType === 'FARMER'
                ? `🌾 ${t('network.followedFarmers')}`
                : `🚜 ${t('network.savedProviders')}`}
            </button>
          ))}
        </div>

        <span className="text-xs text-stone-500 font-semibold">
          {displayedFollows.length} {t('network.followingAccounts')}
        </span>
      </div>

      {/* 3. Followed Cards Grid */}
      {displayedFollows.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-stone-900">{t('network.noFollowsTitle')}</h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            {t('network.noFollowsDesc')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedFollows.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:border-emerald-300 card-hover p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xl font-bold text-emerald-800">
                      {item.type === 'farmer' ? '🌱' : '🚜'}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1">
                        {item.name}
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide">
                        {item.type === 'farmer' ? (lang === 'hi' ? 'कृषि उत्पादक' : 'Agricultural Producer') : (lang === 'hi' ? 'कस्टम हायरिंग केंद्र' : 'Custom Hiring Hub')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600 mb-4 bg-stone-50/70 p-3 rounded-xl border border-stone-100">
                  <div className="flex items-center gap-1.5 text-stone-700">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-700">
                    <Sprout className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate"><strong>Focus:</strong> {item.crops}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Bell className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{lang === 'hi' ? 'लाइव फसल अलर्ट सक्षम' : 'Real-time harvest alerts enabled'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                <button
                  onClick={onNavigateToMessages}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t('network.messageBtn')}</span>
                </button>
                <button
                  onClick={() => handleToggle(item)}
                  className="py-2 px-3 rounded-xl border border-stone-200 text-stone-600 hover:text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
                  title={t('network.unfollowBtn')}
                >
                  {t('network.unfollowBtn')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Suggested Regional Discoveries */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900">{t('network.recommendationsTitle')}</h2>
          <p className="text-xs text-stone-500 mt-0.5">{t('network.recommendationsSub')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map(rec => {
            const isFollowed = follows.some(f => f.id === rec.id);
            return (
              <div key={rec.id} className="p-4 rounded-2xl border border-stone-200 hover:border-emerald-300 bg-stone-50/50 flex flex-col justify-between">
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <img src={rec.avatar} alt={rec.name} className="w-10 h-10 rounded-xl object-cover border border-stone-200" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 leading-tight">{rec.name}</h4>
                      <span className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-stone-400" /> {rec.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-600 line-clamp-1">{rec.crops}</p>
                </div>

                <button
                  onClick={() => handleToggle(rec)}
                  className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isFollowed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-white border border-emerald-700 text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  {isFollowed ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                      {t('produce.following')}
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      {t('produce.followFarmer')}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
