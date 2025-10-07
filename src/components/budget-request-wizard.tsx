'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useMemo, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Loader2, MailCheck, RotateCw } from 'lucide-react';
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
import { motion, AnimatePresence } from 'framer-motion';

export function BudgetRequestWizard({ t, onBack }: { t: any, services: any, onBack: () => void }) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);
  const progressContainerRef = useRef<HTMLDivElement>(null);

  const form = useForm<DetailedFormValues>({
    resolver: zodResolver(detailedFormSchema),
    defaultValues: {
      name: '', email: '', phone: '', address: '',
      propertyType: 'residential',
      projectScope: 'integral',
      totalAreaM2: 0,
      numberOfRooms: 1,
      numberOfBathrooms: 1,
      partialScope: [],
      demolishPartitions: false,
      removeDoors: false,
      kitchen: { renovate: false, demolition: false, plumbing: false },
      installFalseCeiling: false,
      soundproofRoom: false,
      renovateElectricalPanel: false,
      renovateInteriorDoors: false,
      installSlidingDoor: false,
      paintWalls: false,
      removeGotele: false,
      installAirConditioning: false,
      renovateExteriorCarpentry: false,
    },
  });

  const { control, trigger, watch, reset, getValues } = form;
  const { fields: bathroomFields, append: appendBathroom, remove: removeBathroom } = useFieldArray({ control, name: "bathrooms" });
  const { fields: bedroomFields, append: appendBedroom, remove: removeBedroom } = useFieldArray({ control, name: "electricalBedrooms" });

  const propertyType = watch('propertyType');
  const projectScope = watch('projectScope');
  const partialScope = watch('partialScope') || [];
  const numberOfBathrooms = watch('numberOfBathrooms') || 0;
  const numberOfRooms = watch('numberOfRooms') || 0;

  useEffect(() => {
    const desiredCount = numberOfBathrooms;
    const currentCount = bathroomFields.length;
    if (currentCount < desiredCount) {
      for (let i = currentCount; i < desiredCount; i++) {
        appendBathroom({ quality: 'basic', wallTilesM2: 0, floorM2: 0, installShowerTray: false, installShowerScreen: false, plumbing: false });
      }
    } else if (currentCount > desiredCount) {
      for (let i = currentCount; i > desiredCount; i--) {
        removeBathroom(i - 1);
      }
    }
  }, [numberOfBathrooms, appendBathroom, removeBathroom, bathroomFields.length]);
  
  useEffect(() => {
    const desiredCount = numberOfRooms;
    const currentCount = bedroomFields.length;
    if (currentCount < desiredCount) {
      for (let i = currentCount; i < desiredCount; i++) {
        appendBedroom({ sockets: 4, lights: 1 });
      }
    } else if (currentCount > desiredCount) {
      for (let i = currentCount; i > desiredCount; i--) {
        removeBedroom(i - 1);
      }
    }
  }, [numberOfRooms, appendBedroom, removeBedroom, bedroomFields.length]);

  useEffect(() => {
    if (progressContainerRef.current) {
        progressContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);


  const activeSteps = useMemo(() => {
    let baseSteps = WIZARD_STEPS;
    
    if (propertyType === 'residential') {
        baseSteps = baseSteps.filter(step => step.id !== 'workArea');
    } else { // commercial or office
        baseSteps = baseSteps.filter(step => !['bathroom', 'kitchen'].includes(step.id));
    }

    if (projectScope === 'partial') {
        const partialStepsToShow = ['contact', 'projectDefinition', ...partialScope, 'summary'];
        return baseSteps.filter(step => partialStepsToShow.includes(step.id));
    }
    
    return baseSteps;
  }, [propertyType, projectScope, partialScope]);


  const nextStep = async () => {
    const currentStepConfig = activeSteps[currentStep];
    const isLastStep = currentStep === activeSteps.length - 1;

    // Do nothing if it's the last step. The submit button will handle it.
    if (isLastStep) return;

    // Validate fields of the current step before proceeding
    if (currentStepConfig?.fields) {
        const isValid = await trigger(currentStepConfig.fields as (keyof DetailedFormValues)[]);
        if (!isValid) {
            console.log("Validation failed", form.formState.errors);
            return;
        }
    }
    
    // Proceed to the next step
    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    if (currentStep === 0) {
      onBack();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
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

  const handleRestart = () => {
    reset();
    setCurrentStep(0);
    setIsSubmitted(false);
  }

  const stepVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? '100%' : '-100%',
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? '100%' : '-100%',
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 30,
      },
    }),
  };
  
  const renderDetailedStep = () => {
    const stepId = activeSteps[currentStep]?.id;
    switch (stepId) {
        case 'contact': return <ContactStep form={form} t={t} />;
        case 'projectDefinition': return <ProjectDefinitionStep form={form} t={t} />;
        case 'demolition': return <DemolitionStep form={form} t={t} />;
        case 'bathroom': return <BathroomStep form={form} bathroomFields={bathroomFields} t={t} />;
        case 'kitchen': return <KitchenStep form={form} t={t} />;
        case 'workArea': return <WorkAreaStep form={form} t={t} />;
        case 'ceilings': return <CeilingsStep form={form} t={t} />;
        case 'electricity': return <ElectricityStep form={form} bedroomFields={bedroomFields} t={t} />;
        case 'carpentry': return <CarpentryStep form={form} t={t} />;
        case 'optionals': return <OptionalsStep form={form} t={t} />;
        case 'summary': return <SummaryStep t={t} data={getValues()} />;
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
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                        <Button asChild>
                            <a href='/'>{t.budgetRequest.confirmation.button}</a>
                        </Button>
                         <Button variant="outline" onClick={handleRestart}>
                            <RotateCw className="mr-2 h-4 w-4" />
                            {t.budgetRequest.confirmation.restartForm}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className='w-full max-w-5xl mx-auto'>
        <div ref={progressContainerRef} className="scroll-mt-24">
            <Progress value={((currentStep + 1) / activeSteps.length) * 100} className="w-full mb-8 max-w-5xl mx-auto" />
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
                <Card className='text-left overflow-hidden'>
                    <CardHeader>
                        <CardTitle className='font-headline text-2xl text-center'>{t.budgetRequest.steps[activeSteps[currentStep]?.id]}</CardTitle>
                    </CardHeader>
                    <CardContent className="min-h-[450px]">
                       <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentStep}
                                custom={direction}
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {renderDetailedStep()}
                            </motion.div>
                        </AnimatePresence>
                    </CardContent>
                </Card>
                
                <div className="flex justify-between items-center">
                    <Button type="button" variant="outline" onClick={prevStep}>
                        <ArrowLeft className="mr-2" /> {t.budgetRequest.form.buttons.prev}
                    </Button>
                    
                    {currentStep === activeSteps.length - 1 ? (
                        <Button type="submit" disabled={isLoading} size="lg">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? t.budgetRequest.form.buttons.loading : t.budgetRequest.form.buttons.submit}
                        </Button>
                    ) : (
                        <Button type="button" onClick={nextStep}>
                            {t.budgetRequest.form.buttons.next} <ArrowRight className="ml-2" />
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    </div>
  );
}
