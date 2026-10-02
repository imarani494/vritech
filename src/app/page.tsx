import Link from 'next/link';
import { productService } from '@/services/productService';
import { ProductCard } from '@/components/products/ProductCard';
import { Product } from '@/types/product';

export const revalidate = 300;

export default async function HomePage() {
  let products: Product[] = [];
  try {
    products = await productService.getProducts();
  } catch (error) {
    console.error('[HomePage] Error fetching products:', error);
  }
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-widest">
            Next.js App Router • Production Dashboard
          </span>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-3xl leading-tight">
            Elevate Your Everyday Essentials with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-300 to-pink-300">
              AuraStore
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Explore our curated catalog featuring electronics, jewelery, and premium fashion apparel. Server-rendered for speed and client-optimized for instant interaction.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-600/30 transition-all active:scale-95 text-sm"
            >
              Browse Products Catalog →
            </Link>
            <Link
              href="/cart"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-sm transition-all text-sm"
            >
              View Shopping Cart
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Shop by Category</h2>
            <p className="text-slate-500 text-xs mt-1">Directly filtered collection links</p>
          </div>
          <Link href="/products" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Electronics', key: 'electronics', icon: '💻', count: '6 Products' },
            { name: 'Jewelery', key: 'jewelery', icon: '💎', count: '4 Products' },
            { name: "Men's Clothing", key: "men's clothing", icon: '👕', count: '4 Products' },
            { name: "Women's Clothing", key: "women's clothing", icon: '👗', count: '6 Products' },
          ].map((cat) => (
            <Link
              key={cat.key}
              href={`/products?category=${encodeURIComponent(cat.key)}`}
              className="group p-6 bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg transition-all flex flex-col items-start"
            >
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform block">
                {cat.icon}
              </span>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h3>
              <span className="text-xs text-slate-400 mt-1">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Featured Products</h2>
            <p className="text-slate-500 text-xs mt-1">Hand-picked top rated items from server</p>
          </div>
          <Link href="/products" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            Explore All ({products.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
