import { UseFormReturn } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface ProjectDefinitionStepProps {
  form: UseFormReturn<DetailedFormValues>;
  t: any;
}

const partialScopeOptions = [
    { id: 'bathroom', label: 'Reforma de Baño(s)' },
    { id: 'kitchen', label: 'Reforma de Cocina' },
    { id: 'demolition', label: 'Demoliciones' },
    { id: 'ceilings', label: 'Falsos Techos' },
    { id: 'electricity', label: 'Electricidad' },
    { id: 'carpentry', label: 'Carpintería y Pintura' },
    { id: 'optionals', label: 'Opcionales' },
];

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
                        <FormControl>
                             <RadioGroupItem value={item.value} id={item.value} className="sr-only" />
                        </FormControl>
                        <FormLabel
                        htmlFor={item.value}
                        className={cn(
                            "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors",
                            field.value === item.value && "border-primary bg-primary/10"
                        )}
                        >
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
                        <FormControl>
                            <RadioGroupItem value={item.value} id={item.value} className="sr-only" />
                        </FormControl>
                        <FormLabel
                            htmlFor={item.value}
                            className={cn(
                                "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors",
                                field.value === item.value && "border-primary bg-primary/10"
                            )}
                        >
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

      {watchProjectScope === 'partial' && (
        <Card className='p-6'>
            <FormField
                control={form.control}
                name="partialScope"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">{commonT.partialScope.label}</FormLabel>
                            <FormDescription>{commonT.partialScope.description}</FormDescription>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {partialScopeOptions.map((item) => (
                            <FormField
                            key={item.id}
                            control={form.control}
                            name="partialScope"
                            render={({ field }) => {
                                return (
                                <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            className='sr-only'
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                ? field.onChange([...(field.value || []), item.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                        (value) => value !== item.id
                                                    )
                                                    )
                                            }}
                                        />
                                    </FormControl>
                                    <FormLabel className={cn(
                                        "flex-1 w-full flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors",
                                        field.value?.includes(item.id) && "border-primary bg-primary/10"
                                    )}>
                                        {item.label}
                                    </FormLabel>
                                </FormItem>
                                )
                            }}
                            />
                        ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Card>
      )}


      <FormField
        control={form.control}
        name="totalAreaM2"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base'>{commonT.totalAreaM2.label}</FormLabel>
            <FormControl><Input type="number" placeholder="90" {...field} value={field.value || ''} /></FormControl>
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
                <FormControl><Input type="number" placeholder="3" {...field} value={field.value || ''} /></FormControl>
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
                <FormControl><Input type="number" placeholder="2" {...field} value={field.value || ''} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};
