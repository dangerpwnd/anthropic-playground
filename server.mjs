import Anthropic from "@anthropic-ai/sdk/index.mjs";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_KEY,
});

const app = express();
const port = 3000;

// Enable CORS for API routes
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static("public"));

app.get("/api/summarize", async (req, res) => {
  try {
    const text = req.query.text;
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-latest",
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

// Serve the index.html file for all other routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
