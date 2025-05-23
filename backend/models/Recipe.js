import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A recipe must have a title'],
  },
  publisher: String,
  source_url: String,
  image_url: String,
  cooking_time: Number,
  servings: Number,
  ingredients: [
    {
      quantity: { type: Number },
      unit: { type: String },
      description: { type: String, required: true },
    },
  ],
  instructions: {
    type: String,
  },
  bookmarked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    count: {
      type: Number,
      default: 0,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes');
export default Recipe;
