import React, { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  Scale,
  Search,
  RotateCw,
  Clock,
  MapPin,
  Filter,
  X,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Key,
  ShieldCheck,
  Building2,
  Wheat,
  LayoutGrid,
  Table as TableIcon,
  ArrowUpDown,
  ShoppingBag,
  Sparkles,
  Info
} from 'lucide-react';
import { mandiService, VERIFIED_AGMARKNET_BENCHMARK } from '../services/mandiService';
import { useLanguage } from '../i18n/LanguageContext';

export function LiveMandiSection({ onNavigateToProduceWithCrop }) {
  const { lang, t } = useLanguage();

  // Core Data State
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [feedStatus, setFeedStatus] = useState('CHECKING'); // 'LIVE_OK' | 'BENCHMARK_OFFLINE' | 'MISSING_API_KEY' | 'RATE_LIMITED' | 'AUTH_FAILED' | 'NETWORK_ERROR'
  const [lastSyncTime, setLastSyncTime] = useState(mandiService.getLastSyncTimestamp());
  const [statusMessage, setStatusMessage] = useState(null);

  // API Key management state
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isApiKeyPanelOpen, setIsApiKeyPanelOpen] = useState(false);
  const hasKey = mandiService.hasApiKey();

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedCommodity, setSelectedCommodity] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('MODAL_DESC'); // 'MODAL_DESC' | 'MODAL_ASC' | 'NAME_ASC' | 'ARRIVALS_DESC'
  const [viewMode, setViewMode] = useState('CARDS'); // 'CARDS' | 'TABLE'

  // Auto-refresh countdown
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(300); // 5 minutes

  // Initial load
  useEffect(() => {
    loadMandiData();
  }, []);

  // Auto-refresh timer
  useEffect(() => {
    if (!autoRefreshEnabled) return;

    const timer = setInterval(() => {
      setSecondsUntilRefresh((prev) => {
        if (prev <= 1) {
          loadMandiData(true);
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRefreshEnabled]);

  const loadMandiData = async (isBackground = false) => {
    if (isBackground) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    if (!mandiService.hasApiKey()) {
      // Missing API key: Fall back to verified Agmarknet benchmark but clearly flag status
      const benchmark = mandiService.loadVerifiedBenchmark();
      setRecords(benchmark.records);
      setFeedStatus('MISSING_API_KEY');
      setStatusMessage(t('mandi.apiKeyRequiredDesc'));
      setLastSyncTime(benchmark.timestamp);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    const res = await mandiService.fetchLiveMandiPrices();

    if (res.success && res.records && res.records.length > 0) {
      setRecords(res.records);
      setFeedStatus('LIVE_OK');
      setStatusMessage(null);
      setLastSyncTime(res.timestamp);
      setSecondsUntilRefresh(300);
    } else {
      // Handle various failure modes gracefully while never fabricating data
      setFeedStatus(res.status || 'NETWORK_ERROR');
      setStatusMessage(res.message);

      // Check if we have cached records
      const cached = mandiService.getCachedRecords();
      if (cached && cached.length > 0) {
        setRecords(cached);
      } else {
        // Use verified Agmarknet benchmark as fallback with delayed notice
        const fallback = mandiService.loadVerifiedBenchmark();
        setRecords(fallback.records);
        setFeedStatus('BENCHMARK_OFFLINE');
      }
    }

    setLoading(false);
    setRefreshing(false);
  };

  const handleSaveApiKey = () => {
    if (!apiKeyInput.trim()) return;
    mandiService.setApiKey(apiKeyInput.trim());
    setApiKeyInput('');
    setIsApiKeyPanelOpen(false);
    loadMandiData();
  };

  const handleClearApiKey = () => {
    mandiService.clearApiKey();
    loadMandiData();
  };

  // Extract dynamic filters from active records
  const filterOptions = useMemo(() => {
    return mandiService.extractFilterOptions(records);
  }, [records]);

  // Filtered & sorted records
  const displayedRecords = useMemo(() => {
    let result = [...records];

    // Search query filter (matches commodity, variety, market, district, state)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.commodity?.toLowerCase().includes(q) ||
          r.variety?.toLowerCase().includes(q) ||
          r.market?.toLowerCase().includes(q) ||
          r.district?.toLowerCase().includes(q) ||
          r.state?.toLowerCase().includes(q)
      );
    }

    // State filter
    if (selectedState !== 'ALL') {
      result = result.filter((r) => r.state === selectedState);
    }

    // District filter
    if (selectedDistrict !== 'ALL') {
      result = result.filter((r) => r.district === selectedDistrict);
    }

    // Commodity filter
    if (selectedCommodity !== 'ALL') {
      result = result.filter((r) => r.commodity === selectedCommodity);
    }

    // Category filter
    if (selectedCategory !== 'ALL') {
      result = result.filter((r) => r.category === selectedCategory);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'MODAL_DESC') return (b.modal_price || 0) - (a.modal_price || 0);
      if (sortBy === 'MODAL_ASC') return (a.modal_price || 0) - (b.modal_price || 0);
      if (sortBy === 'NAME_ASC') return (a.commodity || '').localeCompare(b.commodity || '');
      if (sortBy === 'ARRIVALS_DESC') return (b.arrivals_tonnes || 0) - (a.arrivals_tonnes || 0);
      return 0;
    });

    return result;
  }, [records, searchQuery, selectedState, selectedDistrict, selectedCommodity, selectedCategory, sortBy]);

  // Summary Metrics
  const totalMandis = useMemo(() => {
    return new Set(records.map((r) => r.market)).size;
  }, [records]);

  const topGainer = useMemo(() => {
    if (!records.length) return null;
    return [...records].sort((a, b) => (b.modal_price || 0) - (a.modal_price || 0))[0];
  }, [records]);

  const avgSpread = useMemo(() => {
    if (!records.length) return 0;
    const spreads = records.map((r) => Math.max(0, (r.max_price || 0) - (r.min_price || 0)));
    const sum = spreads.reduce((acc, curr) => acc + curr, 0);
    return Math.round(sum / records.length);
  }, [records]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedState('ALL');
    setSelectedDistrict('ALL');
    setSelectedCommodity('ALL');
    setSelectedCategory('ALL');
    setSortBy('MODAL_DESC');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/90 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('mandi.badge')}</span>
              </span>

              {/* Status Pill */}
              {feedStatus === 'LIVE_OK' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {t('mandi.statusLive')}
                </span>
              ) : feedStatus === 'MISSING_API_KEY' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/40">
                  <Key className="w-3 h-3 text-amber-300" />
                  {t('mandi.statusAwaitingKey')}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold border border-blue-500/40">
                  <Info className="w-3 h-3 text-blue-300" />
                  {t('mandi.statusBenchmark')}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t('mandi.title')}
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {t('mandi.subtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-emerald-300/80 font-medium">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                {t('mandi.officialDataSource')}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-300" />
                {t('mandi.lastUpdated')}:{' '}
                {lastSyncTime ? new Date(lastSyncTime).toLocaleTimeString() : t('mandi.justNow')}
              </span>
            </div>

          </div>

          {/* Sync & Setup Controls */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => loadMandiData()}
              disabled={loading || refreshing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold transition-all border border-emerald-500/40 cursor-pointer shadow-sm"
            >
              <RotateCw className={`w-3.5 h-3.5 ${refreshing || loading ? 'animate-spin' : ''}`} />
              <span>{refreshing ? t('mandi.refreshing') : t('mandi.refreshBtn')}</span>
            </button>

            <button
              onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                autoRefreshEnabled
                  ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                  : 'bg-stone-800 border-stone-700 text-stone-400'
              }`}
              title="Toggle auto-refreshing mandi prices every 5 minutes"
            >
              <span className={`w-2 h-2 rounded-full ${autoRefreshEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'}`} />
              <span>
                {autoRefreshEnabled
                  ? `${Math.floor(secondsUntilRefresh / 60)}m ${secondsUntilRefresh % 60}s`
                  : 'Auto-Sync Off'}
              </span>
            </button>

            <button
              onClick={() => setIsApiKeyPanelOpen(!isApiKeyPanelOpen)}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold transition-all border border-white/15 cursor-pointer"
              title="Configure data.gov.in API key"
            >
              <Key className="w-3.5 h-3.5 text-amber-300" />
              <span>{hasKey ? 'API Key: Active' : 'Set API Key'}</span>
            </button>
          </div>
        </div>

        {/* API Key Configuration Expandable Drawer */}
        {isApiKeyPanelOpen && (
          <div className="relative z-10 mt-6 pt-6 border-t border-white/10 bg-stone-900/80 rounded-2xl p-4 sm:p-5 border border-stone-700/80">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-400" />
                  <h4 className="font-bold text-xs sm:text-sm text-white">
                    {t('mandi.apiKeyRequiredTitle')}
                  </h4>
                </div>
                <p className="text-xs text-stone-300 max-w-xl">
                  {t('mandi.apiKeyRequiredDesc')}
                </p>
                <a
                  href="https://data.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 underline font-semibold mt-1"
                >
                  <span>{t('mandi.getKeyLink')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder={t('mandi.apiKeyInputPlaceholder')}
                  className="bg-stone-950 text-white placeholder-stone-500 text-xs px-3 py-2 rounded-xl border border-stone-700 focus:outline-none focus:border-emerald-500 w-full sm:w-72"
                />
                <button
                  onClick={handleSaveApiKey}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  {t('mandi.saveApiKey')}
                </button>
                {hasKey && (
                  <button
                    onClick={handleClearApiKey}
                    className="px-3 py-2 bg-stone-800 hover:bg-red-900/60 text-stone-300 hover:text-red-200 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap"
                  >
                    {t('mandi.clearApiKey')}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 2. Notice / Mode Indicators (Truth in Data Reporting) */}
      {feedStatus === 'MISSING_API_KEY' && !isApiKeyPanelOpen && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold">{t('mandi.offlineBenchmarkMode')}: </span>
              <span className="text-amber-900">{t('mandi.offlineBenchmarkDesc')}</span>
            </div>
          </div>
          <button
            onClick={() => setIsApiKeyPanelOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shrink-0 cursor-pointer text-center"
          >
            {t('mandi.switchLiveFeed')}
          </button>
        </div>
      )}

      {feedStatus === 'RATE_LIMITED' && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 text-xs sm:text-sm flex items-center gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{t('mandi.rateLimitAlert')}</span>
        </div>
      )}

      {/* 3. Summary Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Rates */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {t('mandi.statTotalRecords')}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {records.length}
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
              APMC Listed
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Across regional mandis</p>
        </div>

        {/* Reporting Mandis */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {t('mandi.statActiveMandis')}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {totalMandis}
            </span>
            <span className="text-xs font-semibold text-stone-600">Centers</span>
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Market committees covered</p>
        </div>

        {/* Top Commodity */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {t('mandi.statTopGainer')}
          </span>
          <div className="mt-2">
            <span className="text-base sm:text-lg font-extrabold text-stone-900 truncate block">
              {topGainer?.commodity || 'Wheat'}
            </span>
            <span className="text-xs font-extrabold text-emerald-700">
              ₹{topGainer?.modal_price?.toLocaleString('en-IN') || 0} / Qtl
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-0.5 truncate">{topGainer?.market}</p>
        </div>

        {/* Avg Spread */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {t('mandi.statAvgSpread')}
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              ₹{avgSpread.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-stone-500">/ Qtl</span>
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Max vs Min spread</p>
        </div>

      </div>

      {/* 4. Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-sm space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('mandi.searchPlaceholder')}
              className="w-full bg-stone-50 text-stone-900 placeholder-stone-400 text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode Toggle & Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-stone-50 text-stone-800 text-xs font-bold px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="MODAL_DESC">{t('mandi.sortModalDesc')}</option>
              <option value="MODAL_ASC">{t('mandi.sortModalAsc')}</option>
              <option value="NAME_ASC">{t('mandi.sortNameAsc')}</option>
              <option value="ARRIVALS_DESC">{t('mandi.sortArrivalsDesc')}</option>
            </select>

            {/* Toggle View Cards / Table */}
            <div className="inline-flex items-center p-0.5 rounded-xl bg-stone-100 border border-stone-200">
              <button
                onClick={() => setViewMode('CARDS')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'CARDS'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title={t('mandi.viewCards')}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('TABLE')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'TABLE'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title={t('mandi.viewTable')}
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          
          {/* State Filter */}
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedDistrict('ALL');
            }}
            className="bg-stone-50 text-stone-700 text-xs font-medium px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600 cursor-pointer truncate"
          >
            <option value="ALL">{t('mandi.allStates')}</option>
            {filterOptions.states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* District Filter */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-stone-50 text-stone-700 text-xs font-medium px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600 cursor-pointer truncate"
          >
            <option value="ALL">{t('mandi.allDistricts')}</option>
            {filterOptions.districts.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>

          {/* Commodity Filter */}
          <select
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
            className="bg-stone-50 text-stone-700 text-xs font-medium px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600 cursor-pointer truncate"
          >
            <option value="ALL">{t('mandi.allCommodities')}</option>
            {filterOptions.commodities.map((comm) => (
              <option key={comm} value={comm}>
                {comm}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-stone-50 text-stone-700 text-xs font-medium px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600 cursor-pointer truncate"
          >
            <option value="ALL">{t('mandi.allCategories')}</option>
            {filterOptions.categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

        </div>

        {/* Clear Filters Indicator */}
        {(searchQuery || selectedState !== 'ALL' || selectedDistrict !== 'ALL' || selectedCommodity !== 'ALL' || selectedCategory !== 'ALL') && (
          <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100">
            <span className="text-stone-500 font-medium">
              Showing {displayedRecords.length} of {records.length} mandi records
            </span>
            <button
              onClick={handleClearFilters}
              className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>
          </div>
        )}

      </div>

      {/* 5. Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-56 bg-stone-200 rounded-3xl" />
          ))}
        </div>
      )}

      {/* 6. Empty State */}
      {!loading && displayedRecords.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">
            {t('mandi.noResultsTitle')}
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            {t('mandi.noResultsDesc')}
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-2 px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 cursor-pointer transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* 7. Results: Grid Cards View */}
      {!loading && displayedRecords.length > 0 && viewMode === 'CARDS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedRecords.map((item) => {
            const spread = Math.max(0, (item.max_price || 0) - (item.min_price || 0));
            const minP = item.min_price || 0;
            const maxP = item.max_price || 0;
            const modalP = item.modal_price || 0;

            // Calculate percentage position of modal price between min and max
            const range = maxP - minP || 1;
            const pct = Math.min(100, Math.max(0, Math.round(((modalP - minP) / range) * 100)));

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Top Row: Commodity & Category Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base text-stone-900 group-hover:text-emerald-850 transition-colors">
                          {item.commodity}
                        </h3>
                        <span className="text-[10px] bg-stone-100 text-stone-600 font-bold px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-semibold mt-0.5">
                        {item.variety}
                      </p>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                      APMC
                    </span>
                  </div>

                  {/* Location Info */}
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="font-bold text-stone-850">{item.market}</span>
                    <span className="text-stone-400">•</span>
                    <span className="text-stone-500">{item.district}, {item.state}</span>
                  </div>

                  {/* Benchmark Modal Price Box */}
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                        {t('mandi.modalPrice')}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-stone-900">
                          ₹{modalP.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] font-bold text-stone-500">/ Qtl</span>
                      </div>
                    </div>

                    {/* Min - Modal - Max Price Spread Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="w-full bg-stone-200 h-2 rounded-full relative overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-bold text-stone-500">
                        <span>Min: ₹{minP.toLocaleString('en-IN')}</span>
                        <span>Max: ₹{maxP.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrival Stats */}
                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                    <span>
                      {t('mandi.arrivals')}: <strong className="text-stone-800">{item.arrivals_tonnes || 0} Tonnes</strong>
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Date: {item.arrival_date}
                    </span>
                  </div>

                </div>

                {/* Footer Action */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-400 font-medium">
                    {item.source}
                  </span>
                  
                  {onNavigateToProduceWithCrop && (
                    <button
                      onClick={() => onNavigateToProduceWithCrop(item.commodity)}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Find Sellers</span>
                      <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 8. Results: APMC Table View */}
      {!loading && displayedRecords.length > 0 && viewMode === 'TABLE' && (
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider font-bold border-b border-stone-200 text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">{t('mandi.commodity')} & {t('mandi.variety')}</th>
                  <th className="py-3.5 px-4">{t('mandi.marketLocation')}</th>
                  <th className="py-3.5 px-4 text-right">{t('mandi.minPrice')}</th>
                  <th className="py-3.5 px-4 text-right">{t('mandi.modalPrice')}</th>
                  <th className="py-3.5 px-4 text-right">{t('mandi.maxPrice')}</th>
                  <th className="py-3.5 px-4 text-right">{t('mandi.priceSpread')}</th>
                  <th className="py-3.5 px-4 text-right">{t('mandi.arrivals')}</th>
                  <th className="py-3.5 px-4 text-center">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
                {displayedRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900 text-xs">{item.commodity}</div>
                      <div className="text-[11px] text-stone-500">{item.variety} ({item.category})</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-850">{item.market}</div>
                      <div className="text-[11px] text-stone-500">{item.district}, {item.state}</div>
                    </td>
                    <td className="py-3 px-4 text-right text-stone-600 font-mono">
                      ₹{item.min_price?.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-900 font-mono text-sm">
                      ₹{item.modal_price?.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right text-stone-600 font-mono">
                      ₹{item.max_price?.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-stone-500 text-[11px]">
                      ₹{Math.max(0, (item.max_price || 0) - (item.min_price || 0)).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-stone-700">
                      {item.arrivals_tonnes || 0} T
                    </td>
                    <td className="py-3 px-4 text-center text-stone-500 text-[11px]">
                      {item.arrival_date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
