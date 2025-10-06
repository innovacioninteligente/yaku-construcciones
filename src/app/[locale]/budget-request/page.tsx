import { getDictionary } from '@/lib/dictionaries';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BudgetRequestWizard } from '@/components/budget-request-wizard';

export default async function BudgetRequestPage({ params: { locale } }: { params: { locale: any } }) {
  const dict = await getDictionary(locale);
  return (
    <>
      <Header t={dict} />
      <main>
        <BudgetRequestWizard t={dict.budgetRequest} services={dict.services} />
      </main>
      <Footer />
    </>
  );
}
