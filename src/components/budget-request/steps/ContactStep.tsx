import { UseFormReturn } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface ContactStepProps {
  form: UseFormReturn<DetailedFormValues>;
  t: any;
}

export const ContactStep = ({ form, t }: ContactStepProps) => {
  const commonT = t.budgetRequest.form;
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{commonT.name.label}</FormLabel>
            <FormControl><Input placeholder={commonT.name.placeholder} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{commonT.email.label}</FormLabel>
            <FormControl><Input type="email" placeholder={commonT.email.placeholder} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{commonT.phone.label}</FormLabel>
            <FormControl><Input placeholder={commonT.phone.placeholder} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{commonT.address.label}</FormLabel>
            <FormControl><Input placeholder={commonT.address.placeholder} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
