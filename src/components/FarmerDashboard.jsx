import React, { useState } from 'react';
import { 
  Sprout, 
  TrendingUp, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  AlertCircle, 
  ExternalLink, 
  MessageSquare, 
  Sparkles, 
  Tractor,
  DollarSign,
  Package,
  Layers,
  ArrowRight,
  Scale,
  CloudSun
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { useLanguage } from '../i18n/LanguageContext';

export function FarmerDashboard({ 
  produceListings, 
  onRefresh, 
  onOpenAddModal, 
  onNavigateToTab, 
  onNavigateToMessages,
  onShowNotification 
}) {
  const { lang, t } = useLanguage();
  const currentFarmer = storageService.getCurrentUser();
  const [filterStatus, setFilterStatus] = useState('ALL');

  const myListings = produceListings.filter(item => 
    item.farmerId === currentFarmer.id || item.farmerName?.includes('Tawre') || item.farmerName?.includes('Ramesh')
  );

  const displayedListings = myListings.filter(item => {
    if (filterStatus === 'ALL') return true;
    return item.status === filterStatus;
  });

  const totalQuantity = myListings.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalValue = myListings.reduce((sum, item) => sum + ((item.quantity || 0) * (item.expectedPrice || 0)), 0);
  const activeCount = myListings.filter(i => i.status === 'AVAILABLE').length;

  const handleStatusChange = (id, newStatus) => {
    const updated = storageService.updateProduceStatus(id, newStatus);
    if (updated) {
      onShowNotification(lang === 'hi' ? 'फसल लॉट की स्थिति अपडेट की गई' : `Lot status changed to ${newStatus}`);
      onRefresh();
    }
  };

  const handleDelete = (id, cropName) => {
    if (window.confirm(t('farmerDesk.deleteConfirm'))) {
      storageService.deleteProduceListing(id);
      onShowNotification(lang === 'hi' ? `"${cropName}" सूची हटा दी गई` : `Listing for "${cropName}" removed.`);
      onRefresh();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Farmer Greeting Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-700/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              {t('farmerDesk.badge')}
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {t('farmerDesk.welcome')}, {currentFarmer.name}!
            </h1>
            
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {t('farmerDesk.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-stone-950" />
              <span>{t('produce.listCropBtn')}</span>
            </button>
            <button
              onClick={() => onNavigateToTab('equipment')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-900/90 hover:bg-emerald-900 text-emerald-100 border border-emerald-500/30 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <Tractor className="w-4 h-4 text-amber-300" />
              <span>{t('nav.machinery')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Farmer KPI Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">{t('farmerDesk.activeLots')}</p>
            <p className="text-2xl font-black text-stone-900 mt-1">{activeCount} Lots</p>
            <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {t('farmerDesk.readyDispatch')}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">{t('farmerDesk.totalVolume')}</p>
            <p className="text-2xl font-black text-stone-900 mt-1">{totalQuantity} Qtl</p>
            <span className="text-[11px] text-stone-500 font-medium inline-flex items-center gap-1 mt-1">
              <Layers className="w-3.5 h-3.5" /> {t('farmerDesk.acrossCommodities')}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
            <Sprout className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">{t('farmerDesk.estValue')}</p>
            <p className="text-2xl font-black text-emerald-800 mt-1">₹{totalValue.toLocaleString('en-IN')}</p>
            <span className="text-[11px] text-stone-500 font-medium inline-flex items-center gap-1 mt-1">
              <DollarSign className="w-3.5 h-3.5" /> {t('farmerDesk.realizableGate')}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">{t('farmerDesk.buyerInquiries')}</p>
            <p className="text-2xl font-black text-stone-900 mt-1">6 Active</p>
            <button 
              onClick={onNavigateToMessages}
              className="text-[11px] text-blue-700 hover:text-blue-900 font-bold inline-flex items-center gap-1 mt-1 cursor-pointer"
            >
              {t('farmerDesk.openMessagingHub')} <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Live Telemetry Links Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => onNavigateToTab('mandi')}
          className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-2xl p-5 border border-emerald-600/40 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              <span>{t('nav.mandi')}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-emerald-200 transition-colors">
              {lang === 'hi' ? 'दैनिक एपीएमसी मंडी भाव देखें' : 'View Live Mandi APMC Auction Rates'}
            </h3>
            <p className="text-xs text-emerald-100/80">
              {lang === 'hi' ? 'सीहोर, नागपुर व क्षेत्रीय मंडियों के आधिकारिक भाव' : 'Official benchmark prices for Wheat, Soyabean, Cotton & Dal'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors">
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => onNavigateToTab('weather')}
          className="bg-gradient-to-r from-sky-950 via-teal-950 to-stone-900 text-white rounded-2xl p-5 border border-sky-600/40 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider">
              <CloudSun className="w-3.5 h-3.5" />
              <span>{t('nav.weather')}</span>
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-sky-200 transition-colors">
              {lang === 'hi' ? 'खेत का मौसम एवं छिड़काव सलाह' : 'Field Weather & Spraying Advisory'}
            </h3>
            <p className="text-xs text-sky-100/80">
              {lang === 'hi' ? 'तापमान, वर्षा अनुमान और 7-दिवसीय कृषि पूर्वानुमान' : 'Real-time temperature, rainfall chance & 7-day outlook'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors">
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* 3. Produce Lot Inventory Table / Cards */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-stone-50/50">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900">{t('farmerDesk.myListingsTitle')}</h2>
            <p className="text-xs text-stone-500 mt-0.5">{t('farmerDesk.myListingsSub')}</p>
          </div>

          <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs">
            {['ALL', 'AVAILABLE', 'NEGOTIATING', 'SOLD'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 font-bold rounded-lg transition-colors cursor-pointer ${
                  filterStatus === status 
                    ? 'bg-white text-stone-900 shadow-xs' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {status === 'ALL'
                  ? t('farmerDesk.filterAll')
                  : status === 'AVAILABLE'
                  ? t('farmerDesk.filterAvailable')
                  : status === 'NEGOTIATING'
                  ? t('farmerDesk.filterNegotiating')
                  : t('farmerDesk.filterSold')}
              </button>
            ))}
          </div>
        </div>

        {displayedListings.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              <Sprout className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-stone-900">{t('produce.noResultsTitle')}</h3>
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('produce.listCropBtn')}</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {displayedListings.map(item => (
              <div key={item.id} className="p-5 hover:bg-stone-50/60 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.cropName}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-stone-900">{item.cropName}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold">
                        {item.variety}
                      </span>
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                        item.status === 'AVAILABLE' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : item.status === 'NEGOTIATING' 
                          ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                          : 'bg-stone-100 text-stone-600 border border-stone-200 line-through'
                      }`}>
                        {item.status === 'AVAILABLE'
                          ? `● ${t('farmerDesk.statusAvailable')}`
                          : item.status === 'NEGOTIATING'
                          ? `⚡ ${t('farmerDesk.statusNegotiating')}`
                          : t('farmerDesk.statusSold')}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 line-clamp-1">{item.description}</p>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-stone-600 pt-1">
                      <span><strong>{t('produce.lotAvailable')}:</strong> {item.quantity} {item.unit}</span>
                      <span><strong>{t('produce.moq')}:</strong> {item.minOrderQuantity || 10} {item.unit}</span>
                      <span><strong>{t('produce.harvestDate')}:</strong> {item.harvestDate}</span>
                      <span><strong>{t('produce.location')}:</strong> {item.location || item.district}</span>
                    </div>

                    {item.apmcBenchmark && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 text-[11px] font-semibold border border-amber-200/80">
                        <TrendingUp className="w-3 h-3 text-amber-700" />
                        {t('produce.mandiBenchmark')}: ₹{item.apmcBenchmark}/{item.unit} &middot; {t('produce.farmGatePrice')}: ₹{item.expectedPrice}/{item.unit}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-stone-100">
                  <div className="text-left lg:text-right">
                    <div className="text-xl font-black text-emerald-900">
                      ₹{item.expectedPrice.toLocaleString('en-IN')}{' '}
                      <span className="text-xs text-stone-500 font-normal">/{item.unit}</span>
                    </div>
                    <div className="text-xs text-stone-500 font-medium">
                      Est. Total: ₹{(item.quantity * item.expectedPrice).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
                    >
                      <option value="AVAILABLE">{t('farmerDesk.statusAvailable')}</option>
                      <option value="NEGOTIATING">{t('farmerDesk.statusNegotiating')}</option>
                      <option value="SOLD">{t('farmerDesk.statusSold')}</option>
                    </select>

                    <button
                      onClick={() => handleDelete(item.id, item.cropName)}
                      className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title={t('farmerDesk.deleteListing')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Advisory & Support Strip */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950">{t('farmerDesk.fairPriceNote')}</h4>
            <p className="text-xs text-amber-900/80 max-w-xl mt-0.5 leading-relaxed">
              {t('farmerDesk.fairPriceDesc')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigateToTab('marketplace')}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-white border border-amber-300 text-amber-950 hover:bg-amber-100/70 transition-colors cursor-pointer"
          >
            {t('farmerDesk.previewPublicView')}
          </button>
        </div>
      </div>

    </div>
  );
}
