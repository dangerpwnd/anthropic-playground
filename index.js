// Element Selectors
const textInput = document.getElementById("text-input");
const textOutput = document.getElementById("text-output");
const summarizeButton = document.getElementById("summarize-btn");
const loadingSection = document.getElementById("loading-section");

// Event Listeners
summarizeButton.addEventListener("click", summarizeText);

// Functions
function summarizeText() {
  return;
}

function displayLoadingSection() {
  loadingSection.style.display = "flex";
}

function hideLoadingSection() {
  loadingSection.style.display = "none";
}
