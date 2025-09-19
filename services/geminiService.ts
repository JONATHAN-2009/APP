
import { GoogleGenAI } from "@google/genai";
import type { GroundingSource } from '../types';

interface BriefingResult {
    text: string;
    sources: GroundingSource[];
}

// This function now relies on the API_KEY being set as an environment variable.
export async function generateSportsBriefing(sports: string[]): Promise<BriefingResult> {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API Key is missing. Please set it in your environment variables.");
    }
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Generate a short, exciting, and up-to-date sports news briefing for today, focusing on the following sports: ${sports.join(', ')}. Cover the most important headlines, results, or upcoming events. Keep it concise and engaging, like a sports news anchor's script. Structure the output with clear headings for each sport.`;

    try {
        // Using 'gemini-2.5-flash', the recommended model for general text tasks.
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const sources: GroundingSource[] = [];
        if (groundingChunks) {
            for (const chunk of groundingChunks) {
                if(chunk.web) {
                    sources.push({
                        uri: chunk.web.uri,
                        title: chunk.web.title || 'Untitled Source',
                    });
                }
            }
        }
        
        return {
            text: response.text,
            sources: sources
        };

    } catch (error) {
        console.error("Error generating sports briefing:", error);
        throw new Error("Failed to communicate with the Gemini API for text generation. Please check your API key and network connection.");
    }
}

// This function now relies on the API_KEY being set as an environment variable.
export async function generateBriefingImage(briefingText: string): Promise<string> {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API Key is missing. Please set it in your environment variables.");
    }
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Create a vibrant, abstract, and dynamic digital art image that visually represents the following sports news: "${briefingText.substring(0, 300)}...". The style should be modern, energetic, and suitable for a sports news application header. Do not include any text in the image. Focus on dynamic shapes, team colors, and motion.`;

    try {
        // Using 'imagen-4.0-generate-001' for high-quality image generation as recommended.
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("Image generation failed, no images returned.");
        }

        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;

    } catch (error) {
        console.error("Error generating briefing image:", error);
        throw new Error("Failed to communicate with the Imagen API for image generation. Please check your API key and network connection.");
    }
}