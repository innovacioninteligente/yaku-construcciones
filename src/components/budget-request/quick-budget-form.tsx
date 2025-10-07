
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { ArrowLeft, Check, Loader2, MailCheck } from 'lucide-react';
import { reformInclusions } from './reform-inclusions';

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es obligatorio.' }),
  email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido.' }),
  phone: z.string().min(9, { message: 'Por favor, introduce un número de teléfono válido.' }),
  address: z.string().min(5, { message: 'La dirección del proyecto es necesaria.' }),
  renovationType: z.enum(['integral', 'bathrooms', 'kitchen']),
  squareMeters: z.coerce.number().min(1, 'La superficie debe ser de al menos 1 m²'),
  quality: z.enum(['basic', 'medium', 'premium']),
});

type QuickFormValues = z.infer<typeof formSchema>;

export function QuickBudgetForm({ t, onBack }: { t: any; onBack: () => void }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<QuickFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      renovationType: 'kitchen',
      squareMeters: 1,
      quality: 'basic',
    },
  });

  const watchRenovationType = form.watch('renovationType');
  const inclusionItems = reformInclusions[watchRenovationType] || [];

  async function handleFormSubmit(values: QuickFormValues) {
    setIsLoading(true);
    try {
      console.log('Quick form values:', values);
      // Here you would call your AI/backend service
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: t.budgetRequest.form.toast.success.title,
        description: t.budgetRequest.form.toast.success.description,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: t.budgetRequest.form.toast.error.title,
        description: t.budgetRequest.form.toast.error.description,
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  if (isSubmitted) {
    return (
        <div className="text-center max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <div className='mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4'>
                        <MailCheck className='w-12 h-12 text-primary' />
                    </div>
                    <CardTitle className="font-headline text-3xl">{t.budgetRequest.confirmation.title}</CardTitle>
                    <CardDescription className="text-lg">{t.budgetRequest.confirmation.description}</CardDescription>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground mt-4">{t.budgetRequest.confirmation.noCostMessage}</p>
                    <Button asChild className="mt-6">
                        <a href='/'>{t.budgetRequest.confirmation.button}</a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className='w-full max-w-5xl mx-auto text-left'>
      <Card>
        <CardHeader>
          <CardTitle className='font-headline text-2xl text-center'>Formulario de Presupuesto Rápido</CardTitle>
          <CardDescription className='text-center'>Rellena los siguientes campos para obtener una estimación aproximada.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Nombre Completo</FormLabel><FormControl><Input placeholder="Tu nombre y apellidos" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Correo Electrónico</FormLabel><FormControl><Input type="email" placeholder="tu@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Teléfono de Contacto</FormLabel><FormControl><Input placeholder="600 123 456" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem><FormLabel>Dirección de la Obra</FormLabel><FormControl><Input placeholder="Calle, número, ciudad" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                 <FormField control={form.control} name="renovationType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Reforma</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="integral">Reforma Integral</SelectItem>
                        <SelectItem value="bathrooms">Reforma de Baño</SelectItem>
                        <SelectItem value="kitchen">Reforma de Cocina</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="squareMeters" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Metros cuadrados aproximados (m²)</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="quality" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nivel de Calidad Deseado</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="basic">Básica</SelectItem>
                                <SelectItem value="medium">Media</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
              </div>

               {inclusionItems.length > 0 && (
                <div className='p-6 bg-secondary/50 rounded-lg'>
                    <h3 className='font-semibold mb-4 text-center'>Lo que suele incluir una reforma de {t.pricingSettings[watchRenovationType].title}:</h3>
                    <ul className='grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground'>
                        {inclusionItems.map((item, index) => (
                            <li key={index} className='flex items-start'>
                                <Check className='w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0' />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
               )}

              <div className="flex justify-between items-center mt-8">
                <Button type="button" variant="outline" onClick={onBack}>
                  <ArrowLeft className="mr-2" /> Atrás
                </Button>
                <Button type="submit" disabled={isLoading} size="lg">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

