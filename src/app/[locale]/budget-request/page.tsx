
'use client';

import { getDictionary } from '@/lib/dictionaries';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BudgetRequestWizard } from '@/components/budget-request-wizard';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { FileText, ClipboardCheck } from 'lucide-react';

export default function BudgetRequestPage({ params: { locale } }: { params: { locale: any } }) {
  const [dict, setDict] = useState<any>(null);
  const [formType, setFormType] = useState<null | 'quick' | 'detailed'>(null);
  const vectorUrl = "https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2F529Y_890mishd9lfk4tbj5kq32nqjd5n6er355koj2.jpg?alt=media&token=a5ac9d7f-4b56-44cc-bd5e-41c25ddcc220";

  useEffect(() => {
    getDictionary(locale).then(d => setDict(d));
  }, [locale]);
  
  const handleSelectFormType = (type: 'quick' | 'detailed') => {
    if (type === 'quick') {
      // For now, we'll just log it. In the future, we can render a different component.
      console.log("Quick budget form selected, but not implemented yet.");
      return;
    }
    setFormType(type);
  };

  if (!dict) {
    return null; // or a loading skeleton
  }

  const renderInitialSelection = () => (
    <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card 
            className="p-6 text-center hover:shadow-lg hover:border-primary transition-all cursor-pointer"
            onClick={() => handleSelectFormType('quick')}
        >
            <div className="flex justify-center mb-4">
                <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <FileText className="w-8 h-8" />
                </div>
            </div>
            <h3 className="font-headline text-xl font-bold mb-2">Presupuesto Rápido</h3>
            <p className="text-muted-foreground">Ideal para tener una estimación rápida del coste de tu proyecto con pocos datos.</p>
        </Card>
        <Card 
            className="p-6 text-center hover:shadow-lg hover:border-primary transition-all cursor-pointer"
            onClick={() => handleSelectFormType('detailed')}
        >
            <div className="flex justify-center mb-4">
                 <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <ClipboardCheck className="w-8 h-8" />
                </div>
            </div>
            <h3 className="font-headline text-xl font-bold mb-2">Presupuesto Detallado</h3>
            <p className="text-muted-foreground">Proporciona todos los detalles para obtener un presupuesto preliminar más preciso y ajustado a tus necesidades.</p>
        </Card>
    </div>
  )

  return (
    <>
      <Header t={dict} />
      <main className="flex-1">
        <div className="w-full py-16 md:py-20 bg-background">
          <div className="container-limited flex flex-col items-center justify-center text-center">
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {dict.budgetRequest.title}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {dict.budgetRequest.description}
              </p>
              
              <div className="relative h-64 md:h-80 w-full max-w-2xl mx-auto mt-8 mb-8 md:mb-12">
                  <Image
                      src={vectorUrl}
                      alt="Ilustración de presupuesto de construcción"
                      fill
                      className="object-contain"
                      data-ai-hint="architect plan calculator"
                  />
              </div>

              {formType === 'detailed' ? <BudgetRequestWizard t={dict} services={dict.services} /> : renderInitialSelection()}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
