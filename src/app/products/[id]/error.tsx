'use client';

import React from 'react';
import { ErrorState } from '@/components/common/ErrorState';

export default function ProductDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <ErrorState
        title="Failed to Load Product Details"
        message="We encountered an issue retrieving information for this product."
        onRetry={() => reset()}
        resetLink="/products"
      />
    </div>
  );
}
