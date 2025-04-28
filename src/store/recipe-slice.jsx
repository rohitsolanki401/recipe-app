import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipe: {},
  bookmarks: [],
  search: {
    query: "",
    results: [],
  },
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
      if (action.payload.bookmarked) {
        state.recipe.bookmarked = false;
        state.bookmarks = state.bookmarks.filter(
          (recipe) => recipe.id !== action.payload.id
        );
      } else {
        state.recipe.bookmarked = true;
        state.bookmarks.push(state.recipe);
      }
      localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
    },
  },
});

export const recipeActions = recipeSlice.actions;
