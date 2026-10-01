'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { StarRating } from '@/components/common/StarRating';
import { Badge } from '@/components/common/Badge';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [imgError, setImgError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    addItem(product, 1);
    showToast(`Added to cart`, {
      message: `${product.title.substring(0, 30)}...`,
      type: 'success',
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 400);
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Product Image Link Container */}
      <Link
        href={`/products/${product.id}`}
        className="relative w-full pt-[85%] bg-slate-50/80 overflow-hidden flex items-center justify-center p-6 border-b border-slate-100"
        tabIndex={-1}
      >
        <Image
          src={
            imgError || !product.image
              ? 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
              : product.image
          }
          alt={product.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={() => setImgError(true)}
        />
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="secondary" size="sm">
            {product.category}
          </Badge>
        </div>
      </Link>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-semibold text-slate-900 text-base leading-snug line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
          <Link href={`/products/${product.id}`} className="focus:outline-none focus:underline">
            {product.title}
          </Link>
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="mb-3">
            <StarRating rate={product.rating.rate} count={product.rating.count} size="sm" />
          </div>
        )}

        {/* Description Snippet */}
        <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Card Footer: Price & Add to Cart Action */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Price
            </span>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              {formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              aria-label={`Add ${product.title} to cart`}
              className={`px-3.5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-95 ${
                isAdding
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
              }`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.17-2.25z" />
              </svg>
              <span>{isAdding ? 'Added!' : 'Add'}</span>
            </button>

            <Link
              href={`/products/${product.id}`}
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              aria-label={`View details for ${product.title}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
