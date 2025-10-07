import { UseFormReturn, FieldArrayWithId } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ElectricityStepProps {
  form: UseFormReturn<DetailedFormValues>;
  bedroomFields: FieldArrayWithId<DetailedFormValues, "electricalBedrooms", "id">[];
  t: any;
}

export const ElectricityStep = ({ form, t, bedroomFields }: ElectricityStepProps) => {
  const commonT = t.budgetRequest.form;
  const propertyType = form.watch('propertyType');

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

    {propertyType === 'residential' && (
      <>
        <Card>
          <CardHeader><CardTitle className='text-lg'>{commonT.electricity.perRoom.kitchen}</CardTitle></CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name="electricalKitchen.sockets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{commonT.electricity.perRoom.sockets}</FormLabel>
                  <FormControl><Input type="number" placeholder="8" {...field} value={field.value || ''} /></FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="electricalKitchen.lights"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{commonT.electricity.perRoom.lights}</FormLabel>
                  <FormControl><Input type="number" placeholder="3" {...field} value={field.value || ''} /></FormControl>
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
              name="electricalLivingRoom.sockets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{commonT.electricity.perRoom.sockets}</FormLabel>
                  <FormControl><Input type="number" placeholder="6" {...field} value={field.value || ''} /></FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="electricalLivingRoom.lights"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{commonT.electricity.perRoom.lights}</FormLabel>
                  <FormControl><Input type="number" placeholder="4" {...field} value={field.value || ''} /></FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="electricalLivingRoom.tv"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormLabel>{commonT.electricity.perRoom.tv}</FormLabel>
                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        {bedroomFields.map((field, index) => (
          <Card key={field.id}>
            <CardHeader><CardTitle className='text-lg'>{commonT.electricity.perRoom.bedroom} {index + 1}</CardTitle></CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name={`electricalBedrooms.${index}.sockets`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{commonT.electricity.perRoom.sockets}</FormLabel>
                    <FormControl><Input type="number" placeholder="4" {...field} value={field.value || ''} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`electricalBedrooms.${index}.lights`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{commonT.electricity.perRoom.lights}</FormLabel>
                    <FormControl><Input type="number" placeholder="2" {...field} value={field.value || ''} /></FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        ))}
      </>
    )}

    {(propertyType === 'commercial' || propertyType === 'office') && (
        <Card>
            <CardHeader><CardTitle className='text-lg'>Electricidad del Espacio de Trabajo</CardTitle></CardHeader>
            <CardContent className='space-y-4'>
                <FormField
                control={form.control}
                name="electricalWorkstations.sockets"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Puntos de enchufe por puesto de trabajo</FormLabel>
                        <FormControl><Input type="number" placeholder="4" {...field} /></FormControl>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="electricalWorkstations.network"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Puntos de red por puesto de trabajo</FormLabel>
                        <FormControl><Input type="number" placeholder="2" {...field} /></FormControl>
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="electricalGeneral.lights"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Puntos de luz generales</FormLabel>
                        <FormControl><Input type="number" placeholder="20" {...field} /></FormControl>
                    </FormItem>
                )}
                />
            </CardContent>
        </Card>
    )}
    </div>
  );
};
