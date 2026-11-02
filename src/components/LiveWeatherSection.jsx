import React, { useState, useEffect, useRef } from 'react';
import {
  CloudSun,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  Compass,
  MapPin,
  Search,
  RotateCw,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Info,
  Calendar,
  Sunrise,
  Sunset,
  Navigation,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { weatherService, PRESET_AGRICULTURAL_HUBS } from '../services/weatherService';
import { useLanguage } from '../i18n/LanguageContext';

export function LiveWeatherSection() {
  const { lang, t } = useLanguage();

  const [location, setLocation] = useState(weatherService.getSelectedLocation());
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Search autocomplete state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // GPS detecting
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  // Auto-refresh timer state
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [secondsUntilNextRefresh, setSecondsUntilNextRefresh] = useState(300); // 5 minutes

  // Load weather when location changes
  useEffect(() => {
    fetchWeatherForLocation(location);
  }, [location]);

  // Click outside search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced geocoding search
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await weatherService.searchLocations(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
      setIsDropdownOpen(results.length > 0);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Auto-refresh countdown (every second, refresh at 0)
  useEffect(() => {
    if (!autoRefreshEnabled) return;

    const interval = setInterval(() => {
      setSecondsUntilNextRefresh((prev) => {
        if (prev <= 1) {
          fetchWeatherForLocation(location, true);
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefreshEnabled, location]);

  const fetchWeatherForLocation = async (loc, isBackground = false) => {
    if (isBackground) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setErrorMessage(null);

    try {
      const data = await weatherService.fetchLiveWeather(loc.lat, loc.lon, loc);
      setWeatherData(data);
      setSecondsUntilNextRefresh(300);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setErrorMessage(
        err.message || (lang === 'hi' ? 'मौसम डेटा लोड करने में त्रुटि' : 'Failed to fetch live weather.')
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSelectLocation = (loc) => {
    setLocation(loc);
    weatherService.setSelectedLocation(loc);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const handleDetectGps = async () => {
    setIsDetectingGps(true);
    setErrorMessage(null);
    try {
      const gpsLoc = await weatherService.getDeviceLocation();
      handleSelectLocation(gpsLoc);
    } catch (err) {
      console.warn('GPS detection error:', err);
      setErrorMessage(
        lang === 'hi'
          ? 'डिवाइस का स्थान प्राप्त नहीं हो सका। कृपया ब्राउज़र लोकेशन अनुमति प्रदान करें।'
          : 'Could not access device GPS. Please grant browser location permission or choose from preset hubs.'
      );
    } finally {
      setIsDetectingGps(false);
    }
  };

  // Weather Icon Component Helper
  const renderWeatherIcon = (iconType, className = 'w-8 h-8') => {
    switch (iconType) {
      case 'sun':
        return <Sun className={`${className} text-amber-500 animate-spin-slow`} />;
      case 'sun-cloud':
      case 'cloud-sun':
        return <CloudSun className={`${className} text-amber-400`} />;
      case 'cloud':
        return <Cloud className={`${className} text-stone-400`} />;
      case 'cloud-drizzle':
        return <CloudDrizzle className={`${className} text-blue-400`} />;
      case 'cloud-rain':
      case 'cloud-rain-heavy':
        return <CloudRain className={`${className} text-blue-500`} />;
      case 'cloud-lightning':
        return <CloudLightning className={`${className} text-amber-500 animate-pulse`} />;
      case 'cloud-fog':
        return <CloudFog className={`${className} text-stone-300`} />;
      case 'snowflake':
        return <Snowflake className={`${className} text-sky-300`} />;
      default:
        return <Sun className={`${className} text-amber-500`} />;
    }
  };

  const current = weatherData?.current;
  const todayForecast = weatherData?.daily?.[0];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 1. Header & Live Indicator */}
      <div className="bg-gradient-to-br from-sky-950 via-teal-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/80 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
              <CloudSun className="w-3.5 h-3.5 text-teal-300" />
              <span>{t('weather.badge')}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t('weather.title')}
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {t('weather.subtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-teal-200/90 font-medium">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {t('weather.dataSource')}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3 text-teal-300" />
                {t('weather.lastUpdated')}:{' '}
                {weatherData ? new Date(weatherData.lastUpdated).toLocaleTimeString() : '...'}
              </span>
            </div>
          </div>

          {/* Quick Refresh & Auto-Sync Controls */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => fetchWeatherForLocation(location)}
              disabled={loading || refreshing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 active:scale-95 text-white text-xs font-bold transition-all border border-white/20 cursor-pointer shadow-sm"
            >
              <RotateCw className={`w-3.5 h-3.5 ${refreshing || loading ? 'animate-spin' : ''}`} />
              <span>{refreshing ? t('weather.refreshing') : t('weather.refreshBtn')}</span>
            </button>

            <button
              onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                autoRefreshEnabled
                  ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                  : 'bg-stone-800 border-stone-700 text-stone-400'
              }`}
              title="Toggle automatic weather polling every 5 minutes"
            >
              <span className={`w-2 h-2 rounded-full ${autoRefreshEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'}`} />
              <span>
                {autoRefreshEnabled ? `${Math.floor(secondsUntilNextRefresh / 60)}m ${secondsUntilNextRefresh % 60}s` : 'Auto-Sync Off'}
              </span>
            </button>
          </div>
        </div>

        {/* Location Picker & Autocomplete Search Bar */}
        <div className="relative z-10 mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center gap-3">
          
          <div className="relative flex-1" ref={searchContainerRef}>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setIsDropdownOpen(true);
                }}
                placeholder={t('weather.searchPlaceholder')}
                className="w-full bg-stone-900/90 text-white placeholder-stone-400 text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-teal-400 transition-colors"
              />
              {isSearching && (
                <RotateCw className="w-3.5 h-3.5 text-teal-300 animate-spin absolute right-3.5" />
              )}
            </div>

            {/* Dropdown Results */}
            {isDropdownOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white text-stone-900 rounded-2xl shadow-2xl border border-stone-200 z-50 max-h-64 overflow-y-auto p-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                {searchResults.map((res) => (
                  <button
                    key={`${res.id}-${res.lat}-${res.lon}`}
                    onClick={() => handleSelectLocation(res)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-stone-50 transition-colors flex items-center justify-between gap-3 text-xs cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold text-stone-900">{res.name}</span>
                        {res.state && <span className="text-stone-500 ml-1">({res.state})</span>}
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {res.lat.toFixed(2)}°N, {res.lon.toFixed(2)}°E
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* GPS Button */}
          <button
            onClick={handleDetectGps}
            disabled={isDetectingGps}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-800/70 hover:bg-teal-700 text-white text-xs font-bold transition-all border border-teal-500/40 cursor-pointer shrink-0"
          >
            <Navigation className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
            <span>{isDetectingGps ? t('weather.detectingGps') : t('weather.useGps')}</span>
          </button>
        </div>

        {/* Quick Regional Agricultural Hub Pills */}
        <div className="relative z-10 mt-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[11px] text-teal-300/80 font-bold uppercase tracking-wider shrink-0">
            {t('weather.presetHubs')}:
          </span>
          {PRESET_AGRICULTURAL_HUBS.map((hub) => {
            const isSelected = location?.id === hub.id || location?.name === hub.name;
            return (
              <button
                key={hub.id}
                onClick={() => handleSelectLocation(hub)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-400 text-stone-950 font-bold shadow-xs'
                    : 'bg-white/10 text-stone-200 hover:bg-white/20'
                }`}
              >
                {hub.name}
              </button>
            );
          })}
        </div>

      </div>

      {/* Error / Alert banner */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">{lang === 'hi' ? 'सूचना / चेतावनी: ' : 'Weather Notice: '}</span>
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => fetchWeatherForLocation(location)}
            className="text-xs font-bold underline text-amber-900 hover:text-amber-700 cursor-pointer"
          >
            {lang === 'hi' ? 'पुनः प्रयास करें' : 'Retry'}
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && !weatherData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          <div className="md:col-span-1 h-64 bg-stone-200 rounded-3xl" />
          <div className="md:col-span-2 h-64 bg-stone-200 rounded-3xl" />
        </div>
      )}

      {/* Main Weather Data Display */}
      {weatherData && (
        <>
          {/* 2. Hero Current Weather Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Primary Conditions Card (5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-white to-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    <div>
                      <h2 className="text-lg font-extrabold text-stone-900 leading-tight">
                        {location.name}
                      </h2>
                      <p className="text-xs text-stone-500 font-medium">
                        {location.state || location.country}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                    Live IMD / WMO
                  </span>
                </div>

                {/* Big Temperature & Icon */}
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl sm:text-6xl font-black text-stone-900 tracking-tight">
                        {current.temperature}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-stone-500">°C</span>
                    </div>
                    <p className="text-xs font-semibold text-stone-500 mt-1">
                      {t('weather.feelsLike')} <span className="font-bold text-stone-700">{current.apparentTemperature}°C</span>
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-100 flex items-center justify-center">
                    {renderWeatherIcon(current.conditionIconType, 'w-14 h-14 sm:w-16 sm:h-16')}
                  </div>
                </div>

                {/* Weather Condition Text */}
                <div className="pt-2">
                  <span className="inline-block text-sm sm:text-base font-extrabold text-stone-850">
                    {lang === 'hi'
                      ? weatherService.mapWmoCode(current.weatherCode).hindiLabel
                      : current.condition}
                  </span>
                  {todayForecast && (
                    <div className="flex items-center gap-3 text-xs text-stone-500 mt-1 font-medium">
                      <span>
                        {t('weather.maxMinTemp')}:{' '}
                        <strong className="text-stone-800">{todayForecast.maxTemp}°C</strong> /{' '}
                        <strong className="text-stone-600">{todayForecast.minTemp}°C</strong>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Coordinates info footer */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                <span>Lat: {weatherData.coordinates.latitude?.toFixed(3)}°N</span>
                <span>Lon: {weatherData.coordinates.longitude?.toFixed(3)}°E</span>
                <span>Elev: {weatherData.coordinates.elevation}m</span>
              </div>
            </div>

            {/* Right Metrics Grid (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-4">
              
              {/* Relative Humidity */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs hover:border-emerald-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    {t('weather.humidity')}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Droplets className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                    {current.humidity}%
                  </span>
                  <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, current.humidity)}%` }}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-stone-400 mt-2 font-medium">
                  {current.humidity > 70 ? 'High transpiration barrier' : 'Balanced relative humidity'}
                </p>
              </div>

              {/* Rainfall / Precipitation */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs hover:border-emerald-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    {t('weather.rainfall')}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                    <CloudRain className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                    {current.precipitation}
                  </span>
                  <span className="text-sm font-bold text-stone-500 ml-1">mm</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-2 font-medium">
                  {todayForecast ? `${t('weather.rainChance')}: ${todayForecast.rainProbMax}%` : 'Accumulated precip'}
                </p>
              </div>

              {/* Wind Speed & Direction */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs hover:border-emerald-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    {t('weather.windSpeed')}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Wind className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                    {current.windSpeed}
                  </span>
                  <span className="text-xs font-bold text-stone-500">km/h</span>
                  <span className="text-xs font-bold text-emerald-700 ml-2 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {current.windDirection}
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 mt-2 font-medium">
                  {current.windSpeed > 18 ? 'High drift — caution spraying' : 'Favorable gentle breeze'}
                </p>
              </div>

              {/* Surface Pressure */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs hover:border-emerald-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    {t('weather.pressure')}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Gauge className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                    {Math.round(current.pressure)}
                  </span>
                  <span className="text-xs font-bold text-stone-500 ml-1">hPa</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-2 font-medium">
                  {current.pressure < 1005 ? 'Low pressure depression' : 'Stable atmospheric column'}
                </p>
              </div>

            </div>

          </div>

          {/* 3. Scientific Agricultural Advisories Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-stone-900">
                    {t('weather.advisoryTitle')}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {lang === 'hi'
                      ? 'वर्तमान तापमान, हवा और बारिश की संभावना के आधार पर वास्तविक कृषि अनुशंसा'
                      : 'Real-time scientific recommendations based on field weather parameters'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {weatherData.advisories.map((adv) => {
                const isSuccess = adv.type === 'success';
                const isWarning = adv.type === 'warning' || adv.type === 'danger';
                const isCaution = adv.type === 'caution';

                const borderCls = isSuccess
                  ? 'border-emerald-200 bg-emerald-50/50'
                  : isWarning
                  ? 'border-red-200 bg-red-50/50'
                  : 'border-amber-200 bg-amber-50/50';

                const badgeCls = isSuccess
                  ? 'bg-emerald-100 text-emerald-800'
                  : isWarning
                  ? 'bg-red-100 text-red-800'
                  : 'bg-amber-100 text-amber-800';

                return (
                  <div
                    key={adv.id}
                    className={`p-4 rounded-2xl border ${borderCls} flex flex-col justify-between space-y-3`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${badgeCls}`}>
                          {lang === 'hi' ? adv.categoryHi : adv.category}
                        </span>
                        {isSuccess ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : isWarning ? (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        ) : (
                          <Info className="w-4 h-4 text-amber-600" />
                        )}
                      </div>

                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 mt-2">
                        {lang === 'hi' ? adv.titleHi : adv.title}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        {lang === 'hi' ? adv.descHi : adv.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Next 24-Hours Hourly Forecast Strip */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700" />
                <h3 className="font-extrabold text-sm sm:text-base text-stone-900">
                  {t('weather.hourlyTitle')}
                </h3>
              </div>
              <span className="text-xs text-stone-400 font-medium hidden sm:inline">
                {lang === 'hi' ? 'तापमान एवं बारिश की संभावना (%)' : 'Temperature & Rain Probability (%)'}
              </span>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar">
              {weatherData.hourly.map((hour, idx) => (
                <div
                  key={`${hour.time}-${idx}`}
                  className="flex flex-col items-center justify-between p-3 rounded-2xl bg-stone-50 hover:bg-emerald-50/60 border border-stone-200/70 min-w-[85px] shrink-0 text-center space-y-2 transition-all cursor-default"
                >
                  <span className="text-[11px] font-bold text-stone-500">{hour.hourLabel}</span>
                  <div className="py-1">
                    {renderWeatherIcon(weatherService.mapWmoCode(hour.code).iconType, 'w-6 h-6')}
                  </div>
                  <span className="text-sm font-extrabold text-stone-900">{hour.temp}°C</span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600">
                    <Droplets className="w-3 h-3 text-blue-500" />
                    <span>{hour.rainProb}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. 7-Day Agricultural Forecast Table / Cards */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <h3 className="font-extrabold text-sm sm:text-base text-stone-900">
                  {t('weather.dailyTitle')}
                </h3>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                {lang === 'hi' ? '7 दिवसीय पूर्वानुमान' : '7-Day Outlook'}
              </span>
            </div>

            <div className="divide-y divide-stone-100">
              {weatherData.daily.map((day, idx) => {
                const isToday = idx === 0;
                return (
                  <div
                    key={day.date}
                    className={`py-3.5 px-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                      isToday ? 'bg-emerald-50/40 font-bold' : 'hover:bg-stone-50'
                    }`}
                  >
                    {/* Day & Date */}
                    <div className="flex items-center gap-3 w-40">
                      <span className={`text-xs sm:text-sm font-bold ${isToday ? 'text-emerald-900' : 'text-stone-850'}`}>
                        {isToday ? (lang === 'hi' ? 'आज' : 'Today') : day.dayName}
                      </span>
                      <span className="text-xs text-stone-400 font-normal">
                        {day.fullDate}
                      </span>
                    </div>

                    {/* Condition Icon & Text */}
                    <div className="flex items-center gap-2.5 flex-1 min-w-[160px]">
                      {renderWeatherIcon(weatherService.mapWmoCode(day.code).iconType, 'w-5 h-5')}
                      <span className="text-xs font-semibold text-stone-700 truncate">
                        {lang === 'hi'
                          ? weatherService.mapWmoCode(day.code).hindiLabel
                          : day.condition}
                      </span>
                    </div>

                    {/* Precipitation Prob */}
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-700 w-28">
                      <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                      <span>{day.rainProbMax}%</span>
                      {day.precipitationSum > 0 && (
                        <span className="text-[10px] text-stone-400 font-normal">
                          ({day.precipitationSum}mm)
                        </span>
                      )}
                    </div>

                    {/* Temperature Range Bar */}
                    <div className="flex items-center gap-3 w-48 justify-end">
                      <span className="text-xs font-bold text-stone-500">{day.minTemp}°</span>
                      <div className="w-24 bg-stone-200 h-2 rounded-full overflow-hidden flex">
                        <div
                          className="bg-gradient-to-r from-blue-400 via-amber-400 to-orange-500 h-full rounded-full"
                          style={{ width: `${Math.min(100, Math.max(20, (day.maxTemp - 15) * 4))}%` }}
                        />
                      </div>
                      <span className="text-xs font-extrabold text-stone-900">{day.maxTemp}°C</span>
                    </div>

                    {/* Sunrise / Sunset */}
                    {day.sunrise && day.sunset && (
                      <div className="hidden xl:flex items-center gap-3 text-[11px] text-stone-400 font-mono w-36 justify-end">
                        <span className="flex items-center gap-1" title="Sunrise">
                          <Sunrise className="w-3 h-3 text-amber-500" />
                          {day.sunrise}
                        </span>
                        <span className="flex items-center gap-1" title="Sunset">
                          <Sunset className="w-3 h-3 text-orange-400" />
                          {day.sunset}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

    </div>
  );
}
