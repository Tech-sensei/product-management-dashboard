'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings,
  X,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/AuthContext';
import { toast } from 'sonner';
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useState } from 'react';

const navItems = [
  { name: 'Overview', href: '/overview', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setIsLogoutDialogOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-border z-50 transition-transform duration-300 lg:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo / Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-border shrink-0">
            <span className="text-xl font-bold text-primary">Tolamore Consult</span>
            <button 
              className="lg:hidden p-2 hover:bg-accent rounded-md text-primary"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                    active 
                      ? "bg-primary text-white" 
                      : "text-muted-foreground hover:bg-accent hover:text-primary"
                  )}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                >
                  <item.icon 
                    size={20} 
                    className={cn(
                      active ? "text-white" : "text-muted-foreground group-hover:text-primary"
                    )} 
                  />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer / Logout */}
          <div className="p-4 border-t border-border shrink-0">
            <button 
              onClick={() => setIsLogoutDialogOpen(true)}
              className="flex items-center gap-2 p-2 w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors outline-none cursor-pointer"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Log out</span>
            </button>
          </div>
        </div>
      </aside>

      <ConfirmDialog
        open={isLogoutDialogOpen}
        title="Log out confirmation"
        description="Are you sure you want to log out? You will need to sign in again to access your dashboard."
        confirmText="Log out"
        variant="danger"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutDialogOpen(false)}
      />
    </>
  );
}
