"use client";

import React from 'react';
import { Package, CheckCircle2, XCircle, Tag, ShoppingCart } from 'lucide-react';
import { useDashboardStats } from '@/services/useProductsAPI';
import StatCard from '@/components/dashboard/StatCard';

const OverviewPage = () => {
  const { stats, isLoading } = useDashboardStats();

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Overview</h1>
        <p className="text-neutral-500 mt-1">Monitor your product catalog performance at a glance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={stats.total}
          icon={Package}
          description="Total items in catalog"
          isLoading={isLoading}
        />
        <StatCard
          title="In Stock"
          value={stats.inStock}
          icon={CheckCircle2}
          description="Available for sale"
          className="hover:border-green-100"
          trend={{ value: `${Math.round((stats.inStock / stats.total) * 100 || 0)}%`, label: "Availability", isPositive: true }}
          isLoading={isLoading}
        />
        <StatCard
          title="Out of Stock"
          value={stats.outOfStock}
          icon={XCircle}
          description="Not available for sale"
          className="hover:border-red-100"
          isLoading={isLoading}
        />
        <StatCard
          title="Categories"
          value={stats.totalCategories}
          icon={Tag}
          description="Diverse product range"
          isLoading={isLoading}
        />
      </div>

      {/* Placeholder for future charts/activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm flex flex-col items-center justify-center text-neutral-400 gap-4 min-h-[400px]">
          <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-neutral-200" />
          </div>
          <p className="text-lg font-medium text-neutral-900">Recent Activity & Sales</p>
          <p className="text-sm text-center max-w-xs text-neutral-500">
            Interactive charts and detailed sales analytics.
          </p>
         
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm flex flex-col items-center justify-center text-neutral-400 gap-4 min-h-[400px]">
           <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center">
            <Tag className="w-8 h-8 text-neutral-200" />
          </div>
          <p className="text-lg font-medium text-neutral-900">Category Insights</p>
          <p className="text-sm text-center max-w-xs text-neutral-500">
            A breakdown of your most popular categories.
          </p>         
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;