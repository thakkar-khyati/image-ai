import React, { useState } from 'react';
import './App.css';
import ImageGenerator from './components/ImageGenerator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🎨 AI Image Generator</h1>
        <p>Transform your words into stunning images with AI</p>
      </header>
      <main>
        <ImageGenerator />
      </main>
    </div>
  );
}

export default App;