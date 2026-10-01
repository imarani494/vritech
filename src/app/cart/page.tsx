import React from 'react';
import { Metadata } from 'next';
import { CartPageClient } from '@/components/cart/CartPageClient';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'View and manage items in your shopping cart.',
};

export default function CartPage() {
  return <CartPageClient />;
}
