
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
import { cn } from '@/lib/utils';

export default async function Home({ params: { locale } }: { params: { locale: any } }) {
  const dict = await getDictionary(locale);
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-construction');
  const testimonialImage = placeholderImages.placeholderImages.find(p => p.id === 'testimonial-avatar');
  const aboutImage = placeholderImages.placeholderImages.find(p => p.id === 'about-us-image');
  const project1Image = placeholderImages.placeholderImages.find(p => p.id === 'project-1');
  const project2Image = placeholderImages.placeholderImages.find(p => p.id === 'project-2');
  const project3Image = placeholderImages.placeholderImages.find(p_ => p_.id === 'project-3');
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
      type: 'image',
      title: t.projects.project1.title,
      category: t.projects.project1.category,
      src: project1Image?.imageUrl,
      imageHint: project1Image?.imageHint,
      className: 'md:col-span-2 md:row-span-2',
    },
    { 
      type: 'video',
      title: t.projects.project4.title,
      category: t.projects.project4.category,
      src: 'https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2Fvideos%2Ffreepik__dolly-shot-a-serene-bathroom-scene-transitions-fro__5956.mp4?alt=media&token=3107172f-a829-4c26-90d3-f5cf92d31b45',
      imageHint: 'modern bathroom renovation',
      className: 'md:col-span-1 md:row-span-2',
    },
    { 
      type: 'image',
      title: t.projects.project3.title,
      category: t.projects.project3.category,
      src: project3Image?.imageUrl,
      imageHint: project3Image?.imageHint,
      className: 'md:col-span-1 md:row-span-1',
    },
    { 
      type: 'image',
      title: t.projects.project2.title,
      category: t.projects.project2.category,
      src: project2Image?.imageUrl,
      imageHint: project2Image?.imageHint,
      className: 'md:col-span-1 md:row-span-1',
    },
    { 
      type: 'video',
      title: t.projects.project5.title,
      category: t.projects.project5.category,
      src: 'https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2Fvideos%2Ffreepik__dolly-shot-transition-from-a-cluttered-outdated-ki__5958.mp4?alt=media&token=12755114-0e1a-4e5b-88df-8d9f775d9f5a',
      imageHint: 'elegant kitchen remodel',
      className: 'md:col-span-2 md:row-span-2',
    },
    { 
      type: 'video',
      title: t.projects.project6.title,
      category: t.projects.project6.category,
      src: 'https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2Fvideos%2Fidea%20ban%CC%83o%202.mp4?alt=media&token=86b2fe43-39eb-4c46-b279-06409636739e',
      imageHint: 'bathroom idea',
      className: 'md:col-span-2 md:row-span-1',
    },
    { 
      type: 'cta',
      title: t.projects.cta.title,
      subtitle: t.projects.cta.subtitle,
      buttonText: t.projects.cta.button,
      href: '/budget-request',
      className: 'md:col-span-1 md:row-span-1',
    },
    { 
      type: 'video',
      title: t.projects.project7.title,
      category: t.projects.project7.category,
      src: 'https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2Fvideos%2Fidea%20ban%CC%83o.mp4?alt=media&token=6a4ee89f-dc86-4b25-8186-dc74c5641466',
      imageHint: 'bathroom idea 2',
      className: 'md:col-span-1 md:row-span-1',
    },
    { 
      type: 'video',
      title: t.projects.project8.title,
      category: t.projects.project8.category,
      src: 'https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2Fvideos%2Fidea%20terraza.mp4?alt=media&token=447f5f09-1ed9-45d5-83f2-a484e9f24aed',
      imageHint: 'terrace idea',
      className: 'md:col-span-2 md:row-span-1',
    },
    { 
      type: 'video',
      title: t.projects.project9.title,
      category: t.projects.project9.category,
      src: 'https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2Fvideos%2Fjardineria.antes-y-despu%C3%A9s.mp4?alt=media&token=ce70c24e-74fc-4201-a7f8-cfc82a0212e5',
      imageHint: 'gardening before after',
      className: 'md:col-span-1 md:row-span-1',
    },
    {
      type: 'video',
      title: t.projects.project10.title,
      category: t.projects.project10.category,
      src: 'https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2Fvideos%2Ffreepik__dolly-shot-a-vibrant-yellow-wall-with-a-barred-win__83848.mp4?alt=media&token=95d8291d-dfdb-46f9-9ac3-9e9de720a2ce',
      imageHint: 'house facade',
      className: 'md:col-span-1 md:row-span-1',
    }
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
                              {t.services.detailsButton} <ArrowRight className="ml-2" />
                          </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <div className="text-center mt-16">
              <Button asChild size="lg">
                <Link href="/budget-request">
                  {t.hero.cta} <ArrowRight className="ml-2" />
                </Link>
              </Button>
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
            <div className="text-center mt-16">
                <h3 className="font-headline text-2xl font-bold">{t.process.cta.title}</h3>
                <p className="text-muted-foreground mt-2 mb-6">{t.process.cta.subtitle}</p>
                <Button asChild size="lg">
                    <Link href="/budget-request">
                        {t.hero.cta} <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>
            
            
        <section id="projects" className="w-full py-20 md:py-28 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">{t.projects.title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t.projects.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 md:auto-rows-[12rem] gap-2 rounded-lg overflow-hidden">
              {featuredProjects.map((project, index) => (
                <Card key={index} 
                  className={cn(
                    "group overflow-hidden relative transition-all duration-300 transform hover:scale-[1.02] hover:z-10",
                    project.type === 'cta' && 'col-span-2',
                    project.className
                  )}
                >
                  {project.type === 'cta' ? (
                    <Link href={project.href || '#'} className="h-full flex flex-col justify-center items-center bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors p-8 text-center">
                      <ArrowRight className="w-10 h-10 mb-4 text-blue-600 group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl md:text-2xl font-bold">{project.title}</h3> 
                      <p className="text-base text-gray-600 dark:text-gray-300 mt-2">{project.subtitle}</p>
                      <Button variant="link" className="mt-4 text-primary hover:text-primary/80">{project.buttonText}</Button>
                    </Link>
                  ) : (
                    <div className="relative h-full w-full">
                      {project.type === 'image' ? (
                        project.src && <Image
                          src={project.src}
                          alt={project.title || 'Project image'}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          data-ai-hint={project.imageHint}
                        />
                      ) : (
                        project.src && <video
                          src={project.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover video-cover transition-transform duration-500 group-hover:scale-110"
                          data-ai-hint={project.imageHint}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white p-2">
                        <h3 className="font-bold text-base md:text-lg">{project.title}</h3>
                        <p className="text-sm opacity-90">{project.category}</p>
                      </div>
                    </div>
                  )}
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
                <h2 className="font-headline text-3xl md:text-4xl font-bold">{t.finalCta.title}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 mb-8">
                    {t.finalCta.subtitle}
                </p>
                <Button asChild size="lg" className="font-bold">
                    <Link href="/budget-request">
                        {t.hero.cta}
                        <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </section>

      </main>
      <Footer t={t.finalCta} />
    </>
  );
}

    