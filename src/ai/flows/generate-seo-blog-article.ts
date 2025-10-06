'use server';

/**
 * @fileOverview A SEO blog article generator AI agent.
 *
 * - generateSeoBlogArticle - A function that handles the SEO blog article generation process.
 * - GenerateSeoBlogArticleInput - The input type for the generateSeoBlogArticle function.
 * - GenerateSeoBlogArticleOutput - The return type for the generateSeoBlogArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoBlogArticleInputSchema = z.object({
  keywords: z
    .string()
    .describe('Comma separated keywords for the SEO blog article.'),
  competitorWebsites: z.string().describe('Comma separated list of competitor websites.'),
  language: z.enum(['castellano', 'catalán', 'ingles', 'alemán']).describe('The language of the article.'),
});
export type GenerateSeoBlogArticleInput = z.infer<typeof GenerateSeoBlogArticleInputSchema>;

const GenerateSeoBlogArticleOutputSchema = z.object({
  title: z.string().describe('The title of the SEO blog article.'),
  content: z.string().describe('The content of the SEO blog article.'),
});
export type GenerateSeoBlogArticleOutput = z.infer<typeof GenerateSeoBlogArticleOutputSchema>;

export async function generateSeoBlogArticle(input: GenerateSeoBlogArticleInput): Promise<GenerateSeoBlogArticleOutput> {
  return generateSeoBlogArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoBlogArticlePrompt',
  input: {schema: GenerateSeoBlogArticleInputSchema},
  output: {schema: GenerateSeoBlogArticleOutputSchema},
  prompt: `You are an expert SEO blog article writer specializing in construction and renovation services.

You will use the provided keywords and competitor websites to generate a SEO optimized blog article.

The blog article should be written in the specified language: {{{language}}}.

Keywords: {{{keywords}}}
Competitor Websites: {{{competitorWebsites}}}

Article Title:
{{#if title}}
  {{title}}
{{else}}
  [Provide an appropriate title for the article]
{{/if}}

Article Content:
{{#if content}}
  {{content}}
{{else}}
  [Write a compelling and SEO-optimized article based on the keywords and competitor websites provided]
{{/if}}`,
});

const generateSeoBlogArticleFlow = ai.defineFlow(
  {
    name: 'generateSeoBlogArticleFlow',
    inputSchema: GenerateSeoBlogArticleInputSchema,
    outputSchema: GenerateSeoBlogArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
