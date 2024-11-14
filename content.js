// content.js

// Add styles to document
const style = document.createElement('style');
style.textContent = `
  #text-improver-popup {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  }
  #text-improver-popup .improved-text {
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.5;
    font-size: 14px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 4px;
    border: 1px solid #e9ecef;
    max-height: 400px;
    overflow-y: auto;
    font-family: monospace;
  }
  #text-improver-popup button {
    background: #0066cc;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 8px;
  }
  #text-improver-popup button.close-btn {
    background: #6c757d;
  }
  #text-improver-popup button:hover {
    opacity: 0.9;
  }
  #text-improver-popup .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
  }
`;
document.head.appendChild(style);

function showPopup(text) {
  // Remove existing popup if any
  const existingPopup = document.getElementById('text-improver-popup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create popup element
  const popup = document.createElement('div');
  popup.id = 'text-improver-popup';
  popup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    z-index: 10000;
    max-width: 600px;
    width: 90%;
  `;

  // Create the content elements
  const title = document.createElement('h3');
  title.textContent = 'Improved Text';
  title.style.cssText = 'margin-top: 0; margin-bottom: 16px; color: #1a1a1a;';

  const textContainer = document.createElement('div');
  textContainer.className = 'improved-text';
  
  const textContent = document.createElement('p');
  textContent.textContent = text;
  textContainer.appendChild(textContent);

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'buttons';

  const copyButton = document.createElement('button');
  copyButton.textContent = 'Copy Again';
  copyButton.onclick = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.className = 'close-btn';
  closeButton.onclick = () => popup.remove();

  buttonContainer.appendChild(copyButton);
  buttonContainer.appendChild(closeButton);

  popup.appendChild(title);
  popup.appendChild(textContainer);
  popup.appendChild(buttonContainer);

  document.body.appendChild(popup);
}

// Listen for messages from background script
browser.runtime.onMessage.addListener(async (request) => {
  if (request.action === "showImprovedText") {
    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(request.text);
      
      // Show popup with improved text
      showPopup(request.text);
    } catch (error) {
      alert("Error copying to clipboard: " + error.message);
    }
  } else if (request.action === "showError") {
    alert(request.error);
  }
});