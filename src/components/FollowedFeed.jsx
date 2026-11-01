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

export function FollowedFeed({ onNavigateToMessages, onShowNotification }) {
  const [follows, setFollows] = useState(storageService.getFollows());
  const [filterType, setFilterType] = useState('ALL');

  const handleToggle = (item) => {
    const updated = storageService.toggleFollow(item);
    setFollows(updated);
    const isNow = updated.some(f => f.id === item.id);
    onShowNotification(isNow ? `Following ${item.name}` : `Unfollowed ${item.name}`);
  };

  const displayedFollows = follows.filter(f => {
    if (filterType === 'ALL') return true;
    return f.type?.toUpperCase() === filterType;
  });

  // Recommended producers to follow
  const recommendations = [
    {
      id: 'REC-1',
      name: 'Vidarbha Organic Pulses Producer Co.',
      type: 'farmer',
      location: 'Katol, Nagpur, Maharashtra',
      crops: 'Organic Tur Dal, Chana, Moong',
      rating: 4.95,
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    {
      id: 'REC-2',
      name: 'Shree Ram Custom Hiring Center (Drones & Harvesters)',
      type: 'provider',
      location: 'Kalmeshwar, Nagpur',
      crops: 'Fleet of 6 Drones & 3 Claas Harvesters',
      rating: 4.88,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    {
      id: 'REC-3',
      name: 'Saoner Citrus & Orange Farmers Alliance',
      type: 'farmer',
      location: 'Saoner, Nagpur',
      crops: 'GI Tagged Nagpur Mandarin Oranges',
      rating: 4.92,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      verified: true
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            Farmer & Machinery Network
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Followed Farmers & Service Providers
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Stay updated when your preferred farmers harvest new crops or when equipment providers update machinery rental rates across the Vidarbha agricultural corridor.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          {['ALL', 'FARMER', 'PROVIDER'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === t 
                  ? 'bg-emerald-700 text-white shadow-sm' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t === 'ALL' ? 'All Follows' : t === 'FARMER' ? '🌾 Followed Farmers' : '🚜 Saved Equipment Providers'}
            </button>
          ))}
        </div>

        <span className="text-xs text-gray-500 font-medium">
          {displayedFollows.length} accounts followed
        </span>
      </div>

      {/* Followed Cards Grid */}
      {displayedFollows.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-gray-900">No Followed Profiles in This Category</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Browse the produce or equipment marketplace and click "Follow Farmer" or "Save Provider" to get notified of fresh harvests.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedFollows.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xl font-bold text-emerald-800">
                      {item.type === 'farmer' ? '🌱' : '🚜'}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1">
                        {item.name}
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide">
                        {item.type === 'farmer' ? 'Agricultural Producer' : 'Custom Hiring Provider'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 mb-4 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <Sprout className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate"><strong>Focus:</strong> {item.crops}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Bell className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Real-time harvest alerts enabled</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={onNavigateToMessages}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Message
                </button>
                <button
                  onClick={() => handleToggle(item)}
                  className="py-2 px-3 rounded-xl border border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
                  title="Unfollow"
                >
                  Unfollow
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Suggested Discoveries */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">Recommended Verified Producers in Your Region</h2>
            <p className="text-xs text-gray-500">Curated high-rating FPOs and machinery hubs around Nagpur / Saoner</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700">Top Verified</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map(rec => {
            const isFollowed = follows.some(f => f.id === rec.id);
            return (
              <div key={rec.id} className="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 bg-gray-50/50 flex flex-col justify-between">
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <img src={rec.avatar} alt={rec.name} className="w-10 h-10 rounded-xl object-cover border border-gray-200" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">{rec.name}</h4>
                      <span className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-gray-400" /> {rec.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600 line-clamp-1">{rec.crops}</p>
                </div>

                <button
                  onClick={() => handleToggle(rec)}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isFollowed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  {isFollowed ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      Follow Provider
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
