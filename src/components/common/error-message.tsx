import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';

interface ErrorMessageProps {
  message?: string;
  title?: string;
  className?: string;
}

export default function ErrorMessage({
  message = 'Bir hata oluştu. Lütfen tekrar deneyin.',
  title = 'Hata',
  className,
}: ErrorMessageProps) {
  return (
    <Card className={cn('border-4 border-destructive', className)}>
      <CardContent className="flex items-start gap-3 pt-6">
        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5 animate-pulse" />
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold text-sm uppercase tracking-wider">{title}</h3>
          <h3 className="font-semibold text-destructive text-xs uppercase tracking-widest">▼ ERROR ▼</h3>
          <p className="text-[10px] text-muted-foreground uppercase">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
