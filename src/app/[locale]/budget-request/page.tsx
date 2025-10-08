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

  return (
    <>
      <Header t={dict} />
      <main className="flex-1">
        <div className="w-full py-16 md:py-20 bg-background">
          <div className="container-limited text-center">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Presupuesto al instante
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Rellena nuestro formulario rápido y obtén una estimación de costes para tu proyecto en pocos minutos.
            </p>
            
            <div className='w-full flex justify-center mt-12'>
              {formType === 'quick' && <QuickBudgetForm t={dict} onBack={handleGoBack} />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
