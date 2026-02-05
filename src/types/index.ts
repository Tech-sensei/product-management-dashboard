// 👤 User & Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

// 📦 Product Types
export interface Product {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  price: string;
  category: string;
  status: boolean;
  image: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: string;
  category: string;
  status: boolean;
  image: string;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  id: string;
}

// 🛠️ Component Types
export interface Action {
  label: string;
  icon: any;
  onClick: () => void;
  variant?: "default" | "danger" | "warning";
}
