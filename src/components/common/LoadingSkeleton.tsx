import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col h-full animate-pulse shadow-sm">
      <div className="w-full h-52 bg-slate-200 rounded-xl mb-4" />
      <div className="flex justify-between items-center mb-2">
        <div className="h-4 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-1/4" />
      </div>
      <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
      <div className="h-4 bg-slate-200 rounded w-full mb-2" />
      <div className="h-4 bg-slate-200 rounded w-2/3 mb-6" />
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="h-7 bg-slate-200 rounded w-1/3" />
        <div className="h-10 bg-slate-200 rounded-xl w-28" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-6 bg-slate-200 rounded w-32 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="h-96 bg-slate-200 rounded-3xl w-full" />
        <div className="flex flex-col gap-4">
          <div className="h-5 bg-slate-200 rounded w-24" />
          <div className="h-10 bg-slate-200 rounded w-3/4" />
          <div className="h-6 bg-slate-200 rounded w-36" />
          <div className="h-8 bg-slate-200 rounded w-28" />
          <div className="h-24 bg-slate-200 rounded w-full my-4" />
          <div className="flex gap-4 items-center mt-6">
            <div className="h-12 bg-slate-200 rounded-xl w-32" />
            <div className="h-12 bg-slate-200 rounded-xl flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
