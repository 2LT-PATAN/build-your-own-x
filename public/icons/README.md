# PWA Icon Requirements

This directory contains placeholder files for the icons required by your Progressive Web App (PWA).

## Required Icons

You need to create the following icons:

1. **icon-192x192.png** - 192×192 pixels, used for Android home screens
2. **icon-512x512.png** - 512×512 pixels, used for splash screens and the Web App Manifest
3. **apple-touch-icon.png** - 180×180 pixels, used for iOS home screens

## How to Replace the Placeholders

1. Create each icon at the specified dimensions
2. Save them in PNG format
3. Replace the placeholder `.txt` files with your actual icon files
4. Remove the `.txt` extension from the filenames

## Icon Design Guidelines

- Use a consistent design across all icon sizes
- Make sure the icons are recognizable at small sizes
- For PWA icons (192×192 and 512×512), include transparency if needed
- For the Apple touch icon, do NOT include:
  - Transparency (not supported)
  - Rounded corners (iOS will apply them automatically)
  - Drop shadows (iOS will apply effects)

## Generating Icons

You can use tools like:

- Adobe Photoshop or Illustrator
- GIMP or Inkscape (free)
- Online PWA icon generators:
  - [PWA Builder](https://www.pwabuilder.com/imageGenerator)
  - [App Icon Generator](https://appicon.co/)
  - [Real Favicon Generator](https://realfavicongenerator.net/) 