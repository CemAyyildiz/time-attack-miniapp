import { User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <header className="fixed left-[280px] right-0 top-0 z-10 h-16 border-b-4 bg-card pixel-corners">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xs font-semibold uppercase tracking-widest animate-pulse text-primary">
            ▶ PLAYER 1</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
