# Personalized Nutrition Planner

A Next.js application that generates personalized nutrition plans using AI based on a user's characteristics, dietary preferences, and health goals.

## Features

- User authentication with Firebase
- AI-powered meal plan generation using OpenAI
- PDF export of nutrition plans
- Secure data storage with Firestore
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI**: OpenAI GPT
- **PDF Generation**: pdfmake

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Firebase account
- OpenAI API key

### Local Development

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nutrition-planner
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   OPENAI_API_KEY=your_openai_key
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Firebase Setup

1. Create a new Firebase project: [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Google sign-in method)
3. Create a Firestore database
4. Apply the security rules from `firestore.rules`
5. Get your Firebase project credentials for the environment variables

### Deployment

#### Firebase Deployment

1. Install Firebase CLI:
   ```
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```
   firebase login
   ```

3. Initialize Firebase:
   ```
   firebase init
   ```
   Select Firestore and Hosting options.

4. Deploy to Firebase:
   ```
   firebase deploy
   ```

#### Deploying to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add the environment variables in the Vercel dashboard
4. Deploy!

## Project Structure

- `/components` - React components
- `/context` - Context providers for state management
- `/lib` - Firebase configuration
- `/pages` - Next.js pages and API routes
- `/utils` - Utility functions like PDF generation

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

MIT 

# Space Seven Fitness Website

This is the website for Space Seven Fitness, the premier gym in Tricity.

## File Structure

Please ensure the following file structure for media files:

### Images
All images should be placed in the `/public/images/` directory:

- `/public/images/gym-interior.jpg` - Gym interior shots
- `/public/images/gym-hero.jpg` - Main gym hero image
- `/public/images/nutrition.jpg` - Nutrition related imagery
- `/public/images/strength.jpg` - Strength training area
- `/public/images/cardio.jpg` - Cardio equipment zone
- `/public/images/hiit.jpg` - HIIT training area
- `/public/images/mind-body.jpg` - Mind & body/recovery zone
- `/public/images/custom.jpg` - Custom training programs
- `/public/images/flexibility.jpg` - Flexibility training

### Videos
Video files must be placed in the `/public/videos/` directory:

- `/public/videos/main-video.mp4` - Main hero background video (home page)

This video file is crucial for the homepage hero background. The video plays in a continuous loop and serves as the main visual element of the homepage hero section.

## Important Setup Steps

1. Create a folder called `videos` inside your `public` directory:
   ```
   E:\Full stack\public\videos\
   ```

2. Copy your main-video.mp4 file into this directory:
   ```
   E:\Full stack\public\videos\main-video.mp4
   ```

3. Ensure the video file is MP4 format and properly encoded for web playback (optimized file size is recommended)

If the video doesn't play, please check that:
- The file path is correct
- The video format is supported by modern browsers
- The video file isn't corrupted

## Development

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Responsive design for all device sizes
- Modern, premium aesthetic with black and white theme
- Interactive training zone tabs
- Dynamic continuously looping video background on homepage
- Complete information about facilities, programs, and contact details 