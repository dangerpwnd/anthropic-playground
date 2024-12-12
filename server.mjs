import Anthropic from "@anthropic-ai/sdk/index.mjs";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_KEY,
});

const app = express();
const port = 3000;

app.get("/api/summarize", async (req, res) => {
  try {
    const text = req.query.text;
    const response = await anthropic.messages.create({
      model: "",
      max_tokens: 200,
      system:
        "You are a text summarizer. When asked to summarize a text, send back a summary.",
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: `Summarize this text: ${text}` }],
        },
      ],
    });
    res.json(response.content[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
