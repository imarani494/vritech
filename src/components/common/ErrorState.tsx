import React from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  resetLink?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error while fetching product data. Please check your network connection and try again.',
  onRetry,
  resetLink,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center my-8 rounded-3xl bg-rose-50/50 border border-rose-200/60 max-w-2xl mx-auto">
      <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
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
            strokeWidth={1.8}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm mb-6 max-w-md">{message}</p>

      <div className="flex items-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        )}
        {resetLink && (
          <a
            href={resetLink}
            className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold rounded-xl transition-all"
          >
            Go Back
          </a>
        )}
      </div>
    </div>
  );
};
