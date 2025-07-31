# Multi-Model AI Integration Setup Guide

This guide explains how to configure multiple AI models (Groq, Gemini, RAG) for your ChatWithMe application.

## Environment Variables

Create a `.env.local` file in your project root and add the following variables:

### Required for Groq (Already configured)
```bash
GROQ_API_KEY=your_groq_api_key_here
```

### Optional for Google Gemini
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### Optional for RAG Model
```bash
RAG_API_KEY=your_rag_api_key_here
RAG_API_URL=http://localhost:8000/api/rag
```

## Getting API Keys

### 1. Groq API Key (Already Done)
- Visit [console.groq.com](https://console.groq.com)
- Create account and generate API key

### 2. Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### 3. RAG Model Setup
For RAG (Retrieval-Augmented Generation), you'll need:
1. A vector database (e.g., Pinecone, Weaviate, Chroma)
2. Document embeddings service
3. Your own RAG API endpoint

## Model Features

### 🚀 Groq (Llama)
- **Speed**: Ultra-fast responses
- **Use Case**: General conversations, coding help
- **Cost**: Free tier available

### 💎 Google Gemini
- **Strength**: Advanced reasoning, multimodal
- **Use Case**: Complex analysis, creative tasks
- **Cost**: Pay-per-use

### 📚 RAG Model
- **Strength**: Knowledge-based responses
- **Use Case**: Document Q&A, domain-specific queries
- **Setup**: Requires custom implementation

## Usage

1. Users can switch between models using the dropdown in the chat interface
2. The selected model is sent with each request
3. If a model is not configured, it falls back to a default response
4. Model information is displayed in the chat interface

## Model Availability

- Models are automatically detected based on configured API keys
- Only configured models appear in the selection dropdown
- Groq is the default fallback model

## Testing

Test each model by:
1. Adding the API key to `.env.local`
2. Restarting your development server
3. Selecting the model in the chat interface
4. Sending a test message

## Troubleshooting

### Model not appearing in dropdown
- Check if the API key is correctly set in `.env.local`
- Restart the development server
- Check browser console for configuration errors

### API errors
- Verify API key validity
- Check rate limits and quotas
- Ensure proper network connectivity

### RAG model issues
- Verify RAG API endpoint is running
- Check document embeddings are properly indexed
- Ensure vector database is accessible

## Future Enhancements

- Model-specific settings (temperature, max tokens)
- Model performance analytics
- Custom model configurations
- Model usage statistics
