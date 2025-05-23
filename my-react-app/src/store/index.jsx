import { configureStore } from '@reduxjs/toolkit';
import { recipeSlice } from './recipe-slice';
import { uiSlice } from './ui-slice';
import authReducer from './auth-slice'; 

const store = configureStore({
  reducer: {
    recipe: recipeSlice.reducer,
    ui: uiSlice.reducer,
    auth: authReducer,
  },
});

export default store;
