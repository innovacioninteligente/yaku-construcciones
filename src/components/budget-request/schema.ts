import * as z from 'zod';

export const detailedFormSchema = z.object({
  // Contact Info
  name: z.string().min(2, { message: 'El nombre es obligatorio.' }),
  email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido.' }),
  phone: z.string().min(9, { message: 'Por favor, introduce un número de teléfono válido.' }),
  address: z.string().min(5, { message: 'La dirección del proyecto es necesaria.' }),
  
  // Project Definition
  propertyType: z.enum(['residential', 'commercial', 'office']),
  projectScope: z.enum(['integral', 'partial']),
  totalAreaM2: z.coerce.number().min(1, 'La superficie debe ser de al menos 1 m²'),
  numberOfRooms: z.coerce.number().optional(),
  numberOfBathrooms: z.coerce.number().optional(),

  // Commercial / Office specific
  workstations: z.coerce.number().optional(),
  meetingRooms: z.coerce.number().optional(),
  
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

export type DetailedFormValues = z.infer<typeof detailedFormSchema>;
