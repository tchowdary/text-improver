# Text Improver Firefox Extension

A Firefox extension that improves selected text using Claude's API. Simply select text, right-click, and choose "Improve Text" to get an enhanced version with better grammar and clarity.

## Features
- Text improvement using Claude API
- Context menu integration
- Clipboard support
- Formatting preservation
- Clean popup interface

## Installation

1. Download the latest `.xpi` file from releases
2. Open Firefox and go to `about:addons`
3. Click the gear icon ⚙️ and select "Install Add-on From File..."
4. Choose the downloaded `.xpi` file

## Setup

1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. Click the extension icon in toolbar
3. Enter your API key and save

## Usage

1. Select any text on a webpage
2. Right-click and select "Improve Text"
3. View improved text in popup
4. Text is automatically copied to clipboard

## Development

### Prerequisites
- Node.js and npm
- web-ext tool (`npm install -g web-ext`)
- Firefox browser

### Local Development
```bash
# Clone repository
git clone https://github.com/yourusername/text-improver.git
cd text-improver

# Run extension locally
web-ext run

# Build extension
web-ext build

# Sign extension (requires Mozilla Add-ons developer account)
web-ext sign --channel=unlisted --api-key="your_key" --api-secret="your_secret"
```

### Files
```
extension/
├── manifest.json      # Extension configuration
├── popup.html        # API key input interface
├── popup.js         # API key management
├── background.js    # Context menu and API handling
├── content.js       # Text display and clipboard
└── icons/           # Extension icons
```

## License

MIT License

## Security

- API keys are stored securely in browser storage
- No data is stored externally
- All text processing happens via secure API calls
