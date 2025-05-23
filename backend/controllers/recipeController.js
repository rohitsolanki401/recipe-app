import Recipe from '../models/Recipe.js';

export const getAllRecipes = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search && search.trim() !== '') {
      query = { 
        title: { $regex: search, $options: 'i' } // case-insensitive search
      };
      console.log('Search query:', query); // Debug log
    }
    
    const recipes = await Recipe.find(query);
    console.log(`Found ${recipes.length} recipes`); // Debug log
    
    res.status(200).json({
      status: 'success',
      results: recipes.length,
      data: {
        recipes
      }
    });
  } catch (error) {
    console.error('Search error:', error); // Debug log
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        status: 'fail',
        message: 'Recipe not found'
      });
    }
    const recipeData = {
      _id: recipe._id,
      title: recipe.title,
      publisher: recipe.publisher,
      source_url: recipe.source_url,
      image_url: recipe.image_url,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      ingredients: recipe.ingredients, 
      bookmarked: recipe.bookmarked || false,
      key : recipe.key
    };

    console.log('Sending recipe data:', recipeData);

    res.status(200).json({
      status: 'success',
      data: {
        recipe
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        recipe: newRecipe
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        status: 'fail',
        message: 'Recipe not found'
      });
    }

    // Toggle the bookmarked status
    recipe.bookmarked = !recipe.bookmarked;
    await recipe.save();

    res.status(200).json({
      status: 'success',
      data: {
        recipe
      }
    });
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Toggle like for the current user
export const toggleLike = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ status: 'fail', message: 'Recipe not found' });
    }

    // **Initialize likes if missing**
    if (!recipe.likes) {
      recipe.likes = { count: 0, users: [] };
    }

    const userId = req.user._id.toString();
    const idx = recipe.likes.users.findIndex(id => id.toString() === userId);
    if (idx === -1) {
      recipe.likes.users.push(userId);
    } else {
      recipe.likes.users.splice(idx, 1);
    }

    recipe.likes.count = recipe.likes.users.length;

    // Save without running full validators
    await recipe.save({ validateBeforeSave: false });

    return res.status(200).json({
      status: 'success',
      data: {
        recipe: { id: recipe._id, likes: recipe.likes }
      }
    });
  } catch (err) {
    // This logs to your **server** console (not the browser)
    console.error('🔥 toggleLike error:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
};


export default {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  toggleBookmark,
  toggleLike,
};

