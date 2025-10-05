async function humanize() {
  const input = document.getElementById("inputText").value.trim();
  if (!input) {
    alert("Please enter some text first!");
    return;
  }

  // Show progress bar
  const progressBarContainer = document.getElementById("progressBarContainer");
  const progressBar = document.getElementById("progressBar");
  progressBarContainer.style.display = "block";
  progressBar.style.width = "0%";

  let width = 0;
  const interval = setInterval(() => {
    if (width >= 90) return;
    width += 10;
    progressBar.style.width = width + "%";
  }, 300);

  try {
    const response = await fetch("http://127.0.0.1:5000/humanize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    if (!response.ok) {
      document.getElementById("result").innerHTML =
        "<p style='color:red;'>Error: " + response.statusText + "</p>";
      return;
    }

    const data = await response.json();
    document.getElementById("result").textContent = data.humanized_text;

    // Update counters
    updateCounter("result", "outputCounter");
  } catch (err) {
    document.getElementById("result").innerHTML =
      "<p style='color:red;'>Error: " + err.message + "</p>";
  } finally {
    clearInterval(interval);
    progressBar.style.width = "100%";
    setTimeout(() => (progressBarContainer.style.display = "none"), 500);
  }
}

// Copy output to clipboard
function copyOutput() {
  const outputText = document.getElementById("result").textContent;
  if (!outputText) {
    alert("Nothing to copy!");
    return;
  }
  navigator.clipboard.writeText(outputText).then(() => {
    alert("Copied to clipboard!");
  });
}

// Word & char counters
function updateCounter(textareaId, counterId) {
  const text =
    document.getElementById(textareaId).value ||
    document.getElementById(textareaId).textContent;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  document.getElementById(counterId).textContent =
    `${words} words | ${chars} chars`;
}

document.getElementById("inputText").addEventListener("input", () => {
  updateCounter("inputText", "inputCounter");
});
