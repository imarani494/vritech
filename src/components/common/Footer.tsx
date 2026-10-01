import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                ⚡
              </div>
              AuraStore
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Production-ready E-commerce Dashboard built with Next.js App Router, React Server Components, and native Fetch API.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Shop Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/products?category=electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=jewelery" className="hover:text-white transition-colors">Jewelery</Link></li>
              <li><Link href="/products?category=men's clothing" className="hover:text-white transition-colors">Men&apos;s Clothing</Link></li>
              <li><Link href="/products?category=women's clothing" className="hover:text-white transition-colors">Women&apos;s Clothing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Customer Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Architecture Info</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Powered by FakeStore API backend. Fully typed with TypeScript, client filtering layer, and SSR product fetching.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AuraStore Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <span>Server Components Enabled</span>
            <span>•</span>
            <span>SOLID Principles Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
