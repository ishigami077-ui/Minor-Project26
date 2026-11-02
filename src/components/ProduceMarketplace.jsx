import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  UserPlus,
  UserCheck,
  Package,
  Scale,
  Sparkles,
  Info,
  X,
  PlusCircle,
  ShieldCheck,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function ProduceMarketplace({
  produceList,
  onContactFarmer,
  onToggleFollow,
  isFollowing,
  onOpenAddProduceModal,
  activeRole,
  initialSearchTerm = ''
}) {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');

  useEffect(() => {
    if (initialSearchTerm) setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);
  const [selectedState, setSelectedState] = useState('All');
  const [minQty, setMinQty] = useState(0);
  const [activeModalItem, setActiveModalItem] = useState(null);

  const categories = [
    { id: 'All', label: t('produce.allCategories') },
    { id: 'Grains & Cereals', label: t('produce.catCereals') },
    { id: 'Pulses (Dal)', label: t('produce.catPulses') },
    { id: 'Cash Crops', label: t('produce.catCashCrops') },
    { id: 'Vegetables', label: t('produce.catVegetables') },
    { id: 'Fruits', label: t('produce.catFruits') },
    { id: 'Oilseeds', label: t('produce.catOilseeds') },
    { id: 'Spices', label: t('produce.catSpices') }
  ];

  const states = ['All', 'Maharashtra', 'Madhya Pradesh', 'Haryana'];

  const filteredProduce = produceList.filter((item) => {
    const matchCat =
      selectedCategory === 'All' ||
      item.category === selectedCategory ||
      (selectedCategory === 'Grains & Cereals' && (item.category === 'Cereals' || item.category === 'Grains & Cereals')) ||
      (selectedCategory === 'Pulses (Dal)' && (item.category === 'Pulses' || item.category === 'Pulses (Dal)'));
    const matchState = selectedState === 'All' || (item.state && item.state.includes(selectedState)) || (item.location && item.location.includes(selectedState));
    const matchSearch =
      item.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.district && item.district.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.farmerName && item.farmerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.variety && item.variety.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchQty = (item.quantity || 0) >= minQty;
    return matchCat && matchState && matchSearch && matchQty;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-700/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {t('produce.badge')}
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t('produce.title')}
          </h1>
          
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {t('produce.subtitle')}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {activeRole === 'farmer' && (
              <button
                onClick={onOpenAddProduceModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-stone-950" />
                <span>{t('produce.listCropBtn')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Telemetry KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-8 mt-8 border-t border-emerald-800/60 text-left">
          <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <p className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">{t('produce.statLots')}</p>
            <p className="text-xl sm:text-2xl font-black text-white mt-0.5">{produceList.length} Lots</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <p className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">{t('produce.statGrowers')}</p>
            <p className="text-xl sm:text-2xl font-black text-white mt-0.5">142 Farmers</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <p className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">{t('produce.statMandiCoverage')}</p>
            <p className="text-xl sm:text-2xl font-black text-amber-300 mt-0.5">18 Mandis</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <p className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">{t('produce.statArbitrage')}</p>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">+18.5% Gain</p>
          </div>
        </div>
      </div>

      {/* 2. Search & Filtering Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              placeholder={t('produce.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-medium shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* State / District Selector */}
          <div className="flex items-center gap-2">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs cursor-pointer"
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? t('produce.allStates') : s}
                </option>
              ))}
            </select>

            {minQty > 0 && (
              <button
                onClick={() => setMinQty(0)}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              >
                {t('produce.clearFilters')}
              </button>
            )}
          </div>

        </div>

        {/* Horizontal Category Chips Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white border border-stone-200/90 text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Produce Lots Catalog Cards */}
      {filteredProduce.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-stone-900">{t('produce.noResultsTitle')}</h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            {t('produce.noResultsDesc')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProduce.map((item) => {
            const followed = isFollowing(item.farmerId || item.id);
            const premiumGain = item.apmcBenchmark
              ? (((item.expectedPrice - item.apmcBenchmark) / item.apmcBenchmark) * 100).toFixed(1)
              : null;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:border-emerald-300 card-hover flex flex-col justify-between overflow-hidden"
              >
                <div>
                  
                  {/* Photo Container with Tags */}
                  <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.cropName}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Category Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-bold">
                        {item.category}
                      </span>
                    </div>

                    {/* Verified Grower Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-800/90 backdrop-blur-xs text-white text-[11px] font-bold inline-flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-300" />
                        {t('produce.verifiedFarmer')}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3.5">
                    
                    {/* Title & Farmer Identity */}
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold text-stone-900 leading-snug">
                          {item.cropName}
                        </h3>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 shrink-0">
                          {item.variety}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{item.location || item.district}</span>
                        <span>&bull;</span>
                        <span className="truncate text-stone-700 font-semibold">{item.farmerName}</span>
                      </div>
                    </div>

                    {/* Pricing Comparison Box */}
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                          {t('produce.farmGatePrice')}
                        </span>
                        <div className="text-lg font-black text-emerald-900">
                          ₹{item.expectedPrice.toLocaleString('en-IN')}{' '}
                          <span className="text-xs font-normal text-stone-500">/{item.unit}</span>
                        </div>
                      </div>

                      {item.apmcBenchmark && (
                        <div className="text-right">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                            {t('produce.mandiBenchmark')}
                          </span>
                          <span className="text-xs font-bold text-stone-700">
                            ₹{item.apmcBenchmark.toLocaleString('en-IN')}/{item.unit}
                          </span>
                          {premiumGain && (
                            <span className="text-[10px] block font-bold text-emerald-700">
                              {Number(premiumGain) >= 0 ? `+${premiumGain}% vs MSP` : `${premiumGain}% vs MSP`}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Lot Specs: Quantity, MOQ, Harvest Date */}
                    <div className="grid grid-cols-3 gap-2 py-1 text-center border-t border-stone-100 text-xs">
                      <div className="p-1.5 rounded-lg bg-stone-50/70">
                        <span className="text-[10px] text-stone-500 block">{t('produce.lotAvailable')}</span>
                        <strong className="text-stone-900 font-bold">{item.quantity} {item.unit}</strong>
                      </div>
                      <div className="p-1.5 rounded-lg bg-stone-50/70">
                        <span className="text-[10px] text-stone-500 block">{t('produce.moq')}</span>
                        <strong className="text-stone-900 font-bold">{item.minOrderQuantity || 10} {item.unit}</strong>
                      </div>
                      <div className="p-1.5 rounded-lg bg-stone-50/70">
                        <span className="text-[10px] text-stone-500 block">{t('produce.harvestDate')}</span>
                        <strong className="text-stone-900 font-bold">{item.harvestDate}</strong>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onContactFarmer(item)}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t('produce.contactFarmer')}</span>
                  </button>

                  <button
                    onClick={() => onToggleFollow({ id: item.farmerId || item.id, name: item.farmerName, location: item.location || item.district, type: 'farmer' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                      followed
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                    title={followed ? t('produce.following') : t('produce.followFarmer')}
                  >
                    {followed ? <UserCheck className="w-3.5 h-3.5 text-emerald-700" /> : <UserPlus className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{followed ? t('produce.following') : t('produce.followFarmer')}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Produce Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-lg font-bold text-stone-900">{activeModalItem.cropName}</h3>
              <button onClick={() => setActiveModalItem(null)} className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={activeModalItem.image} alt={activeModalItem.cropName} className="w-full h-48 rounded-xl object-cover" />
            <p className="text-xs text-stone-600 leading-relaxed">{activeModalItem.description}</p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setActiveModalItem(null)} className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold">
                Close
              </button>
              <button
                onClick={() => {
                  onContactFarmer(activeModalItem);
                  setActiveModalItem(null);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold"
              >
                {t('produce.contactFarmer')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
