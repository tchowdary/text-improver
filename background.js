// background.js

// Create context menu when extension is installed
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "improve-text",
    title: "Improve Text",
    contexts: ["selection"]
  });
});

// Also create context menu when extension starts
browser.contextMenus.create({
  id: "improve-text",
  title: "Polish",
  contexts: ["selection"]
});

async function improveText(text) {
  const apiKey = await browser.storage.local.get('anthropic_api_key');
  if (!apiKey.anthropic_api_key) {
    throw new Error("Please set your Anthropic API key in the extension popup");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey.anthropic_api_key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: [
          {
            type: "text",
            text: "Your task is to take the text provided and rewrite it into a clear, grammatically correct version while preserving the original meaning as closely as possible. Correct any spelling mistakes, punctuation errors, verb tense issues, word choice problems, and other grammatical mistakes. Format the text where appropriate and response contains only improved text without any commentary" + text
          }
        ]
      }]
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "API request failed");
  }

  const data = await response.json();
  return data.content[0].text
    .replace(/^"/, "")
    .replace(/"$/, "")
    .replace(/^Here'?s the improved text:?\s*/i, "")
    .trim();
}

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "improve-text") {
    try {
      const improvedText = await improveText(info.selectionText);
      browser.tabs.sendMessage(tab.id, {
        action: "showImprovedText",
        text: improvedText
      });
    } catch (error) {
      browser.tabs.sendMessage(tab.id, {
        action: "showError",
        error: error.message
      });
    }
  }
});