# 🤖 AI Image Generation Integration Guide

This guide shows you how to integrate real AI image generation services into your application.

## 🚨 Current Status

The Hugging Face free inference API models are currently unavailable (404 errors). This is a common issue as many popular models have been moved or deprecated.

## ✅ Working Alternatives

### 1. **Replicate API** (Recommended - Free Tier Available)

**Why Replicate:**
- Free tier with generous limits
- Easy to use
- Multiple AI models available
- Reliable service

**Setup:**
1. Go to [https://replicate.com](https://replicate.com)
2. Sign up for a free account
3. Get your API token from settings
4. Add to your `.env` file:

```bash
REPLICATE_API_TOKEN=your_replicate_token_here
```

**Integration Code:**
```javascript
// Add to your backend/server.js
const REPLICATE_API_URL = 'https://api.replicate.com/v1/predictions';
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

// Replace the placeholder code with:
const response = await axios.post(
  REPLICATE_API_URL,
  {
    version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", // Stable Diffusion XL
    input: {
      prompt: prompt,
      width: 512,
      height: 512,
      num_inference_steps: 20
    }
  },
  {
    headers: {
      'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    timeout: 120000
  }
);

// Poll for completion
let prediction = response.data;
while (prediction.status === 'starting' || prediction.status === 'processing') {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const statusResponse = await axios.get(
    `https://api.replicate.com/v1/predictions/${prediction.id}`,
    { headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}` } }
  );
  prediction = statusResponse.data;
}

// Get the generated image
const imageUrl = prediction.output[0];
const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
const imageBuffer = Buffer.from(imageResponse.data);
const base64Image = imageBuffer.toString('base64');
const dataUrl = `data:image/png;base64,${base64Image}`;
```

### 2. **Stability AI API** (Paid but High Quality)

**Setup:**
1. Go to [https://platform.stability.ai](https://platform.stability.ai)
2. Sign up and get API key
3. Add to your `.env` file:

```bash
STABILITY_API_KEY=your_stability_key_here
```

**Integration Code:**
```javascript
const STABILITY_API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
const STABILITY_API_KEY = process.env.STABILITY_API_KEY;

const response = await axios.post(
  STABILITY_API_URL,
  {
    text_prompts: [{ text: prompt }],
    cfg_scale: 7,
    height: 512,
    width: 512,
    steps: 20,
    samples: 1
  },
  {
    headers: {
      'Authorization': `Bearer ${STABILITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer'
  }
);

const imageBuffer = Buffer.from(response.data);
const base64Image = imageBuffer.toString('base64');
const dataUrl = `data:image/png;base64,${base64Image}`;
```

### 3. **OpenAI DALL-E API** (Paid but Excellent Quality)

**Setup:**
1. Go to [https://platform.openai.com](https://platform.openai.com)
2. Get API key
3. Add to your `.env` file:

```bash
OPENAI_API_KEY=your_openai_key_here
```

**Integration Code:**
```javascript
const OPENAI_API_URL = 'https://api.openai.com/v1/images/generations';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const response = await axios.post(
  OPENAI_API_URL,
  {
    prompt: prompt,
    n: 1,
    size: "512x512",
    response_format: "b64_json"
  },
  {
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    }
  }
);

const base64Image = response.data.data[0].b64_json;
const dataUrl = `data:image/png;base64,${base64Image}`;
```

## 🔧 Implementation Steps

1. **Choose a service** (Replicate recommended for free tier)
2. **Get API credentials**
3. **Update your `.env` file** with the new API key
4. **Replace the placeholder code** in `backend/server.js`
5. **Test the integration**

## 📊 Service Comparison

| Service | Free Tier | Quality | Ease of Use | Speed |
|---------|-----------|---------|-------------|-------|
| Replicate | ✅ Yes | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Stability AI | ❌ No | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| OpenAI DALL-E | ❌ No | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Hugging Face | ❌ Limited | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

## 🚀 Quick Start with Replicate

1. **Sign up** at [replicate.com](https://replicate.com)
2. **Get your token** from account settings
3. **Update `.env`**:
   ```bash
   REPLICATE_API_TOKEN=your_token_here
   ```
4. **Replace the placeholder code** in `server.js` with the Replicate integration code above
5. **Restart your server** and test!

## 💡 Tips

- **Start with Replicate** - it has a generous free tier
- **Test with simple prompts** first
- **Handle rate limits** gracefully
- **Add loading states** for better UX
- **Cache results** to save API calls

## 🔍 Debugging

If you encounter issues:
1. Check your API key is correct
2. Verify you have credits/quota remaining
3. Check the service status page
4. Review the API documentation
5. Test with curl first

---

**Ready to integrate?** Choose a service and follow the steps above! 🎨
