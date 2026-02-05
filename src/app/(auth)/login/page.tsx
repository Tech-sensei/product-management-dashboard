'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/providers/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { validateEmail, validatePassword } from '@/lib/validation';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: 'testing@gmail.com',
    password: 'password123',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError || '',
        password: passwordError || '',
      });
      return;
    }

    // Clear errors
    setErrors({ email: '', password: '' });
    setIsLoading(true);

    // Mock login logic
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      login('mock-jwt-token', { 
        id: '1',
        name: 'John Doe', 
        email: formData.email 
      });

      toast.success('Successfully logged in!', {
        description: 'Welcome back to Tolamore Consult.',
      });
    } catch (error) {
      toast.error('Login failed', {
        description: 'Please check your credentials and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/20 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-primary mb-2">Tolamore Consult</h1>
            <p className="text-muted-foreground">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                    "w-full pl-10 pr-12 py-3 bg-accent/30 border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm",
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
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive ml-1">{errors.password}</p>
              )}
              <div className="flex justify-end">
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-primary font-medium hover:underline transition-all"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-1">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 transition-all cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-3 px-4 bg-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-primary/20",
                isLoading && "opacity-80"
              )}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link 
              href="/register" 
              className="text-primary font-bold hover:underline transition-all"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}