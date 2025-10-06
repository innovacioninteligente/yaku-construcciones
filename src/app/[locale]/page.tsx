import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Star } from 'lucide-react';
import { services } from '@/lib/services';
import placeholderImages from '@/lib/placeholder-images.json';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getDictionary } from '@/lib/dictionaries';

export default async function Home({ params: { locale } }: { params: { locale: any } }) {
  const dict = await getDictionary(locale);
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-construction');
  const testimonialImage = placeholderImages.placeholderImages.find(p => p.id === 'testimonial-avatar');

  return (
    <>
      <Header t={dict} />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Soluciones expertas de construcción y reformas
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Ofrecemos una amplia gama de servicios de construcción y oficios para hogares, negocios y proyectos industriales. Calidad y confianza en cada ladrillo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="font-bold">
                  <Link href="/dashboard/budget-request">
                    Solicitar Presupuesto
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#services">Nuestros Servicios</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto md:aspect-square rounded-xl shadow-2xl overflow-hidden">
             {heroImage && <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />}
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Nuestros Servicios Especializados</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Desde obra nueva hasta el mantenimiento de su piscina, nuestro equipo de expertos está listo para hacer realidad su proyecto.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                      {service.icon}
                    </div>
                    <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-28 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">La opinión de nuestros clientes</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Nos enorgullece el trabajo que hacemos y la satisfacción de quienes confían en nosotros.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-background">
                  <CardContent className="pt-6">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="mb-4 italic">"Un trabajo impecable de principio a fin. El equipo fue profesional, limpio y cumplió con los plazos. ¡Mi nueva piscina es un sueño hecho realidad!"</p>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        {testimonialImage && <AvatarImage src={testimonialImage.imageUrl} alt="Avatar cliente" data-ai-hint={testimonialImage.imageHint} />}
                        <AvatarFallback>C{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Cliente Satisfecho {i}</p>
                        <p className="text-sm text-muted-foreground">Reforma de Piscina</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
