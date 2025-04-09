// Core UI elements
const fileUpload = document.getElementById('pdf-upload');
const fileName = document.getElementById('file-name');
const generateBtn = document.getElementById('generate-btn');
const scriptOutput = document.getElementById('script-output');
const copyBtn = document.getElementById('copy-btn');
const videoBtn = document.getElementById('video-btn');
const loading = document.getElementById('loading');
const message = document.getElementById('message');

// Initialize event listeners
function initializeEventListeners() {
    // File upload handling
    fileUpload.addEventListener('change', handleFileUpload);
    
    // Generate script button listener
    generateBtn.addEventListener('click', handleGenerateScript);
    
    // Copy to clipboard
    copyBtn.addEventListener('click', handleCopyScript);
    
    // Video generation - for HeyGen API integration
    videoBtn.addEventListener('click', handleVideoGeneration);
}

// File upload handler
function handleFileUpload() {
    if (this.files.length > 0) {
        const file = this.files[0];
        if (file.type === 'application/pdf') {
            fileName.textContent = file.name;
            generateBtn.disabled = false;
            showMessage('PDF uploaded successfully', 'success');
        } else {
            showMessage('Please select a PDF file', 'error');
            fileName.textContent = '';
        }
    }
}

// Generate script handler
function handleGenerateScript() {
    // Show loading state
    loading.classList.remove('hidden');
    scriptOutput.value = '';
    
    // BACKEND INTEGRATION POINT:
    // 1. Get the PDF file: fileUpload.files[0]
    // 2. Send to Gemini API
    // 3. Process response
    // 4. Update scriptOutput.value with the result
    // 5. Hide loading: loading.classList.add('hidden')
    // 6. Enable buttons: copyBtn.disabled = false; videoBtn.disabled = false
    // 7. Show success message: showMessage('Script generated successfully', 'success')
}

// Copy script handler
function handleCopyScript() {
    scriptOutput.select();
    document.execCommand('copy');
    showMessage('Script copied to clipboard', 'info');
}

// Video generation handler
function handleVideoGeneration() {
    // BACKEND INTEGRATION POINT:
    // 1. Get script content: scriptOutput.value
    // 2. Send to HeyGen API
    // 3. Process response
    // 4. Show appropriate message
}

// Show message function
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
    
    setTimeout(() => {
        message.textContent = '';
        message.className = '';
    }, 3000);
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeEventListeners);