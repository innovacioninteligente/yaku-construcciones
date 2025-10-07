import { UseFormReturn } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BathroomStepProps {
  form: UseFormReturn<DetailedFormValues>;
  t: any;
}

export const BathroomStep = ({ form, t }: BathroomStepProps) => {
  const watchRenovateBathroom = form.watch('renovateBathroom');
  const commonT = t.budgetRequest.form;

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="renovateBathroom"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
            <div className="space-y-0.5">
              <FormLabel className="text-base">{commonT.bathroom.renovateBathroom.label}</FormLabel>
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

      {watchRenovateBathroom && (
        <div className="space-y-6 pl-4 border-l-2 ml-4">
          <FormField
            control={form.control}
            name="bathroomQuality"
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
            name="bathroomWallTilesM2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonT.bathroom.bathroomWallTilesM2.label}</FormLabel>
                <FormControl><Input type="number" placeholder="30" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathroomFloorM2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonT.bathroom.bathroomFloorM2.label}</FormLabel>
                <FormControl><Input type="number" placeholder="8" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="installShowerTray"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
                    <FormLabel>{commonT.bathroom.installShowerTray.label}</FormLabel>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="installShowerScreen"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
                    <FormLabel>{commonT.bathroom.installShowerScreen.label}</FormLabel>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathroomPlumbing"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
                    <FormLabel>{commonT.bathroom.bathroomPlumbing.label}</FormLabel>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};
