// server.js — Backend proxy for Gemini
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: 'The title of the suggested learning course.',
        },
        description: {
          type: Type.STRING,
          description: 'A brief, one-paragraph summary of what the user will learn in this course.',
        },
        keyTopics: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
          description: 'A list of key topics or modules covered in the course.',
        },
        difficulty: {
          type: Type.STRING,
          description: 'The estimated difficulty level, matching the user\'s current knowledge (e.g., Beginner, Intermediate, Advanced).',
        },
        platform: {
          type: Type.STRING,
          description: 'A suggested platform to find this course or similar content (e.g., Coursera, Udemy, freeCodeCamp, YouTube).',
        }
      },
      required: ["title", "description", "keyTopics", "difficulty", "platform"],
    },
};

app.post("/api/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const model = ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const result = await model;
    res.json({ text: result.text });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/generate-courses", async (req, res) => {
  try {
    const { learningGoal, currentKnowledge } = req.body;

    const prompt = `
      You are an expert curriculum advisor and learning architect. Your goal is to create personalized learning paths for developers.
      Based on the following user query, generate 3 unique and actionable learning course suggestions.

      User Query:
      - Learning Goal: ${learningGoal}
      - Current Knowledge Level: ${currentKnowledge}

      For each course suggestion, provide a clear title, a compelling description, a list of key topics to study, a difficulty rating that matches the user's knowledge level, and a suggested platform where they could find such a course.
      The suggestions should be highly relevant to the user's learning goal. Ensure the response is in the requested JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const jsonText = response.text.trim();
    // Sanitize response in case the model wraps the JSON in markdown backticks
    const sanitizedJsonText = jsonText.replace(/^```json/, '').replace(/```$/, '').trim();
    const courses = JSON.parse(sanitizedJsonText);

    res.json(courses);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
