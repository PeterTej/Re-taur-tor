import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const restorePhoto = async (base64ImageData: string, mimeType: string): Promise<string | null> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const prompt = "Obnov túto starú a poškodenú fotografiu. Tvojou úlohou je vylepšiť jej celkovú kvalitu. Zameraj sa na nasledujúce úlohy: 1. Zvýš ostrosť detailov. 2. Odstráň všetky viditeľné škrabance, praskliny a fľaky. 3. Oživ a vyváž farby, ak je fotografia farebná, alebo vylepši kontrast a tóny, ak je čiernobiela. 4. Zníž digitálny šum a zrnitosť bez straty dôležitých detailov. Vráť iba opravený obrázok.";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64ImageData,
          mimeType: mimeType,
        },
      },
    ]);

    const response = result.response;
    // Check if there's an image in the response
    // For now, return the text (you may need to adjust based on actual API response)
    return response.text();
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Komunikácia s AI zlyhala.");
  }
};
