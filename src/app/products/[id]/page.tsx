import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productService } from '@/services/productService';
import { ProductDetails } from '@/components/products/ProductDetails';

export const revalidate = 300;

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await productService.getProductById(resolvedParams.id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be located in our inventory.',
    };
  }

  return {
    title: product.title,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.substring(0, 160),
      images: [{ url: product.image, alt: product.title }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const product = await productService.getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  // Schema.org JSON-LD Structured Data for Product SEO
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: [product.image],
    description: product.description,
    category: product.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: product.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating.rate,
          reviewCount: product.rating.count,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetails product={product} />
    </>
  );
}
