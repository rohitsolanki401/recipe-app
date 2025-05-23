import express from 'express';
import Recipe from '../models/Recipe.js';
import recipeController from '../controllers/recipeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = { title: { $regex: search, $options: 'i' } };
    }

    const recipes = await Recipe.find(query);
    res.status(200).json({
      status: 'success',
      results: recipes.length,
      data: {
        recipes,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'fail', message: 'Server Error' });
  }
});

// Get single recipe
// router.get('/:id', async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);
//     res.status(200).json({
//       status: 'success',
//       data: {
//         recipe,
//       },
//     });
//       } catch (err) {
//     res.status(404).json({ message: 'Recipe not found' });
//   }
// });

router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching recipe with ID:', req.params.id);

    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      console.log('Recipe not found in DB');
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        recipe,
      },
    });
  } catch (err) {
    console.error('Error in fetching recipe:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create recipe
router.post('/', async (req, res) => {
  const recipe = new Recipe(req.body);
  try {
    const newRecipe = await recipe.save();
    res.status(201).json({
      status: 'success',
      data: {
        recipe: newRecipe,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Bookmark Recipe
router.post('/:id/bookmark', recipeController.toggleBookmark);

// Toggle like
router.post('/:id/like', protect, recipeController.toggleLike);

export default router;
