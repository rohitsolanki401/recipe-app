import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import recipeRoutes from './routes/recipes.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
// Now you can access the secret
const jwtSecret = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

// MongoDB Connection
mongoose
  .connect(
    'mongodb+srv://rohitkumarsolanki:forkify123@cluster0.sje5vxa.mongodb.net/forkify?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to recipe-app database'))
  .catch((err) => console.error('Connection error:', err));

  // Access the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Bind connection to open event (when successfully connected)
db.once('open', () => {
  console.log('Connected to MongoDB Atlas database');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
