# NewsClash

NewsClash is a web-based application that allows users to search for news topics and view videos from various political perspectives (left, right, and center) side-by-side.

## Features

- Search for news topics
- View videos from different political perspectives
- Responsive design for mobile and desktop
- User authentication (coming soon)
- Video filtering by political leaning and recency (coming soon)

## Tech Stack

- Frontend: React with TypeScript
- Backend: Node.js with Express
- Database: MongoDB
- Deployment: Heroku

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   YOUTUBE_API_KEY=your_youtube_api_key
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Testing

Run unit tests:
```
npm test
```

Run end-to-end tests (make sure the app is running first):
```
npm run cypress:open
```

## Deployment

The app is set up for automatic deployment to Heroku. Push to the `main` branch to trigger a deployment.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.