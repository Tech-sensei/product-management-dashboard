'use client';

import { Menu, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export default function Header({ onOpenSidebar }: HeaderProps) {
  const user = useAppSelector((state) => state.auth.user);  
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
        {/* Search Bar Placeholder */}
        <div className="relative hidden sm:block w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 bg-accent rounded-lg border-none focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
          />
        </div>



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
