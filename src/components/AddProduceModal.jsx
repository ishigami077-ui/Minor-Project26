import React, { useState } from 'react';
import { 
  X, 
  Sprout, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Layers, 
  Image as ImageIcon,
  Check,
  AlertCircle
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { useLanguage } from '../i18n/LanguageContext';

const IMAGE_PRESETS = [
  { label: 'Wheat / Sharbati', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Rice / Paddy', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Soybean', url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cotton (Kapas)', url: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Red Onions', url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80' },
  { label: 'Fresh Tomatoes', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' },
  { label: 'Orange / Citrus', url: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Chickpeas / Chana', url: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80' },
];

export function AddProduceModal({ isOpen, onClose, onProduceAdded, onShowNotification }) {
  const { lang, t } = useLanguage();
  const currentFarmer = storageService.getCurrentUser();

  const [formData, setFormData] = useState({
    cropName: '',
    category: 'Grains & Cereals',
    variety: '',
    quantity: '',
    unit: 'Quintals',
    minOrderQuantity: '10',
    expectedPrice: '',
    apmcBenchmark: '',
    harvestDate: new Date().toISOString().split('T')[0],
    location: currentFarmer.location || 'Saoner, Nagpur, Maharashtra',
    description: '',
    image: IMAGE_PRESETS[0].url,
    farmerPhone: currentFarmer.phone || '+91 98231 44521'
  });

  const [customImage, setCustomImage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cropName || !formData.quantity || !formData.expectedPrice) {
      alert(lang === 'hi' ? 'कृपया फसल का नाम, मात्रा और अपेक्षित मूल्य भरें।' : 'Please fill in crop name, quantity, and expected price.');
      return;
    }

    const newListing = {
      ...formData,
      quantity: Number(formData.quantity),
      minOrderQuantity: Number(formData.minOrderQuantity || 1),
      expectedPrice: Number(formData.expectedPrice),
      apmcBenchmark: formData.apmcBenchmark ? Number(formData.apmcBenchmark) : Math.round(Number(formData.expectedPrice) * 0.94),
      farmerId: currentFarmer.id,
      farmerName: currentFarmer.name,
      rating: 4.9,
      reviewsCount: 1,
      organic: formData.variety.toLowerCase().includes('organic') || formData.variety.includes('जैविक'),
      verified: true
    };

    const created = storageService.addProduceListing(newListing);
    onShowNotification(lang === 'hi' ? `"${newListing.cropName}" फसल लॉट प्रकाशित हुआ!` : `"${newListing.cropName}" listing published successfully!`);
    if (onProduceAdded) onProduceAdded(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-emerald-900 px-6 py-5 text-white flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">{t('addProduce.title')}</h2>
              <p className="text-xs text-emerald-100/90 leading-tight">{t('addProduce.subtitle')}</p>
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
                {t('addProduce.cropName')}
              </label>
              <input
                type="text"
                required
                placeholder={t('addProduce.cropPlaceholder')}
                value={formData.cropName}
                onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addProduce.category')}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium bg-white cursor-pointer"
              >
                <option value="Grains & Cereals">{t('produce.catCereals')}</option>
                <option value="Pulses (Dal)">{t('produce.catPulses')}</option>
                <option value="Cash Crops">{t('produce.catCashCrops')}</option>
                <option value="Vegetables">{t('produce.catVegetables')}</option>
                <option value="Fruits">{t('produce.catFruits')}</option>
                <option value="Oilseeds">{t('produce.catOilseeds')}</option>
                <option value="Spices">{t('produce.catSpices')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addProduce.variety')}
              </label>
              <input
                type="text"
                placeholder={t('addProduce.varietyPlaceholder')}
                value={formData.variety}
                onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addProduce.harvestDate')}
              </label>
              <input
                type="date"
                value={formData.harvestDate}
                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addProduce.quantity')}
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="150"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-black text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addProduce.unit')}
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium bg-white cursor-pointer"
              >
                <option value="Quintals">Quintals (100 kg)</option>
                <option value="Tonnes">Tonnes (1000 kg)</option>
                <option value="Kilograms">Kilograms (kg)</option>
                <option value="Crates">Crates</option>
                <option value="Bales">Bales (Cotton)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addProduce.moq')}
              </label>
              <input
                type="number"
                min="1"
                placeholder="10"
                value={formData.minOrderQuantity}
                onChange={(e) => setFormData({ ...formData, minOrderQuantity: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                {t('addProduce.expectedPrice')} (₹ / {formData.unit}) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-stone-500 font-bold">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="2850"
                  value={formData.expectedPrice}
                  onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-emerald-300 bg-white text-sm font-black text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                {t('addProduce.mandiBenchmark')}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-stone-500 font-bold">₹</span>
                <input
                  type="number"
                  placeholder="2650"
                  value={formData.apmcBenchmark}
                  onChange={(e) => setFormData({ ...formData, apmcBenchmark: e.target.value })}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-emerald-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addProduce.location')}
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t('addProduce.phone')}
              </label>
              <input
                type="text"
                value={formData.farmerPhone}
                onChange={(e) => setFormData({ ...formData, farmerPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Photo Preset Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                {t('addProduce.imageLabel')}
              </label>
              <button
                type="button"
                onClick={() => setCustomImage(!customImage)}
                className="text-xs text-emerald-800 hover:underline font-bold cursor-pointer"
              >
                {customImage ? t('addProduce.pickPreset') : t('addProduce.customUrl')}
              </button>
            </div>

            {customImage ? (
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {IMAGE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className={`relative rounded-xl overflow-hidden border-2 aspect-square group cursor-pointer ${
                      formData.image === preset.url ? 'border-emerald-700 ring-2 ring-emerald-300' : 'border-stone-200'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    {formData.image === preset.url && (
                      <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center">
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
              {t('addProduce.description')}
            </label>
            <textarea
              rows={3}
              placeholder={t('addProduce.descPlaceholder')}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs sm:text-sm font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
            >
              {t('addProduce.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {t('addProduce.publish')}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
