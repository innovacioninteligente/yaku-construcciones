import { getDictionary } from '@/lib/dictionaries';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BudgetRequestWizard } from '@/components/budget-request-wizard';
import Image from 'next/image';

export default async function BudgetRequestPage({ params: { locale } }: { params: { locale: any } }) {
  const dict = await getDictionary(locale);
  const vectorUrl = "https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2F529Y_890mishd9lfk4tbj5kq32nqjd5n6er355koj2.jpg?alt=media&token=a5ac9d7f-4b56-44cc-bd5e-41c25ddcc220";

  return (
    <>
      <Header t={dict} />
      <main>
        <section className="relative w-full py-16 md:py-24 bg-background overflow-hidden">
            <div className="container-limited relative z-10">
                <div className="max-w-2xl space-y-4">
                    <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        {dict.header.nav.budgetRequest}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        {dict.budgetRequest.description}
                    </p>
                </div>
            </div>
            <div className="absolute inset-y-0 right-0 w-1/2 h-full hidden md:block">
                <Image
                    src={vectorUrl}
                    alt="Ilustración de presupuesto de construcción"
                    fill
                    className="object-contain object-left"
                    data-ai-hint="architect plan calculator"
                />
            </div>
        </section>
        <BudgetRequestWizard t={dict} services={dict.services} />
      </main>
      <Footer />
    </>
  );
}
