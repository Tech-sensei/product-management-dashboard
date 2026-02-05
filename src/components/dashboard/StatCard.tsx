import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    label: string;
    isPositive?: boolean;
  };
  className?: string;
  isLoading?: boolean;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  isLoading
}: StatCardProps) {
  if (isLoading) {
    return (
      <div className={cn("bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm animate-pulse", className)}>
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-24 bg-neutral-100 rounded" />
          <div className="w-10 h-10 bg-neutral-100 rounded-xl" />
        </div>
        <div className="h-8 w-20 bg-neutral-100 rounded mb-2" />
        <div className="h-3 w-32 bg-neutral-100 rounded" />
      </div>
    );
  }

  return (
    <div className={cn("bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden", className)}>
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
            {title}
          </span>
          <div className="p-2.5 bg-neutral-50 rounded-xl group-hover:bg-primary/10 transition-colors">
            <Icon className="w-5 h-5 text-neutral-400 group-hover:text-primary transition-colors" />
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold text-neutral-900 leading-none">
            {value}
          </h3>
          {trend && (
            <span className={cn(
              "text-xs font-bold px-1.5 py-0.5 rounded-md",
              trend.isPositive ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
            )}>
              {trend.value}
            </span>
          )}
        </div>

        <p className="text-sm text-neutral-500 mt-2 font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
