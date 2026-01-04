
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fluxxAssistant = async (message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `Você é o Fluxx AI, o assistente oficial da plataforma Fluxx Stream. 
        A Fluxx é um ecossistema Web3 de streaming onde usuários ganham tokens PROTO ao ouvir música, rádio e assistir Reels.
        Responda de forma curta, moderna e encorajadora. 
        Use emojis como ⚡, 💎, 🚀.
        Sempre que falarem sobre ganhos, mencione o token PROTO.`,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Erro no assistente Fluxx:", error);
    return "Ops! Tive um pequeno curto-circuito. Pode repetir? ⚡";
  }
};
