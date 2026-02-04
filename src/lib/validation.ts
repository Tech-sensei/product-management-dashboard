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
