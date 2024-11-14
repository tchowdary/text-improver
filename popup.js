document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('api-key');
  const saveButton = document.getElementById('save');
  const statusDiv = document.getElementById('status');

  // Load saved API key
  browser.storage.local.get('anthropic_api_key').then((result) => {
    if (result.anthropic_api_key) {
      apiKeyInput.value = result.anthropic_api_key;
    }
  });

  saveButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
      statusDiv.textContent = 'Please enter an API key';
      return;
    }

    browser.storage.local.set({ anthropic_api_key: apiKey }).then(() => {
      statusDiv.textContent = 'API key saved successfully!';
      statusDiv.style.color = '#008800';
      setTimeout(() => {
        statusDiv.textContent = '';
      }, 2000);
    });
  });
});