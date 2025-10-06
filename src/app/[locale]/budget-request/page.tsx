
import { getDictionary } from '@/lib/dictionaries';
import { BudgetRequestForm } from './budget-request-form';

export default async function BudgetRequestPage({ params: { locale } }: { params: { locale: any } }) {
  const dict = await getDictionary(locale);
  return <BudgetRequestForm t={dict.budgetRequest} />;
}
