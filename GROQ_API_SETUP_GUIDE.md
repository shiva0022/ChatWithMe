# Groq API Key Setup Guide

This guide will help you obtain a Groq API key and configure it for your chatbot project.

## 1. Sign Up for Groq
- Visit [https://groq.com/](https://groq.com/) and sign up for a free account.
- Verify your email address if required.

## 2. Access the Groq Console
- After logging in, go to the Groq Console or Dashboard.
- Navigate to the API Keys section (usually found under your account/profile settings).

## 3. Create a New API Key
- Click on "Create API Key" or similar button.
- Give your key a name (e.g., "Chatbot Project").
- Copy the generated API key. **Keep it secure!**

## 4. Add the Key to Your Project
- Open your `.env.local` file in your project root.
- Add the following line:

```
GROQ_API_KEY=your-groq-api-key-here
```

- Replace `your-groq-api-key-here` with the key you copied.

## 5. Restart Your Development Server
- After saving `.env.local`, restart your Next.js development server to apply changes.

## 6. Test the Integration
- Send a message in your chatbot UI.
- If everything is set up correctly, you should receive AI responses powered by Groq.

---
**Troubleshooting:**
- If you get errors about missing or invalid API key, double-check your `.env.local` entry and make sure you restarted the server.
- For further help, visit Groq's documentation or support.

## Useful Links
- [Groq Console](https://console.groq.com/)
- [Groq API Docs](https://console.groq.com/docs)
