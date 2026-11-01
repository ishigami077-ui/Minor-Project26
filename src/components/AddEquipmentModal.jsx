import React, { useState } from 'react';
import { 
  X, 
  Tractor, 
  DollarSign, 
  MapPin, 
  Compass, 
  Gauge, 
  Check, 
  Fuel, 
  Layers 
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { useLanguage } from '../i18n/LanguageContext';

const MACHINERY_PRESETS = [
  { label: 'Mahindra Tractor', url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80' },
  { label: 'JCB Backhoe Loader', url: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80' },
  { label: 'Combine Harvester', url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Mini Power Tiller', url: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80' },
  { label: 'Agri Drone Sprayer', url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Multi-crop Thresher', url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80' }
];

export function AddEquipmentModal({ isOpen, onClose, onEquipmentAdded, onShowNotification }) {
  const { lang, t } = useLanguage();
  const currentUser = storageService.getCurrentUser();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Tractors',
    pricingType: 'Turnkey Service (With Operator)',
    rate: '',
    rateUnit: '/ hour',
    hp: '47 HP',
    providerName: currentUser.role === 'PROVIDER' ? currentUser.name : 'Saoner Kisan Agri Mechanization Hub',
    providerPhone: currentUser.phone || '+91 98223 99881',
    serviceRadiusKm: '30',
    district: 'Nagpur',
    state: 'Maharashtra',
    fuelTerms: 'Fuel & Mobil Oil Included',
    description: '',
    image: MACHINERY_PRESETS[0].url,
    availableNow: true
  });

  const [customImage, setCustomImage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.rate) {
      alert(lang === 'hi' ? 'कृपया मशीनरी मॉडल का नाम और दर भरें।' : 'Please fill in machinery model name and rate.');
      return;
    }

    const newEquipment = {
      ...formData,
      rate: Number(formData.rate),
      serviceRadiusKm: Number(formData.serviceRadiusKm || 25),
      providerId: currentUser.id,
      verified: true
    };

    const created = storageService.addEquipmentListing(newEquipment);
    onShowNotification(lang === 'hi' ? `"${newEquipment.title}" मशीनरी बाज़ार में जोड़ी गई!` : `"${newEquipment.title}" added to machinery catalog!`);
    if (onEquipmentAdded) onEquipmentAdded(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-amber-800 px-6 py-5 text-white flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Tractor className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">{t('addEquipment.title')}</h2>
              <p className="text-xs text-amber-100/90 leading-tight">{t('addEquipment.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addEquipment.titleLabel')}
              </label>
              <input
                type="text"
                required
                placeholder={t('addEquipment.titlePlaceholder')}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addEquipment.category')}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 font-medium bg-white cursor-pointer"
              >
                <option value="Tractors">{t('equipment.catTractors')}</option>
                <option value="JCB & Earthmovers">{t('equipment.catEarthmovers')}</option>
                <option value="Harvesters">{t('equipment.catHarvesters')}</option>
                <option value="Tillers & Rotavators">{t('equipment.catTillers')}</option>
                <option value="Drones & Sprayers">{t('equipment.catDrones')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
            <div>
              <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1">
                {t('addEquipment.serviceType')}
              </label>
              <select
                value={formData.pricingType}
                onChange={(e) => setFormData({ ...formData, pricingType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
              >
                <option value="Turnkey Service (With Operator)">{t('equipment.modTurnkey')}</option>
                <option value="Rental (Self-Drive)">{t('equipment.modRental')}</option>
                <option value="Sale">{t('equipment.modSale')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1">
                {t('addEquipment.rate')}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-stone-500 font-bold text-xs">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="850"
                  value={formData.rate}
                  onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-amber-300 bg-white text-sm font-black text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1">
                {t('addEquipment.rateMetric')}
              </label>
              <select
                value={formData.rateUnit}
                onChange={(e) => setFormData({ ...formData, rateUnit: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
              >
                <option value="/ hour">/ hour (प्रति घंटा)</option>
                <option value="/ acre">/ acre (प्रति एकड़)</option>
                <option value="/ day (8 hrs)">/ day (8 घंटे)</option>
                <option value="Fixed Total">Fixed Total (कुल मूल्य)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addEquipment.powerSpecs')}
              </label>
              <input
                type="text"
                placeholder="e.g. 50 HP, 4WD"
                value={formData.hp}
                onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addEquipment.serviceRadius')}
              </label>
              <input
                type="number"
                placeholder="30"
                value={formData.serviceRadiusKm}
                onChange={(e) => setFormData({ ...formData, serviceRadiusKm: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addEquipment.fuelTerms')}
              </label>
              <select
                value={formData.fuelTerms}
                onChange={(e) => setFormData({ ...formData, fuelTerms: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
              >
                <option value="Fuel & Mobil Oil Included">Fuel & Oil Included</option>
                <option value="Fuel borne by Farmer (Diesel)">Farmer Supplies Diesel</option>
                <option value="Not Applicable (Battery / Solar)">Electric / Battery</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addEquipment.providerName')}
              </label>
              <input
                type="text"
                value={formData.providerName}
                onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addEquipment.district')}
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>

          {/* Photo Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                {t('addEquipment.photoLabel')}
              </label>
              <button
                type="button"
                onClick={() => setCustomImage(!customImage)}
                className="text-xs text-amber-800 hover:underline font-bold cursor-pointer"
              >
                {customImage ? t('addEquipment.pickPreset') : t('addEquipment.customUrl')}
              </button>
            </div>

            {customImage ? (
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {MACHINERY_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className={`relative rounded-xl overflow-hidden border-2 aspect-video group cursor-pointer ${
                      formData.image === preset.url ? 'border-amber-700 ring-2 ring-amber-300' : 'border-stone-200'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    {formData.image === preset.url && (
                      <div className="absolute inset-0 bg-amber-950/40 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              {t('addEquipment.description')}
            </label>
            <textarea
              rows={3}
              placeholder={t('addEquipment.descPlaceholder')}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs sm:text-sm font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
            >
              {t('addEquipment.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {t('addEquipment.publish')}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
