# 🎨 AI Image Generator

A modern web application that generates images from text descriptions using AI. Built with React frontend and Node.js backend, powered by Hugging Face's free text-to-image API.

## ✨ Features

- **Text-to-Image Generation**: Convert natural language descriptions into stunning images
- **Modern UI**: Beautiful, responsive design with gradient backgrounds and smooth animations
- **Real-time Generation**: Watch your images generate in real-time
- **Download Images**: Save generated images to your device
- **No Database Required**: Stateless application with no data persistence
- **Free API**: Uses Hugging Face's free text-to-image API

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Hugging Face API token (free)

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

3. **Set up environment variables**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Edit `.env` and add your Hugging Face API token:
   ```
   HUGGING_FACE_API_KEY=your_hugging_face_token_here
   ```

4. **Get your free Hugging Face API token**
   - Go to [Hugging Face Settings](https://huggingface.co/settings/tokens)
   - Create a new token
   - Copy the token and paste it in your `.env` file

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
- **Axios** for HTTP requests to Hugging Face API
- **dotenv** for environment variables

### AI Service
- **Hugging Face Inference API**
- **Stable Diffusion v1.5** model
- **Free tier** with generous limits

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
   - Check if your Hugging Face API token is correct
   - Ensure you have internet connection
   - Try a simpler prompt

2. **CORS errors**
   - Make sure the backend is running on port 5000
   - Check if the frontend is making requests to the correct URL

3. **Slow generation**
   - Hugging Face free tier may have queue delays
   - Try during off-peak hours
   - Consider upgrading to a paid plan for faster generation

### Getting Help

- Check the browser console for error messages
- Verify all environment variables are set correctly
- Ensure both frontend and backend are running

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for providing the free text-to-image API
- [Stable Diffusion](https://stability.ai/) for the amazing AI model
- [React](https://reactjs.org/) and [Node.js](https://nodejs.org/) communities

---

**Happy Image Generating! 🎨✨**