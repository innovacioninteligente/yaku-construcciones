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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Loader2, MailCheck, FileText, CheckSquare } from 'lucide-react';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';

const detailedFormSchema = z.object({
  // Contact Info
  name: z.string().min(2, { message: 'El nombre es obligatorio.' }),
  email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido.' }),
  phone: z.string().min(9, { message: 'Por favor, introduce un número de teléfono válido.' }),
  address: z.string().min(5, { message: 'La dirección del proyecto es necesaria.' }),
  
  // Demolitions
  demolishPartitions: z.boolean().default(false),
  demolishPartitionsM2: z.coerce.number().optional(),
  removeDoors: z.boolean().default(false),
  removeDoorsAmount: z.coerce.number().optional(),
  
  // Bathroom
  renovateBathroom: z.boolean().default(false),
  bathroomQuality: z.enum(['basic', 'medium', 'premium']).optional(),
  bathroomWallTilesM2: z.coerce.number().optional(),
  bathroomFloorM2: z.coerce.number().optional(),
  installShowerTray: z.boolean().default(false),
  installShowerScreen: z.boolean().default(false),
  bathroomPlumbing: z.boolean().default(false),
  
  // Kitchen
  renovateKitchen: z.boolean().default(false),
  kitchenQuality: z.enum(['basic', 'medium', 'premium']).optional(),
  kitchenDemolition: z.boolean().default(false),
  kitchenWallTilesM2: z.coerce.number().optional(),
  kitchenFloorM2: z.coerce.number().optional(),
  kitchenPlumbing: z.boolean().default(false),

  // Ceilings
  installFalseCeiling: z.boolean().default(false),
  falseCeilingM2: z.coerce.number().optional(),
  soundproofRoom: z.boolean().default(false),
  soundproofRoomM2: z.coerce.number().optional(),

  // Electricity
  renovateElectricalPanel: z.boolean().default(false),
  electricalKitchenSockets: z.coerce.number().optional(),
  electricalKitchenLights: z.coerce.number().optional(),
  electricalLivingRoomSockets: z.coerce.number().optional(),
  electricalLivingRoomLights: z.coerce.number().optional(),
  electricalLivingRoomTV: z.boolean().default(false),
  electricalBedroom1Sockets: z.coerce.number().optional(),
  electricalBedroom1Lights: z.coerce.number().optional(),
  electricalBedroom2Sockets: z.coerce.number().optional(),
  electricalBedroom2Lights: z.coerce.number().optional(),
  electricalBedroom3Sockets: z.coerce.number().optional(),
  electricalBedroom3Lights: z.coerce.number().optional(),

  // Doors and Paint
  renovateInteriorDoors: z.boolean().default(false),
  interiorDoorsAmount: z.coerce.number().optional(),
  installSlidingDoor: z.boolean().default(false),
  slidingDoorAmount: z.coerce.number().optional(),
  paintWalls: z.boolean().default(false),
  paintWallsM2: z.coerce.number().optional(),
  removeGotele: z.boolean().default(false),
  removeGoteleM2: z.coerce.number().optional(),

  // Optionals
  installAirConditioning: z.boolean().default(false),
  renovateExteriorCarpentry: z.boolean().default(false),
});

const simpleFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es obligatorio.' }),
  email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido.' }),
  phone: z.string().min(9, { message: 'Por favor, introduce un número de teléfono válido.' }),
  address: z.string().min(5, { message: 'La dirección del proyecto es necesaria.' }),
  projectType: z.enum(['integral', 'bathrooms', 'kitchen', 'pools']),
  squareMeters: z.coerce.number().min(1, { message: 'Debe ser al menos 1 m².' }),
  quality: z.enum(['basic', 'medium', 'premium']),
});

type DetailedFormValues = z.infer<typeof detailedFormSchema>;
type SimpleFormValues = z.infer<typeof simpleFormSchema>;

const STEPS = [
  { id: 'contact', title: 'Información de Contacto', fields: ['name', 'email', 'phone', 'address'] },
  { id: 'demolition', title: 'Demoliciones y Trabajos Previos' },
  { id: 'bathroom', title: 'Reforma de Baño' },
  { id: 'kitchen', title: 'Reforma de Cocina' },
  { id: 'ceilings', title: 'Falsos Techos y Aislamiento' },
  { id: 'electricity', title: 'Instalación Eléctrica' },
  { id: 'carpentry', title: 'Carpintería y Pintura' },
  { id: 'optionals', title: 'Opcionales' },
  { id: 'summary', title: 'Resumen y Envío' },
];

export function BudgetRequestWizard({ t, services }: { t: any; services: any[] }) {
  const { toast } = useToast();
  const [formType, setFormType] = useState<'simple' | 'detailed' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const budgetRequestDict = t.budgetRequest;
  
  const detailedForm = useForm<DetailedFormValues>({
    resolver: zodResolver(detailedFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      demolishPartitions: false,
      demolishPartitionsM2: 0,
      removeDoors: false,
      removeDoorsAmount: 0,
      renovateBathroom: false,
      bathroomQuality: 'basic',
      bathroomWallTilesM2: 0,
      bathroomFloorM2: 0,
      installShowerTray: false,
      installShowerScreen: false,
      bathroomPlumbing: false,
      renovateKitchen: false,
      kitchenQuality: 'basic',
      kitchenDemolition: false,
      kitchenWallTilesM2: 0,
      kitchenFloorM2: 0,
      kitchenPlumbing: false,
      installFalseCeiling: false,
      falseCeilingM2: 0,
      soundproofRoom: false,
      soundproofRoomM2: 0,
      renovateElectricalPanel: false,
      electricalKitchenSockets: 0,
      electricalKitchenLights: 0,
      electricalLivingRoomSockets: 0,
      electricalLivingRoomLights: 0,
      electricalLivingRoomTV: false,
      electricalBedroom1Sockets: 0,
      electricalBedroom1Lights: 0,
      electricalBedroom2Sockets: 0,
      electricalBedroom2Lights: 0,
      electricalBedroom3Sockets: 0,
      electricalBedroom3Lights: 0,
      renovateInteriorDoors: false,
      interiorDoorsAmount: 0,
      installSlidingDoor: false,
      slidingDoorAmount: 0,
      paintWalls: false,
      paintWallsM2: 0,
      removeGotele: false,
      removeGoteleM2: 0,
      installAirConditioning: false,
      renovateExteriorCarpentry: false,
    },
  });

  const simpleForm = useForm<SimpleFormValues>({
    resolver: zodResolver(simpleFormSchema),
    defaultValues: {
        name: '',
        email: '',
        phone: '',
        address: '',
        squareMeters: 1,
        projectType: 'integral',
        quality: 'basic',
    }
  });

  const { watch } = detailedForm;
  const watchAllFields = watch();

  const nextStep = async () => {
    const fields = STEPS[currentStep].fields;
    const isValid = await detailedForm.trigger(fields as (keyof DetailedFormValues)[]);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  async function handleFormSubmit(values: DetailedFormValues | SimpleFormValues) {
    setIsLoading(true);
    try {
      console.log('Form values:', values);
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: budgetRequestDict.form.toast.success.title,
        description: budgetRequestDict.form.toast.success.description,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: budgetRequestDict.form.toast.error.title,
        description: budgetRequestDict.form.toast.error.description,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const renderSimpleForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className='font-headline text-2xl'>{budgetRequestDict.simple.title}</CardTitle>
        <CardDescription>{budgetRequestDict.simple.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...simpleForm}>
          <form onSubmit={simpleForm.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <FormField control={simpleForm.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>{budgetRequestDict.form.name.label}</FormLabel><FormControl><Input placeholder={budgetRequestDict.form.name.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={simpleForm.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>{budgetRequestDict.form.email.label}</FormLabel><FormControl><Input type="email" placeholder={budgetRequestDict.form.email.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={simpleForm.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>{budgetRequestDict.form.phone.label}</FormLabel><FormControl><Input placeholder={budgetRequestDict.form.phone.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={simpleForm.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>{budgetRequestDict.form.address.label}</FormLabel><FormControl><Input placeholder={budgetRequestDict.form.address.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
             <FormField control={simpleForm.control} name="projectType" render={({ field }) => (
                <FormItem><FormLabel>{budgetRequestDict.simple.projectType.label}</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder={budgetRequestDict.simple.projectType.placeholder} /></SelectTrigger></FormControl><SelectContent><SelectItem value="integral">{budgetRequestDict.simple.projectType.options.integral}</SelectItem><SelectItem value="bathrooms">{budgetRequestDict.simple.projectType.options.bathrooms}</SelectItem><SelectItem value="kitchen">{budgetRequestDict.simple.projectType.options.kitchen}</SelectItem><SelectItem value="pools">{budgetRequestDict.simple.projectType.options.pools}</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
            <div className="grid md:grid-cols-2 gap-6">
                <FormField control={simpleForm.control} name="squareMeters" render={({ field }) => (
                    <FormItem><FormLabel>{budgetRequestDict.simple.squareMeters.label}</FormLabel><FormControl><Input type="number" placeholder="80" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={simpleForm.control} name="quality" render={({ field }) => (
                    <FormItem><FormLabel>{budgetRequestDict.form.quality.label}</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder={budgetRequestDict.form.quality.placeholder} /></SelectTrigger></FormControl><SelectContent><SelectItem value="basic">{budgetRequestDict.form.quality.options.basic}</SelectItem><SelectItem value="medium">{budgetRequestDict.form.quality.options.medium}</SelectItem><SelectItem value="premium">{budgetRequestDict.form.quality.options.premium}</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                )} />
            </div>
            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? budgetRequestDict.form.buttons.loading : budgetRequestDict.form.buttons.submit}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );

  const renderDetailedStep = () => {
    switch (STEPS[currentStep].id) {
        case 'contact':
            return (
                <div className="space-y-6">
                     <FormField control={detailedForm.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>{budgetRequestDict.form.name.label}</FormLabel><FormControl><Input placeholder={budgetRequestDict.form.name.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={detailedForm.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>{budgetRequestDict.form.email.label}</FormLabel><FormControl><Input type="email" placeholder={budgetRequestDict.form.email.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={detailedForm.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>{budgetRequestDict.form.phone.label}</FormLabel><FormControl><Input placeholder={budgetRequestDict.form.phone.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={detailedForm.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>{budgetRequestDict.form.address.label}</FormLabel><FormControl><Input placeholder={budgetRequestDict.form.address.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
            )
        case 'demolition':
            return (
                 <div className="space-y-6">
                    <FormField control={detailedForm.control} name="demolishPartitions" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5"><FormLabel className="text-base">{budgetRequestDict.form.demolition.demolishPartitions.label}</FormLabel></div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                    {watchAllFields.demolishPartitions && <FormField control={detailedForm.control} name="demolishPartitionsM2" render={({ field }) => (
                        <FormItem><FormLabel>{budgetRequestDict.form.demolition.demolishPartitionsM2.label}</FormLabel><FormControl><Input type="number" placeholder="25" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                     <FormField control={detailedForm.control} name="removeDoors" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5"><FormLabel className="text-base">{budgetRequestDict.form.demolition.removeDoors.label}</FormLabel></div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                    {watchAllFields.removeDoors && <FormField control={detailedForm.control} name="removeDoorsAmount" render={({ field }) => (
                        <FormItem><FormLabel>{budgetRequestDict.form.demolition.removeDoorsAmount.label}</FormLabel><FormControl><Input type="number" placeholder="5" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                </div>
            )
        case 'bathroom':
            return (
                <div className="space-y-6">
                    <FormField control={detailedForm.control} name="renovateBathroom" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-secondary/30">
                            <div className="space-y-0.5"><FormLabel className="text-base">{budgetRequestDict.form.bathroom.renovateBathroom.label}</FormLabel></div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                    {watchAllFields.renovateBathroom && (
                        <div className="space-y-6 pl-4 border-l-2 ml-4">
                             <FormField control={detailedForm.control} name="bathroomQuality" render={({ field }) => (
                                <FormItem><FormLabel>{budgetRequestDict.form.quality.label}</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder={budgetRequestDict.form.quality.placeholder} /></SelectTrigger></FormControl><SelectContent><SelectItem value="basic">{budgetRequestDict.form.quality.options.basic}</SelectItem><SelectItem value="medium">{budgetRequestDict.form.quality.options.medium}</SelectItem><SelectItem value="premium">{budgetRequestDict.form.quality.options.premium}</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                            )} />
                            <FormField control={detailedForm.control} name="bathroomWallTilesM2" render={({ field }) => (
                                <FormItem><FormLabel>{budgetRequestDict.form.bathroom.bathroomWallTilesM2.label}</FormLabel><FormControl><Input type="number" placeholder="30" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={detailedForm.control} name="bathroomFloorM2" render={({ field }) => (
                                <FormItem><FormLabel>{budgetRequestDict.form.bathroom.bathroomFloorM2.label}</FormLabel><FormControl><Input type="number" placeholder="8" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={detailedForm.control} name="installShowerTray" render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                    <div className="space-y-0.5"><FormLabel>{budgetRequestDict.form.bathroom.installShowerTray.label}</FormLabel></div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )} />
                             <FormField control={detailedForm.control} name="installShowerScreen" render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                    <div className="space-y-0.5"><FormLabel>{budgetRequestDict.form.bathroom.installShowerScreen.label}</FormLabel></div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )} />
                            <FormField control={detailedForm.control} name="bathroomPlumbing" render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                    <div className="space-y-0.5"><FormLabel>{budgetRequestDict.form.bathroom.bathroomPlumbing.label}</FormLabel></div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )} />
                        </div>
                    )}
                </div>
            )
        case 'kitchen':
             return (
                <div className="space-y-6">
                     <FormField control={detailedForm.control} name="renovateKitchen" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-secondary/30">
                            <div className="space-y-0.5"><FormLabel className="text-base">{budgetRequestDict.form.kitchen.renovateKitchen.label}</FormLabel></div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                     {watchAllFields.renovateKitchen && (
                        <div className="space-y-6 pl-4 border-l-2 ml-4">
                             <FormField control={detailedForm.control} name="kitchenQuality" render={({ field }) => (
                                <FormItem><FormLabel>{budgetRequestDict.form.quality.label}</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder={budgetRequestDict.form.quality.placeholder} /></SelectTrigger></FormControl><SelectContent><SelectItem value="basic">{budgetRequestDict.form.quality.options.basic}</SelectItem><SelectItem value="medium">{budgetRequestDict.form.quality.options.medium}</SelectItem><SelectItem value="premium">{budgetRequestDict.form.quality.options.premium}</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                            )} />
                             <FormField control={detailedForm.control} name="kitchenDemolition" render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                    <div className="space-y-0.5"><FormLabel>{budgetRequestDict.form.kitchen.kitchenDemolition.label}</FormLabel></div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )} />
                             <FormField control={detailedForm.control} name="kitchenWallTilesM2" render={({ field }) => (
                                <FormItem><FormLabel>{budgetRequestDict.form.kitchen.kitchenWallTilesM2.label}</FormLabel><FormControl><Input type="number" placeholder="25" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={detailedForm.control} name="kitchenFloorM2" render={({ field }) => (
                                <FormItem><FormLabel>{budgetRequestDict.form.kitchen.kitchenFloorM2.label}</FormLabel><FormControl><Input type="number" placeholder="12" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={detailedForm.control} name="kitchenPlumbing" render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                    <div className="space-y-0.5"><FormLabel>{budgetRequestDict.form.kitchen.kitchenPlumbing.label}</FormLabel></div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )} />
                        </div>
                    )}
                </div>
            )
        case 'ceilings':
             return (
                <div className="space-y-6">
                    <FormField control={detailedForm.control} name="installFalseCeiling" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5"><FormLabel className="text-base">{budgetRequestDict.form.ceilings.installFalseCeiling.label}</FormLabel></div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                    {watchAllFields.installFalseCeiling && <FormField control={detailedForm.control} name="falseCeilingM2" render={({ field }) => (
                        <FormItem><FormLabel>{budgetRequestDict.form.ceilings.falseCeilingM2.label}</FormLabel><FormControl><Input type="number" placeholder="20" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                    <FormField control={detailedForm.control} name="soundproofRoom" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5"><FormLabel className="text-base">{budgetRequestDict.form.ceilings.soundproofRoom.label}</FormLabel></div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                    {watchAllFields.soundproofRoom && <FormField control={detailedForm.control} name="soundproofRoomM2" render={({ field }) => (
                        <FormItem><FormLabel>{budgetRequestDict.form.ceilings.soundproofRoomM2.label}</FormLabel><FormControl><Input type="number" placeholder="15" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                </div>
            )
        case 'electricity':
            return (
                <div className="space-y-6">
                    <FormField control={detailedForm.control} name="renovateElectricalPanel" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5"><FormLabel className="text-base">{budgetRequestDict.form.electricity.renovateElectricalPanel.label}</FormLabel></div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />

                    <Card><CardHeader><CardTitle className='text-lg'>{budgetRequestDict.form.electricity.perRoom.kitchen}</CardTitle></CardHeader><CardContent className='space-y-4'>
                        <FormField control={detailedForm.control} name="electricalKitchenSockets" render={({ field }) => (
                            <FormItem><FormLabel>{budgetRequestDict.form.electricity.perRoom.sockets}</FormLabel><FormControl><Input type="number" placeholder="8" {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={detailedForm.control} name="electricalKitchenLights" render={({ field }) => (
                            <FormItem><FormLabel>{budgetRequestDict.form.electricity.perRoom.lights}</FormLabel><FormControl><Input type="number" placeholder="3" {...field} /></FormControl></FormItem>
                        )} />
                    </CardContent></Card>
                    <Card><CardHeader><CardTitle className='text-lg'>{budgetRequestDict.form.electricity.perRoom.livingRoom}</CardTitle></CardHeader><CardContent className='space-y-4'>
                        <FormField control={detailedForm.control} name="electricalLivingRoomSockets" render={({ field }) => (
                            <FormItem><FormLabel>{budgetRequestDict.form.electricity.perRoom.sockets}</FormLabel><FormControl><Input type="number" placeholder="6" {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={detailedForm.control} name="electricalLivingRoomLights" render={({ field }) => (
                            <FormItem><FormLabel>{budgetRequestDict.form.electricity.perRoom.lights}</FormLabel><FormControl><Input type="number" placeholder="4" {...field} /></FormControl></FormItem>
                        )} />
                         <FormField control={detailedForm.control} name="electricalLivingRoomTV" render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5"><FormLabel>{budgetRequestDict.form.electricity.perRoom.tv}</FormLabel></div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )} />
                    </CardContent></Card>
                     <Card><CardHeader><CardTitle className='text-lg'>{budgetRequestDict.form.electricity.perRoom.bedroom} 1</CardTitle></CardHeader><CardContent className='space-y-4'>
                        <FormField control={detailedForm.control} name="electricalBedroom1Sockets" render={({ field }) => (
                            <FormItem><FormLabel>{budgetRequestDict.form.electricity.perRoom.sockets}</FormLabel><FormControl><Input type="number" placeholder="4" {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={detailedForm.control} name="electricalBedroom1Lights" render={({ field }) => (
                            <FormItem><FormLabel>{budgetRequestDict.form.electricity.perRoom.lights}</FormLabel><FormControl><Input type="number" placeholder="2" {...field} /></FormControl></FormItem>
                        )} />
                    </CardContent></Card>
                </div>
            )
        case 'carpentry':
             return (
                <div className="space-y-6">
                    <FormField control={detailedForm.control} name="renovateInteriorDoors" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5"><FormLabel className="text-base">{budgetRequestDict.form.carpentry.renovateInteriorDoors.label}</FormLabel></div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                    {watchAllFields.renovateInteriorDoors && <FormField control={detailedForm.control} name="interiorDoorsAmount" render={({ field }) => (
                        <FormItem><FormLabel>{budgetRequestDict.form.carpentry.interiorDoorsAmount.label}</FormLabel><FormControl><Input type="number" placeholder="6" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                    
                    <FormField control={detailedForm.control} name="installSlidingDoor" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5"><FormLabel className="text-base">{budgetRequestDict.form.carpentry.installSlidingDoor.label}</FormLabel></div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                    {watchAllFields.installSlidingDoor && <FormField control={detailedForm.control} name="slidingDoorAmount" render={({ field }) => (
                        <FormItem><FormLabel>{budgetRequestDict.form.carpentry.slidingDoorAmount.label}</FormLabel><FormControl><Input type="number" placeholder="1" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                    
                     <hr />

                    <FormField control={detailedForm.control} name="paintWalls" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5"><FormLabel className="text-base">{budgetRequestDict.form.carpentry.paintWalls.label}</FormLabel></div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                    {watchAllFields.paintWalls && <FormField control={detailedForm.control} name="paintWallsM2" render={({ field }) => (
                        <FormItem><FormLabel>{budgetRequestDict.form.carpentry.paintWallsM2.label}</FormLabel><FormControl><Input type="number" placeholder="300" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}

                    <FormField control={detailedForm.control} name="removeGotele" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5"><FormLabel className="text-base">{budgetRequestDict.form.carpentry.removeGotele.label}</FormLabel></div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                    {watchAllFields.removeGotele && <FormField control={detailedForm.control} name="removeGoteleM2" render={({ field }) => (
                        <FormItem><FormLabel>{budgetRequestDict.form.carpentry.removeGoteleM2.label}</FormLabel><FormControl><Input type="number" placeholder="300" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                </div>
            )
        case 'optionals':
            return (
                <div className="space-y-6">
                     <FormField control={detailedForm.control} name="installAirConditioning" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">{budgetRequestDict.form.optionals.installAirConditioning.label}</FormLabel>
                                <FormDescription>{budgetRequestDict.form.optionals.installAirConditioning.description}</FormDescription>
                            </div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                     <FormField control={detailedForm.control} name="renovateExteriorCarpentry" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">{budgetRequestDict.form.optionals.renovateExteriorCarpentry.label}</FormLabel>
                                <FormDescription>{budgetRequestDict.form.optionals.renovateExteriorCarpentry.description}</FormDescription>
                            </div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                </div>
            )
        case 'summary':
             return (
                <div className="space-y-4">
                    <p>{budgetRequestDict.summary.description}</p>
                </div>
            )
        default:
            return null
    }
  }

  const renderDetailedForm = () => (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl md:text-4xl">{budgetRequestDict.title}</CardTitle>
        <CardDescription className="text-lg">{budgetRequestDict.description}</CardDescription>
        <Progress value={((currentStep + 1) / STEPS.length) * 100} className="w-full mt-4" />
      </CardHeader>
      <CardContent>
        <Form {...detailedForm}>
          <form onSubmit={detailedForm.handleSubmit(handleFormSubmit)} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className='font-headline text-2xl'>{STEPS[currentStep].title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {renderDetailedStep()}
                </CardContent>
            </Card>
            
            <div className="flex justify-between items-center">
              <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2" /> {budgetRequestDict.form.buttons.prev}
              </Button>
              
              {currentStep < STEPS.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  {budgetRequestDict.form.buttons.next} <ArrowRight className="ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading} size="lg">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? budgetRequestDict.form.buttons.loading : budgetRequestDict.form.buttons.submit}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );

  const renderFormSelection = () => (
    <div className='text-center'>
        <CardHeader>
            <CardTitle className="font-headline text-3xl md:text-4xl">{budgetRequestDict.selection.title}</CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto">{budgetRequestDict.selection.description}</CardDescription>
        </CardHeader>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
            <Card className="flex flex-col items-center justify-center p-8 text-center hover:border-primary cursor-pointer transition" onClick={() => setFormType('simple')}>
                <FileText className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-headline text-2xl mb-2">{budgetRequestDict.selection.simple.title}</h3>
                <p className="text-muted-foreground">{budgetRequestDict.selection.simple.description}</p>
            </Card>
            <Card className="flex flex-col items-center justify-center p-8 text-center hover:border-primary cursor-pointer transition" onClick={() => setFormType('detailed')}>
                <CheckSquare className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-headline text-2xl mb-2">{budgetRequestDict.selection.detailed.title}</h3>
                <p className="text-muted-foreground">{budgetRequestDict.selection.detailed.description}</p>
            </Card>
        </div>
    </div>
  );
  
  if (isSubmitted) {
    return (
        <div className="container py-12 md:py-20 text-center">
            <Card className='max-w-2xl mx-auto'>
                <CardHeader>
                    <div className='mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4'>
                        <MailCheck className='w-12 h-12 text-primary' />
                    </div>
                    <CardTitle className="font-headline text-3xl">{budgetRequestDict.confirmation.title}</CardTitle>
                    <CardDescription className="text-lg">{budgetRequestDict.confirmation.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <a href='/'>{budgetRequestDict.confirmation.button}</a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  if (!budgetRequestDict) return null;

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {!formType ? renderFormSelection() : (
            formType === 'simple' ? renderSimpleForm() : renderDetailedForm()
        )}
      </div>
    </div>
  );
}

    