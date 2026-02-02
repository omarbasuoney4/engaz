import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize Gemini API
// Note: In a real production app, never expose API keys on the client side.
// This is for the personal use case as requested.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
أنت "رفيق"، مساعد ذكي ومحفز داخل تطبيق يسمى "إنجاز" لتنظيم الوقت والمذاكرة.
- دورك: مساعدة الطالب في شرح الدروس، حل المسائل، تقديم نصائح للمذاكرة، والتذكير بالله.
- أسلوبك: ودود، مشجع، مختصر، وتستخدم إيموجي أحيانًا.
- اللغة: العربية.
- إذا سألك المستخدم عن شيء خارج المذاكرة (معلومات عامة)، أجب بدقة.
- حاول دائمًا ربط الإجابة بالإنتاجية وعدم إضاعة الوقت.
`;

export const sendMessageToGemini = async (
  history: ChatMessage[], 
  newMessage: string
): Promise<string> => {
  if (!apiKey) {
    return "عذراً، لم يتم إعداد مفتاح API الخاص بـ Gemini. يرجى إضافته في الكود.";
  }

  try {
    // Convert generic chat history to Gemini format if needed, 
    // but for simple single-turn or short context, generateContent with history context is easier.
    
    // Construct a prompt context from history
    const conversationHistory = history.map(msg => 
      `${msg.role === 'user' ? 'الطالب' : 'رفيق'}: ${msg.text}`
    ).join('\n');

    const fullPrompt = `${conversationHistory}\nالطالب: ${newMessage}\nرفيق:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "عذراً، لم أستطع فهم ذلك.";
  } catch (error) {
    console.error("AI Error:", error);
    return "حدث خطأ في الاتصال بالشبكة أو أن النموذج غير متوفر. حاول مرة أخرى.";
  }
};