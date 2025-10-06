'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';
import { ArrowRight, FileText, Lightbulb, PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const cards = [
    {
      href: '/dashboard/budget-request',
      title: t('dashboard.requestBudget.title'),
      description: t('dashboard.requestBudget.description'),
      icon: <PlusCircle className="w-8 h-8 text-primary" />,
    },
    {
      href: '/dashboard/seo-generator',
      title: t('dashboard.seoGenerator.title'),
      description: t('dashboard.seoGenerator.description'),
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
    },
     {
      href: '/dashboard/my-budgets',
      title: 'Mis Presupuestos',
      description: 'Ver y gestionar tus solicitudes de presupuesto anteriores.',
      icon: <FileText className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          {t('dashboard.welcome.title')}, {user?.displayName || user?.email?.split('@')[0] || 'Usuario'}!
        </h1>
        <p className="text-muted-foreground">{t('dashboard.welcome.description')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link href={card.href} key={card.href}>
            <Card className="h-full flex flex-col justify-between hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                    {card.icon}
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className='pt-4'>
                    <CardTitle className="text-xl font-headline">{card.title}</CardTitle>
                    <CardDescription className="pt-2">{card.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
