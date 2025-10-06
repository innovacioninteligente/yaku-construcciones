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
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';
import { useCurrentLocale } from 'next-i18n-router/client';
import i18nConfig from '../../../../i18nConfig';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

// A simple dictionary fetcher, this should be in a separate file
async function getDictionary(locale: string) {
  try {
    return await import(`@/locales/${locale}.json`);
  } catch (error) {
    console.error('Failed to load dictionary:', error);
    return import(`@/locales/es.json`);
  }
}

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const locale = useCurrentLocale(i18nConfig);
  const [dict, setDict] = useState<any>({});

  useEffect(() => {
    getDictionary(locale!).then(d => setDict(d));
  }, [locale]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: '¡Éxito!',
        description: 'Has iniciado sesión correctamente.',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error al iniciar sesión',
        description: error.message || 'Ha ocurrido un error. Por favor, inténtalo de nuevo.',
      });
    }
  }

  if (!dict || !dict['login.title']) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{dict['login.title']}</CardTitle>
        <CardDescription>{dict['login.description']}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict['login.emailLabel']}</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict['login.passwordLabel']}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Iniciando...' : dict['login.button']}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {dict['login.noAccount']}{' '}
          <Link href="/signup" className="underline">
            {dict['login.signupLink']}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
