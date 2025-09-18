# 🎨 AI Image Generator

A modern web application that generates images from text descriptions using AI. Built with React frontend and Node.js backend, powered by **SubNP AI** with multiple fallback services for reliable image generation.

## ✨ Features

- **🤖 Real AI Image Generation**: Powered by SubNP AI with Turbo model
- **🔄 Smart Fallback System**: Multiple free services ensure you always get an image
- **🎨 Modern UI**: Beautiful, responsive design with gradient backgrounds and smooth animations
- **⚡ Real-time Generation**: Watch your images generate in real-time
- **💾 Download Images**: Save generated images to your device
- **🗄️ No Database Required**: Stateless application with no data persistence
- **🆓 Completely Free**: No API keys or credits required

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- **No API keys required!** 🎉

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd image-ai
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **No setup required!** 
   The app works out of the box with SubNP AI and fallback services.

### Running the Application

1. **Start both frontend and backend**
   ```bash
   npm run dev
   ```

2. **Or run them separately**
   
   Backend (Terminal 1):
   ```bash
   npm run server
   ```
   
   Frontend (Terminal 2):
   ```bash
   npm run client
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Modern CSS** with gradients and animations
- **Responsive Design** for all devices
- **Fetch API** for HTTP requests

### Backend
- **Node.js** with Express
- **CORS** for cross-origin requests
- **Axios** for HTTP requests to AI services
- **dotenv** for environment variables

### AI Services
- **SubNP AI** (Primary) - Real AI image generation with Turbo model
- **Unsplash** (Fallback 1) - High-quality stock photos
- **Picsum** (Fallback 2) - Beautiful random images
- **SVG Generator** (Fallback 3) - Always works as final fallback

## 📁 Project Structure

```
image-ai/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ImageGenerator.tsx
│   │   │   └── ImageGenerator.css
│   │   ├── App.tsx
│   │   └── App.css
│   └── package.json
├── backend/                  # Node.js backend
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── package.json             # Root package.json
└── README.md
```

## 🎯 How to Use

1. **Enter a description** in the text area
2. **Click "Generate Image"** or press Enter
3. **Wait for generation** (usually 10-30 seconds)
4. **View your image** and download if desired

### Tips for Better Results

- Be specific and descriptive
- Include style preferences (e.g., "photorealistic", "cartoon", "oil painting")
- Mention colors, lighting, and mood
- Add details about composition and perspective

### Example Prompts

- "A beautiful sunset over mountains with a lake reflection, photorealistic"
- "A cute cartoon cat sitting on a rainbow, digital art style"
- "A futuristic city skyline at night with neon lights, cyberpunk style"
- "A peaceful garden with blooming flowers, impressionist painting style"

## 🔧 API Endpoints

### POST /api/generate-image
Generates an image from a text prompt.

**Request Body:**
```json
{
  "prompt": "A beautiful sunset over mountains"
}
```

**Response:**
```json
{
  "success": true,
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "prompt": "A beautiful sunset over mountains"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## 🚨 Troubleshooting

### Common Issues

1. **"Failed to generate image" error**
   - The app has multiple fallbacks, so this is rare
   - Check your internet connection
   - Try a simpler prompt

2. **CORS errors**
   - Make sure the backend is running on port 5000
   - Check if the frontend is making requests to the correct URL

3. **Slow generation**
   - SubNP AI may have queue delays during peak times
   - The app will automatically fall back to faster services
   - All services are free and don't require API keys

### Getting Help

- Check the browser console for error messages
- The app has built-in fallbacks, so it should always work
- Ensure both frontend and backend are running

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- [SubNP](https://subnp.com/) for providing the free AI image generation API
- [Unsplash](https://unsplash.com/) for beautiful stock photos
- [Picsum](https://picsum.photos/) for random placeholder images
- [React](https://reactjs.org/) and [Node.js](https://nodejs.org/) communities

---

**Happy Image Generating! 🎨✨**