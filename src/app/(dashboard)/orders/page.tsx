"use client";

import React, { useState } from 'react';
import { ShoppingCart, Search, ChevronDown, Filter, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Orders</h1>
        <p className="text-neutral-500 mt-1">Manage and track customer purchases.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 w-full md:max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all shadow-sm"
            />
          </div>
          
          <div className="relative min-w-[160px]">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer transition-all shadow-sm font-medium text-neutral-700"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Content Area - Placeholder / Empty State */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col items-center justify-center p-8 gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-neutral-50 rounded-3xl flex items-center justify-center relative z-10">
            <ShoppingCart className="w-10 h-10 text-neutral-200" />
          </div>
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl -z-0 scale-150 animate-pulse" />
        </div>
        
        <div className="text-center space-y-2 max-w-sm">
          <h3 className="text-xl font-bold text-neutral-900">No orders found</h3>
          <p className="text-sm text-neutral-500 leading-relaxed">
            When customers start making purchases, their order details will appear here in a table.
          </p>
        </div>

        <button 
          className="px-6 py-2.5 bg-primary text-neutral-50 rounded-lg text-sm font-semibold hover:bg-primary/80 transition-all shadow-sm flex items-center gap-2 cursor-not-allowed"
          disabled
        >
          <Package size={18} />
          Manual Order Entry
        </button>
      </div>
    </div>
  )
}

export default OrdersPage;