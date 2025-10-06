import { Building2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold font-headline", className)}>
      <Building2 className="h-6 w-6 text-primary" />
      <span>Yaku Construcciones</span>
    </Link>
  );
}
