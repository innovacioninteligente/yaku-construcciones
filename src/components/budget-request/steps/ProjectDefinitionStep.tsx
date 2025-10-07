import { UseFormReturn } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

interface ProjectDefinitionStepProps {
  form: UseFormReturn<DetailedFormValues>;
  t: any;
}

export const ProjectDefinitionStep = ({ form, t }: ProjectDefinitionStepProps) => {
  const commonT = t.budgetRequest.form.projectDefinition;
  const watchPropertyType = form.watch('propertyType');
  const watchProjectScope = form.watch('projectScope');
  const watchRenovateBathroom = form.watch('renovateBathroom');
  const watchRenovateKitchen = form.watch('renovateKitchen');

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="propertyType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{commonT.propertyType.label}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="residential" />
                  </FormControl>
                  <FormLabel className="font-normal">{commonT.propertyType.residential}</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="commercial" />
                  </FormControl>
                  <FormLabel className="font-normal">{commonT.propertyType.commercial}</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="office" />
                  </FormControl>
                  <FormLabel className="font-normal">{commonT.propertyType.office}</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="projectScope"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{commonT.projectScope.label}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="integral" />
                  </FormControl>
                  <FormLabel className="font-normal">{commonT.projectScope.integral}</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="partial" />
                  </FormControl>
                  <FormLabel className="font-normal">{commonT.projectScope.partial}</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {watchProjectScope === 'partial' && watchPropertyType === 'residential' && (
        <div className="space-y-4 pl-4 border-l-2 ml-4">
            <FormField
                control={form.control}
                name="renovateBathroom"
                render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <FormLabel>{t.budgetRequest.form.bathroom.renovateBathroom.label}</FormLabel>
                    <FormControl>
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    </FormControl>
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="renovateKitchen"
                render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <FormLabel>{t.budgetRequest.form.kitchen.renovateKitchen.label}</FormLabel>
                    <FormControl>
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    </FormControl>
                </FormItem>
                )}
            />
        </div>
      )}


      <FormField
        control={form.control}
        name="totalAreaM2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{commonT.totalAreaM2.label}</FormLabel>
            <FormControl><Input type="number" placeholder="90" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {watchPropertyType === 'residential' && (
        <>
          <FormField
            control={form.control}
            name="numberOfRooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonT.numberOfRooms.label}</FormLabel>
                <FormControl><Input type="number" placeholder="3" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfBathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{commonT.numberOfBathrooms.label}</FormLabel>
                <FormControl><Input type="number" placeholder="2" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};
