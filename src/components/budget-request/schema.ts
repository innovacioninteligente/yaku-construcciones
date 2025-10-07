import * as z from 'zod';

const bathroomSchema = z.object({
  quality: z.enum(['basic', 'medium', 'premium']).optional(),
  wallTilesM2: z.coerce.number().optional(),
  floorM2: z.coerce.number().optional(),
  installShowerTray: z.boolean().default(false),
  installShowerScreen: z.boolean().default(false),
  plumbing: z.boolean().default(false),
});

const kitchenSchema = z.object({
    renovate: z.boolean().default(false),
    quality: z.enum(['basic', 'medium', 'premium']).optional(),
    demolition: z.boolean().default(false),
    wallTilesM2: z.coerce.number().optional(),
    floorM2: z.coerce.number().optional(),
    plumbing: z.boolean().default(false),
});

const electricalRoomSchema = z.object({
  sockets: z.coerce.number().optional(),
  lights: z.coerce.number().optional(),
});

export const detailedFormSchema = z.object({
  // Contact Info
  name: z.string().min(2, { message: 'El nombre es obligatorio.' }),
  email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido.' }),
  phone: z.string().min(9, { message: 'Por favor, introduce un número de teléfono válido.' }),
  address: z.string().min(5, { message: 'La dirección del proyecto es necesaria.' }),
  
  // Project Definition
  propertyType: z.enum(['residential', 'commercial', 'office']),
  projectScope: z.enum(['integral', 'partial']),
  partialScope: z.array(z.string()).optional(),
  totalAreaM2: z.coerce.number().min(1, 'La superficie debe ser de al menos 1 m²'),
  
  // Residential specific
  numberOfRooms: z.coerce.number().min(0, 'El número de habitaciones no puede ser negativo.').optional(),
  numberOfBathrooms: z.coerce.number().min(0, 'El número de baños no puede ser negativo.').optional(),

  // Commercial / Office specific
  workstations: z.coerce.number().optional(),
  meetingRooms: z.coerce.number().optional(),
  
  // Demolitions
  demolishPartitions: z.boolean().default(false),
  demolishPartitionsM2: z.coerce.number().optional(),
  removeDoors: z.boolean().default(false),
  removeDoorsAmount: z.coerce.number().optional(),
  
  // Bathrooms
  bathrooms: z.array(bathroomSchema).optional(),
  
  // Kitchen
  kitchen: kitchenSchema.optional(),

  // Ceilings
  installFalseCeiling: z.boolean().default(false),
  falseCeilingM2: z.coerce.number().optional(),
  soundproofRoom: z.boolean().default(false),
  soundproofRoomM2: z.coerce.number().optional(),

  // Electricity
  renovateElectricalPanel: z.boolean().default(false),
  electricalKitchen: electricalRoomSchema.optional(),
  electricalLivingRoom: electricalRoomSchema.extend({ tv: z.boolean().default(false) }).optional(),
  electricalBedrooms: z.array(electricalRoomSchema).optional(),

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
}).superRefine((data, ctx) => {
    // Demolition Step
    if (data.demolishPartitions && (!data.demolishPartitionsM2 || data.demolishPartitionsM2 <= 0)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['demolishPartitionsM2'],
            message: 'Los metros cuadrados son obligatorios.',
        });
    }
    if (data.removeDoors && (!data.removeDoorsAmount || data.removeDoorsAmount <= 0)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['removeDoorsAmount'],
            message: 'La cantidad de puertas es obligatoria.',
        });
    }

    // Kitchen Step
    if (data.kitchen?.renovate) {
        if (!data.kitchen.quality) {
             ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['kitchen.quality'], message: 'La calidad es obligatoria.' });
        }
        if (!data.kitchen.wallTilesM2 || data.kitchen.wallTilesM2 <= 0) {
             ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['kitchen.wallTilesM2'], message: 'Los m² de alicatado son obligatorios.' });
        }
         if (!data.kitchen.floorM2 || data.kitchen.floorM2 <= 0) {
             ctx.addIssue({ code: zZodIssueCode.custom, path: ['kitchen.floorM2'], message: 'Los m² de suelo son obligatorios.' });
        }
    }

    // Ceilings Step
    if (data.installFalseCeiling && (!data.falseCeilingM2 || data.falseCeilingM2 <= 0)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['falseCeilingM2'], message: 'Los metros cuadrados son obligatorios.' });
    }
    if (data.soundproofRoom && (!data.soundproofRoomM2 || data.soundproofRoomM2 <= 0)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['soundproofRoomM2'], message: 'Los metros cuadrados son obligatorios.' });
    }

    // Carpentry Step
    if (data.renovateInteriorDoors && (!data.interiorDoorsAmount || data.interiorDoorsAmount <= 0)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['interiorDoorsAmount'], message: 'La cantidad de puertas es obligatoria.' });
    }
    if (data.installSlidingDoor && (!data.slidingDoorAmount || data.slidingDoorAmount <= 0)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['slidingDoorAmount'], message: 'La cantidad de puertas es obligatoria.' });
    }
    if (data.paintWalls && (!data.paintWallsM2 || data.paintWallsM2 <= 0)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['paintWallsM2'], message: 'Los metros cuadrados son obligatorios.' });
    }
    if (data.removeGotele && (!data.removeGoteleM2 || data.removeGoteleM2 <= 0)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['removeGoteleM2'], message: 'Los metros cuadrados son obligatorios.' });
    }

});


export type DetailedFormValues = z.infer<typeof detailedFormSchema>;
