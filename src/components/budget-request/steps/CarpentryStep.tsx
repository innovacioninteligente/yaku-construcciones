import { UseFormReturn } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

interface CarpentryStepProps {
  form: UseFormReturn<DetailedFormValues>;
  t: any;
}

export const CarpentryStep = ({ form, t }: CarpentryStepProps) => {
  const watchRenovateInteriorDoors = form.watch('renovateInteriorDoors');
  const watchInstallSlidingDoor = form.watch('installSlidingDoor');
  const watchPaintWalls = form.watch('paintWalls');
  const watchRemoveGotele = form.watch('removeGotele');
  const commonT = t.budgetRequest.form;

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="renovateInteriorDoors"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
            <FormLabel className="text-base">{commonT.carpentry.renovateInteriorDoors.label}</FormLabel>
            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
          </FormItem>
        )}
      />
      {watchRenovateInteriorDoors && (
        <FormField
          control={form.control}
          name="interiorDoorsAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{commonT.carpentry.interiorDoorsAmount.label}</FormLabel>
              <FormControl><Input type="number" placeholder="6" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="installSlidingDoor"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
            <FormLabel className="text-base">{commonT.carpentry.installSlidingDoor.label}</FormLabel>
            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
          </FormItem>
        )}
      />
      {watchInstallSlidingDoor && (
        <FormField
          control={form.control}
          name="slidingDoorAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{commonT.carpentry.slidingDoorAmount.label}</FormLabel>
              <FormControl><Input type="number" placeholder="1" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <hr />

      <FormField
        control={form.control}
        name="paintWalls"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
            <FormLabel className="text-base">{commonT.carpentry.paintWalls.label}</FormLabel>
            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
          </FormItem>
        )}
      />
      {watchPaintWalls && (
        <FormField
          control={form.control}
          name="paintWallsM2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{commonT.carpentry.paintWallsM2.label}</FormLabel>
              <FormControl><Input type="number" placeholder="300" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="removeGotele"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
            <FormLabel className="text-base">{commonT.carpentry.removeGotele.label}</FormLabel>
            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
          </FormItem>
        )}
      />
      {watchRemoveGotele && (
        <FormField
          control={form.control}
          name="removeGoteleM2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{commonT.carpentry.removeGoteleM2.label}</FormLabel>
              <FormControl><Input type="number" placeholder="300" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};
