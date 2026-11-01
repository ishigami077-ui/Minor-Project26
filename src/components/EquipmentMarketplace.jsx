import React, { useState } from 'react';
import {
  Tractor,
  Wrench,
  Fuel,
  User,
  MapPin,
  Clock,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  PlusCircle,
  MessageSquare,
  Tag,
  Gauge,
  Compass,
  X
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function EquipmentMarketplace({
  equipmentList,
  onBookEquipment,
  onOpenAddEquipmentModal,
  activeRole
}) {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedModality, setSelectedModality] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'All', label: t('equipment.allCategories') },
    { id: 'Tractors', label: t('equipment.catTractors') },
    { id: 'Harvesters', label: t('equipment.catHarvesters') },
    { id: 'JCB & Earthmovers', label: t('equipment.catEarthmovers') },
    { id: 'Tillers & Rotavators', label: t('equipment.catTillers') },
    { id: 'Drones & Sprayers', label: t('equipment.catDrones') }
  ];

  const modalities = [
    { id: 'All', label: t('equipment.allModalities') },
    { id: 'Turnkey Service (With Operator)', label: t('equipment.modTurnkey') },
    { id: 'Rental (Self-Drive)', label: t('equipment.modRental') },
    { id: 'Sale', label: t('equipment.modSale') }
  ];

  const filteredEquipment = equipmentList.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchMod =
      selectedModality === 'All' ||
      item.pricingType === selectedModality ||
      (selectedModality.includes('Turnkey') && item.pricingType?.includes('Turnkey')) ||
      (selectedModality.includes('Rental') && item.pricingType?.includes('Rental')) ||
      (selectedModality.includes('Sale') && item.pricingType?.includes('Sale'));
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.providerName && item.providerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.businessName && item.businessName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.district && item.district.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.hp && item.hp.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchMod && matchSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Machinery Hero Banner */}
      <div className="bg-gradient-to-br from-amber-950 via-stone-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Tractor className="w-3.5 h-3.5 text-amber-300" />
            {t('equipment.badge')}
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t('equipment.title')}
          </h1>
          
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {t('equipment.subtitle')}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {(activeRole === 'provider' || activeRole === 'farmer') && (
              <button
                onClick={onOpenAddEquipmentModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-stone-950" />
                <span>{t('equipment.listMachineBtn')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Fleet KPI Telemetry Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-8 mt-8 border-t border-amber-900/60 text-left">
          <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <p className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider">{t('equipment.statFleet')}</p>
            <p className="text-xl sm:text-2xl font-black text-white mt-0.5">{equipmentList.length} Units</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <p className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider">{t('equipment.statRadius')}</p>
            <p className="text-xl sm:text-2xl font-black text-white mt-0.5">35 km Radius</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <p className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider">{t('equipment.statOperators')}</p>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">100% Certified</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <p className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider">{t('equipment.statIdleDrop')}</p>
            <p className="text-xl sm:text-2xl font-black text-amber-300 mt-0.5">-40% Idle</p>
          </div>
        </div>
      </div>

      {/* 2. Search & Category Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              placeholder={t('equipment.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-medium shadow-2xs"
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

          <div className="flex items-center gap-2">
            <select
              value={selectedModality}
              onChange={(e) => setSelectedModality(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs cursor-pointer"
            >
              {modalities.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Horizontal Category Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-white border border-stone-200/90 text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Machinery Catalog Cards */}
      {filteredEquipment.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Tractor className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-stone-900">{t('produce.noResultsTitle')}</h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            {t('produce.noResultsDesc')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => {
            const isTurnkey = item.pricingType?.toLowerCase().includes('turnkey') || item.pricingType?.toLowerCase().includes('operator');
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:border-amber-300 card-hover flex flex-col justify-between overflow-hidden"
              >
                <div>
                  
                  {/* Photo Container with Tags */}
                  <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />

                    {/* Modality Tag */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-lg backdrop-blur-xs text-white text-[11px] font-bold ${
                        isTurnkey ? 'bg-amber-800/90' : 'bg-stone-900/80'
                      }`}>
                        {item.pricingType}
                      </span>
                    </div>

                    {/* Verified Tag */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-800/90 backdrop-blur-xs text-white text-[11px] font-bold inline-flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-300" />
                        {t('equipment.verifiedProvider')}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3.5">
                    <div>
                      <h3 className="text-base font-bold text-stone-900 leading-snug">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{item.district}, {item.state || 'Maharashtra'}</span>
                        <span>&bull;</span>
                        <span className="truncate text-stone-700 font-semibold">{item.providerName || item.businessName}</span>
                      </div>
                    </div>

                    {/* Rate & Pricing Box */}
                    <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/70 block">
                          Rate / Tariff
                        </span>
                        <div className="text-lg font-black text-amber-950">
                          ₹{item.rate.toLocaleString('en-IN')}{' '}
                          <span className="text-xs font-normal text-stone-500">{item.rateUnit || '/ hour'}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/70 block">
                          {t('equipment.powerSpecs')}
                        </span>
                        <span className="text-xs font-bold text-stone-800">
                          {item.hp || '47 HP'}
                        </span>
                      </div>
                    </div>

                    {/* Specs Micro-Grid: Radius, Fuel Terms */}
                    <div className="grid grid-cols-2 gap-2 py-1 text-center border-t border-stone-100 text-xs">
                      <div className="p-1.5 rounded-lg bg-stone-50/70 text-left px-3">
                        <span className="text-[10px] text-stone-500 block flex items-center gap-1">
                          <Compass className="w-3 h-3 text-stone-400" /> {t('equipment.serviceRadius')}
                        </span>
                        <strong className="text-stone-900 font-bold">Up to {item.serviceRadiusKm || 30} km</strong>
                      </div>
                      <div className="p-1.5 rounded-lg bg-stone-50/70 text-left px-3">
                        <span className="text-[10px] text-stone-500 block flex items-center gap-1">
                          <Fuel className="w-3 h-3 text-amber-600" /> {t('equipment.fuelTerms')}
                        </span>
                        <strong className="text-stone-900 font-bold truncate block">{item.fuelTerms || 'Fuel Included'}</strong>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onBookEquipment(item)}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <Tractor className="w-4 h-4" />
                    <span>{t('equipment.bookNow')}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
