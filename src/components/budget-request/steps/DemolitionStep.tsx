import { UseFormReturn } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

interface DemolitionStepProps {
  form: UseFormReturn<DetailedFormValues>;
  t: any;
}

export const DemolitionStep = ({ form, t }: DemolitionStepProps) => {
  const watchDemolishPartitions = form.watch('demolishPartitions');
  const watchRemoveDoors = form.watch('removeDoors');
  const commonT = t.budgetRequest.form;

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="demolishPartitions"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
            <div className="space-y-0.5">
              <FormLabel className="text-base">{commonT.demolition.demolishPartitions.label}</FormLabel>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {watchDemolishPartitions && (
        <FormField
          control={form.control}
          name="demolishPartitionsM2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{commonT.demolition.demolishPartitionsM2.label}</FormLabel>
              <FormControl><Input type="number" placeholder="25" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="removeDoors"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
            <div className="space-y-0.5">
              <FormLabel className="text-base">{commonT.demolition.removeDoors.label}</FormLabel>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {watchRemoveDoors && (
        <FormField
          control={form.control}
          name="removeDoorsAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{commonT.demolition.removeDoorsAmount.label}</FormLabel>
              <FormControl><Input type="number" placeholder="5" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};
