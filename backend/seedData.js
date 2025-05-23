import mongoose from 'mongoose';
import Recipe  from './models/Recipe.js';
import dotenv from 'dotenv';

dotenv.config();

const initialRecipes = [
  {
    title: "Margherita Pizza",
    publisher: "Pizza Kitchen",
    source_url: "https://www.pizzakitchen.com/margherita",
    image_url: "https://example.com/margherita.jpg",
    servings: 4,
    cooking_time: 25,
    ingredients: [
      { quantity: 1, unit: "kg", description: "Pizza Dough" },
      { quantity: 200, unit: "g", description: "Mozzarella" },
      { quantity: 100, unit: "g", description: "Tomato Sauce" },
      { quantity: 10, unit: "g", description: "Fresh Basil" }
    ]
  },
  {
    title: "Pepperoni Pizza",
    publisher: "Pizza Express",
    source_url: "https://www.pizzaexpress.com/pepperoni",
    image_url: "https://example.com/pepperoni.jpg",
    servings: 4,
    cooking_time: 30,
    ingredients: [
      { quantity: 1, unit: "kg", description: "Pizza Dough" },
      { quantity: 200, unit: "g", description: "Mozzarella" },
      { quantity: 100, unit: "g", description: "Tomato Sauce" },
      { quantity: 150, unit: "g", description: "Pepperoni" }
    ]
  }
  // Add more pizza recipes as needed
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Recipe.deleteMany({}); // Clear existing recipes
    await Recipe.insertMany(initialRecipes);
    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();