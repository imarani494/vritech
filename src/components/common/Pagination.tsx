import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate list of page numbers to render
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-slate-200 mt-8 ${className}`}
      aria-label="Pagination Navigation"
    >
      <div className="text-sm text-slate-600 font-medium">
        Showing <span className="font-semibold text-slate-900">{startItem}</span> to{' '}
        <span className="font-semibold text-slate-900">{endItem}</span> of{' '}
        <span className="font-semibold text-slate-900">{totalItems}</span> results
      </div>

      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Go to previous page"
          className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        {/* Page Number Buttons */}
        <div className="hidden sm:flex items-center gap-1">
          {pages.map((p, index) => {
            if (p === '...') {
              return (
                <span key={`ellipsis-${index}`} className="px-2 py-1 text-slate-400 text-sm">
                  ...
                </span>
              );
            }

            const pageNum = p as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Page ${pageNum}`}
                className={`min-w-[38px] h-[38px] px-3 rounded-xl text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Go to next page"
          className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Next
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};
