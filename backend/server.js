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
mongoose.connect('mongodb+srv://rohitkumarsolanki:forkify123@cluster0.sje5vxa.mongodb.net/',
    {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to recipe-app database'))
.catch((err) => console.error('Connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
