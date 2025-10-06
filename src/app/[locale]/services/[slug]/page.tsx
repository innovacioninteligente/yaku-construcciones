import { services } from '@/lib/services';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getDictionary } from '@/lib/dictionaries';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services.find((s) => s.id === params.slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} | Yaku Construcciones`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: { params: { slug: string, locale: any } }) {
  const service = services.find((s) => s.id === params.slug);
  const dict = await getDictionary(params.locale);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header t={dict} />
      <main className="flex-1">
        <section className="relative h-64 md:h-80 w-full">
          <Image
            src={service.image}
            alt={`Imagen representativa de ${service.title}`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative container-limited h-full flex flex-col justify-center text-white">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl mt-2 max-w-3xl">{service.subtitle}</p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-limited grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold font-headline">Descripción del Servicio</h2>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              
              <h3 className="text-xl font-bold font-headline pt-6">Características Clave</h3>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <aside className="space-y-8">
              <div className="bg-secondary/50 p-6 rounded-lg">
                <h3 className="font-headline text-xl font-bold mb-4">¿Interesado en este servicio?</h3>
                <p className="text-muted-foreground mb-6">Obtén una estimación de costes para tu proyecto ahora mismo.</p>
                <Button asChild size="lg" className="w-full">
                  <Link href="/budget-request">
                    Solicitar Presupuesto <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
