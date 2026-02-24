'use server';
/**
 * @fileOverview An AI Compliance Assistant that answers natural language questions about the compliance status of entities.
 *
 * - aiComplianceAssistant - A function that handles the compliance query process.
 * - ComplianceAssistantInput - The input type for the aiComplianceAssistant function.
 * - ComplianceAssistantOutput - The return type for the aiComplianceAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema for the compliance assistant
const ComplianceAssistantInputSchema = z.object({
  query: z.string().describe('The natural language question about compliance status.'),
  shipmentId: z.string().optional().describe('Optional: Identifier for a specific shipment.'),
  factoryId: z.string().optional().describe('Optional: Identifier for a specific factory.'),
});
export type ComplianceAssistantInput = z.infer<typeof ComplianceAssistantInputSchema>;

// Output Schema for the compliance assistant
const ComplianceAssistantOutputSchema = z.object({
  answer: z.string().describe('A comprehensive, explainable answer to the compliance query.'),
  isCompliant: z.boolean().describe('True if the entity is compliant, false otherwise.'),
  citations: z.array(z.string()).describe('List of policy documents or sections cited.'),
  explanation: z.string().describe('Detailed explanation of the compliance status and reasoning.'),
});
export type ComplianceAssistantOutput = z.infer<typeof ComplianceAssistantOutputSchema>;

// Mock tool to simulate retrieving compliance details from a dynamic policy knowledge base
const getRegulatoryComplianceDetails = ai.defineTool(
  {
    name: 'getRegulatoryComplianceDetails',
    description: 'Retrieves compliance details and relevant regulatory policies for a given entity (shipment or factory) based on a specific query.',
    inputSchema: z.object({
      query: z.string().describe('The user\'s query.'),
      entityType: z.enum(['shipment', 'factory']).describe('The type of entity (shipment or factory).'),
      entityId: z.string().describe('The identifier of the entity.'),
    }),
    outputSchema: z.object({
      status: z.enum(['compliant', 'non-compliant', 'unknown']).describe('The compliance status.'),
      details: z.string().describe('Detailed information about the compliance check.'),
      relevantPolicyExcerpt: z.string().describe('An excerpt from the relevant policy document.'),
      citations: z.array(z.string()).describe('Specific policy document names or sections.'),
    }),
  },
  async (input) => {
    // This is a mock implementation. In a real application, this would
    // interact with a database, a real-time data stream, or a Pathway RAG system.
    console.log(`Mock tool invoked: getRegulatoryComplianceDetails with input: ${JSON.stringify(input)}`);

    if (input.entityType === 'factory' && input.entityId === 'Factory-21') {
      if (input.query.toLowerCase().includes('pm2.5')) {
        return {
          status: 'non-compliant',
          details: 'Factory-21 is currently exceeding PM2.5 emission thresholds due to outdated filtration systems during peak production hours.',
          relevantPolicyExcerpt: 'CPCB 2024 Emission Norms, Section 3.2.1: PM2.5 limits for industrial zones (max 50 µg/m³ 24-hr average).',
          citations: ['CPCB 2024 Emission Norms, Section 3.2.1'],
        };
      } else if (input.query.toLowerCase().includes('co2')) {
        return {
          status: 'compliant',
          details: 'Factory-21 is within CO2 emission limits, thanks to recent upgrades in energy-efficient machinery.',
          relevantPolicyExcerpt: 'National Carbon Regulations, Chapter 5: CO2 caps for manufacturing facilities (annual average).',
          citations: ['National Carbon Regulations, Chapter 5'],
        };
      }
    } else if (input.entityType === 'shipment' && input.entityId === 'Shipment-45') {
        if (input.query.toLowerCase().includes('emission norms')) {
            return {
                status: 'compliant',
                details: 'Shipment ID 45 is compliant with current fuel efficiency and emission standards for road transport as per GPS and IoT data.',
                relevantPolicyExcerpt: 'Ministry of Transport Guidelines, Annexure B: Vehicle Emission Standards for Logistics (Euro VI equivalent).',
                citations: ['Ministry of Transport Guidelines, Annexure B'],
            };
        }
    }

    // Default or unknown case
    return {
      status: 'unknown',
      details: `Could not determine compliance status for ${input.entityType} ID ${input.entityId} based on the query.`,
      relevantPolicyExcerpt: 'No specific policy found for this query or entity.',
      citations: [],
    };
  }
);


// Define the prompt that uses the compliance tool
const aiComplianceAssistantPrompt = ai.definePrompt({
  name: 'aiComplianceAssistantPrompt',
  input: { schema: ComplianceAssistantInputSchema },
  output: { schema: ComplianceAssistantOutputSchema },
  tools: [getRegulatoryComplianceDetails],
  prompt: `
    You are GreenPulse Bharat AI, a sovereign regulatory auditor for the Ministry of Environment, specialized in evaluating compliance with environmental regulations.
    Your mission is to provide immediate, explainable, and policy-backed answers regarding the compliance status of factories or shipments.

    When asked about the compliance status of a specific factory or shipment, you must determine the \`entityType\` ('shipment' or 'factory') and \`entityId\` from the provided input (shipmentId or factoryId). Then, you must use the 'getRegulatoryComplianceDetails' tool with the user's \`query\`, the determined \`entityType\`, and \`entityId\` to retrieve relevant information.

    Based on the tool's output and your knowledge, explain whether the entity is compliant, non-compliant, or if the status is unknown, and why.
    Always cite the relevant policies or documents from the tool's output (specifically from the \`citations\` field) in your explanation.

    If the user's query is about a specific entity but does not explicitly provide a shipment ID or factory ID, your response should indicate that clarification is needed.
    If the tool returns 'unknown' status, clearly state that the compliance status could not be determined with the available information and suggest what might be needed (e.g., more specific query, different ID).

    Your final response MUST be a JSON object conforming to the following schema:
    \`\`\`json
    {{jsonSchema ComplianceAssistantOutputSchema}}
    \`\`\`

    User Query: {{{query}}}
    {{#if shipmentId}}
    Shipment ID: {{{shipmentId}}}
    {{/if}}
    {{#if factoryId}}
    Factory ID: {{{factoryId}}}
  `,
});

// Define the Genkit flow
const aiComplianceAssistantFlow = ai.defineFlow(
  {
    name: 'aiComplianceAssistantFlow',
    inputSchema: ComplianceAssistantInputSchema,
    outputSchema: ComplianceAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await aiComplianceAssistantPrompt(input);
    return output!;
  }
);

// Exported wrapper function
export async function aiComplianceAssistant(
  input: ComplianceAssistantInput
): Promise<ComplianceAssistantOutput> {
  return aiComplianceAssistantFlow(input);
}
