import React, { useState } from 'react';
import './ImageGenerator.css';

interface GeneratedImage {
  image: string;
  prompt: string;
}

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your image');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const response = await fetch('http://localhost:5000/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImage(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      generateImage();
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage.image;
      link.download = `ai-generated-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="image-generator">
      <div className="input-section">
        <div className="input-group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe the image you want to generate... (e.g., 'A beautiful sunset over mountains with a lake reflection')"
            className="prompt-input"
            rows={3}
            disabled={isLoading}
          />
          <button
            onClick={generateImage}
            disabled={isLoading || !prompt.trim()}
            className="generate-btn"
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
        </div>
      )}

      {generatedImage && (
        <div className="result-section">
          <div className="image-container">
            <img
              src={generatedImage.image}
              alt={generatedImage.prompt}
              className="generated-image"
            />
            <div className="image-overlay">
              <button onClick={downloadImage} className="download-btn">
                📥 Download
              </button>
            </div>
          </div>
          <div className="prompt-display">
            <h3>Generated from:</h3>
            <p>"{generatedImage.prompt}"</p>
          </div>
        </div>
      )}

      <div className="tips">
        <h3>💡 Tips for better results:</h3>
        <ul>
          <li>Be specific and descriptive</li>
          <li>Include style preferences (e.g., "photorealistic", "cartoon", "oil painting")</li>
          <li>Mention colors, lighting, and mood</li>
          <li>Add details about composition and perspective</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageGenerator;
