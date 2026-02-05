export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email address';
  return null;
};

export const validatePassword = (password: string, minLength = 2): string | null => {
  if (!password) return 'Password is required';
    if (password.length < minLength) return `Password must be at least ${minLength} characters`;
    if (password.length > 20) return 'Password must be at most 20 characters';
    // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return null;
};


// Product validations
export const validateProductName = (name: string): string | null => {
  if (!name.trim()) return 'Product name is required';
  if (name.trim().length < 2) return 'Product name must be at least 2 characters';
  if (name.trim().length > 100) return 'Product name must be at most 100 characters';
  return null;
};

export const validatePrice = (price: string): string | null => {
  if (!price) return 'Price is required';
  const priceValue = parseFloat(price);
  if (isNaN(priceValue)) return 'Price must be a valid number';
  if (priceValue <= 0) return 'Price must be greater than 0';
  if (priceValue > 1000000) return 'Price is too high';
  return null;
};

export const validateCategory = (category: string): string | null => {
  if (!category.trim()) return 'Category is required';
  if (category.trim().length < 2) return 'Category must be at least 2 characters';
  if (category.trim().length > 50) return 'Category must be at most 50 characters';
  return null;
};

export const validateDescription = (description: string): string | null => {
  if (!description.trim()) return 'Description is required';
  if (description.trim().length < 10) return 'Description must be at least 10 characters';
  if (description.trim().length > 500) return 'Description must be at most 500 characters';
  return null;
};