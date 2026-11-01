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
  ArrowRight
} from 'lucide-react';
import { storageService } from '../services/storageService';

export function FarmerDashboard({ 
  produceListings, 
  onRefresh, 
  onOpenAddModal, 
  onNavigateToTab, 
  onNavigateToMessages,
  onShowNotification 
}) {
  const currentFarmer = storageService.getCurrentUser();
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Filter listings belonging to this farmer (or all if simulated single-farmer view)
  const myListings = produceListings.filter(item => 
    item.farmerId === currentFarmer.id || item.farmerName.includes('Tawre') || item.farmerName.includes('Ramesh')
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
      onShowNotification(`Lot status changed to ${newStatus === 'SOLD' ? 'Sold Out' : newStatus === 'NEGOTIATING' ? 'Under Negotiation' : 'Available'}`);
      onRefresh();
    }
  };

  const handleDelete = (id, cropName) => {
    if (window.confirm(`Are you sure you want to remove the listing for "${cropName}"?`)) {
      storageService.deleteProduceListing(id);
      onShowNotification(`Listing for "${cropName}" removed.`);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Farmer Greeting Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-6 -mr-6 w-48 h-48 bg-emerald-600/30 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              Kisan Desk &middot; Producer Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Namaste, {currentFarmer.name}!
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Manage your harvested crop inventory, track bulk buyer inquiries, compare your pricing against local Mandi MSP, and rent heavy farm machinery for the upcoming sowing cycle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              <PlusCircle className="w-4 h-4 text-gray-950" />
              List New Harvest Lot
            </button>
            <button
              onClick={() => onNavigateToTab('equipment')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-900/80 hover:bg-emerald-900 text-emerald-100 border border-emerald-500/40 font-semibold text-sm transition-all"
            >
              <Tractor className="w-4 h-4 text-emerald-300" />
              Hire Machinery
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active Lots Listed</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{activeCount} Lots</p>
            <span className="text-xs text-emerald-600 font-medium inline-flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ready for dispatch
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Volume</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{totalQuantity} Qtl</p>
            <span className="text-xs text-gray-500 font-medium inline-flex items-center gap-1 mt-1">
              <Layers className="w-3.5 h-3.5" /> Across {myListings.length} commodities
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
            <Sprout className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Harvest Value</p>
            <p className="text-2xl font-black text-emerald-700 mt-1">₹{totalValue.toLocaleString('en-IN')}</p>
            <span className="text-xs text-gray-500 font-medium inline-flex items-center gap-1 mt-1">
              <DollarSign className="w-3.5 h-3.5" /> Realizable at farm gate
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer Inquiries</p>
            <p className="text-2xl font-black text-gray-900 mt-1">6 Active</p>
            <button 
              onClick={onNavigateToMessages}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 mt-1"
            >
              Open Messaging Hub <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Listing Management Table / Cards */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50/50">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Your Agricultural Produce Lots</h2>
            <p className="text-xs text-gray-500">Live inventory synchronized across all verified buyers on Kisan Setu</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Filter Status:</span>
            <div className="inline-flex rounded-lg bg-gray-100 p-1 border border-gray-200">
              {['ALL', 'AVAILABLE', 'NEGOTIATING', 'SOLD'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    filterStatus === status 
                      ? 'bg-white text-gray-900 shadow-xs' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {status === 'ALL' ? 'All' : status === 'AVAILABLE' ? 'Available' : status === 'NEGOTIATING' ? 'In Talks' : 'Sold'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {displayedListings.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Sprout className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-gray-900">No Produce Lots Found Under This Filter</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              You haven't listed any lots under this status yet. Click below to add your harvested crop with verified APMC Mandi rates.
            </p>
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Create First Produce Listing
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {displayedListings.map(item => (
              <div key={item.id} className="p-5 hover:bg-gray-50/70 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.cropName}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-gray-200 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-gray-900">{item.cropName}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                        {item.variety}
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        item.status === 'AVAILABLE' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : item.status === 'NEGOTIATING' 
                          ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                          : 'bg-gray-100 text-gray-600 border border-gray-200 line-through'
                      }`}>
                        {item.status === 'AVAILABLE' ? '● Available' : item.status === 'NEGOTIATING' ? '⚡ In Negotiation' : 'Sold Out'}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-gray-600 pt-1">
                      <span><strong>Total Lot:</strong> {item.quantity} {item.unit}</span>
                      <span><strong>Min Order (MOQ):</strong> {item.minOrderQuantity} {item.unit}</span>
                      <span><strong>Harvest Date:</strong> {item.harvestDate}</span>
                      <span><strong>Location:</strong> {item.location}</span>
                    </div>

                    {item.apmcBenchmark && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-50 text-amber-900 text-[11px] font-semibold border border-amber-200">
                        <TrendingUp className="w-3 h-3 text-amber-700" />
                        Govt Mandi Benchmark: ₹{item.apmcBenchmark}/{item.unit} &middot; Your Price: ₹{item.expectedPrice}/{item.unit}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right controls: Pricing & Status changing */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                  <div className="text-left lg:text-right">
                    <div className="text-xl font-black text-emerald-800">
                      ₹{item.expectedPrice.toLocaleString('en-IN')} <span className="text-xs text-gray-500 font-normal">/{item.unit}</span>
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      Est. Total: ₹{(item.quantity * item.expectedPrice).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="AVAILABLE">Available</option>
                      <option value="NEGOTIATING">In Negotiation</option>
                      <option value="SOLD">Sold Out</option>
                    </select>

                    <button
                      onClick={() => handleDelete(item.id, item.cropName)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Listing"
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
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950">Fair Price Guarantee & Mandi Telemetry</h4>
            <p className="text-xs text-amber-800 max-w-xl">
              All prices entered above are benchmarked against official Agmarknet MSP data for Maharashtra mandis (Nagpur, Saoner, Kalmeshwar, Hingna). In case of disputes, certified legal arbitration is supported.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateToTab('marketplace')}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors"
          >
            Preview Public View
          </button>
        </div>
      </div>
    </div>
  );
}
