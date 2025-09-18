const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Craiyon API configuration
const CRAIYON_API_URL = 'https://api.craiyon.com/v3';

// Generate image endpoint
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Generating image for prompt:', prompt);

    // Call Craiyon API with better headers to avoid Cloudflare blocking
    const response = await axios.post(
      CRAIYON_API_URL,
      {
        prompt: prompt,
        model: "art", // or "photo", "drawing", "none"
        negative_prompt: "",
        token: "", // No token needed for free tier
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Origin': 'https://www.craiyon.com',
          'Referer': 'https://www.craiyon.com/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
        },
        timeout: 120000, // 2 minutes timeout for image generation
      }
    );

    // Craiyon returns 9 images, we'll use the first one
    const images = response.data.images;
    if (!images || images.length === 0) {
      throw new Error('No images generated');
    }

    // Convert base64 image to data URL
    const firstImage = images[0];
    const dataUrl = `data:image/jpeg;base64,${firstImage}`;

    res.json({
      success: true,
      image: dataUrl,
      prompt: prompt,
      totalImages: images.length,
      note: "Generated with Craiyon (Free AI Image Generator)"
    });

  } catch (error) {
    console.error("Error generating image:", error);

    if (error.response) {
      console.error("API response:", error.response.status, error.response.data);
      
      // Handle specific Craiyon API errors
      if (error.response.status === 403) {
        return res.status(403).json({
          error: "Craiyon API blocked request",
          message: "Cloudflare protection is blocking our request. Try again in a few minutes.",
          suggestion: "This is a known issue with Craiyon's free API. Consider using Replicate or Stability AI for more reliable service."
        });
      }
      
      if (error.response.status === 429) {
        return res.status(429).json({
          error: "Rate limit exceeded",
          message: "Too many requests to Craiyon. Please wait a moment and try again."
        });
      }
      
      return res.status(error.response.status).json({
        error: "Craiyon API error",
        details: error.response.data,
      });
    }

    res.status(500).json({
      error: "Failed to generate image",
      message: error.message,
      suggestion: "Craiyon may be experiencing issues. Try again later or consider using an alternative service."
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
