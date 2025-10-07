import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2FLogo-Largo.png?alt=media&token=e97c09a2-6af6-415b-9da9-f96cb3aefef2";
  
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold font-headline", className)}>
      <Image src={logoUrl} alt="Yaku Construcciones Logo" width={140} height={35} className="h-auto" />
    </Link>
  );
}
