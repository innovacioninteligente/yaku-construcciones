import { UseFormReturn, FieldArrayWithId } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface BathroomStepProps {
  form: UseFormReturn<DetailedFormValues>;
  bathroomFields: FieldArrayWithId<DetailedFormValues, "bathrooms", "id">[];
  t: any;
}

export const BathroomStep = ({ form, bathroomFields, t }: BathroomStepProps) => {
  const commonT = t.budgetRequest.form;

  return (
    <div className="space-y-6">
       <Accordion type="single" collapsible className="w-full" defaultValue='bathroom-0'>
         {bathroomFields.map((field, index) => {
            return (
              <AccordionItem value={`bathroom-${index}`} key={field.id}>
                <AccordionTrigger>Reforma del Baño {index + 1}</AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <div className="space-y-6 pl-4 border-l-2 ml-4">
                      <FormField
                          control={form.control}
                          name={`bathrooms.${index}.quality`}
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
                          name={`bathrooms.${index}.wallTilesM2`}
                          render={({ field }) => (
                          <FormItem>
                              <FormLabel>{commonT.bathroom.bathroomWallTilesM2.label}</FormLabel>
                              <FormControl><Input type="number" placeholder="30" {...field} value={field.value || ''} /></FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name={`bathrooms.${index}.floorM2`}
                          render={({ field }) => (
                          <FormItem>
                              <FormLabel>{commonT.bathroom.bathroomFloorM2.label}</FormLabel>
                              <FormControl><Input type="number" placeholder="8" {...field} value={field.value || ''} /></FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name={`bathrooms.${index}.installShowerTray`}
                          render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
                                  <FormLabel>{commonT.bathroom.installShowerTray.label}</FormLabel>
                                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name={`bathrooms.${index}.installShowerScreen`}
                          render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
                                  <FormLabel>{commonT.bathroom.installShowerScreen.label}</FormLabel>
                                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name={`bathrooms.${index}.plumbing`}
                          render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
                                  <FormLabel>{commonT.bathroom.bathroomPlumbing.label}</FormLabel>
                                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                              </FormItem>
                          )}
                      />
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
    </div>
  );
};
