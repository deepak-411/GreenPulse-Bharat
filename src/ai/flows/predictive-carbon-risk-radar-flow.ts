'use server';
/**
 * @fileOverview A Genkit flow for predicting carbon emission spikes or non-compliance events.
 *               It takes an industrial zone ID or a supply chain ID and a timeframe,
 *               and outputs a prediction including likelihood, causes, and recommended actions.
 *
 * - predictiveCarbonRiskRadar - A function that handles the predictive risk radar process.
 * - PredictiveCarbonRiskRadarInput - The input type for the predictiveCarbonRiskRadar function.
 * - PredictiveCarbonRiskRadarOutput - The return type for the predictiveCarbonRiskRadar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveCarbonRiskRadarInputSchema = z.object({
  zoneId: z.string().optional().describe('The ID of the industrial zone to analyze.'),
  supplyChainId: z.string().optional().describe('The ID of the supply chain to analyze.'),
  timeframeHours: z.number().default(72).describe('The timeframe in hours for the prediction (e.g., 72 for 72 hours).'),
}).refine(data => (!!data.zoneId && !data.supplyChainId) || (!data.zoneId && !!data.supplyChainId), {
  message: 'Exactly one of zoneId or supplyChainId must be provided.',
});
export type PredictiveCarbonRiskRadarInput = z.infer<typeof PredictiveCarbonRiskRadarInputSchema>;

const PredictiveCarbonRiskRadarOutputSchema = z.object({
  predictionType: z.enum(['emission_spike', 'non_compliance']).describe("The type of predicted event: 'emission_spike' or 'non_compliance'."),
  entityId: z.string().describe('The ID of the industrial zone or supply chain for which the prediction is made. This should match the input zoneId or supplyChainId.'),
  likelihoodPercentage: z.number().min(0).max(100).describe('The likelihood of the event occurring, as a percentage (0-100).'),
  timeframeHours: z.number().describe('The timeframe in hours for which the prediction is valid. This should match the input timeframeHours.'),
  predictedCauses: z.string().describe('An explanation of the predicted causes for the event.'),
  recommendedActions: z.string().describe('Proactive interventions recommended to mitigate the risk.'),
});
export type PredictiveCarbonRiskRadarOutput = z.infer<typeof PredictiveCarbonRiskRadarOutputSchema>;

export async function predictiveCarbonRiskRadar(input: PredictiveCarbonRiskRadarInput): Promise<PredictiveCarbonRiskRadarOutput> {
  return predictiveCarbonRiskRadarFlow(input);
}

const predictiveCarbonRiskRadarPrompt = ai.definePrompt({
  name: 'predictiveCarbonRiskRadarPrompt',
  input: {schema: PredictiveCarbonRiskRadarInputSchema},
  output: {schema: PredictiveCarbonRiskRadarOutputSchema},
  prompt: `You are an expert environmental risk analyst for the GreenPulse Bharat AI platform. Your task is to provide a real-time predictive forecast for potential carbon emission spikes or non-compliance events.\n\nGiven the following context, simulate a comprehensive analysis and output a prediction in the specified JSON format:\n\n{{#if zoneId}}\nIndustrial Zone ID: {{{zoneId}}}\n{{/if}}\n{{#if supplyChainId}}\nSupply Chain ID: {{{supplyChainId}}}\n{{/if}}\nPrediction Timeframe: {{{timeframeHours}}} hours\n\nImagine you have access to real-time IoT sensor data (CO2, NOx, PM2.5), GPS logistics data (fuel rate, speed, delay), weather APIs (temperature, humidity), and historical compliance records for the specified entity. Based on this simulated data and typical patterns for such entities, predict the likelihood of an environmental event.\n\nCarefully consider:\n- Historical trends and known compliance issues for similar entities.\n- Potential operational patterns (e.g., peak production times, common transportation routes).\n- Environmental factors (e.g., weather conditions impacting dispersion).\n- Regulatory context (e.g., CPCB norms).\n\nGenerate a clear 'predictionType' (either 'emission_spike' or 'non_compliance'), a 'likelihoodPercentage' (0-100), detailed 'predictedCauses' for this forecast, and actionable 'recommendedActions' for proactive intervention.\nThe 'entityId' in your response should be the ID of the industrial zone or supply chain provided in the input, and 'timeframeHours' should also match the input.\n`,
});

const predictiveCarbonRiskRadarFlow = ai.defineFlow(
  {
    name: 'predictiveCarbonRiskRadarFlow',
    inputSchema: PredictiveCarbonRiskRadarInputSchema,
    outputSchema: PredictiveCarbonRiskRadarOutputSchema,
  },
  async (input) => {
    const {output} = await predictiveCarbonRiskRadarPrompt(input);

    if (!output) {
      throw new Error('Failed to get a prediction from the AI model.');
    }

    // Ensure entityId and timeframeHours from output match input, providing robustness.
    // The prompt explicitly asks the LLM to return these values matching the input.
    // If the LLM somehow deviates, this ensures consistency.
    const expectedEntityId = input.zoneId || input.supplyChainId;
    const expectedTimeframeHours = input.timeframeHours;

    return {
      ...output,
      entityId: expectedEntityId!, // Guaranteed to be present by input schema refine
      timeframeHours: expectedTimeframeHours,
    };
  }
);
