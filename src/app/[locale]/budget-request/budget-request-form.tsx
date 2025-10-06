'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { estimateProjectBudget, EstimateProjectBudgetOutput } from '@/ai/flows/estimate-project-budget';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { services } from '@/lib/services';
import { useAuth } from '@/hooks/use-auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';

export function BudgetRequestForm({ t }: { t: any }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [estimation, setEstimation] = useState<EstimateProjectBudgetOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const formSchema = z.object({
    name: z.string().min(2, { message: t.form.name.error }),
    email: z.string().email({ message: t.form.email.error }),
    phone: z.string().min(9, { message: t.form.phone.error }),
    address: z.string().min(5, { message: t.form.address.error }),
    serviceType: z.string({ required_error: t.form.serviceType.error }),
    projectDescription: z.string().min(20, { message: t.form.projectDescription.error }),
    priority: z.enum(['cost', 'quality', 'sustainability'], { required_error: t.form.priority.error }),
    budget: z.coerce.number().gt(0, { message: t.form.budget.error }),
    desiredMaterials: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
      phone: '',
      address: '',
      projectDescription: '',
      budget: 0,
      desiredMaterials: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setEstimation(null);
    try {
      const estimationResult = await estimateProjectBudget({
        projectDescription: values.projectDescription,
        priority: values.priority,
        budget: values.budget,
        desiredMaterials: values.desiredMaterials || '',
      });
      setEstimation(estimationResult);

      await addDoc(collection(db, 'budgets'), {
        ...values,
        ...estimationResult,
        userId: user?.uid || null,
        createdAt: new Date(),
      });

      toast({
        title: t.toast.success.title,
        description: t.toast.success.description,
      });

      form.reset();
      
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: t.toast.error.title,
        description: t.toast.error.description,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-8">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl md:text-4xl">{t.title}</CardTitle>
                    <CardDescription className="text-lg">{t.description}</CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    
                    <div className="space-y-2">
                        <h3 className="font-headline text-xl">{t.form.sections.contact}</h3>
                        <hr/>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                         <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>{t.form.name.label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t.form.name.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>{t.form.email.label}</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder={t.form.email.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>{t.form.phone.label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t.form.phone.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>{t.form.address.label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t.form.address.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                     <div className="space-y-2 pt-4">
                        <h3 className="font-headline text-xl">{t.form.sections.project}</h3>
                        <hr/>
                    </div>

                    <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t.form.serviceType.label}</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={t.form.serviceType.placeholder} />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {services.map((service) => (
                                    <SelectItem key={service.id} value={service.id}>{service.title}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                    <FormField
                        control={form.control}
                        name="projectDescription"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t.form.projectDescription.label}</FormLabel>
                            <FormControl>
                            <Textarea placeholder={t.form.projectDescription.placeholder} {...field} rows={5} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t.form.budget.label}</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="5000" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t.form.priority.label}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={t.form.priority.placeholder} />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="cost">{t.form.priority.options.cost}</SelectItem>
                                <SelectItem value="quality">{t.form.priority.options.quality}</SelectItem>
                                <SelectItem value="sustainability">{t.form.priority.options.sustainability}</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="desiredMaterials"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t.form.desiredMaterials.label}</FormLabel>
                            <FormControl>
                            <Input placeholder={t.form.desiredMaterials.placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading} size="lg">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? t.form.button.loading : t.form.button.default}
                        </Button>
                    </div>
                    </form>
                </Form>
                </CardContent>
            </Card>

            {estimation && (
                <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{t.estimation.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                    <h3 className="font-semibold">{t.estimation.estimatedCost}</h3>
                    <p className="text-2xl font-bold text-primary">
                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(estimation.estimatedCost)}
                    </p>
                    </div>
                    <div>
                    <h3 className="font-semibold">{t.estimation.suggestedMaterials}</h3>
                    <p className="text-muted-foreground">{estimation.suggestedMaterials}</p>
                    </div>
                    <div>
                    <h3 className="font-semibold">{t.estimation.adjustments}</h3>
                    <p className="text-muted-foreground">{estimation.adjustments}</p>
                    </div>
                </CardContent>
                </Card>
            )}
        </div>
    </div>
  );
}
