import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';

interface GameLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function GameLayout({ children, title, description }: GameLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold uppercase tracking-widest text-primary">► {title}</h1>
          {description && (
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{description}</p>
          )}
        </div>
        <Link to={ROUTES.HOME}>
          <Button variant="outline" size="sm" className="text-xs uppercase tracking-wider">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ◄ BACK
          </Button>
        </Link>
      </div>

      <div className="border-4 bg-card p-8 pixel-corners retro-shadow">
        {children}
      </div>
    </div>
  );
}
