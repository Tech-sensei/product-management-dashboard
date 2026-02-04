'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Loader2} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { validateEmail, validatePassword, validateName } from '@/lib/validation';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    let confirmPasswordError = '';

    if (formData.password !== formData.confirmPassword) {
      confirmPasswordError = 'Passwords do not match';
    }

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        name: nameError || '',
        email: emailError || '',
        password: passwordError || '',
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    // Clear errors
    setErrors({ name: '', email: '', password: '', confirmPassword: '' });
    setIsLoading(true);

    // Mock register logic
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success('Account created successfully!', {
        description: 'You can now sign in with your credentials.',
      });
      
      router.push('/login');
    } catch (error) {
      toast.error('Registration failed', {
        description: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/20 p-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-primary mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join Tolamore Consult and start managing your products.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1" htmlFor="name">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground transition-colors group-focus-within:text-primary">
                    <User size={18} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className={cn(
                      "w-full pl-10 pr-4 py-3 bg-accent/30 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm",
                      errors.name
                        ? "border-destructive focus:border-destructive focus:ring-destructive/20" 
                        : "border-border focus:border-primary"
                    )}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-destructive ml-1">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground transition-colors group-focus-within:text-primary">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className={cn(
                      "w-full pl-10 pr-4 py-3 bg-accent/30 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm",
                      errors.email
                        ? "border-destructive focus:border-destructive focus:ring-destructive/20" 
                        : "border-border focus:border-primary"
                    )}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive ml-1">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1" htmlFor="password">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground transition-colors group-focus-within:text-primary">
                      <Lock size={18} />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={cn(
                        "w-full pl-10 pr-4 py-3 bg-accent/30 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm",
                        errors.password
                          ? "border-destructive focus:border-destructive focus:ring-destructive/20" 
                          : "border-border focus:border-primary"
                      )}
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        if (errors.password) setErrors({ ...errors, password: '' });
                      }}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-xs text-destructive ml-1">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground transition-colors group-focus-within:text-primary">
                     <Lock size={18} />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={cn(
                        "w-full pl-10 pr-4 py-3 bg-accent/30 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm",
                        errors.confirmPassword
                          ? "border-destructive focus:border-destructive focus:ring-destructive/20" 
                          : "border-border focus:border-primary"
                      )}
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        setFormData({ ...formData, confirmPassword: e.target.value });
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                      }}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive ml-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2 ml-1 pt-2">
              <input 
                type="checkbox" 
                id="terms" 
                required
                className="w-4 h-4 mt-0.5 rounded border-border text-primary focus:ring-primary/20 transition-all cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer select-none">
                I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-3 px-4 bg-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-primary/20 mt-4",
                isLoading && "opacity-80"
              )}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="text-primary font-bold hover:underline transition-all"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}