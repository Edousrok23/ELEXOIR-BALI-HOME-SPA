import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { SERVICES } from "../constants";
import { ChatMessage, ServiceRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the available service IDs for the AI to choose from
const serviceIds = SERVICES.map(s => s.id).join(', ');
const serviceDescriptions = SERVICES.map(s => `${s.id}: ${s.name} (${s.description})`).join('\n');

// Tool Definition: Recommending a Treatment
const recommendTreatmentTool: FunctionDeclaration = {
  name: 'recommend_treatment',
  description: 'Select the best spa treatment for the user based on their described symptoms, mood, or request.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      treatmentId: {
        type: Type.STRING,
        description: `The exact ID of the service to recommend. Available IDs: ${serviceIds}`,
      },
      reasoning: {
        type: Type.STRING,
        description: 'A short, warm, feminine explanation of why this specific treatment is perfect for them.',
      },
    },
    required: ['treatmentId', 'reasoning'],
  },
};

export const getWellnessRecommendation = async (userQuery: string): Promise<ChatMessage> => {
  try {
    const systemPrompt = `
      You are 'Cherie', the AI Wellness Concierge for EXOTICA BALI HOME SPA.
      Your tone is soft, feminine, elegant, and professional.
      
      Your goal is to understand how the client is feeling (stressed, muscle pain, tired, wants beauty) and recommend ONE specific treatment from our menu using the 'recommend_treatment' tool.
      
      Here is our menu context:
      ${serviceDescriptions}
      
      Instructions:
      1. If the user describes a physical issue (back pain, tension) or emotional state (stress), IMMEDIATELY use the 'recommend_treatment' tool to suggest the best fit.
      2. If the user is just saying hello, respond politely as a concierge.
      3. Do not list multiple options in text. Pick the best one and use the tool.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemPrompt,
        tools: [{ functionDeclarations: [recommendTreatmentTool] }],
        toolConfig: { functionCallingConfig: { mode: 'AUTO' } },
      }
    });

    const candidate = response.candidates?.[0];
    const functionCall = candidate?.content?.parts?.find(part => part.functionCall)?.functionCall;

    // Handle Function Call (AI selected a service)
    if (functionCall) {
      const args = functionCall.args as any;
      const serviceId = args.treatmentId;
      const reasoning = args.reasoning;
      
      const service = SERVICES.find(s => s.id === serviceId);

      if (service) {
        return {
          id: Date.now().toString(),
          role: 'model',
          text: reasoning, // The text shown in the bubble
          recommendation: {
            serviceId: service.id,
            serviceName: service.name,
            reasoning: reasoning
          }
        };
      }
    }

    // Handle Standard Text Response (No specific recommendation)
    return {
      id: Date.now().toString(),
      role: 'model',
      text: response.text || "I'd love to help you relax. Could you tell me if you prefer a strong massage or something more gentle?"
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      id: Date.now().toString(),
      role: 'model',
      text: "I am having a brief moment of meditation. Please check our Price List for the full menu."
    };
  }
};