import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2Ficon.png?alt=media&token=1803ca86-deff-4e44-84ea-20f1fae4cbf4";
  
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold font-headline", className)}>
      <Image src={logoUrl} alt="Yaku Construcciones Logo" width={24} height={24} className="h-6 w-6" />
      <span>Yaku Construcciones</span>
    </Link>
  );
}
