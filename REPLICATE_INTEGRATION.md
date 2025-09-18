# 🔄 Replicate API Integration

Replace the current image generation code in `backend/server.js` with this:

```javascript
// Replace the entire image generation section with this:

console.log('Generating image for prompt:', prompt);

// Replicate API integration
const REPLICATE_API_URL = 'https://api.replicate.com/v1/predictions';
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

if (!REPLICATE_API_TOKEN) {
  return res.status(500).json({
    error: 'Replicate API token not configured',
    message: 'Please add REPLICATE_API_TOKEN to your .env file'
  });
}

try {
  // Create prediction
  const predictionResponse = await axios.post(
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

  let prediction = predictionResponse.data;
  
  // Poll for completion
  while (prediction.status === 'starting' || prediction.status === 'processing') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const statusResponse = await axios.get(
      `https://api.replicate.com/v1/predictions/${prediction.id}`,
      { 
        headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}` } 
      }
    );
    prediction = statusResponse.data;
  }

  if (prediction.status === 'succeeded') {
    // Get the generated image
    const imageUrl = prediction.output[0];
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data);
    const base64Image = imageBuffer.toString('base64');
    const dataUrl = `data:image/png;base64,${base64Image}`;

    res.json({
      success: true,
      image: dataUrl,
      prompt: prompt,
      note: "Generated with Replicate (Stable Diffusion XL)"
    });
  } else {
    throw new Error(`Prediction failed: ${prediction.error}`);
  }

} catch (error) {
  console.error('Replicate API error:', error);
  throw error;
}
```

## 🎯 **Quick Setup:**

1. **Get token:** [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)
2. **Add to .env:** `REPLICATE_API_TOKEN=r8_your_token_here`
3. **Replace code:** Use the code above in `server.js`
4. **Restart server:** `npm run dev`

## 📊 **Free Tier Limits:**
- **1,000,000 seconds** compute per month
- **~10-20 images** per day
- **No credit card** required
- **High quality** Stable Diffusion XL

## 🚀 **Ready to go!**
