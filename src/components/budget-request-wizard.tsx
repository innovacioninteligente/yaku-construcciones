'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Loader2, MailCheck } from 'lucide-react';
import { Progress } from './ui/progress';
import { DetailedFormValues, detailedFormSchema } from './budget-request/schema';
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
import { ProjectDefinitionStep } from './budget-request/steps/ProjectDefinitionStep';
import { WorkAreaStep } from './budget-request/steps/WorkAreaStep';

export function BudgetRequestWizard({ t }: { t: any, services: any }) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<DetailedFormValues>({
    resolver: zodResolver(detailedFormSchema),
    defaultValues: {
      name: '', email: '', phone: '', address: '',
      propertyType: 'residential',
      projectScope: 'integral',
      totalAreaM2: 0,
      numberOfRooms: 1,
      numberOfBathrooms: 1,
      workstations: 0,
      meetingRooms: 0,
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

  const { trigger, watch } = form;
  const projectScope = watch('projectScope');
  const propertyType = watch('propertyType');

  const activeSteps = useMemo(() => {
    let steps = [...WIZARD_STEPS];
    
    if (propertyType === 'residential') {
        steps = steps.filter(step => step.id !== 'workArea');
    } else {
        steps = steps.filter(step => step.id !== 'bathroom' && step.id !== 'kitchen' && step.id !== 'electricity');
    }

    if (projectScope === 'partial') {
        steps = steps.filter(step => 
            !['demolition', 'carpentry', 'optionals', 'ceilings'].includes(step.id) ||
            (step.id === 'bathroom' && watch('renovateBathroom')) ||
            (step.id === 'kitchen' && watch('renovateKitchen'))
        );
         const baseSteps = ['contact', 'projectDefinition'];
         if (watch('renovateBathroom')) baseSteps.push('bathroom');
         if (watch('renovateKitchen')) baseSteps.push('kitchen');
         baseSteps.push('summary');
         
         const partialSteps = WIZARD_STEPS.filter(step => baseSteps.includes(step.id));
         
         // Reorder to keep summary at the end
         const summaryStep = partialSteps.find(s => s.id === 'summary');
         const otherSteps = partialSteps.filter(s => s.id !== 'summary');
         return summaryStep ? [...otherSteps, summaryStep] : otherSteps;

    } else { // integral
        if (propertyType !== 'residential') {
            return steps.filter(step => step.id !== 'electricity');
        }
    }
    
    return steps;
  }, [projectScope, propertyType, watch]);


  const nextStep = async () => {
    const fields = activeSteps[currentStep].fields;
    if (fields) {
      const isValid = await trigger(fields as (keyof DetailedFormValues)[]);
      if (!isValid) return;
    }
    
    // Logic to skip steps if not selected in partial renovation
    if (projectScope === 'partial' && currentStep === 1) {
        if (!watch('renovateBathroom') && !watch('renovateKitchen')) {
             setCurrentStep(activeSteps.length - 1); // Go to summary
             return;
        }
    }

    if (currentStep < activeSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };
  
  async function handleFormSubmit(values: DetailedFormValues) {
    setIsLoading(true);
    try {
      console.log('Form values:', values);
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
  
  const renderDetailedStep = () => {
    const stepId = activeSteps[currentStep]?.id;
    switch (stepId) {
        case 'contact': return <ContactStep form={form} t={t} />;
        case 'projectDefinition': return <ProjectDefinitionStep form={form} t={t} />;
        case 'demolition': return <DemolitionStep form={form} t={t} />;
        case 'bathroom': return <BathroomStep form={form} t={t} />;
        case 'kitchen': return <KitchenStep form={form} t={t} />;
        case 'workArea': return <WorkAreaStep form={form} t={t} />;
        case 'ceilings': return <CeilingsStep form={form} t={t} />;
        case 'electricity': return <ElectricityStep form={form} t={t} />;
        case 'carpentry': return <CarpentryStep form={form} t={t} />;
        case 'optionals': return <OptionalsStep form={form} t={t} />;
        case 'summary': return <SummaryStep t={t} />;
        default: return <div>Paso no encontrado</div>;
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
    <div className='w-full max-w-5xl mx-auto'>
        <Progress value={((currentStep + 1) / activeSteps.length) * 100} className="w-full mb-8" />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
                <Card className='text-left'>
                    <CardHeader>
                        <CardTitle className='font-headline text-2xl text-center'>{t.budgetRequest.steps[activeSteps[currentStep]?.id]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {renderDetailedStep()}
                    </CardContent>
                </Card>
                
                <div className="flex justify-between items-center">
                    <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                        <ArrowLeft className="mr-2" /> {t.budgetRequest.form.buttons.prev}
                    </Button>
                    
                    {currentStep < activeSteps.length - 1 ? (
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
    </div>
  );
}
