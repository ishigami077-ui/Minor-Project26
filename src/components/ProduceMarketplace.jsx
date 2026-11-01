import React, { useState } from 'react';
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
  X
} from 'lucide-react';

export function ProduceMarketplace({
  produceList,
  onContactFarmer,
  onToggleFollow,
  isFollowing,
  onOpenAddProduceModal,
  activeRole
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [minQty, setMinQty] = useState(0);
  const [activeModalItem, setActiveModalItem] = useState(null);

  const categories = ['All', 'Cereals', 'Pulses', 'Oilseeds', 'Cash Crops', 'Horticulture'];
  const states = ['All', 'Madhya Pradesh', 'Maharashtra', 'Haryana'];

  const filteredProduce = produceList.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchState = selectedState === 'All' || item.state === selectedState;
    const matchSearch =
      item.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchQty = item.quantity >= minQty;
    return matchCat && matchState && matchSearch && matchQty;
  });

  return (
    <div className="space-y-6">
      {/* Hero Header & Quick Stats */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Decorative backdrop shapes */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-emerald-700/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-emerald-200 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Direct Farm-Gate Procurement
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Agricultural Produce Marketplace
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Discover verified bulk harvest listings directly from farmers across Central India. Zero commission agents, transparent floor pricing, and bilateral negotiation.
            </p>
          </div>

          {activeRole === 'farmer' && (
            <div className="shrink-0">
              <button
                onClick={onOpenAddProduceModal}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm shadow-lg shadow-amber-400/20 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Package className="w-4 h-4" />
                + Post New Crop Harvest
              </button>
            </div>
          )}
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-emerald-700/60">
          <div>
            <div className="text-2xl font-black text-amber-300">
              {produceList.reduce((acc, curr) => acc + curr.quantity, 0).toLocaleString()} Qtl
            </div>
            <div className="text-xs text-emerald-200 font-medium">Available Bulk Volume</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">{produceList.length} Lots</div>
            <div className="text-xs text-emerald-200 font-medium">Active Farm Listings</div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-300">0%</div>
            <div className="text-xs text-emerald-200 font-medium">Middleman Margin / Cut</div>
          </div>
          <div>
            <div className="text-2xl font-black text-amber-300">100%</div>
            <div className="text-xs text-emerald-200 font-medium">Verified Farm-Gate Lots</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        {/* Search Input and State dropdown */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by crop name (Wheat, Soybean, Paddy), district, or farmer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 w-full sm:w-auto">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer w-full"
              >
                {states.map((st) => (
                  <option key={st} value={st}>
                    {st === 'All' ? 'All Indian States' : st}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shrink-0">
              <Scale className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Min: {minQty} Qtl</span>
              <input
                type="range"
                min="0"
                max="300"
                step="25"
                value={minQty}
                onChange={(e) => setMinQty(Number(e.target.value))}
                className="w-18 sm:w-24 accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold px-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Categories:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Produce Grid */}
      {filteredProduce.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">No matching produce listings found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords, clear category filters, or lower the minimum quantity threshold.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedState('All');
              setSearchTerm('');
              setMinQty(0);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProduce.map((item) => {
            const followed = isFollowing(item.farmerId);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col group"
              >
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.cropName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-emerald-900 shadow-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {item.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-semibold text-white">
                    {item.id}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Title and Farmer */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {item.cropName}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <span>{item.farmerName}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                        </p>
                      </div>

                      {/* Follow Button */}
                      <button
                        onClick={() =>
                          onToggleFollow({
                            id: item.farmerId,
                            name: item.farmerName,
                            type: 'farmer',
                            location: `${item.district}, ${item.state}`,
                            crops: item.cropName
                          })
                        }
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          followed
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                        title={followed ? 'Following this farmer' : 'Follow for harvest alerts'}
                      >
                        {followed ? (
                          <>
                            <UserCheck className="w-3.5 h-3.5 text-purple-700" />
                            <span>Following</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Follow</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Quantity & Price Highlighting */}
                    <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                          Available Lot
                        </span>
                        <div className="text-base font-extrabold text-slate-900 flex items-baseline gap-1">
                          <span>{item.quantity}</span>
                          <span className="text-xs text-slate-500 font-semibold">{item.unit}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">MOQ: {item.moq} Qtl</span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                          Expected Price
                        </span>
                        <div className="text-base font-extrabold text-emerald-700">
                          ₹{item.expectedPrice.toLocaleString()}
                          <span className="text-xs font-medium text-slate-500">/{item.unit}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 flex items-center justify-end gap-0.5">
                          <TrendingUp className="w-2.5 h-2.5 text-emerald-600" /> MSP: ₹{item.marketMsp}
                        </span>
                      </div>
                    </div>

                    {/* Metadata Specs */}
                    <div className="mt-3 space-y-1 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Quality Grade:</span>
                        <span className="font-medium text-slate-700 text-right">{item.grade}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Location:</span>
                        <span className="font-medium text-slate-700 flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {item.district}, {item.state}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Harvest Date:</span>
                        <span className="font-medium text-slate-700 flex items-center gap-0.5">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {item.harvestDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => onContactFarmer(item)}
                      className="flex-1 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Contact & Negotiate
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.cropName}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  {activeModalItem.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{activeModalItem.cropName}</h3>
                <p className="text-xs text-slate-500">Listed by {activeModalItem.farmerName} • ID: {activeModalItem.id}</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {activeModalItem.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Stock</span>
                <span className="font-bold text-slate-800 text-sm">{activeModalItem.quantity} {activeModalItem.unit}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Minimum Order (MOQ)</span>
                <span className="font-bold text-slate-800 text-sm">{activeModalItem.moq} {activeModalItem.unit}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Expected Rate</span>
                <span className="font-bold text-emerald-700 text-sm">₹{activeModalItem.expectedPrice}/{activeModalItem.unit}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Govt. MSP Benchmark</span>
                <span className="font-bold text-slate-700 text-sm">₹{activeModalItem.marketMsp}/{activeModalItem.unit}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setActiveModalItem(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs cursor-pointer hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const itm = activeModalItem;
                  setActiveModalItem(null);
                  onContactFarmer(itm);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Negotiate Deal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
