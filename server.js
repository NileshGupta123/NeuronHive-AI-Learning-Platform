import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// API endpoint for generating courses
app.post("/api/generate-courses", async (req, res) => {
  try {
    const { topic, level } = req.body;

    if (!topic || !level) {
      return res.status(400).json({ error: "Missing 'topic' or 'level' in request body" });
    }

    console.log("📤 Sending request to Gemini API...");

    const geminiResponse = await fetch("https://gemini.api.endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `
Please return a JSON array of courses for the following learning goal:
Topic: ${topic}
Level: ${level}

Format the response like this:

[
  {
    "title": "Course Title",
    "keyTopics": ["Topic 1", "Topic 2", "Topic 3"]
  }
]

Only return valid JSON.
        `,
      }),
    });

    const aiRaw = await geminiResponse.json();

    const aiText = aiRaw.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      throw new Error("No text returned from AI.");
    }

    let courses;
    try {
      courses = JSON.parse(aiText);
    } catch (err) {
      console.error("⚠️ Failed to parse AI response as JSON:", aiText);
      return res.status(500).json({
        error:
          "Failed to parse AI response. Make sure the prompt asks for valid JSON.",
        rawResponse: aiText,
      });
    }

    res.json({ courses });
  } catch (err) {
    console.error("💥 Error in /api/generate-courses:", err);
    res.status(500).json({ error: "Error generating courses" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
