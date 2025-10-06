'use server';

/**
 * @fileOverview Estimates project budgets based on user-provided details, suggesting materials and adjustments based on their priorities.
 *
 * - estimateProjectBudget - A function that handles the project budget estimation process.
 * - EstimateProjectBudgetInput - The input type for the estimateProjectBudget function.
 * - EstimateProjectBudgetOutput - The return type for the estimateProjectBudget function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateProjectBudgetInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('Detailed description of the construction or renovation project.'),
  priority: z
    .string()
    .describe(
      'The users priority (e.g., cost, quality, sustainability). Must be one of: cost, quality, sustainability.'
    ),
  budget: z
    .number()
    .describe(
      'The budget that the user wants to invest in the project. Must be a number greater than 0.'
    )
    .gt(0),
  desiredMaterials: z
    .string()
    .describe('The types of materials the user wants to use, if any.'),
});
export type EstimateProjectBudgetInput = z.infer<
  typeof EstimateProjectBudgetInputSchema
>;

const EstimateProjectBudgetOutputSchema = z.object({
  estimatedCost: z
    .number()
    .describe('The estimated cost of the project based on the provided details.'),
  suggestedMaterials: z
    .string()
    .describe(
      'Suggested materials based on the project description and user priorities.'
    ),
  adjustments: z
    .string()
    .describe(
      'Suggestions for adjustments to the project to better align with the budget and priorities.'
    ),
});
export type EstimateProjectBudgetOutput = z.infer<
  typeof EstimateProjectBudgetOutputSchema
>;

export async function estimateProjectBudget(
  input: EstimateProjectBudgetInput
): Promise<EstimateProjectBudgetOutput> {
  return estimateProjectBudgetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateProjectBudgetPrompt',
  input: {schema: EstimateProjectBudgetInputSchema},
  output: {schema: EstimateProjectBudgetOutputSchema},
  prompt: `You are an expert construction project estimator.  Based on the project details, priority, budget and
  desired materials, create an estimate for the project.   Provide a cost estimate, suggest some materials, and
  suggest adjustments to the project to better align with the budget and priorities.

  Project Description: {{{projectDescription}}}
  Priority: {{{priority}}}
  Budget: {{{budget}}}
  Desired Materials: {{{desiredMaterials}}}

  Ensure that the output you generate is valid JSON.  The fields should be populated as follows.

  estimatedCost:  A number indicating the total cost for the project, in US dollars.
  suggestedMaterials: A comma separated list of materials that should be used, based on the priority of the project.
  adjustments:  A comma separated list of adjustments that can be made to the project to better align with the budget and priorities.

  Make sure that you consider all of the input parameters and create the best response possible.
  `,
});

const estimateProjectBudgetFlow = ai.defineFlow(
  {
    name: 'estimateProjectBudgetFlow',
    inputSchema: EstimateProjectBudgetInputSchema,
    outputSchema: EstimateProjectBudgetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
