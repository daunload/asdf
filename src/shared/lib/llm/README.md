# LLM Provider Configuration

This project supports multiple LLM providers for generating astrological card interpretations.

## Supported Providers

- **OpenAI** (GPT-4o-mini)
- **Google Gemini** (Gemini 1.5 Flash)

## Configuration

Set the following environment variables in your `.env` file:

### Provider Selection

```bash
# Choose between 'openai' or 'gemini' (default: openai)
LLM_PROVIDER=openai
```

### API Keys

**For OpenAI:**

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Get your OpenAI API key from: https://platform.openai.com/api-keys

**For Gemini:**

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your Gemini API key from: https://makersuite.google.com/app/apikey

## Example Configurations

### Using OpenAI (Default)

```bash
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-proj-...
```

### Using Gemini

```bash
LLM_PROVIDER=gemini
GEMINI_API_KEY=AIza...
```

## Notes

- Only the API key for your selected provider is required
- The application will validate that the appropriate API key is set for the chosen provider
- If `LLM_PROVIDER` is not set or invalid, it defaults to `openai`
- Both providers support the same retry logic and error handling
