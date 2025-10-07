import { UseFormReturn } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

interface CeilingsStepProps {
  form: UseFormReturn<DetailedFormValues>;
  t: any;
}

export const CeilingsStep = ({ form, t }: CeilingsStepProps) => {
  const watchInstallFalseCeiling = form.watch('installFalseCeiling');
  const watchSoundproofRoom = form.watch('soundproofRoom');
  const commonT = t.budgetRequest.form;

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="installFalseCeiling"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
            <FormLabel className="text-base">{commonT.ceilings.installFalseCeiling.label}</FormLabel>
            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
          </FormItem>
        )}
      />
      {watchInstallFalseCeiling && (
        <FormField
          control={form.control}
          name="falseCeilingM2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{commonT.ceilings.falseCeilingM2.label}</FormLabel>
              <FormControl><Input type="number" placeholder="20" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="soundproofRoom"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
            <FormLabel className="text-base">{commonT.ceilings.soundproofRoom.label}</FormLabel>
            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
          </FormItem>
        )}
      />
      {watchSoundproofRoom && (
        <FormField
          control={form.control}
          name="soundproofRoomM2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{commonT.ceilings.soundproofRoomM2.label}</FormLabel>
              <FormControl><Input type="number" placeholder="15" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};
