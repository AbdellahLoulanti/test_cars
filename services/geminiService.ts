
import { GoogleGenAI } from '@google/genai';
import { Car } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development and should not happen in the target environment.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

// Initialize the Google AI client. A new instance is created for each call
// to ensure the latest API key from the environment is used.
const getAiClient = () => new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates a short, exciting marketing description for a car using the Gemini API.
 * @param car The car object to generate a description for.
 * @returns A promise that resolves to the generated description string.
 */
export const generateCarDescription = async (car: Car): Promise<string> => {
  if (!API_KEY) {
    return "Experience the pinnacle of automotive excellence with this stunning vehicle.";
  }
  
  const ai = getAiClient();
  const model = 'gemini-2.5-flash';
  
  const prompt = `Generate a short, exciting, and luxurious marketing description for a ${car.year} ${car.make} ${car.model}. 
  This car is a ${car.type}. 
  Highlight its key features like ${car.features.join(', ')}. 
  Keep it concise, under 40 words, and use evocative language suitable for a premium car rental service.`;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
    });
    
    // The .text property is the simplest way to get the text output.
    const description = response.text.trim();
    
    // Simple cleanup of potential markdown or unwanted characters
    return description.replace(/[*_`]/g, '');

  } catch (error) {
    console.error(`Error generating content with Gemini for ${car.make} ${car.model}:`, error);
    // Provide a graceful fallback description
    return `Discover an unparalleled driving experience with the ${car.year} ${car.make} ${car.model}. Combining luxury, performance, and cutting-edge technology.`;
  }
};
