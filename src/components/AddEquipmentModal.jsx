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

const MACHINERY_PRESETS = [
  { label: 'Mahindra Tractor', url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80' },
  { label: 'JCB Backhoe Loader', url: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80' },
  { label: 'Combine Harvester', url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Mini Power Tiller', url: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80' },
  { label: 'Agri Drone Sprayer', url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Multi-crop Thresher', url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80' }
];

export function AddEquipmentModal({ isOpen, onClose, onEquipmentAdded, onShowNotification }) {
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
      alert('Please fill in machinery model name and rate.');
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
    onShowNotification(`"${newEquipment.title}" added to machinery catalog!`);
    if (onEquipmentAdded) onEquipmentAdded(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 to-orange-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Tractor className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold">List Agricultural Machinery / Equipment</h2>
              <p className="text-xs text-amber-100">Offer farm machinery for hourly rental, turnkey service, or direct sale</p>
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
          
          {/* Row 1: Model & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Equipment Title / Model *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mahindra 575 DI Tractor with Rotavator"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Machinery Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium bg-white"
              >
                <option value="Tractors">Tractors & Implements</option>
                <option value="JCB & Earthmovers">JCB & Earthmovers (Pond/Canal Digging)</option>
                <option value="Harvesters">Combine Harvesters</option>
                <option value="Tillers & Rotavators">Tillers & Rotavators</option>
                <option value="Drones & Sprayers">Agricultural Drones & Sprayers</option>
                <option value="Threshers & Planters">Threshers, Seed Drills & Planters</option>
              </select>
            </div>
          </div>

          {/* Row 2: Pricing Type, Rate, Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
            <div>
              <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1">
                Service Type
              </label>
              <select
                value={formData.pricingType}
                onChange={(e) => setFormData({ ...formData, pricingType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Turnkey Service (With Operator)">With Operator (Turnkey)</option>
                <option value="Rental (Self-Drive)">Self-Drive Rental</option>
                <option value="Sale">For Outright Sale</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1">
                Rate / Price (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 font-bold text-xs">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="850"
                  value={formData.rate}
                  onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-amber-300 bg-white text-sm font-black text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1">
                Rate Metric
              </label>
              <select
                value={formData.rateUnit}
                onChange={(e) => setFormData({ ...formData, rateUnit: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="/ hour">/ hour</option>
                <option value="/ acre">/ acre</option>
                <option value="/ day (8 hrs)">/ day (8 hrs)</option>
                <option value="Fixed Total">Fixed Total (Sale)</option>
              </select>
            </div>
          </div>

          {/* Row 3: Specs & Radius */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Power / Specs (HP)
              </label>
              <input
                type="text"
                placeholder="e.g. 50 HP, 4WD"
                value={formData.hp}
                onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Service Radius (km)
              </label>
              <input
                type="number"
                placeholder="e.g. 30"
                value={formData.serviceRadiusKm}
                onChange={(e) => setFormData({ ...formData, serviceRadiusKm: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Fuel Condition
              </label>
              <select
                value={formData.fuelTerms}
                onChange={(e) => setFormData({ ...formData, fuelTerms: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Fuel & Mobil Oil Included">Fuel Included</option>
                <option value="Fuel borne by Farmer (Diesel)">Farmer Supplies Diesel</option>
                <option value="Not Applicable (Battery / Solar)">Electric / Battery</option>
              </select>
            </div>
          </div>

          {/* Row 4: Provider & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Provider / Workshop Name
              </label>
              <input
                type="text"
                value={formData.providerName}
                onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                District / Base Hub
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Preset Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Machinery Photo
              </label>
              <button
                type="button"
                onClick={() => setCustomImage(!customImage)}
                className="text-xs text-amber-700 hover:underline font-semibold"
              >
                {customImage ? 'Pick Preset Machinery' : 'Provide Custom URL'}
              </button>
            </div>

            {customImage ? (
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {MACHINERY_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className={`relative rounded-lg overflow-hidden border-2 aspect-video group ${
                      formData.image === preset.url ? 'border-amber-600 ring-2 ring-amber-300' : 'border-gray-200'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    {formData.image === preset.url && (
                      <div className="absolute inset-0 bg-amber-900/40 flex items-center justify-center">
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
              Implements & Service Details
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Comes with 7-foot heavy duty rotavator and reversible MB plough. Experienced driver for deep tillage in black cotton soil. Available on 4-hour notice."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
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
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              Publish Machinery Listing
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
