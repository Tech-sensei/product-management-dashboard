'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { validateEmail } from '@/lib/validation';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setError('');
    setIsLoading(true);

    // Mock reset password logic
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSent(true);
      toast.success('Reset link sent!', {
        description: 'Please check your email for instructions.',
      });
    } catch (error) {
      toast.error('Failed to send link', {
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent/20 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border p-8 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <CheckCircle2 size={24} />
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">Check your email</h1>
          <p className="text-muted-foreground mb-6">
            We've sent password reset instructions to <span className="font-medium text-foreground">{email}</span>
          </p>
          <div className="space-y-4">
            <button
              onClick={() => {
                setIsSent(false);
                setEmail('');
              }}
              className="w-full py-3 px-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Back to login
            </button>
            <div className="text-sm text-muted-foreground">
              Didn't receive the email?{' '}
              <button 
                onClick={handleSubmit} 
                className="text-primary font-bold hover:underline transition-all"
                disabled={isLoading}
              >
                Click to resend
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/20 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">Forgot Password?</h1>
            <p className="text-muted-foreground text-sm">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
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
                    error
                      ? "border-destructive focus:border-destructive focus:ring-destructive/20" 
                      : "border-border focus:border-primary"
                  )}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                />
              </div>
              {error && (
                <p className="text-xs text-destructive ml-1">{error}</p>
              )}
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
                  Send Reset Link
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link 
              href="/login" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 group"
            >
              <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
