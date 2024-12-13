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
  const response = await fetch(
    `http://localhost:3000/api/summarize?text=${encodeURIComponent(text)}`
  );
  const data = await response.json();
  hideLoadingSection();
  console.log(response);
  console.log(data);
  if (data != null) {
    textOutput.value = data;
  }
}

function displayLoadingSection() {
  loadingSection.style.display = "flex";
}

function hideLoadingSection() {
  loadingSection.style.display = "none";
}
