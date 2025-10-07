import type { Metadata } from 'next';
import '../globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-context';
import i18nConfig from '../../../i18nConfig';
import { notFound } from 'next/navigation';
import { ContactFab } from '@/components/contact-fab';

const siteConfig = {
  name: 'Yaku Construcciones',
  description: 'Soluciones expertas de construcción, reformas, piscinas y más. Calidad y confianza para tu hogar o negocio.',
  url: 'https://yaku-construcciones.com', // Replace with your actual domain
  ogImage: 'https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2Ficon.png?alt=media&token=1803ca86-deff-4e44-84ea-20f1fae4cbf4',
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 256,
        height: 256,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
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
  
  const faviconUrl = "https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2Ficon.png?alt=media&token=1803ca86-deff-4e44-84ea-20f1fae4cbf4";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href={faviconUrl} sizes="any" />
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
