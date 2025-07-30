# 🤖 OpenAI API Setup & Cost Management Guide

## 1️⃣ **Get Your OpenAI API Key**
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click **"Create new secret key"**
4. Copy the key (starts with `sk-...`)

## 2️⃣ **Add Your API Key to the Project**
1. Open your `.env.local` file
2. Add this line (replace with your actual key):
   ```env
   OPENAI_API_KEY=sk-your-actual-openai-api-key-here
   ```
3. Save the file

## 3️⃣ **Restart Your Development Server**
```bash
npm run dev
```

## 4️⃣ **Test Your Chatbot**
- Sign in to your app
- Send a message in the chat
- You should get real GPT responses!

---

# 💰 OpenAI API Cost Management

## **Pricing (as of 2025)**
- **GPT-3.5-turbo**: $0.50 per 1M input tokens, $1.50 per 1M output tokens
- **GPT-4**: $30 per 1M input tokens, $60 per 1M output tokens

## **Typical Usage Example**
- 1 message ≈ 50-200 tokens
- 100 messages ≈ $0.01 to $0.05
- 1,000 messages ≈ $0.10 to $0.50

## **Free Trial Credits**
- $5 free credits for new accounts (expire in 3 months)
- Great for testing and small projects

## **How to Monitor Usage & Set Limits**
1. Go to [OpenAI Usage Dashboard](https://platform.openai.com/usage)
2. View your token usage and cost breakdown
3. Set up email alerts for spending
4. Add a payment method only when ready (minimum $5)

## **Cost Control Tips**
- Use **GPT-3.5-turbo** for lowest cost
- Limit `max_tokens` in API calls (default: 1000)
- Limit context to last 10 messages
- Use fallback responses if API fails
- Monitor usage regularly in dashboard

## **What Happens If You Exceed Your Limit?**
- API returns a quota/rate limit error
- Your app will automatically fallback to mock responses
- No surprise charges; you only pay for what you use

---

# 🛡️ Security & Best Practices
- **Never share your API key publicly**
- Store your key in `.env.local` (never commit to git)
- Rotate your key if you suspect it’s compromised
- Use environment variables for all secrets

---

# 🚀 Next Steps
- Try sending different types of questions to your chatbot
- Monitor your usage and cost in the OpenAI dashboard
- Upgrade to GPT-4 if you need more advanced responses
- Explore additional OpenAI features (image, audio, etc.)

---

**Your chatbot is now powered by real AI and ready for production!**
