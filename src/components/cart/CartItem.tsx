'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const { product, quantity } = item;
  const [imgError, setImgError] = useState(false);

  const itemSubtotal = product.price * quantity;

  const formattedUnitPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const formattedSubtotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(itemSubtotal);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm transition-all hover:border-slate-300">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Link
          href={`/products/${product.id}`}
          className="relative w-20 h-20 bg-slate-50 rounded-xl p-2 border border-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden group"
        >
          <Image
            src={
              imgError || !product.image
                ? 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
                : product.image
            }
            alt={product.title}
            fill
            sizes="80px"
            className="object-contain p-1 group-hover:scale-105 transition-transform"
            onError={() => setImgError(true)}
          />
        </Link>

        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-0.5">
            {product.category}
          </span>
          <h4 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug truncate">
            <Link href={`/products/${product.id}`} className="hover:text-indigo-600 transition-colors">
              {product.title}
            </Link>
          </h4>
          <p className="text-slate-500 text-xs mt-1">
            Unit Price: <span className="font-semibold text-slate-700">{formattedUnitPrice}</span>
          </p>
        </div>
      </div>

      {/* Quantity & Subtotal Action Section */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity Controls */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
            aria-label={`Decrease quantity for ${product.title}`}
            className="w-7 h-7 rounded-lg bg-white text-slate-800 font-bold hover:bg-slate-200 transition-colors flex items-center justify-center text-xs shadow-sm"
          >
            -
          </button>
          <span className="w-8 text-center font-bold text-xs text-slate-900">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            aria-label={`Increase quantity for ${product.title}`}
            className="w-7 h-7 rounded-lg bg-white text-slate-800 font-bold hover:bg-slate-200 transition-colors flex items-center justify-center text-xs shadow-sm"
          >
            +
          </button>
        </div>

        {/* Item Subtotal Price */}
        <div className="text-right min-w-[80px]">
          <span className="text-xs text-slate-400 block font-medium">Subtotal</span>
          <span className="text-base font-extrabold text-slate-900">{formattedSubtotal}</span>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => onRemove(product.id)}
          aria-label={`Remove ${product.title} from cart`}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};
