import React from 'react';
import { ProductGridSkeleton } from '@/components/common/LoadingSkeleton';

export default function LoadingProducts() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-pulse space-y-8">
      <div>
        <div className="h-8 bg-slate-200 rounded w-64 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-96" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <div className="h-10 bg-slate-200 rounded-xl w-full" />
        <div className="h-8 bg-slate-200 rounded-lg w-1/2" />
      </div>

      <ProductGridSkeleton count={8} />
    </div>
  );
}
