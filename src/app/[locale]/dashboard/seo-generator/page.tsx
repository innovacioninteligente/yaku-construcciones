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
import { generateSeoBlogArticle, GenerateSeoBlogArticleOutput } from '@/ai/flows/generate-seo-blog-article';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const formSchema = z.object({
  keywords: z.string().min(3, { message: 'Introduce al menos una palabra clave.' }),
  competitorWebsites: z.string().refine((val) => val.split(',').every(v => z.string().url().safeParse(v.trim()).success || v.trim() === ''), {
    message: 'Introduce URLs válidas separadas por comas.',
  }),
  language: z.enum(['castellano', 'catalán', 'ingles', 'alemán'], { required_error: 'Debes seleccionar un idioma.' }),
});

export default function SeoGeneratorPage() {
  const { toast } = useToast();
  const [article, setArticle] = useState<GenerateSeoBlogArticleOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: '',
      competitorWebsites: '',
      language: 'castellano',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setArticle(null);
    try {
      const result = await generateSeoBlogArticle(values);
      setArticle(result);
      toast({
        title: 'Artículo generado',
        description: 'Tu artículo de blog optimizado para SEO está listo.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error al generar el artículo',
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
          <CardTitle className="font-headline text-2xl">Generador de Blog SEO</CardTitle>
          <CardDescription>Crea artículos optimizados para motores de búsqueda para atraer más clientes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Palabras Clave</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: mantenimiento de piscinas, reforma de baño" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="competitorWebsites"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sitios Web de la Competencia (separados por comas)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://ejemplo1.com, https://ejemplo2.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idioma del Artículo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un idioma" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="castellano">Castellano</SelectItem>
                        <SelectItem value="catalán">Catalán</SelectItem>
                        <SelectItem value="ingles">Inglés</SelectItem>
                        <SelectItem value="alemán">Alemán</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Generando...' : 'Generar Artículo'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {article && (
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{article.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
