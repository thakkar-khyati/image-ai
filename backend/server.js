const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// SubNP AI Image Generation API
const SUBNP_API_URL = 'https://subnp.com/api/free/generate';

// Fallback services
const FALLBACK_SERVICES = {
  // Option 1: Unsplash (Free stock photos)
  UNSPLASH: 'https://source.unsplash.com/512x512/',
  // Option 2: Picsum (Free placeholder images)
  PICSUM: 'https://picsum.photos/512/512',
  // Option 3: Lorem Picsum (Free random images)
  LOREM: 'https://picsum.photos/512/512?random='
};

// Generate image endpoint
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Generating image for prompt:', prompt);

    // Try SubNP AI generation first
    let imageUrl = null;
    let serviceUsed = '';

    try {
      console.log('Trying SubNP AI generation...');
      
      // Call SubNP API with simple approach first
      const response = await axios.post(
        SUBNP_API_URL,
        {
          prompt: prompt,
          model: "turbo" // Using turbo model as per documentation
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          timeout: 60000 // 1 minute timeout for AI generation
        }
      );

      console.log('SubNP Response:', response.data);
      
      // Check if we got an image URL directly
      if (response.data && response.data.imageUrl) {
        const imageResponse = await axios.get(response.data.imageUrl, {
          responseType: 'arraybuffer',
          timeout: 30000
        });
        
        const imageBuffer = Buffer.from(imageResponse.data);
        const base64Image = imageBuffer.toString('base64');
        imageUrl = `data:image/jpeg;base64,${base64Image}`;
        serviceUsed = 'SubNP AI (Turbo Model)';
        console.log('SubNP AI generation successful!');
        
        return res.json({
          success: true,
          image: imageUrl,
          prompt: prompt,
          note: `Generated with ${serviceUsed}`,
          service: serviceUsed
        });
      } else {
        throw new Error('No image URL in SubNP response');
      }

    } catch (subnpError) {
      console.log('SubNP failed:', subnpError   );
      
      // Try fallback services
      try {
        console.log('Trying Unsplash fallback...');
        const unsplashUrl = `${FALLBACK_SERVICES.UNSPLASH}?${encodeURIComponent(prompt)}`;
        const response = await axios.get(unsplashUrl, {
          responseType: 'arraybuffer',
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        const imageBuffer = Buffer.from(response.data);
        const base64Image = imageBuffer.toString('base64');
        imageUrl = `data:image/jpeg;base64,${base64Image}`;
        serviceUsed = 'Unsplash (Free Stock Photos)';
        console.log('Unsplash fallback success!');
        
      } catch (unsplashError) {
        console.log('Unsplash failed, trying Picsum...');
        
        try {
          const picsumUrl = `${FALLBACK_SERVICES.PICSUM}?${Date.now()}`;
          const response = await axios.get(picsumUrl, {
            responseType: 'arraybuffer',
            timeout: 10000
          });
          
          const imageBuffer = Buffer.from(response.data);
          const base64Image = imageBuffer.toString('base64');
          imageUrl = `data:image/jpeg;base64,${base64Image}`;
          serviceUsed = 'Picsum (Free Random Images)';
          console.log('Picsum success!');
          
        } catch (picsumError) {
          console.log('Picsum failed, using SVG fallback...');
          
          // Final fallback - generate a simple image
          imageUrl = 'data:image/svg+xml;base64,' + Buffer.from(`
            <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect width="512" height="512" fill="url(#bg)"/>
              <text x="256" y="250" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white" font-weight="bold">
                AI Image Generator
              </text>
              <text x="256" y="280" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="rgba(255,255,255,0.8)">
                Prompt: "${prompt}"
              </text>
              <text x="256" y="310" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="rgba(255,255,255,0.6)">
                Fallback - All services failed
              </text>
            </svg>
          `).toString('base64');
          serviceUsed = 'Fallback (SVG Generated)';
        }
      }

      res.json({
        success: true,
        image: imageUrl,
        prompt: prompt,
        note: `Generated with ${serviceUsed}`,
        service: serviceUsed
      });
    }

  } catch (error) {
    console.error("Error generating image:", error);

    // Return a fallback image even if everything fails
    const fallbackImage = 'data:image/svg+xml;base64,' + Buffer.from(`
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ee5a24;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="512" height="512" fill="url(#bg)"/>
        <text x="256" y="250" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white" font-weight="bold">
          Error Generating Image
        </text>
        <text x="256" y="280" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="rgba(255,255,255,0.8)">
          Prompt: "${req.body.prompt || 'Unknown'}"
        </text>
        <text x="256" y="310" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="rgba(255,255,255,0.6)">
          All services failed - Please try again
        </text>
      </svg>
    `).toString('base64');

    res.json({
      success: true,
      image: fallbackImage,
      prompt: req.body.prompt || 'Unknown',
      note: "Error fallback - All services failed",
      service: "Error Fallback",
      error: error.message
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
