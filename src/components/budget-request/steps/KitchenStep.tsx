import { UseFormReturn } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface KitchenStepProps {
  form: UseFormReturn<DetailedFormValues>;
  t: any;
}

export const KitchenStep = ({ form, t }: KitchenStepProps) => {
  const watchRenovateKitchen = form.watch('kitchen.renovate');
  const commonT = t.budgetRequest.form;

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="kitchen.renovate"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
            <FormLabel className="text-base">{commonT.kitchen.renovateKitchen.label}</FormLabel>
            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
          </FormItem>
        )}
      />
      {watchRenovateKitchen && (
        <div className="space-y-6 pl-4 border-l-2 ml-4">
          <FormField
            control={form.control}
            name="kitchen.quality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonT.quality.label}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder={commonT.quality.placeholder} /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="basic">{commonT.quality.options.basic}</SelectItem>
                    <SelectItem value="medium">{commonT.quality.options.medium}</SelectItem>
                    <SelectItem value="premium">{commonT.quality.options.premium}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kitchen.demolition"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
                <FormLabel>{commonT.kitchen.kitchenDemolition.label}</FormLabel>
                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kitchen.wallTilesM2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonT.kitchen.kitchenWallTilesM2.label}</FormLabel>
                <FormControl><Input type="number" placeholder="25" {...field} value={field.value || ''} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kitchen.floorM2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonT.kitchen.kitchenFloorM2.label}</FormLabel>
                <FormControl><Input type="number" placeholder="12" {...field} value={field.value || ''} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kitchen.plumbing"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
                <FormLabel>{commonT.kitchen.kitchenPlumbing.label}</FormLabel>
                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};
