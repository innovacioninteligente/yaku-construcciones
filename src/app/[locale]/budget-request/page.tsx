'use client';

import { getDictionary } from '@/lib/dictionaries';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BudgetRequestWizard } from '@/components/budget-request-wizard';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { FileText, ClipboardCheck, ArrowLeft } from 'lucide-react';
import { QuickBudgetForm } from '@/components/budget-request/quick-budget-form';
import { Button } from '@/components/ui/button';

export default function BudgetRequestPage({ params: { locale } }: { params: { locale: any } }) {
  const [dict, setDict] = useState<any>(null);
  const [formType, setFormType] = useState<'quick' | 'detailed'>('quick');
  const vectorUrl = "https://firebasestorage.googleapis.com/v0/b/local-digital-eye.firebasestorage.app/o/business%2Fyaku%2F529Y_890mishd9lfk4tbj5kq32nqjd5n6er355koj2.jpg?alt=media&token=a5ac9d7f-4b56-44cc-bd5e-41c25ddcc220";

  useEffect(() => {
    getDictionary(locale).then(d => setDict(d));
  }, [locale]);
  
  const handleGoBack = () => {
    setFormType(null);
  };

  if (!dict) {
    return null; // or a loading skeleton
  }
  
  const t_br = dict.budgetRequest;

  const renderInitialSelection = () => (
     <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card 
            className="p-6 text-center hover:shadow-lg hover:border-primary transition-all cursor-pointer"
            onClick={() => setFormType('quick')}
        >
            <div className="flex justify-center mb-4">
                <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <FileText className="w-8 h-8" />
                </div>
            </div>
            <h3 className="font-headline text-xl font-bold mb-2">{t_br.selection.quick.title}</h3>
            <p className="text-muted-foreground">{t_br.selection.quick.description}</p>
        </Card>
        <Card 
            className="p-6 text-center hover:shadow-lg hover:border-primary transition-all cursor-pointer"
            onClick={() => setFormType('detailed')}
        >
            <div className="flex justify-center mb-4">
                 <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <ClipboardCheck className="w-8 h-8" />
                </div>
            </div>
            <h3 className="font-headline text-xl font-bold mb-2">{t_br.selection.detailed.title}</h3>
            <p className="text-muted-foreground">{t_br.selection.detailed.description}</p>
        </Card>
    </div>
  );

  return (
    <>
      <Header t={dict} />
      <main className="flex-1">
        <div className="w-full py-16 md:py-20 bg-background">
          <div className="container-limited text-center">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t_br.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t_br.description}
            </p>
            
            {!formType && (
                <div className="relative h-64 md:h-80 w-full max-w-2xl mx-auto mt-8 mb-8 md:mb-12">
                    <Image
                        src={vectorUrl}
                        alt="Ilustración de presupuesto de construcción"
                        fill
                        className="object-contain"
                        data-ai-hint="architect plan calculator"
                    />
                </div>
            )}
            
            <div className='w-full flex justify-center mt-12'>
              {formType === null && renderInitialSelection()}
              {formType === 'quick' && <QuickBudgetForm t={dict} onBack={handleGoBack} />}
              {/* The detailed form is hidden for now, but not removed */}
              {formType === 'detailed' && <BudgetRequestWizard t={dict} services={dict.services} onBack={handleGoBack} />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
