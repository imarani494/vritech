import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'AuraStore — Modern E-commerce Dashboard',
    template: '%s | AuraStore',
  },
  description: 'Production-ready e-commerce platform built with Next.js App Router, TypeScript, and Native Fetch API.',
  keywords: ['e-commerce', 'dashboard', 'next.js', 'react', 'fakestoreapi', 'products'],
  authors: [{ name: 'AuraStore Team' }],
  openGraph: {
    title: 'AuraStore — Modern E-commerce Dashboard',
    description: 'Explore our curated catalog of electronics, jewelery, and clothing.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
