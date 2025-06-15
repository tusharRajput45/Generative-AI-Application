import { GoogleGenAI, Modality } from "@google/genai";
import fs from "fs";

export const textGenerative = async (req, res) => {
  try {
    const { prompt } = req.body;
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    if (!response || !response.text) {
      return res.status(400).json({ error: "No response text found" });
    }
    res.json({
      text: response.text,
    });
  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};

export const imageGenerative = async (req, res) => {
  try {
    const { prompt } = req.body;
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        // fs.writeFileSync("gemini-native-image.png", buffer);
        console.log("Image saved as gemini-native-image.png");
        res.json({
          image: buffer.toString("base64"),
        });
      }
    }
  } catch (error) {
    console.error("Gemini Image Error:", error.message);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};
