import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

import { Product } from "@/types";

export const useProductsAPI = (pageIndex?: number, pageSize?: number) => {
  const queryClient = useQueryClient();

  // 💰 Get Products (Paginated)
  const {
    data: productsData,
    isPending: isLoadingProducts,
    isError,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery<Product[]>({
    queryKey: ["products", pageIndex, pageSize],
    queryFn: async () => {
      const response = await axiosInstance.get("/products", {
        params: {
          page: pageIndex !== undefined ? pageIndex + 1 : undefined,
          limit: pageSize,
        },
      });
      return response.data;
    },
  });

  // 📊 Get Total Count (Required for pagination component)
  // Note: MockAPI doesn't return total in paginated requests, so I fetch all
  const { data: allProducts } = useQuery<Product[]>({
    queryKey: ["products-total"],
    queryFn: async () => {
      const response = await axiosInstance.get("/products");
      return response.data;
    },
  });

  const totalCount = allProducts?.length || 0;

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
    deleteProduct,
    isDeleting,
    totalCount,
  };
};