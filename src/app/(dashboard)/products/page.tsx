"use client";

import { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Search, Edit, Trash, Eye, Package, Filter, X, ChevronDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProductsAPI } from "@/services/useProductsAPI";
import { Product } from "@/types";
import Image from "next/image";
import ActionDropdown from "@/components/ui/ActionDropdown";
import Pagination from "@/components/ui/Pagination";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ProductModal from "@/components/products/ProductModal";
import { cn } from "@/lib/utils";


const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function ProductsPage() {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchQuery, setSearchQuery] = useState("");
  
  const [filters, setFilters] = useState({
    status: undefined as boolean | undefined,
    search: searchQuery,
  });

  const { 
    productsData, 
    isLoadingProducts, 
    productsError, 
    createProduct,
    isCreating,
    updateProduct,
    isUpdating,
    deleteProduct, 
    isDeleting,
    totalCount
  } = useProductsAPI(undefined, pagination.pageIndex, pagination.pageSize, filters);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchQuery }));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  }, [filters.status, filters.search]);


  const handleOpenEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(true);
  };

  const handleProductSubmit = (data: any) => {
    if (selectedProduct) {
      updateProduct({ id: selectedProduct.id, ...data }, {
        onSuccess: () => setIsProductModalOpen(false)
      });
    } else {
      createProduct(data, {
        onSuccess: () => setIsProductModalOpen(false)
      });
    }
  };

  // Data for table (current page only)
  const products = productsData || [];
  const total = totalCount;

  const columnHelper = createColumnHelper<Product>();

  const columns = useMemo(() => [
    columnHelper.accessor("image", {
      header: "Product",
      cell: (info) => (
        <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 flex-shrink-0">
                {info.getValue() ? (
                    <Image 
                        src={info.getValue()} 
                        alt={info.row.original.name} 
                        fill 
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs">IMG</div>
                )}
            </div>
            <div>
                <div className="font-medium text-neutral-900">{info.row.original.name}</div>
                <div className="text-xs text-neutral-500 truncate max-w-[150px]">{info.row.original.description}</div>
            </div>
        </div>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => <div className="text-neutral-600">{info.getValue()}</div>,
    }),
    columnHelper.accessor("price", {
      header: "Price",
      cell: (info) => {
        const amount = parseFloat(info.getValue());
        return (
            <div className="font-medium text-neutral-900">
                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)}
            </div>
        );
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "Date",
      cell: (info) => <div className="text-neutral-500 text-sm">{formatDate(info.getValue())}</div>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        return (
            <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize inline-flex items-center gap-1.5
                ${status 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-100 text-red-600 border border-red-200"
                }`}
            >
                {status ? <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> : <span className="w-1.5 h-1.5 rounded-full bg-red-400" />}
                {status ? "In Stock" : "Out of Stock"}
            </span>
        );
      },
    }),
   
    columnHelper.display({
      id: "actions",
      header: "Action",
      cell: (info) => (
        <ActionDropdown
          actions={[
            {
              label: "View Details",
              icon: Eye,
              onClick: () => router.push(`/products/${info.row.original.id}`),
            },
            {
              label: "Edit Product",
              icon: Edit,
              onClick: () => handleOpenEditModal(info.row.original),
            },
            {
              label: "Delete Product",
              icon: Trash,
              variant: "danger",
              onClick: () => setDeleteId(info.row.original.id),
            },
          ]}
        />
      ),
    }),
  ], [router, handleOpenEditModal]);


  const table = useReactTable({
    data: productsData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Products</h2>
        <p className="text-sm text-neutral-500 mt-1">Manage your product catalog</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 w-full md:max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all shadow-sm"
            />
          </div>
          
          <div className="relative min-w-[160px]">
            <select
              value={filters.status === undefined ? "all" : filters.status.toString()}
              onChange={(e) => {
                const val = e.target.value;
                setFilters(prev => ({ 
                  ...prev, 
                  status: val === "all" ? undefined : val === "true" 
                }));
              }}
              className="w-full appearance-none pl-4 pr-10 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer transition-all shadow-sm font-medium text-neutral-700"
            >
              <option value="all">All Status</option>
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        <button 
          type="button"
          onClick={handleOpenAddModal}
          className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 flex items-center justify-center gap-2 whitespace-nowrap"
        >
            <Plus size={18} />
            Add Product
        </button>
      </div>

      {productsError && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-start gap-3">
            <Package className="text-red-500 mt-0.5" size={18} />
            <div>
                <h3 className="text-sm font-medium text-red-800">Error Loading Products</h3>
                <p className="text-xs text-red-600 mt-1">{(productsError as Error)?.message || "Failed to load products. Please try again."}</p>
            </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50/50 border-b border-neutral-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-3 text-left text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-neutral-100">
              {isLoadingProducts ? (
                // Skeleton loading state
                Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {columns.map((_, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-4 bg-neutral-100 rounded w-3/4"></div>
                        </td>
                      ))}
                    </tr>
                  ))
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12">
                    <div className="text-center">
                      <div className="mx-auto w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-3">
                        <Package size={20} className="text-neutral-400" />
                      </div>
                      <h3 className="text-sm font-medium text-neutral-900 mb-1">No Products Found</h3>
                      <p className="text-xs text-neutral-500">
                        {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first product"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!isLoadingProducts && totalCount > 0 && (
          <Pagination
            currentPage={pagination.pageIndex + 1}
            totalPages={Math.ceil(totalCount / pagination.pageSize)}
            pageSize={pagination.pageSize}
            totalItems={totalCount}
            onPageChange={(page) => setPagination({ ...pagination, pageIndex: page - 1 })}
            onPageSizeChange={(pageSize) => setPagination({ pageIndex: 0, pageSize })}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Product"
        description={`Are you sure you want to delete "${productsData?.find(p => p.id === deleteId)?.name || "this product"}"? This action cannot be undone.`}
        confirmText="Delete Product"
        variant="danger"
        loading={isDeleting}
        onConfirm={() => {
          if (deleteId) {
            deleteProduct(deleteId, {
              onSuccess: () => setDeleteId(null),
            });
          }
        }}
        onCancel={() => setDeleteId(null)}
      />

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSubmit={handleProductSubmit}
        initialData={selectedProduct}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
}