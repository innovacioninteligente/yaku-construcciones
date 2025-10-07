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
        <section className="w-full py-12 md:py-20 bg-secondary/30">
            <div className="container-limited grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        {dict.header.nav.budgetRequest}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        {dict.budgetRequest.description}
                    </p>
                </div>
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                    <Image
                        src={vectorUrl}
                        alt="Ilustración de presupuesto de construcción"
                        fill
                        className="object-contain"
                        data-ai-hint="architect plan calculator"
                    />
                </div>
            </div>
        </section>
        <BudgetRequestWizard t={dict} services={dict.services} />
      </main>
      <Footer />
    </>
  );
}
