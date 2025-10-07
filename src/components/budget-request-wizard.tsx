'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
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
import { ArrowLeft, ArrowRight, Loader2, MailCheck, FileText, CheckSquare } from 'lucide-react';
import { Progress } from './ui/progress';
import { DetailedFormValues, SimpleFormValues, simpleFormSchema, detailedFormSchema } from './budget-request/schema';
import { WIZARD_STEPS } from './budget-request/wizard-steps';
import { ContactStep } from './budget-request/steps/ContactStep';
import { DemolitionStep } from './budget-request/steps/DemolitionStep';
import { BathroomStep } from './budget-request/steps/BathroomStep';
import { KitchenStep } from './budget-request/steps/KitchenStep';
import { CeilingsStep } from './budget-request/steps/CeilingsStep';
import { ElectricityStep } from './budget-request/steps/ElectricityStep';
import { CarpentryStep } from './budget-request/steps/CarpentryStep';
import { OptionalsStep } from './budget-request/steps/OptionalsStep';
import { SummaryStep } from './budget-request/steps/SummaryStep';
import { Input } from './ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { Check } from 'lucide-react';


const pricingConfig = {
    integral: { basic: 400, medium: 600, premium: 800 },
    bathrooms: { basic: 1100, medium: 1250, premium: 1750 },
    kitchen: { basic: 621, medium: 900, premium: 1100 },
    pools: {},
};


export function BudgetRequestWizard({ t }: { t: any, services: any }) {
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

  const { trigger } = detailedForm;

  const nextStep = async () => {
    const fields = WIZARD_STEPS[currentStep].fields;
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
    const simpleFormValues = simpleForm.watch();
    const projectType = simpleFormValues.projectType as keyof typeof t.budgetRequest.simple.inclusions;
    const inclusions = t.budgetRequest.simple.inclusions[projectType];
    const showInclusions = inclusions && Array.isArray(inclusions);

    return (
        <Card className='text-left max-w-5xl mx-auto'>
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
    const stepId = WIZARD_STEPS[currentStep].id;
    switch (stepId) {
        case 'contact': return <ContactStep form={detailedForm} t={t} />;
        case 'demolition': return <DemolitionStep form={detailedForm} t={t} />;
        case 'bathroom': return <BathroomStep form={detailedForm} t={t} />;
        case 'kitchen': return <KitchenStep form={detailedForm} t={t} />;
        case 'ceilings': return <CeilingsStep form={detailedForm} t={t} />;
        case 'electricity': return <ElectricityStep form={detailedForm} t={t} />;
        case 'carpentry': return <CarpentryStep form={detailedForm} t={t} />;
        case 'optionals': return <OptionalsStep form={detailedForm} t={t} />;
        case 'summary': return <SummaryStep t={t} />;
        default: return null;
    }
  }

  const renderDetailedForm = () => (
    <Card className='text-left max-w-5xl mx-auto'>
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl md:text-4xl">{t.budgetRequest.title}</CardTitle>
        <CardDescription className="text-lg">{t.budgetRequest.description}</CardDescription>
        <Progress value={((currentStep + 1) / WIZARD_STEPS.length) * 100} className="w-full mt-4" />
      </CardHeader>
      <CardContent>
        <Form {...detailedForm}>
          <form onSubmit={detailedForm.handleSubmit(handleFormSubmit)} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className='font-headline text-2xl text-center'>{WIZARD_STEPS[currentStep].title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {renderDetailedStep()}
                </CardContent>
            </Card>
            
            <div className="flex justify-between items-center">
              <Button type="button" variant="outline" onClick={currentStep === 0 ? goBackToSelection : prevStep}>
                <ArrowLeft className="mr-2" /> {t.budgetRequest.form.buttons.prev}
              </Button>
              
              {currentStep < WIZARD_STEPS.length - 1 ? (
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
    <div className="w-full text-center max-w-5xl mx-auto">
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
