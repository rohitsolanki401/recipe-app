import { configureStore } from "@reduxjs/toolkit";
import { recipeSlice } from "./recipe-slice";
import { uiSlice } from "./ui-slice";

const store = configureStore({
  reducer: {
    recipe: recipeSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
