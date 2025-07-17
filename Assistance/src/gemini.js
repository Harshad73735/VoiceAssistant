// let apiKey="AIzaSyDrSEfURak3aOQjM2S1CSrutFcW8FLSjsY";

// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node
// // NEVER expose API keys in frontend!
// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function run(prompt) {
//   const chatSession = await model.startChat({
//     generationConfig,
//     history: [],
//   });

//   const result = await chatSession.sendMessage(prompt);
//   const text = await result.response.text();
//   console.log(text);
// }

// export default run;
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDrSEfURak3aOQjM2S1CSrutFcW8FLSjsY" });

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      maxOutputTokens: 45, // approx. 30 words
      temperature: 0.7, // optional: adjust randomness
    },
  });
  return response.text;
}

 export default main;
