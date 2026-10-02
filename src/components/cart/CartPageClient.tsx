'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CartList } from './CartList';
import { CartSummary } from './CartSummary';
import { EmptyState } from '@/components/common/EmptyState';

export const CartPageClient: React.FC = () => {
  const { state, updateQuantity, removeItem, clearCart, subtotal, tax, shipping, total, totalItems } =
    useCart();

  if (!state.isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-24 bg-slate-200 rounded-2xl" />
            <div className="h-24 bg-slate-200 rounded-2xl" />
          </div>
          <div className="h-64 bg-slate-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Your shopping cart is empty"
          message="Looks like you haven't added any items to your cart yet. Explore our products catalog to find amazing items!"
          actionText="Explore Products"
          actionHref="/products"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            You have <span className="font-semibold text-slate-900">{totalItems}</span> item(s) in your cart
          </p>
        </div>

        <Link
          href="/products"
          className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
        >
          Continue Shopping →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <CartList
            items={state.items}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        </div>

        <div className="lg:col-span-1 lg:sticky lg:top-24">
          <CartSummary
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            total={total}
            onClearCart={clearCart}
          />
        </div>
      </div>
    </div>
  );
};
