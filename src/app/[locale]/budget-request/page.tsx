'use client';

import { getDictionary } from '@/lib/dictionaries';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { FileText, ClipboardCheck, ArrowLeft } from 'lucide-react';
import { QuickBudgetForm } from '@/components/budget-request/quick-budget-form';
import { Button } from '@/components/ui/button';

export default function BudgetRequestPage({ params: { locale } }: { params: { locale: any } }) {
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    getDictionary(locale).then(d => setDict(d));
  }, [locale]);
  
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
              {t_br.page.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t_br.page.description}
            </p>
            
            <div className='w-full flex justify-center mt-12'>
              <QuickBudgetForm t={dict} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
