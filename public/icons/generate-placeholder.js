// This script is a helper to generate placeholder icons
// You can run this with Node.js if you have Canvas installed
// npm install canvas
// node generate-placeholder.js

const fs = require('fs');
const { createCanvas } = require('canvas');

function generateIcon(size, text, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#4F46E5'; // Indigo color matching theme
  ctx.fillRect(0, 0, size, size);
  
  // Text
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size/4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size/2, size/2);
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, buffer);
  console.log(`Generated: ${filename}`);
}

// Generate the required icons
generateIcon(192, 'SS', 'public/icons/icon-192x192.png');
generateIcon(512, 'SS', 'public/icons/icon-512x512.png');
generateIcon(180, 'SS', 'public/icons/apple-touch-icon.png');

console.log('All placeholder icons generated successfully!'); 