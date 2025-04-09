document.addEventListener("DOMContentLoaded", () => {
  // Select elements
  const uploadInput = document.getElementById('pdf-upload');
  const uploadBtn = document.getElementById('upload-btn');
  const generateBtn = document.getElementById('generate-btn');
  const filePreview = document.getElementById('file-preview');
  const loader = document.getElementById('loader');
  const summaryText = document.getElementById('summary-text');
  const result = document.getElementById('result');
  const messageBox = document.getElementById('message');
  const copyBtn = document.getElementById('copy-btn');
  const videoBtn = document.getElementById('video-btn');
  const flowchartSection = document.getElementById('flowchart-section');
  const mermaidDiv = document.getElementById('mermaid-diagram');

  // Open file picker on Upload button click
  uploadBtn.addEventListener("click", () => {
    uploadInput.click();
  });

  // Show selected filename and enable Generate button
  uploadInput.addEventListener("change", () => {
    const file = uploadInput.files[0];
    if (file) {
      filePreview.textContent = `✅ "${file.name}" uploaded successfully`;
      filePreview.classList.remove("hidden");
      generateBtn.disabled = false;
    }
  });

  // Handle "Generate" button
  generateBtn.addEventListener("click", async () => {
    const file = uploadInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    // UI loading state
    loader.classList.remove("hidden");
    messageBox.classList.add("hidden");
    result.style.display = "none";
    flowchartSection.style.display = "none";

    try {
      // Send PDF to backend
      const response = await fetch("http://127.0.0.1:5000/generate-summary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      // Display summary
      if (data.summary) {
        summaryText.value = data.summary;
        result.style.display = "block";
        showMessage("Summary generated successfully!", "success");
      }

      // Display Mermaid diagram
      if (data.flowchart && data.flowchart.includes("graph")) {
        mermaidDiv.removeAttribute("data-processed"); // Reset state
        mermaidDiv.innerHTML = "";                    // Clear previous
        mermaidDiv.textContent = data.flowchart;      // Set new code
        flowchartSection.style.display = "block";

        // Trigger Mermaid rendering
        setTimeout(() => {
          window.mermaid.init(undefined, mermaidDiv);
        }, 100);
      } else {
        flowchartSection.style.display = "none";
      }

    } catch (err) {
      showMessage("Error: " + err.message, "error");
    } finally {
      loader.classList.add("hidden");
    }
  });

  // Copy summary text to clipboard
  copyBtn.addEventListener("click", () => {
    summaryText.select();
    document.execCommand("copy");
    showMessage("Copied to clipboard!", "success");
  });

  // Placeholder for video generation feature
  videoBtn.addEventListener("click", () => {
    showMessage("Video generation coming soon!", "info");
  });

  // Utility function to show status messages
  function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = `message ${type}`;
    messageBox.classList.remove("hidden");
    setTimeout(() => {
      messageBox.classList.add("hidden");
    }, 4000);
  }
});
