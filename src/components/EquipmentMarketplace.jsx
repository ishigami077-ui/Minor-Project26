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
  Tag
} from 'lucide-react';

export function EquipmentMarketplace({
  equipmentList,
  onBookEquipment,
  onOpenAddEquipmentModal,
  activeRole
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedModality, setSelectedModality] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Tractors', 'Harvesters', 'Earthmovers', 'Implements'];
  const modalities = ['All', 'Rental', 'Service', 'Sale'];

  const filteredEquipment = equipmentList.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchMod = selectedModality === 'All' || item.pricingType === selectedModality;
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hp.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchMod && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-amber-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-700/60 border border-amber-500/30 text-amber-200 text-xs font-semibold backdrop-blur-sm">
              <Tractor className="w-3.5 h-3.5 text-amber-300" />
              Rural Asset-Sharing & Custom Hiring Network
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Farm Machinery & Equipment Hub
            </h1>
            <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed">
              Rent high-capacity tractors, combine harvesters, rotavators, and JCB earthmovers on-demand. Boost harvest speed and eliminate debilitating capital debt.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap gap-2">
            <button
              onClick={onOpenAddEquipmentModal}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              + List Machinery Fleet
            </button>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-amber-700/60 text-xs">
          <div>
            <div className="text-2xl font-black text-amber-300">{equipmentList.length} Units</div>
            <div className="text-amber-200 font-medium">Available in Region</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">35-50 km</div>
            <div className="text-amber-200 font-medium">Avg. Service Radius</div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-300">Turnkey</div>
            <div className="text-amber-200 font-medium">Driver & Fuel Options</div>
          </div>
          <div>
            <div className="text-2xl font-black text-amber-300">4.9 ★</div>
            <div className="text-amber-200 font-medium">Operator Verified Rating</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tractors (55 HP), combine harvesters, JCBs, rotavators, districts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 w-full sm:w-auto">
              <Tag className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Modality:</span>
              <select
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer font-bold text-slate-900"
              >
                {modalities.map((m) => (
                  <option key={m} value={m}>
                    {m === 'All' ? 'All Modalities' : m === 'Rental' ? 'For Hourly Rent' : m === 'Service' ? 'Turnkey Service' : 'For Outright Sale'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold px-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Equipment Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-amber-300 transition-all flex flex-col group"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs ${
                    item.pricingType === 'Rental'
                      ? 'bg-blue-100 text-blue-900 border border-blue-200'
                      : item.pricingType === 'Service'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      : 'bg-purple-100 text-purple-900 border border-purple-200'
                  }`}
                >
                  {item.pricingType === 'Rental'
                    ? 'Hourly Rental'
                    : item.pricingType === 'Service'
                    ? 'Turnkey Service (Crew + Fuel)'
                    : 'Outright Sale'}
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-semibold text-white">
                {item.hp}
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-medium text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {item.availability}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <span>{item.businessName}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 inline" />
                </p>

                {/* Rate Card */}
                <div className="mt-4 p-3 bg-amber-50/60 rounded-xl border border-amber-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-800 uppercase font-bold tracking-wider">
                      Pricing Rate
                    </span>
                    <div className="text-xl font-black text-amber-950">
                      ₹{item.rate.toLocaleString()}
                      <span className="text-xs font-semibold text-slate-500">/{item.rateUnit}</span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-600 space-y-0.5">
                    <div className="font-semibold text-slate-700 flex items-center justify-end gap-1">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      Within {item.serviceRadiusKm} km
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {item.district}, {item.state}
                    </div>
                  </div>
                </div>

                {/* Badges / Specs */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600 border border-slate-200/60"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onBookEquipment(item)}
                  className="w-full px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Inquire Schedule & Book Machine
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
