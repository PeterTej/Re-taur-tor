
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const restorePhoto = async (base64ImageData: string, mimeType: string): Promise<string | null> => {
  try {
    const model = 'gemini-2.5-flash-image';
    const prompt = "Obnov túto starú a poškodenú fotografiu. Tvojou úlohou je vylepšiť jej celkovú kvalitu. Zameraj sa na nasledujúce úlohy: 1. Zvýš ostrosť detailov. 2. Odstráň všetky viditeľné škrabance, praskliny a fľaky. 3. Oživ a vyváž farby, ak je fotografia farebná, alebo vylepši kontrast a tóny, ak je čiernobiela. 4. Zníž digitálny šum a zrnitosť bez straty dôležitých detailov. Vráť iba opravený obrázok.";

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    return null;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Komunikácia s AI zlyhala.");
  }
};
