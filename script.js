document.addEventListener("DOMContentLoaded", () => {
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
  
    uploadBtn.addEventListener("click", () => {
      uploadInput.click();
    });
  
    uploadInput.addEventListener("change", () => {
      const file = uploadInput.files[0];
      if (file) {
        filePreview.textContent = `✅ "${file.name}" uploaded successfully`;
        filePreview.classList.remove("hidden");
        generateBtn.disabled = false;
      }
    });
  
    generateBtn.addEventListener("click", async () => {
      const file = uploadInput.files[0];
      if (!file) {
        showMessage("Please select a PDF file", "error");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
  
      loader.classList.remove("hidden");
      result.classList.add("hidden");
      messageBox.classList.add("hidden");
  
      try {
        const response = await fetch("http://127.0.0.1:5000/generate-summary", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
  
        if (data.summary) {
          summaryText.value = data.summary;
          result.classList.remove("hidden");
          copyBtn.disabled = false;
          videoBtn.disabled = false;
          showMessage("Script generated successfully!", "success");
        } else {
          showMessage(data.error || "Failed to generate summary", "error");
        }
      } catch (err) {
        showMessage("Server error: " + err.message, "error");
      } finally {
        loader.classList.add("hidden");
      }
    });
  
    copyBtn.addEventListener("click", () => {
      summaryText.select();
      document.execCommand("copy");
      showMessage("Script copied to clipboard!", "success");
    });
  
    videoBtn.addEventListener("click", () => {
      showMessage("Video generation coming soon!", "info");
    });
  
    function showMessage(message, type) {
      messageBox.textContent = message;
      messageBox.className = `message ${type}`;
      messageBox.classList.remove("hidden");
      setTimeout(() => {
        messageBox.classList.add("hidden");
      }, 4000);
    }
  });
  