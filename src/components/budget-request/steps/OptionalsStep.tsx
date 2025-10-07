import { UseFormReturn } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

interface OptionalsStepProps {
  form: UseFormReturn<DetailedFormValues>;
  t: any;
}

export const OptionalsStep = ({ form, t }: OptionalsStepProps) => {
    const commonT = t.budgetRequest.form;

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="installAirConditioning"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
            <div className="space-y-0.5">
              <FormLabel className="text-base">{commonT.optionals.installAirConditioning.label}</FormLabel>
              <FormDescription>{commonT.optionals.installAirConditioning.description}</FormDescription>
            </div>
            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="renovateExteriorCarpentry"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
            <div className="space-y-0.5">
              <FormLabel className="text-base">{commonT.optionals.renovateExteriorCarpentry.label}</FormLabel>
              <FormDescription>{commonT.optionals.renovateExteriorCarpentry.description}</FormDescription>
            </div>
            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
