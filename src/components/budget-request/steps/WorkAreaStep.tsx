import { UseFormReturn } from 'react-hook-form';
import { DetailedFormValues } from '../schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface WorkAreaStepProps {
  form: UseFormReturn<DetailedFormValues>;
  t: any;
}

export const WorkAreaStep = ({ form, t }: WorkAreaStepProps) => {
  const commonT = t.budgetRequest.form.workArea;

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="workstations"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{commonT.workstations.label}</FormLabel>
            <FormControl><Input type="number" placeholder="10" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="meetingRooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{commonT.meetingRooms.label}</FormLabel>
            <FormControl><Input type="number" placeholder="2" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
