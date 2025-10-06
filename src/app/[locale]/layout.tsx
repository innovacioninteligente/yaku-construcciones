import type { Metadata } from 'next';
import '../globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-context';
import i18nConfig from '../../../i18nConfig';
import { notFound } from 'next/navigation';
import { ContactFab } from '@/components/contact-fab';

export const metadata: Metadata = {
  title: 'Yaku Construcciones - Expertos en Construcción y Reformas',
  description: 'Soluciones expertas de construcción, reformas, piscinas y más. Calidad y confianza para tu hogar o negocio.',
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string }
}) {
  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background flex flex-col')}>
        <AuthProvider>
          {children}
          <Toaster />
          <ContactFab />
        </AuthProvider>
      </body>
    </html>
  );
}
