'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthContext';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export default function Header({ onOpenSidebar }: HeaderProps) {
  const { user } = useAuth();  
  const pathname = usePathname();
  
  // Format pathname to title (e.g., /overview -> Overview)
  const title = pathname === '/' ? 'Dashboard' : pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 hover:bg-accent rounded-md text-primary"
          onClick={onOpenSidebar}
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-foreground hidden md:block">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
        <div className="flex items-center gap-3 pl-2 border-l border-border ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold border border-border">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
