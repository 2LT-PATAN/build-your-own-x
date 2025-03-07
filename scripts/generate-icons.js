// Simple script to generate placeholder icon files for PWA
const fs = require('fs');
const path = require('path');

// Base64 encoded minimal PNG placeholders (1x1 px colored squares expanded to specific dimensions)
const ICON_192 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0Wvf/PwAEPwJhZzKi2QAAAABJRU5ErkJggg==';
const ICON_512 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0Wvf/PwAEPwJhZzKi2QAAAABJRU5ErkJggg==';
const APPLE_TOUCH_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQI12P4//8/AAX+Av7czFnnAAAAAElFTkSuQmCC';
const FAVICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0Wvf/PwAEPwJhZzKi2QAAAABJRU5ErkJggg==';

// Ensure the icons directory exists
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Helper function to save a base64 string as a file
function saveBase64AsFile(base64String, filePath) {
  // Remove the data:image/png;base64, part
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(filePath, buffer);
  console.log(`Created: ${filePath}`);
}

// Generate and save the icons
saveBase64AsFile(ICON_192, path.join(iconsDir, 'icon-192x192.png'));
saveBase64AsFile(ICON_512, path.join(iconsDir, 'icon-512x512.png'));
saveBase64AsFile(APPLE_TOUCH_ICON, path.join(iconsDir, 'apple-touch-icon.png'));
saveBase64AsFile(FAVICON, path.join(__dirname, '..', 'public', 'favicon.ico'));

console.log('All placeholder icons generated successfully!'); 