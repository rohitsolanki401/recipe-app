import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipe: {},
  bookmarks: [],
  search: {
    query: "",
    results: [],
  },
  likes: {},      // store likes for each recipe
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    
    loadRecipe(state, action) {
      state.recipe = action.payload;
    },
    
    updateServings(state, action) {
      const serv = action.payload;
      const crtServings = state.recipe.servings;
      const newServings = crtServings + serv;

      if (newServings < 1) {
        return;
      }

      state.recipe.servings = newServings;
      state.recipe.ingredients.forEach((ingr) => {
        ingr.quantity = (ingr.quantity * newServings) / crtServings;
      });
    },
    
    setQuery(state, action) {
      state.search.query = action.payload.query;
    },
    
    replaceResults(state, action) {
      state.search.results = action.payload.recipes;
    },
    
    loadBookmarks(state, action) {
      const bookmarks = localStorage.getItem("bookmarks");
      if (bookmarks) state.bookmarks = JSON.parse(bookmarks);
    },
    
    addBookmark(state, action) {
      const recipe = action.payload;
      const bookmarkIndex = state.bookmarks.findIndex(b => b.id === recipe.id);
      
      if (bookmarkIndex !== -1) {
        // Remove bookmark
        state.bookmarks.splice(bookmarkIndex, 1);
        if (state.recipe.id === recipe.id) {
          state.recipe.bookmarked = false;
        }
      } else {
        // Add bookmark
        state.bookmarks.push({ ...recipe, bookmarked: true });
        if (state.recipe.id === recipe.id) {
          state.recipe.bookmarked = true;
        }
      }
      
      localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
    },
    
    // Update Likes
    updateLikes(state, action) {
      const { likesCount, likedByUser } = action.payload;
      state.recipe.likes = { count: likesCount };
      state.recipe.likedByUser = likedByUser;
    },
  },
});

export const recipeActions = recipeSlice.actions;
