"use client";

import { useState } from "react";
import { useProductsAPI } from "@/services/useProductsAPI";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ChevronLeft, 
  Package, 
  DollarSign, 
  Tag, 
  Calendar,
  CheckCircle2, 
  XCircle,
  Loader2,
  Trash
} from "lucide-react";
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

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { 
    productData: product, 
    isLoadingProduct: isLoading, 
    isProductError: isError,
    deleteProduct,
    isDeleting,
    updateProduct,
    isUpdating
  } = useProductsAPI(id as string);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    if (!id) return;
    deleteProduct(id as string, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        router.push("/products");
      },
    });
  };

  const handleUpdate = (data: any) => {
    if (!id) return;
    updateProduct({ id: id as string, ...data }, {
      onSuccess: () => {
        setIsEditModalOpen(false);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-neutral-500 text-sm font-medium">Loading product details...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="p-6 bg-red-50 rounded-full">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-neutral-900">Product Not Found</h2>
          <p className="text-neutral-500 max-w-md">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
        <button
          onClick={() => router.push("/products")}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium cursor-pointer shadow-sm"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors cursor-pointer group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors font-medium text-sm cursor-pointer"
          >
            Edit Product
          </button>
          <button 
            type="button"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm cursor-pointer"
          >
            Delete Product
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Left Column - Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                {product.status ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-semibold shadow-lg">
                    <CheckCircle2 size={14} />
                    In Stock
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-full text-xs font-semibold shadow-lg">
                    <XCircle size={14} />
                    Out of Stock
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Product Name & Category */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-xs font-semibold uppercase tracking-wide">
                  {product.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-400">
                  <Calendar size={12} />
                  {formatDate(product.createdAt)}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-neutral-500">Product ID: {product.id}</p>
            </div>

            {/* Price Section */}
            <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={18} className="text-neutral-400" />
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Price
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-neutral-900">
                  ${product.price}
                </span>
                <span className="text-neutral-400 font-medium">USD</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider">
                Description
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Info Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-neutral-500">
                  <Tag size={16} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Category</span>
                </div>
                <p className="text-sm font-medium text-neutral-900">{product.category}</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-neutral-500">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Availability</span>
                </div>
                <p className="text-sm font-medium text-neutral-900">
                  {product.status ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button 
                disabled={!product.status}
                className={cn(
                  "flex-1 px-6 py-3 rounded-lg transition-colors font-medium cursor-pointer shadow-sm",
                  product.status 
                    ? "bg-primary text-white hover:bg-primary/90" 
                    : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                )}
              >
                {product.status ? "Add to Cart" : "Out of Stock"}
              </button>
              <button className="px-6 py-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors font-medium cursor-pointer">
                <Package size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
 
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        loading={isDeleting}
        title="Delete Product?"
        description={`Are you sure you want to delete "${product?.name}"? This action cannot be undone.`}
        confirmText="Delete Product"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />

      {/* Edit Product Modal */}
      <ProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdate}
        initialData={product}
        isLoading={isUpdating}
      />
    </div>
  );
}