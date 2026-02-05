"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showTotalItems?: boolean;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50, 100],
  showPageSizeSelector = true,
  showTotalItems = true,
  className = "",
}: PaginationProps) => {
  // Handle totalItems === 0 case
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = totalItems === 0 ? 0 : Math.min(currentPage * pageSize, totalItems);

  const getVisiblePages = (): (number | string)[] => {
    if (totalPages <= 1) return [1];
    if (totalPages === 2) return [1, 2];
    
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1 && !rangeWithDots.includes(totalPages)) {
      rangeWithDots.push(totalPages);
    }

    // Deduplicate while preserving order
    const seen = new Set<number | string>();
    return rangeWithDots.filter(item => {
      if (seen.has(item)) return false;
      seen.add(item);
      return true;
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 bg-white border-t border-neutral-200",
        className
      )}
    >
      {/* Left side - Items info and page size selector */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {showTotalItems && (
          <div className="text-sm text-neutral-600 hidden sm:block">
            Showing {startItem} to {endItem} of {totalItems} results
          </div>
        )}

        {showPageSizeSelector && (
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-neutral-600">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="border border-neutral-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none cursor-pointer"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-neutral-600">per page</span>
          </div>
        )}
      </div>

      {/* Right side - Pagination controls */}
      <div className="flex items-center gap-1">
        {/* First page button */}
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={cn(
            "p-2 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hidden sm:flex",
            currentPage === 1 && "bg-neutral-50"
          )}
        >
          <ChevronsLeft size={16} className="text-neutral-600" />
        </button>

        {/* Previous page button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "p-2 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
            currentPage === 1 && "bg-neutral-50"
          )}
        >
          <ChevronLeft size={16} className="text-neutral-600" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-2">
          {getVisiblePages().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-neutral-400">...</span>
              ) : (
                <button
                  type="button"
                  onClick={() => onPageChange(page as number)}
                  className={cn(
                    "px-3 py-2 rounded-md border text-sm font-medium transition-colors cursor-pointer",
                    currentPage === page
                      ? "bg-primary text-white border-primary"
                      : "border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  )}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Next page button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "p-2 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
            currentPage === totalPages && "bg-neutral-50"
          )}
        >
          <ChevronRight size={16} className="text-neutral-600" />
        </button>

        {/* Last page button */}
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={cn(
            "p-2 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hidden sm:flex",
            currentPage === totalPages && "bg-neutral-50"
          )}
        >
          <ChevronsRight size={16} className="text-neutral-600" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
