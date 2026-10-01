'use client';

import React, { useEffect } from 'react';
import { ErrorState } from '@/components/common/ErrorState';

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[ProductsBoundary Error]:', error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <ErrorState
        title="Failed to Load Products"
        message="An unexpected server or network error occurred while loading the product list."
        onRetry={() => reset()}
      />
    </div>
  );
}
