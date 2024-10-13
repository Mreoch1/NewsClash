import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace with your actual connection string)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/newsclash', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// API routes will go here

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});