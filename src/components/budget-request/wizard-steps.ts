export const WIZARD_STEPS = [
    { id: 'contact', fields: ['name', 'email', 'phone', 'address'] },
    { id: 'projectDefinition', fields: ['propertyType', 'projectScope', 'totalAreaM2', 'numberOfRooms', 'numberOfBathrooms', 'partialScope'] },
    { id: 'demolition', fields: ['demolishPartitions', 'demolishPartitionsM2', 'removeDoors', 'removeDoorsAmount'] },
    { id: 'bathroom' },
    { id: 'kitchen' },
    { id: 'workArea', fields: ['workstations', 'meetingRooms'] },
    { id: 'ceilings', fields: ['installFalseCeiling', 'falseCeilingM2', 'soundproofRoom', 'soundproofRoomM2'] },
    { id: 'electricity' },
    { id: 'carpentry', fields: ['renovateInteriorDoors', 'interiorDoorsAmount', 'installSlidingDoor', 'slidingDoorAmount', 'paintWalls', 'paintWallsM2', 'removeGotele', 'removeGoteleM2'] },
    { id: 'optionals', fields: ['installAirConditioning', 'renovateExteriorCarpentry'] },
    { id: 'summary' },
];
