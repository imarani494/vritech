'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { StarRating } from '@/components/common/StarRating';
import { Badge } from '@/components/common/Badge';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const handleQuantityChange = (newQty: number) => {
    if (newQty >= 1 && newQty <= 99) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, quantity);
    showToast(`Added ${quantity} item(s) to cart`, {
      message: product.title,
      type: 'success',
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 mb-8 transition-colors group"
      >
        <svg
          className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
        <div className="relative w-full aspect-square bg-slate-50/80 rounded-2xl p-8 border border-slate-100 flex items-center justify-center overflow-hidden">
          <Image
            src={
              imgError || !product.image
                ? '/placeholder-product.svg'
                : product.image
            }
            alt={product.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6 hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="primary">{product.category}</Badge>
          </div>
        </div>

        <div className="flex flex-col h-full justify-between space-y-6">
          <div>
            <div className="mb-2">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                {product.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {product.title}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <StarRating rate={product.rating.rate} count={product.rating.count} size="lg" />
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  In Stock
                </span>
              </div>
            )}

            <div className="mb-6">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {formattedPrice}
              </span>
              <span className="text-xs text-slate-400 ml-2">Includes taxes</span>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex items-center justify-between sm:justify-start gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 rounded-xl bg-white text-slate-800 font-bold hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-sm"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
                  className="w-12 text-center bg-transparent font-bold text-slate-900 text-base focus:outline-none"
                  aria-label="Quantity"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-10 rounded-xl bg-white text-slate-800 font-bold hover:bg-slate-200 transition-all flex items-center justify-center shadow-sm"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isAdding
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30'
                }`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.17-2.25z" />
                </svg>
                <span>{isAdding ? 'Added to Cart!' : `Add to Cart • ${formattedPrice}`}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="block text-lg mb-1">🚚</span>
                <span className="text-[11px] font-medium text-slate-700 block">Free Shipping</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="block text-lg mb-1">🛡️</span>
                <span className="text-[11px] font-medium text-slate-700 block">2 Year Warranty</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="block text-lg mb-1">↺</span>
                <span className="text-[11px] font-medium text-slate-700 block">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
