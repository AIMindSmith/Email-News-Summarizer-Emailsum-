
import { GoogleGenAI, Type } from "@google/genai";
import { Category, EmailSummary } from "../types";

export const processEmailContent = async (rawText: string): Promise<EmailSummary> => {
  // Always create a new instance right before the call to use the most recent key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following email content and extract structured data. 
    Content:
    """
    ${rawText}
    """`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sender: { type: Type.STRING, description: 'The person or entity that sent the email.' },
          community: { type: Type.STRING, description: 'The name of the newsletter or community (e.g., TLDR, Morning Brew).' },
          date: { type: Type.STRING, description: 'Date of the email in YYYY-MM-DD format.' },
          category: { 
            type: Type.STRING, 
            description: 'Choose from: Important News, News, AI Tools, Links, Prompts, Other.' 
          },
          summary: { type: Type.STRING, description: 'A concise 2-sentence summary of the main value proposition.' },
          keyLinks: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'The top 3-5 most important URLs mentioned.'
          },
          rawSubject: { type: Type.STRING, description: 'Original subject line of the email.' },
          importance: { type: Type.NUMBER, description: 'A score from 1-10 on how critical this is for a general professional to read.' }
        },
        required: ["sender", "community", "date", "category", "summary", "keyLinks", "rawSubject", "importance"]
      }
    }
  });

  const data = JSON.parse(response.text);
  
  return {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    category: Object.values(Category).includes(data.category) ? data.category : Category.OTHER
  };
};
