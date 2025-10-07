



import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Star, Award, ShieldCheck, HeartHandshake, Search, DraftingCompass, Hammer, Check } from 'lucide-react';
import { services } from '@/lib/services';
import placeholderImages from '@/lib/placeholder-images.json';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getDictionary } from '@/lib/dictionaries';

export default async function Home({ params: { locale } }: { params: { locale: any } }) {
  const dict = await getDictionary(locale);
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-construction');
  const testimonialImage = placeholderImages.placeholderImages.find(p => p.id === 'testimonial-avatar');
  const aboutImage = placeholderImages.placeholderImages.find(p => p.id === 'about-us-image');
  const project1Image = placeholderImages.placeholderImages.find(p => p.id === 'project-1');
  const project2Image = placeholderImages.placeholderImages.find(p => p.id === 'project-2');
  const project3Image = placeholderImages.placeholderImages.find(p => p.id === 'project-3');
  const t = dict.home;
  const t_services = dict.services;

  const whyChooseUs = [
    { text: t.about.reason1, icon: <Award className="w-8 h-8 mb-2 text-primary" /> },
    { text: t.about.reason2, icon: <ShieldCheck className="w-8 h-8 mb-2 text-primary" /> },
    { text: t.about.reason3, icon: <HeartHandshake className="w-8 h-8 mb-2 text-primary" /> },
  ];

  const processSteps = [
    { title: t.process.step1.title, description: t.process.step1.description, icon: <Search className="w-10 h-10 mb-4 text-primary" /> },
    { title: t.process.step2.title, description: t.process.step2.description, icon: <DraftingCompass className="w-10 h-10 mb-4 text-primary" /> },
    { title: t.process.step3.title, description: t.process.step3.description, icon: <Hammer className="w-10 h-10 mb-4 text-primary" /> },
    { title: t.process.step4.title, description: t.process.step4.description, icon: <Check className="w-10 h-10 mb-4 text-primary" /> },
  ];
  
  const featuredProjects = [
    {
      title: t.projects.project1.title,
      category: t.projects.project1.category,
      image: project1Image?.imageUrl,
      imageHint: project1Image?.imageHint,
    },
    {
      title: t.projects.project2.title,
      category: t.projects.project2.category,
      image: project2Image?.imageUrl,
      imageHint: project2Image?.imageHint,
    },
    {
      title: t.projects.project3.title,
      category: t.projects.project3.category,
      image: project3Image?.imageUrl,
      imageHint: project3Image?.imageHint,
    },
  ];

  return (
    <>
      <Header t={dict} />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-24 lg:py-28 bg-secondary/50">
          <div className="container-limited grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="font-bold cta-pulse">
                  <Link href="/budget-request">
                    {t.hero.cta}
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#services">{t.hero.ctaSecondary}</Link>
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
          <div className="container-limited">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">{t.services.title}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t.services.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const serviceTranslation = t_services[service.id];
                return (
                  <Card key={service.id} className="group overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 w-full">
                      <Image
                        src={service.image}
                        alt={serviceTranslation.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={service.imageHint}
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                       <div className="absolute bottom-4 left-4 text-white">
                          <div className="bg-primary/80 text-primary-foreground p-3 rounded-full mb-2 w-fit">
                              {service.icon}
                          </div>
                          <h3 className="font-headline text-2xl font-bold">{serviceTranslation.title}</h3>
                       </div>
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <p className="flex-grow text-muted-foreground">{serviceTranslation.shortDescription}</p>
                      <Button asChild variant="link" className="p-0 h-auto mt-4 self-start">
                          <Link href={`/services/${service.id}`} className="font-bold">
                              Ver más detalles <ArrowRight className="ml-2" />
                          </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-20 md:py-28 bg-secondary/50">
          <div className="container-limited grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">{t.about.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.about.description1}</p>
              <p className="text-muted-foreground leading-relaxed">{t.about.description2}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="text-center p-4">
                    <div className="flex justify-center">
                      {reason.icon}
                    </div>
                    <p className="font-semibold">{reason.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 md:h-auto md:aspect-square rounded-xl shadow-2xl overflow-hidden">
              {aboutImage && <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
              />}
            </div>
          </div>
        </section>

        <section id="process" className="w-full py-20 md:py-28 bg-background">
          <div className="container-limited">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">{t.process.title}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t.process.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center text-center p-6 border rounded-lg bg-secondary/30">
                  <div className="absolute -top-4 -right-2 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="mb-4">
                    {step.icon}
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="w-full py-20 md:py-28 bg-secondary/50">
          <div className="container-limited">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">{t.projects.title}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t.projects.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <Card key={index} className="group overflow-hidden">
                  <div className="relative h-64 w-full">
                    {project.image && <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={project.imageHint}
                    />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-headline text-2xl font-bold">{project.title}</h3>
                      <p className="text-sm opacity-90">{project.category}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-28 bg-background">
          <div className="container-limited">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">{t.testimonials.title}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t.testimonials.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-secondary/50 border-none">
                  <CardContent className="pt-6">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="mb-4 italic">"{t.testimonials.testimonial1}"</p>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        {testimonialImage && <AvatarImage src={testimonialImage.imageUrl} alt="Avatar cliente" data-ai-hint={testimonialImage.imageHint} />}
                        <AvatarFallback>C{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{t.testimonials.customer} {i}</p>
                        <p className="text-sm text-muted-foreground">{t.testimonials.project}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-28 bg-secondary/50">
            <div className="container-limited text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">¿Listo para Empezar tu Proyecto?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 mb-8">
                    Contáctanos hoy mismo para obtener una consulta gratuita y sin compromiso. Nuestro equipo está listo para ayudarte a hacer realidad tu visión.
                </p>
                <Button asChild size="lg" className="font-bold">
                    <Link href="/budget-request">
                        Presupuesto al instante
                        <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
