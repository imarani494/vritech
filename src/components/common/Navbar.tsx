'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/products' && (pathname === '/products' || pathname.startsWith('/products/'))) {
      return true;
    }
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link
              href="/products"
              className="flex items-center gap-2.5 font-bold text-xl text-slate-900 tracking-tight group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-800">
                AuraStore
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
              <Link
                href="/products"
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/products')
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Products Catalog
              </Link>
              <Link
                href="/cart"
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/cart')
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Shopping Cart
              </Link>
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className="relative p-2.5 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Auth Dropdown / Login Button */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-expanded={userDropdownOpen}
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center border border-indigo-200">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-slate-800">
                    {user.username}
                  </span>
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-800 truncate">{user.username}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-medium transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs sm:text-sm font-medium rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              isActive('/products') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
            }`}
          >
            Products Catalog
          </Link>
          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              isActive('/cart') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
            }`}
          >
            Cart ({totalItems})
          </Link>
        </div>
      )}
    </header>
  );
};
