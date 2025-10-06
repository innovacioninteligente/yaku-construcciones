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

const formSchema = z.object({
  projectDescription: z.string().min(20, { message: 'Por favor, describe tu proyecto con más detalle (mín. 20 caracteres).' }),
  priority: z.enum(['cost', 'quality', 'sustainability'], { required_error: 'Debes seleccionar una prioridad.' }),
  budget: z.coerce.number().gt(0, { message: 'El presupuesto debe ser mayor que 0.' }),
  desiredMaterials: z.string().optional(),
});

export default function BudgetRequestPage() {
  const { toast } = useToast();
  const [estimation, setEstimation] = useState<EstimateProjectBudgetOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectDescription: '',
      budget: 0,
      desiredMaterials: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setEstimation(null);
    try {
      const result = await estimateProjectBudget(values);
      setEstimation(result);
      toast({
        title: 'Estimación generada',
        description: 'Hemos calculado un presupuesto para tu proyecto.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error al generar la estimación',
        description: 'No se pudo procesar tu solicitud. Inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Solicitar Presupuesto</CardTitle>
          <CardDescription>Rellena los detalles de tu proyecto para recibir una estimación de costes generada por IA.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción del Proyecto</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ej: Renovar la cocina, instalar una piscina de 8x4m, cambiar el tejado..." {...field} />
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
                      <FormLabel>Presupuesto Deseado (€)</FormLabel>
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
                      <FormLabel>Prioridad Principal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una prioridad" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cost">Coste (más económico)</SelectItem>
                          <SelectItem value="quality">Calidad (mejores materiales)</SelectItem>
                          <SelectItem value="sustainability">Sostenibilidad (ecológico)</SelectItem>
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
                    <FormLabel>Materiales Deseados (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Madera de roble, mármol, azulejos porcelánicos..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Calculando...' : 'Generar Estimación'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {estimation && (
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Resultados de la Estimación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Coste Estimado</h3>
              <p className="text-2xl font-bold text-primary">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(estimation.estimatedCost)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Materiales Sugeridos</h3>
              <p className="text-muted-foreground">{estimation.suggestedMaterials}</p>
            </div>
            <div>
              <h3 className="font-semibold">Ajustes Recomendados</h3>
              <p className="text-muted-foreground">{estimation.adjustments}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
