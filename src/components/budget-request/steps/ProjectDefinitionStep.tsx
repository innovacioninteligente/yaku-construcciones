import { UseFormReturn } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface ProjectDefinitionStepProps {
  form: UseFormReturn<DetailedFormValues>;
  t: any;
}

export const ProjectDefinitionStep = ({ form, t }: ProjectDefinitionStepProps) => {
  const commonT = t.budgetRequest.form.projectDefinition;
  const watchPropertyType = form.watch('propertyType');
  const watchProjectScope = form.watch('projectScope');

  return (
    <div className="space-y-8">
      <FormField
        control={form.control}
        name="propertyType"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className='text-base'>{commonT.propertyType.label}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {[
                  { value: 'residential', label: commonT.propertyType.residential },
                  { value: 'commercial', label: commonT.propertyType.commercial },
                  { value: 'office', label: commonT.propertyType.office },
                ].map((item) => (
                  <FormItem key={item.value}>
                    <FormLabel
                      htmlFor={item.value}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors",
                        field.value === item.value && "border-primary bg-primary/10"
                      )}
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} id={item.value} className="sr-only" />
                      </FormControl>
                      {item.label}
                    </FormLabel>
                  </FormItem>
                ))}
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
          <FormItem className="space-y-4">
            <FormLabel className='text-base'>{commonT.projectScope.label}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {[
                  { value: 'integral', label: commonT.projectScope.integral },
                  { value: 'partial', label: commonT.projectScope.partial },
                ].map((item) => (
                  <FormItem key={item.value}>
                    <FormLabel
                      htmlFor={item.value}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors",
                        field.value === item.value && "border-primary bg-primary/10"
                      )}
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} id={item.value} className="sr-only" />
                      </FormControl>
                      {item.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {watchProjectScope === 'partial' && watchPropertyType === 'residential' && (
        <Card className='p-6'>
            <div className="space-y-4">
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
        </Card>
      )}


      <FormField
        control={form.control}
        name="totalAreaM2"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base'>{commonT.totalAreaM2.label}</FormLabel>
            <FormControl><Input type="number" placeholder="90" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {watchPropertyType === 'residential' && (
        <div className='grid md:grid-cols-2 gap-6'>
          <FormField
            control={form.control}
            name="numberOfRooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base'>{commonT.numberOfRooms.label}</FormLabel>
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
                <FormLabel className='text-base'>{commonT.numberOfBathrooms.label}</FormLabel>
                <FormControl><Input type="number" placeholder="2" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};
