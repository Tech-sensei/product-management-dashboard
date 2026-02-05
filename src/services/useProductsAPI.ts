import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

import { Product, CreateProductDTO, UpdateProductDTO } from "@/types";

export interface ProductFilters {
  category?: string;
  status?: boolean;
  search?: string;
}

export const useProductsAPI = (
  productId?: string, 
  pageIndex?: number, 
  pageSize?: number,
  filters?: ProductFilters
) => {
  const queryClient = useQueryClient();

  // 💰 Get Products (Paginated & Filtered)
  const {
    data: productsData,
    isPending: isLoadingProducts,
    isError,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery<Product[]>({
    queryKey: ["products", pageIndex, pageSize, filters],
    queryFn: async () => {
      const response = await axiosInstance.get("/products", {
        params: {
          page: pageIndex !== undefined ? pageIndex + 1 : undefined,
          limit: pageSize,
          sortBy: "createdAt",
          order: "desc",
          // Filters
          category: filters?.category || undefined,
          status: filters?.status === undefined ? undefined : filters.status,
          search: filters?.search || undefined,
        },
      });
      return response.data;
    },
    enabled: pageIndex !== undefined && pageSize !== undefined,
  });

  // 📊 Get Total Count (Required for pagination component)
  // Note: For total count we also need filters to get correct total
  const { data: allFilteredProducts } = useQuery<Product[]>({
    queryKey: ["products-total", filters],
    queryFn: async () => {
      const response = await axiosInstance.get("/products", {
        params: {
          category: filters?.category || undefined,
          status: filters?.status === undefined ? undefined : filters.status,
          search: filters?.search || undefined,
        },
      });
      return response.data;
    },
    enabled: pageIndex !== undefined && pageSize !== undefined,
  });

  const totalCount = allFilteredProducts?.length || 0;

  // 💰 Get Product by ID
  const { 
    data: productData, 
    isPending: isLoadingProduct,
    isError: isProductError 
  } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response.data;
    },
    enabled: !!productId,
  });

  // 🆕 Create Product
  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: async (data: CreateProductDTO) => {
      const response = await axiosInstance.post("/products", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products-total"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create product");
    },
  });

  // 📝 Update Product
  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, ...data }: UpdateProductDTO) => {
      const response = await axiosInstance.put(`/products/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update product");
    },
  });

  // 🗑️ Delete Product
  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/products/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products-total"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete product");
    },
  });

  return {
    productsData,
    isLoadingProducts,
    isError,
    productsError,
    refetchProducts,
    productData,
    isLoadingProduct,
    isProductError,
    createProduct,
    isCreating,
    updateProduct,
    isUpdating,
    deleteProduct,
    isDeleting,
    totalCount,
  };
};

export const useDashboardStats = () => {
  const { data: allProducts, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products-all-stats"],
    queryFn: async () => {
      const response = await axiosInstance.get("/products");
      return response.data;
    },
  });

  const stats = {
    total: allProducts?.length || 0,
    inStock: allProducts?.filter(p => p.status).length || 0,
    outOfStock: allProducts?.filter(p => !p.status).length || 0,
    totalCategories: new Set(allProducts?.map(p => p.category)).size || 0,
  };

  return { stats, isLoading, isError };
};
