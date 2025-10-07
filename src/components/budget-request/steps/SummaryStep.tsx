import { DetailedFormValues } from '../schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, X } from 'lucide-react';

interface SummaryStepProps {
    t: any;
    data: DetailedFormValues;
}

const SummaryItem = ({ label, value }: { label: string, value: React.ReactNode }) => {
    if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        return null;
    }
    return (
        <div className="flex justify-between items-start text-sm">
            <p className="text-muted-foreground">{label}</p>
            <p className="font-medium text-right">{String(value)}</p>
        </div>
    );
};

const BooleanItem = ({ label, value }: { label: string, value: boolean }) => (
    <div className="flex justify-between items-center text-sm">
        <p className="text-muted-foreground">{label}</p>
        {value ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />}
    </div>
)

export const SummaryStep = ({ t, data }: SummaryStepProps) => {
    const commonT = t.budgetRequest.form;
    const stepT = t.budgetRequest.steps;
    const partialScopeOptions = [
        { id: 'bathroom', label: 'Reforma de Baño(s)' },
        { id: 'kitchen', label: 'Reforma de Cocina' },
        { id: 'demolition', label: 'Demoliciones' },
        { id: 'ceilings', label: 'Falsos Techos' },
        { id: 'electricity', label: 'Electricidad' },
        { id: 'carpentry', label: 'Carpintería y Pintura' },
        { id: 'optionals', label: 'Opcionales' },
    ];
    const partialScopeLabels = data.partialScope?.map(id => partialScopeOptions.find(opt => opt.id === id)?.label).join(', ');

    return (
        <div className="space-y-6">
            <p className="text-center text-muted-foreground">{t.budgetRequest.summary.description}</p>
            <Card>
                <CardHeader><CardTitle className='text-lg'>{stepT.contact}</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    <SummaryItem label={commonT.name.label} value={data.name} />
                    <SummaryItem label={commonT.email.label} value={data.email} />
                    <SummaryItem label={commonT.phone.label} value={data.phone} />
                    <SummaryItem label={commonT.address.label} value={data.address} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className='text-lg'>{stepT.projectDefinition}</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    <SummaryItem label={commonT.projectDefinition.propertyType.label} value={commonT.projectDefinition.propertyType[data.propertyType]} />
                    <SummaryItem label={commonT.projectDefinition.projectScope.label} value={commonT.projectDefinition.projectScope[data.projectScope]} />
                    {data.projectScope === 'partial' && <SummaryItem label={commonT.projectDefinition.partialScope.label} value={partialScopeLabels} />}
                    <SummaryItem label={commonT.projectDefinition.totalAreaM2.label} value={`${data.totalAreaM2} m²`} />
                    {data.propertyType === 'residential' && (
                        <>
                            <SummaryItem label={commonT.projectDefinition.numberOfRooms.label} value={data.numberOfRooms} />
                            <SummaryItem label={commonT.projectDefinition.numberOfBathrooms.label} value={data.numberOfBathrooms} />
                        </>
                    )}
                </CardContent>
            </Card>

            {data.demolishPartitions || data.removeDoors ? (
                 <Card>
                    <CardHeader><CardTitle className='text-lg'>{stepT.demolition}</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <BooleanItem label={commonT.demolition.demolishPartitions.label} value={!!data.demolishPartitions} />
                        {data.demolishPartitions && <SummaryItem label={commonT.demolition.demolishPartitionsM2.label} value={`${data.demolishPartitionsM2} m²`} />}
                        <BooleanItem label={commonT.demolition.removeDoors.label} value={!!data.removeDoors} />
                        {data.removeDoors && <SummaryItem label={commonT.demolition.removeDoorsAmount.label} value={data.removeDoorsAmount} />}
                    </CardContent>
                </Card>
            ) : null}

            {data.bathrooms && data.bathrooms.length > 0 && (
                 <Card>
                    <CardHeader><CardTitle className='text-lg'>{stepT.bathroom}</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                       {data.bathrooms.map((bathroom, index) => (
                           <div key={index} className="space-y-2 p-4 border rounded-md">
                                <p className='font-semibold'>Baño {index + 1}</p>
                                <SummaryItem label={commonT.quality.label} value={commonT.quality.options[bathroom.quality as keyof typeof commonT.quality.options]} />
                                <SummaryItem label={commonT.bathroom.bathroomWallTilesM2.label} value={`${bathroom.wallTilesM2} m²`} />
                                <SummaryItem label={commonT.bathroom.bathroomFloorM2.label} value={`${bathroom.floorM2} m²`} />
                                <BooleanItem label={commonT.bathroom.installShowerTray.label} value={!!bathroom.installShowerTray} />
                                <BooleanItem label={commonT.bathroom.installShowerScreen.label} value={!!bathroom.installShowerScreen} />
                                <BooleanItem label={commonT.bathroom.bathroomPlumbing.label} value={!!bathroom.plumbing} />
                           </div>
                       ))}
                    </CardContent>
                </Card>
            )}

            {data.kitchen?.renovate && (
                <Card>
                    <CardHeader><CardTitle className='text-lg'>{stepT.kitchen}</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <BooleanItem label={commonT.kitchen.renovateKitchen.label} value={!!data.kitchen.renovate} />
                        <SummaryItem label={commonT.quality.label} value={commonT.quality.options[data.kitchen.quality as keyof typeof commonT.quality.options]} />
                        <BooleanItem label={commonT.kitchen.kitchenDemolition.label} value={!!data.kitchen.demolition} />
                        <SummaryItem label={commonT.kitchen.kitchenWallTilesM2.label} value={`${data.kitchen.wallTilesM2} m²`} />
                        <SummaryItem label={commonT.kitchen.kitchenFloorM2.label} value={`${data.kitchen.floorM2} m²`} />
                        <BooleanItem label={commonT.kitchen.kitchenPlumbing.label} value={!!data.kitchen.plumbing} />
                    </CardContent>
                </Card>
            )}

             {(data.installFalseCeiling || data.soundproofRoom) && (
                <Card>
                    <CardHeader><CardTitle className='text-lg'>{stepT.ceilings}</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <BooleanItem label={commonT.ceilings.installFalseCeiling.label} value={!!data.installFalseCeiling} />
                        {data.installFalseCeiling && <SummaryItem label={commonT.ceilings.falseCeilingM2.label} value={`${data.falseCeilingM2} m²`} />}
                        <BooleanItem label={commonT.ceilings.soundproofRoom.label} value={!!data.soundproofRoom} />
                        {data.soundproofRoom && <SummaryItem label={commonT.ceilings.soundproofRoomM2.label} value={`${data.soundproofRoomM2} m²`} />}
                    </CardContent>
                </Card>
            )}

            {data.renovateElectricalPanel && (
                 <Card>
                    <CardHeader><CardTitle className='text-lg'>{stepT.electricity}</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <BooleanItem label={commonT.electricity.renovateElectricalPanel.label} value={!!data.renovateElectricalPanel} />
                    </CardContent>
                </Card>
            )}

            {(data.renovateInteriorDoors || data.installSlidingDoor || data.paintWalls || data.removeGotele) && (
                 <Card>
                    <CardHeader><CardTitle className='text-lg'>{stepT.carpentry}</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <BooleanItem label={commonT.carpentry.renovateInteriorDoors.label} value={!!data.renovateInteriorDoors} />
                        {data.renovateInteriorDoors && <SummaryItem label={commonT.carpentry.interiorDoorsAmount.label} value={data.interiorDoorsAmount} />}
                         <BooleanItem label={commonT.carpentry.installSlidingDoor.label} value={!!data.installSlidingDoor} />
                        {data.installSlidingDoor && <SummaryItem label={commonT.carpentry.slidingDoorAmount.label} value={data.slidingDoorAmount} />}
                        <BooleanItem label={commonT.carpentry.paintWalls.label} value={!!data.paintWalls} />
                        {data.paintWalls && <SummaryItem label={commonT.carpentry.paintWallsM2.label} value={`${data.paintWallsM2} m²`} />}
                        <BooleanItem label={commonT.carpentry.removeGotele.label} value={!!data.removeGotele} />
                        {data.removeGotele && <SummaryItem label={commonT.carpentry.removeGoteleM2.label} value={`${data.removeGoteleM2} m²`} />}
                    </CardContent>
                </Card>
            )}

             {(data.installAirConditioning || data.renovateExteriorCarpentry) && (
                <Card>
                    <CardHeader><CardTitle className='text-lg'>{stepT.optionals}</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <BooleanItem label={commonT.optionals.installAirConditioning.label} value={!!data.installAirConditioning} />
                        <BooleanItem label={commonT.optionals.renovateExteriorCarpentry.label} value={!!data.renovateExteriorCarpentry} />
                    </CardContent>
                </Card>
             )}


        </div>
    );
};
