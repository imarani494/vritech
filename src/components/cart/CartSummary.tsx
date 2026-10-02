'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  onClearCart: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  tax,
  shipping,
  total,
  onClearCart,
}) => {
  const { showToast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toLowerCase() === 'save10') {
      const discountVal = subtotal * 0.1;
      setDiscount(discountVal);
      showToast('Promo Code Applied!', { message: 'Saved 10% on your order', type: 'success' });
    } else {
      showToast('Invalid Promo Code', { message: 'Try using "SAVE10"', type: 'error' });
    }
  };

  const finalTotal = Math.max(0, total - discount);

  const handleCheckout = () => {
    showToast('Order Placed Successfully!', {
      message: `Thank you for your purchase of ${formatPrice(finalTotal)}`,
      type: 'success',
    });
    setTimeout(() => {
      onClearCart();
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-4">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax (8%)</span>
          <span className="font-semibold text-slate-900">{formatPrice(tax)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-semibold text-slate-900">
            {shipping === 0 ? (
              <span className="text-emerald-600 font-bold">FREE</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 font-semibold">
            <span>Promo Discount (10%)</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        {subtotal > 0 && subtotal < 50 && (
          <div className="pt-2">
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-indigo-600">Free Shipping Progress</span>
              <span className="text-slate-500">{formatPrice(50 - subtotal)} left</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleApplyPromo} className="pt-2 flex gap-2">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Promo code (SAVE10)"
          className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
        >
          Apply
        </button>
      </form>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-base font-bold text-slate-900">Total</span>
        <span className="text-2xl font-black text-indigo-600">{formatPrice(finalTotal)}</span>
      </div>

      <div className="space-y-3 pt-2">
        <button
          onClick={handleCheckout}
          className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-600/25 transition-all active:scale-98 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Proceed to Checkout
        </button>

        <button
          onClick={onClearCart}
          className="w-full py-2.5 px-4 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-semibold text-xs rounded-xl transition-colors"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};
