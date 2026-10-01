import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No products found',
  message = 'We couldn’t find any items matching your filter criteria. Try clearing search keywords or expanding your price range.',
  actionText,
  actionHref,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center my-6 rounded-3xl bg-slate-50 border border-slate-200/70 max-w-xl mx-auto">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
        {icon || (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm mb-6 max-w-sm">{message}</p>

      {onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {actionText || 'Reset Filters'}
        </button>
      )}

      {!onAction && actionHref && actionText && (
        <Link
          href={actionHref}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};
