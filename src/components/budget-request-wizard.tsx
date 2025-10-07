'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Control } from 'react-hook-form';
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
import { ArrowLeft, ArrowRight, Loader2, MailCheck, FileText, CheckSquare, Check } from 'lucide-react';
import { Progress } from './ui/progress';

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

const SwitchableFormItem = ({ control, name, label, description }: { control: Control<DetailedFormValues>, name: keyof DetailedFormValues, label: string, description?: string }) => {
    const { id } = useForm().formState;
    const fieldId = `${name}-${id}`;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 text-left">
                    <div className="space-y-0.5">
                        <FormLabel htmlFor={fieldId} className="text-base cursor-pointer">{label}</FormLabel>
                        {description && <FormDescription className="cursor-pointer" onClick={() => field.onChange(!field.value)}>{description}</FormDescription>}
                    </div>
                    <FormControl>
                        <Switch
                            id={fieldId}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
};

const pricingConfig = {
    integral: { basic: 400, medium: 600, premium: 800 },
    bathrooms: { basic: 1100, medium: 1250, premium: 1750 },
    kitchen: { basic: 621, medium: 900, premium: 1100 },
    pools: {},
};


export function BudgetRequestWizard({ t }: { t: any }) {
  const { toast } = useToast();
  const [formType, setFormType] = useState<'simple' | 'detailed' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  
  const detailedForm = useForm<DetailedFormValues>({
    resolver: zodResolver(detailedFormSchema),
    defaultValues: {
      name: '', email: '', phone: '', address: '',
      demolishPartitions: false, demolishPartitionsM2: 0,
      removeDoors: false, removeDoorsAmount: 0,
      renovateBathroom: false, bathroomQuality: 'basic', bathroomWallTilesM2: 0,
      bathroomFloorM2: 0, installShowerTray: false, installShowerScreen: false,
      bathroomPlumbing: false,
      renovateKitchen: false, kitchenQuality: 'basic', kitchenDemolition: false,
      kitchenWallTilesM2: 0, kitchenFloorM2: 0, kitchenPlumbing: false,
      installFalseCeiling: false, falseCeilingM2: 0,
      soundproofRoom: false, soundproofRoomM2: 0,
      renovateElectricalPanel: false,
      electricalKitchenSockets: 0, electricalKitchenLights: 0,
      electricalLivingRoomSockets: 0, electricalLivingRoomLights: 0,
      electricalLivingRoomTV: false,
      electricalBedroom1Sockets: 0, electricalBedroom1Lights: 0,
      electricalBedroom2Sockets: 0, electricalBedroom2Lights: 0,
      electricalBedroom3Sockets: 0, electricalBedroom3Lights: 0,
      renovateInteriorDoors: false, interiorDoorsAmount: 0,
      installSlidingDoor: false, slidingDoorAmount: 0,
      paintWalls: false, paintWallsM2: 0,
      removeGotele: false, removeGoteleM2: 0,
      installAirConditioning: false, renovateExteriorCarpentry: false,
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

  const { watch: watchDetailed, trigger } = detailedForm;
  const watchAllDetailedFields = watchDetailed();

  const { watch: watchSimple } = simpleForm;
  const simpleFormValues = watchSimple();

  const nextStep = async () => {
    const fields = STEPS[currentStep].fields;
    const isValid = await trigger(fields as (keyof DetailedFormValues)[]);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };
  
  const goBackToSelection = () => {
    setFormType(null);
    setCurrentStep(0);
    simpleForm.reset();
    detailedForm.reset();
  };

  async function handleFormSubmit(values: DetailedFormValues | SimpleFormValues) {
    setIsLoading(true);
    let cost = null;

    if (formType === 'simple') {
        const simpleValues = values as SimpleFormValues;
        const prices = pricingConfig[simpleValues.projectType as keyof typeof pricingConfig];
        if (prices && prices[simpleValues.quality as keyof typeof prices]) {
            cost = prices[simpleValues.quality as keyof typeof prices] * simpleValues.squareMeters;
            setEstimatedCost(cost);
        }
    }

    try {
      console.log('Form values:', values);
      console.log('Estimated Cost:', cost);
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

  const renderSimpleForm = () => {
    const projectType = simpleFormValues.projectType as keyof typeof t.budgetRequest.simple.inclusions;
    const inclusions = t.budgetRequest.simple.inclusions[projectType];
    const showInclusions = inclusions && Array.isArray(inclusions);

    return (
        <Card className='text-left'>
            <CardHeader>
                <CardTitle className='font-headline text-2xl text-center'>{t.budgetRequest.simple.title}</CardTitle>
                <CardDescription className='text-center'>{t.budgetRequest.simple.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...simpleForm}>
                    <form onSubmit={simpleForm.handleSubmit(handleFormSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={simpleForm.control} name="name" render={({ field }) => (
                                <FormItem><FormLabel>{t.budgetRequest.form.name.label}</FormLabel><FormControl><Input placeholder={t.budgetRequest.form.name.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={simpleForm.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>{t.budgetRequest.form.email.label}</FormLabel><FormControl><Input type="email" placeholder={t.budgetRequest.form.email.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={simpleForm.control} name="phone" render={({ field }) => (
                                <FormItem><FormLabel>{t.budgetRequest.form.phone.label}</FormLabel><FormControl><Input placeholder={t.budgetRequest.form.phone.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={simpleForm.control} name="address" render={({ field }) => (
                                <FormItem><FormLabel>{t.budgetRequest.form.address.label}</FormLabel><FormControl><Input placeholder={t.budgetRequest.form.address.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <FormField control={simpleForm.control} name="projectType" render={({ field }) => (
                            <FormItem><FormLabel>{t.budgetRequest.simple.projectType.label}</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder={t.budgetRequest.simple.projectType.placeholder} /></SelectTrigger></FormControl><SelectContent><SelectItem value="integral">{t.budgetRequest.simple.projectType.options.integral}</SelectItem><SelectItem value="bathrooms">{t.budgetRequest.simple.projectType.options.bathrooms}</SelectItem><SelectItem value="kitchen">{t.budgetRequest.simple.projectType.options.kitchen}</SelectItem><SelectItem value="pools">{t.budgetRequest.simple.projectType.options.pools}</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                        )} />
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={simpleForm.control} name="squareMeters" render={({ field }) => (
                                <FormItem><FormLabel>{t.budgetRequest.simple.squareMeters.label}</FormLabel><FormControl><Input type="number" placeholder="80" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={simpleForm.control} name="quality" render={({ field }) => (
                                <FormItem><FormLabel>{t.budgetRequest.form.quality.label}</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder={t.budgetRequest.form.quality.placeholder} /></SelectTrigger></FormControl><SelectContent><SelectItem value="basic">{t.budgetRequest.form.quality.options.basic}</SelectItem><SelectItem value="medium">{t.budgetRequest.form.quality.options.medium}</SelectItem><SelectItem value="premium">{t.budgetRequest.form.quality.options.premium}</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                            )} />
                        </div>

                        {showInclusions && (
                            <Card className="bg-secondary/50">
                                <CardHeader>
                                    <CardTitle className="text-lg font-headline">{t.budgetRequest.simple.inclusions.title.replace('{projectType}', t.budgetRequest.simple.projectType.options[projectType])}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-x-4">
                                        {inclusions.map((item: string, index: number) => (
                                            <li key={index} className="flex items-start">
                                                <Check className="h-4 w-4 mr-2 mt-1 shrink-0 text-primary" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        <div className="flex items-center justify-between">
                            <Button type="button" variant="outline" onClick={goBackToSelection}>
                                <ArrowLeft className="mr-2" /> {t.budgetRequest.form.buttons.prev}
                            </Button>
                            <Button type="submit" disabled={isLoading} size="lg">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? t.budgetRequest.form.buttons.loading : t.budgetRequest.form.buttons.submit}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};


  const renderDetailedStep = () => {
    switch (STEPS[currentStep].id) {
        case 'contact':
            return (
                <div className="space-y-6">
                     <FormField control={detailedForm.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>{t.budgetRequest.form.name.label}</FormLabel><FormControl><Input placeholder={t.budgetRequest.form.name.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={detailedForm.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>{t.budgetRequest.form.email.label}</FormLabel><FormControl><Input type="email" placeholder={t.budgetRequest.form.email.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={detailedForm.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>{t.budgetRequest.form.phone.label}</FormLabel><FormControl><Input placeholder={t.budgetRequest.form.phone.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={detailedForm.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>{t.budgetRequest.form.address.label}</FormLabel><FormControl><Input placeholder={t.budgetRequest.form.address.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
            )
        case 'demolition':
            return (
                 <div className="space-y-6">
                    <SwitchableFormItem
                        control={detailedForm.control}
                        name="demolishPartitions"
                        label={t.budgetRequest.form.demolition.demolishPartitions.label}
                    />
                    {watchAllDetailedFields.demolishPartitions && <FormField control={detailedForm.control} name="demolishPartitionsM2" render={({ field }) => (
                        <FormItem><FormLabel>{t.budgetRequest.form.demolition.demolishPartitionsM2.label}</FormLabel><FormControl><Input type="number" placeholder="25" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                    <SwitchableFormItem
                        control={detailedForm.control}
                        name="removeDoors"
                        label={t.budgetRequest.form.demolition.removeDoors.label}
                    />
                    {watchAllDetailedFields.removeDoors && <FormField control={detailedForm.control} name="removeDoorsAmount" render={({ field }) => (
                        <FormItem><FormLabel>{t.budgetRequest.form.demolition.removeDoorsAmount.label}</FormLabel><FormControl><Input type="number" placeholder="5" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                </div>
            )
        case 'bathroom':
            return (
                <div className="space-y-6">
                    <SwitchableFormItem control={detailedForm.control} name="renovateBathroom" label={t.budgetRequest.form.bathroom.renovateBathroom.label} />
                    {watchAllDetailedFields.renovateBathroom && (
                        <div className="space-y-6 pl-4 border-l-2 ml-4">
                             <FormField control={detailedForm.control} name="bathroomQuality" render={({ field }) => (
                                <FormItem><FormLabel>{t.budgetRequest.form.quality.label}</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder={t.budgetRequest.form.quality.placeholder} /></SelectTrigger></FormControl><SelectContent><SelectItem value="basic">{t.budgetRequest.form.quality.options.basic}</SelectItem><SelectItem value="medium">{t.budgetRequest.form.quality.options.medium}</SelectItem><SelectItem value="premium">{t.budgetRequest.form.quality.options.premium}</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                            )} />
                            <FormField control={detailedForm.control} name="bathroomWallTilesM2" render={({ field }) => (
                                <FormItem><FormLabel>{t.budgetRequest.form.bathroom.bathroomWallTilesM2.label}</FormLabel><FormControl><Input type="number" placeholder="30" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={detailedForm.control} name="bathroomFloorM2" render={({ field }) => (
                                <FormItem><FormLabel>{t.budgetRequest.form.bathroom.bathroomFloorM2.label}</FormLabel><FormControl><Input type="number" placeholder="8" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <SwitchableFormItem control={detailedForm.control} name="installShowerTray" label={t.budgetRequest.form.bathroom.installShowerTray.label} />
                            <SwitchableFormItem control={detailedForm.control} name="installShowerScreen" label={t.budgetRequest.form.bathroom.installShowerScreen.label} />
                            <SwitchableFormItem control={detailedForm.control} name="bathroomPlumbing" label={t.budgetRequest.form.bathroom.bathroomPlumbing.label} />
                        </div>
                    )}
                </div>
            )
        case 'kitchen':
             return (
                <div className="space-y-6">
                    <SwitchableFormItem control={detailedForm.control} name="renovateKitchen" label={t.budgetRequest.form.kitchen.renovateKitchen.label} />
                     {watchAllDetailedFields.renovateKitchen && (
                        <div className="space-y-6 pl-4 border-l-2 ml-4">
                             <FormField control={detailedForm.control} name="kitchenQuality" render={({ field }) => (
                                <FormItem><FormLabel>{t.budgetRequest.form.quality.label}</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder={t.budgetRequest.form.quality.placeholder} /></SelectTrigger></FormControl><SelectContent><SelectItem value="basic">{t.budgetRequest.form.quality.options.basic}</SelectItem><SelectItem value="medium">{t.budgetRequest.form.quality.options.medium}</SelectItem><SelectItem value="premium">{t.budgetRequest.form.quality.options.premium}</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                            )} />
                            <SwitchableFormItem control={detailedForm.control} name="kitchenDemolition" label={t.budgetRequest.form.kitchen.kitchenDemolition.label} />
                             <FormField control={detailedForm.control} name="kitchenWallTilesM2" render={({ field }) => (
                                <FormItem><FormLabel>{t.budgetRequest.form.kitchen.kitchenWallTilesM2.label}</FormLabel><FormControl><Input type="number" placeholder="25" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={detailedForm.control} name="kitchenFloorM2" render={({ field }) => (
                                <FormItem><FormLabel>{t.budgetRequest.form.kitchen.kitchenFloorM2.label}</FormLabel><FormControl><Input type="number" placeholder="12" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <SwitchableFormItem control={detailedForm.control} name="kitchenPlumbing" label={t.budgetRequest.form.kitchen.kitchenPlumbing.label} />
                        </div>
                    )}
                </div>
            )
        case 'ceilings':
             return (
                <div className="space-y-6">
                    <SwitchableFormItem control={detailedForm.control} name="installFalseCeiling" label={t.budgetRequest.form.ceilings.installFalseCeiling.label} />
                    {watchAllDetailedFields.installFalseCeiling && <FormField control={detailedForm.control} name="falseCeilingM2" render={({ field }) => (
                        <FormItem><FormLabel>{t.budgetRequest.form.ceilings.falseCeilingM2.label}</FormLabel><FormControl><Input type="number" placeholder="20" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                    <SwitchableFormItem control={detailedForm.control} name="soundproofRoom" label={t.budgetRequest.form.ceilings.soundproofRoom.label} />
                    {watchAllDetailedFields.soundproofRoom && <FormField control={detailedForm.control} name="soundproofRoomM2" render={({ field }) => (
                        <FormItem><FormLabel>{t.budgetRequest.form.ceilings.soundproofRoomM2.label}</FormLabel><FormControl><Input type="number" placeholder="15" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                </div>
            )
        case 'electricity':
            return (
                <div className="space-y-6 text-left">
                    <SwitchableFormItem control={detailedForm.control} name="renovateElectricalPanel" label={t.budgetRequest.form.electricity.renovateElectricalPanel.label} />

                    <Card><CardHeader><CardTitle className='text-lg'>{t.budgetRequest.form.electricity.perRoom.kitchen}</CardTitle></CardHeader><CardContent className='space-y-4'>
                        <FormField control={detailedForm.control} name="electricalKitchenSockets" render={({ field }) => (
                            <FormItem><FormLabel>{t.budgetRequest.form.electricity.perRoom.sockets}</FormLabel><FormControl><Input type="number" placeholder="8" {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={detailedForm.control} name="electricalKitchenLights" render={({ field }) => (
                            <FormItem><FormLabel>{t.budgetRequest.form.electricity.perRoom.lights}</FormLabel><FormControl><Input type="number" placeholder="3" {...field} /></FormControl></FormItem>
                        )} />
                    </CardContent></Card>
                    <Card><CardHeader><CardTitle className='text-lg'>{t.budgetRequest.form.electricity.perRoom.livingRoom}</CardTitle></CardHeader><CardContent className='space-y-4'>
                        <FormField control={detailedForm.control} name="electricalLivingRoomSockets" render={({ field }) => (
                            <FormItem><FormLabel>{t.budgetRequest.form.electricity.perRoom.sockets}</FormLabel><FormControl><Input type="number" placeholder="6" {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={detailedForm.control} name="electricalLivingRoomLights" render={({ field }) => (
                            <FormItem><FormLabel>{t.budgetRequest.form.electricity.perRoom.lights}</FormLabel><FormControl><Input type="number" placeholder="4" {...field} /></FormControl></FormItem>
                        )} />
                        <SwitchableFormItem control={detailedForm.control} name="electricalLivingRoomTV" label={t.budgetRequest.form.electricity.perRoom.tv} />
                    </CardContent></Card>
                     <Card><CardHeader><CardTitle className='text-lg'>{t.budgetRequest.form.electricity.perRoom.bedroom} 1</CardTitle></CardHeader><CardContent className='space-y-4'>
                        <FormField control={detailedForm.control} name="electricalBedroom1Sockets" render={({ field }) => (
                            <FormItem><FormLabel>{t.budgetRequest.form.electricity.perRoom.sockets}</FormLabel><FormControl><Input type="number" placeholder="4" {...field} /></FormControl></FormItem>
                        )} />
                        <FormField control={detailedForm.control} name="electricalBedroom1Lights" render={({ field }) => (
                            <FormItem><FormLabel>{t.budgetRequest.form.electricity.perRoom.lights}</FormLabel><FormControl><Input type="number" placeholder="2" {...field} /></FormControl></FormItem>
                        )} />
                    </CardContent></Card>
                </div>
            )
        case 'carpentry':
             return (
                <div className="space-y-6">
                    <SwitchableFormItem control={detailedForm.control} name="renovateInteriorDoors" label={t.budgetRequest.form.carpentry.renovateInteriorDoors.label} />
                    {watchAllDetailedFields.renovateInteriorDoors && <FormField control={detailedForm.control} name="interiorDoorsAmount" render={({ field }) => (
                        <FormItem><FormLabel>{t.budgetRequest.form.carpentry.interiorDoorsAmount.label}</FormLabel><FormControl><Input type="number" placeholder="6" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                    
                    <SwitchableFormItem control={detailedForm.control} name="installSlidingDoor" label={t.budgetRequest.form.carpentry.installSlidingDoor.label} />
                    {watchAllDetailedFields.installSlidingDoor && <FormField control={detailedForm.control} name="slidingDoorAmount" render={({ field }) => (
                        <FormItem><FormLabel>{t.budgetRequest.form.carpentry.slidingDoorAmount.label}</FormLabel><FormControl><Input type="number" placeholder="1" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                    
                     <hr />

                    <SwitchableFormItem control={detailedForm.control} name="paintWalls" label={t.budgetRequest.form.carpentry.paintWalls.label} />
                    {watchAllDetailedFields.paintWalls && <FormField control={detailedForm.control} name="paintWallsM2" render={({ field }) => (
                        <FormItem><FormLabel>{t.budgetRequest.form.carpentry.paintWallsM2.label}</FormLabel><FormControl><Input type="number" placeholder="300" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}

                    <SwitchableFormItem control={detailedForm.control} name="removeGotele" label={t.budgetRequest.form.carpentry.removeGotele.label} />
                    {watchAllDetailedFields.removeGotele && <FormField control={detailedForm.control} name="removeGoteleM2" render={({ field }) => (
                        <FormItem><FormLabel>{t.budgetRequest.form.carpentry.removeGoteleM2.label}</FormLabel><FormControl><Input type="number" placeholder="300" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />}
                </div>
            )
        case 'optionals':
            return (
                <div className="space-y-6">
                     <SwitchableFormItem control={detailedForm.control} name="installAirConditioning" label={t.budgetRequest.form.optionals.installAirConditioning.label} description={t.budgetRequest.form.optionals.installAirConditioning.description} />
                     <SwitchableFormItem control={detailedForm.control} name="renovateExteriorCarpentry" label={t.budgetRequest.form.optionals.renovateExteriorCarpentry.label} description={t.budgetRequest.form.optionals.renovateExteriorCarpentry.description} />
                </div>
            )
        case 'summary':
             return (
                <div className="space-y-4">
                    <p>{t.budgetRequest.summary.description}</p>
                </div>
            )
        default:
            return null
    }
  }

  const renderDetailedForm = () => (
    <Card className='text-left'>
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl md:text-4xl">{t.budgetRequest.title}</CardTitle>
        <CardDescription className="text-lg">{t.budgetRequest.description}</CardDescription>
        <Progress value={((currentStep + 1) / STEPS.length) * 100} className="w-full mt-4" />
      </CardHeader>
      <CardContent>
        <Form {...detailedForm}>
          <form onSubmit={detailedForm.handleSubmit(handleFormSubmit)} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className='font-headline text-2xl text-center'>{STEPS[currentStep].title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {renderDetailedStep()}
                </CardContent>
            </Card>
            
            <div className="flex justify-between items-center">
              <Button type="button" variant="outline" onClick={currentStep === 0 ? goBackToSelection : prevStep}>
                <ArrowLeft className="mr-2" /> {t.budgetRequest.form.buttons.prev}
              </Button>
              
              {currentStep < STEPS.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  {t.budgetRequest.form.buttons.next} <ArrowRight className="ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading} size="lg">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? t.budgetRequest.form.buttons.loading : t.budgetRequest.form.buttons.submit}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );

  const renderFormSelection = () => (
    <div className="w-full text-center">
        <CardHeader className="px-0">
            <CardTitle className="font-headline text-3xl md:text-4xl">{t.budgetRequest.selection.title}</CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto">{t.budgetRequest.selection.description}</CardDescription>
        </CardHeader>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
            <Card className="flex flex-col items-center justify-center p-8 text-center hover:border-primary cursor-pointer transition" onClick={() => setFormType('simple')}>
                <FileText className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-headline text-2xl mb-2">{t.budgetRequest.selection.simple.title}</h3>
                <p className="text-muted-foreground">{t.budgetRequest.selection.simple.description}</p>
            </Card>
            <Card className="flex flex-col items-center justify-center p-8 text-center hover:border-primary cursor-pointer transition" onClick={() => setFormType('detailed')}>
                <CheckSquare className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-headline text-2xl mb-2">{t.budgetRequest.selection.detailed.title}</h3>
                <p className="text-muted-foreground">{t.budgetRequest.selection.detailed.description}</p>
            </Card>
        </div>
    </div>
  );
  
  if (isSubmitted) {
    return (
        <div className="text-center">
            <Card className='max-w-2xl mx-auto'>
                <CardHeader>
                    <div className='mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4'>
                        <MailCheck className='w-12 h-12 text-primary' />
                    </div>
                    <CardTitle className="font-headline text-3xl">{t.budgetRequest.confirmation.title}</CardTitle>
                    <CardDescription className="text-lg">{t.budgetRequest.confirmation.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {estimatedCost !== null ? (
                        <div className="py-4">
                            <p className="text-lg text-muted-foreground">{t.budgetRequest.confirmation.estimatedCostLabel}</p>
                            <p className="text-4xl font-bold text-primary my-2">
                                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(estimatedCost)}
                            </p>
                            <p className="text-xs text-muted-foreground">{t.budgetRequest.confirmation.taxNote}</p>
                        </div>
                    ) : (
                        <p className="text-muted-foreground mt-4">{t.budgetRequest.confirmation.noCostMessage}</p>
                    )}
                    <Button asChild className="mt-6">
                        <a href='/'>{t.budgetRequest.confirmation.button}</a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <>
        {!formType ? renderFormSelection() : (
            formType === 'simple' ? renderSimpleForm() : renderDetailedForm()
        )}
    </>
  );
}
