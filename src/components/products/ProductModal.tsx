"use client";

import { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Product, CreateProductDTO } from "@/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { 
  validateProductName, 
  validatePrice, 
  validateCategory, 
  validateDescription 
} from "@/lib/validation"; // Adjust the path based on your file structure

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: Product | null;
  isLoading?: boolean;
}

interface FormErrors {
  name?: string;
  price?: string;
  category?: string;
  description?: string;
}

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false
}: ProductModalProps) {
  const [formData, setFormData] = useState<Partial<CreateProductDTO>>({
    name: "",
    category: "",
    price: "",
    status: true,
    description: "",
    image: "https://picsum.photos/400/400"
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        price: initialData.price,
        status: initialData.status,
        description: initialData.description,
        image: initialData.image
      });
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        status: true,
        description: "",
        image: "https://picsum.photos/400/400"
      });
    }
    // Reset errors and touched state when modal opens/closes
    setErrors({});
    setTouched({});
  }, [initialData, isOpen]);

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'name':
        return validateProductName(value);
      case 'price':
        return validatePrice(value);
      case 'category':
        return validateCategory(value);
      case 'description':
        return validateDescription(value);
      default:
        return null;
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field as keyof CreateProductDTO] as string);
    setErrors({ ...errors, [field]: error || undefined });
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Real-time validation if field has been touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error || undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    const nameError = validateProductName(formData.name || "");
    const priceError = validatePrice(formData.price || "");
    const categoryError = validateCategory(formData.category || "");
    const descriptionError = validateDescription(formData.description || "");
    
    if (nameError) newErrors.name = nameError;
    if (priceError) newErrors.price = priceError;
    if (categoryError) newErrors.category = categoryError;
    if (descriptionError) newErrors.description = descriptionError;

    setErrors(newErrors);
    setTouched({
      name: true,
      price: true,
      category: true,
      description: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Update the product details below." : "Enter the details for the new product."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Product Name</label>
            <input
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none ${
                errors.name && touched.name ? 'border-red-500' : ''
              }`}
              placeholder="e.g. Premium Coffee Beans"
            />
            {errors.name && touched.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                onBlur={() => handleBlur('price')}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none ${
                  errors.price && touched.price ? 'border-red-500' : ''
                }`}
                placeholder="0.00"
              />
              {errors.price && touched.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <input
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                onBlur={() => handleBlur('category')}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none ${
                  errors.category && touched.category ? 'border-red-500' : ''
                }`}
                placeholder="e.g. Beverages"
              />
              {errors.category && touched.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              onBlur={() => handleBlur('description')}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none resize-none ${
                errors.description && touched.description ? 'border-red-500' : ''
              }`}
              placeholder="Brief product description..."
            />
            {errors.description && touched.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="status"
              checked={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
              className="w-4 h-4 text-primary rounded cursor-pointer"
            />
            <label htmlFor="status" className="text-sm font-medium cursor-pointer select-none">
              In Stock
            </label>
          </div>

          <DialogFooter className="pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {initialData ? "Save Changes" : "Create Product"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}