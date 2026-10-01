import React from 'react';
import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-3xl font-extrabold shadow-inner">
        404
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Product Not Found</h1>
      <p className="text-slate-500 text-sm max-w-md mx-auto">
        The product ID you requested does not exist or has been removed from our active catalog.
      </p>
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-2xl shadow-md transition-all"
        >
          ← Back to Products Catalog
        </Link>
      </div>
    </div>
  );
}
