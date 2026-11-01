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
      alert('Please fill in crop name, quantity, and expected price.');
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
      organic: formData.variety.toLowerCase().includes('organic'),
      verified: true
    };

    const created = storageService.addProduceListing(newListing);
    onShowNotification(`"${newListing.cropName}" listing published successfully!`);
    if (onProduceAdded) onProduceAdded(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">List Agricultural Harvest Lot</h2>
              <p className="text-xs text-emerald-100">Standardized marketplace form conforming to Kisan Setu 4-Tier Schema</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Row 1: Crop Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Crop Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sharbati Wheat, Sona Masoori"
                value={formData.cropName}
                onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-white"
              >
                <option value="Grains & Cereals">Grains & Cereals</option>
                <option value="Pulses (Dal)">Pulses (Dal)</option>
                <option value="Cash Crops">Cash Crops</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Oilseeds">Oilseeds</option>
                <option value="Spices">Spices</option>
              </select>
            </div>
          </div>

          {/* Row 2: Variety & Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Variety / Grade
              </label>
              <input
                type="text"
                placeholder="e.g. Grade A+, Organic Certified, Desi"
                value={formData.variety}
                onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Harvest / Readiness Date
              </label>
              <input
                type="date"
                value={formData.harvestDate}
                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Row 3: Total Quantity, Unit, MOQ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Total Available Quantity *
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="e.g. 150"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Measurement Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-white"
              >
                <option value="Quintals">Quintals (100 kg)</option>
                <option value="Tonnes">Tonnes (1000 kg)</option>
                <option value="Kilograms">Kilograms (kg)</option>
                <option value="Crates">Crates</option>
                <option value="Bales">Bales (Cotton)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Min Order (MOQ)
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 10"
                value={formData.minOrderQuantity}
                onChange={(e) => setFormData({ ...formData, minOrderQuantity: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Row 4: Pricing & Govt Benchmark */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
            <div>
              <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                Expected Price (₹ / {formData.unit}) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-gray-500 font-bold">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="2850"
                  value={formData.expectedPrice}
                  onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-emerald-300 bg-white text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                APMC Mandi Benchmark (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-gray-500 font-bold">₹</span>
                <input
                  type="number"
                  placeholder="2650 (Auto-filled if blank)"
                  value={formData.apmcBenchmark}
                  onChange={(e) => setFormData({ ...formData, apmcBenchmark: e.target.value })}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-emerald-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Row 5: Location & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Farm Location / Mandi District *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Contact Phone / WhatsApp
              </label>
              <input
                type="text"
                value={formData.farmerPhone}
                onChange={(e) => setFormData({ ...formData, farmerPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Image Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Listing Image
              </label>
              <button
                type="button"
                onClick={() => setCustomImage(!customImage)}
                className="text-xs text-emerald-700 hover:underline font-semibold"
              >
                {customImage ? 'Pick Preset Photos' : 'Provide Custom URL'}
              </button>
            </div>

            {customImage ? (
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {IMAGE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className={`relative rounded-lg overflow-hidden border-2 aspect-square group ${
                      formData.image === preset.url ? 'border-emerald-600 ring-2 ring-emerald-300' : 'border-gray-200'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    {formData.image === preset.url && (
                      <div className="absolute inset-0 bg-emerald-900/40 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Quality Specs & Description
            </label>
            <textarea
              rows={3}
              placeholder="e.g., Moisture content < 12%, stored in ventilated airtight bags, free from admixture, ready for immediate loading from farm gate."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              Publish to Marketplace
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
