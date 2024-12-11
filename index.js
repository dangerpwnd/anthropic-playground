import Anthropic from "@anthropic-ai/sdk/index.mjs";
require("dotenv").config();

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_KEY,
});

// Element Selectors
const textInput = document.getElementById("text-input");
const textOutput = document.getElementById("text-output");
const summarizeButton = document.getElementById("summarize-btn");
const loadingSection = document.getElementById("loading-section");

// Event Listeners
summarizeButton.addEventListener("click", summarizeText);

// Functions
async function summarizeText() {
  displayLoadingSection();
  const text = textInput.value;
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
  hideLoadingSection();
  console.log(response);
  textOutput.value = response.content[0].text;
}

function displayLoadingSection() {
  loadingSection.style.display = "flex";
}

function hideLoadingSection() {
  loadingSection.style.display = "none";
}
