import { UseFormReturn } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ElectricityStepProps {
  form: UseFormReturn<DetailedFormValues>;
  t: any;
}

export const ElectricityStep = ({ form, t }: ElectricityStepProps) => {
    const commonT = t.budgetRequest.form;

  return (
    <div className="space-y-6 text-left">
      <FormField
        control={form.control}
        name="renovateElectricalPanel"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <FormLabel className="text-base">{commonT.electricity.renovateElectricalPanel.label}</FormLabel>
            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
          </FormItem>
        )}
      />

      <Card>
        <CardHeader><CardTitle className='text-lg'>{commonT.electricity.perRoom.kitchen}</CardTitle></CardHeader>
        <CardContent className='space-y-4'>
          <FormField
            control={form.control}
            name="electricalKitchenSockets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonT.electricity.perRoom.sockets}</FormLabel>
                <FormControl><Input type="number" placeholder="8" {...field} /></FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="electricalKitchenLights"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonT.electricity.perRoom.lights}</FormLabel>
                <FormControl><Input type="number" placeholder="3" {...field} /></FormControl>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className='text-lg'>{commonT.electricity.perRoom.livingRoom}</CardTitle></CardHeader>
        <CardContent className='space-y-4'>
          <FormField
            control={form.control}
            name="electricalLivingRoomSockets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonT.electricity.perRoom.sockets}</FormLabel>
                <FormControl><Input type="number" placeholder="6" {...field} /></FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="electricalLivingRoomLights"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonT.electricity.perRoom.lights}</FormLabel>
                <FormControl><Input type="number" placeholder="4" {...field} /></FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="electricalLivingRoomTV"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <FormLabel>{commonT.electricity.perRoom.tv}</FormLabel>
                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className='text-lg'>{commonT.electricity.perRoom.bedroom} 1</CardTitle></CardHeader>
        <CardContent className='space-y-4'>
          <FormField
            control={form.control}
            name="electricalBedroom1Sockets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonT.electricity.perRoom.sockets}</FormLabel>
                <FormControl><Input type="number" placeholder="4" {...field} /></FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="electricalBedroom1Lights"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonT.electricity.perRoom.lights}</FormLabel>
                <FormControl><Input type="number" placeholder="2" {...field} /></FormControl>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};
