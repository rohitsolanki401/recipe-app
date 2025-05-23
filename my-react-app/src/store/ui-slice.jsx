import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  notification: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setNotification(state, action) {
      if (action.payload) {
        state.notification = {
          status: action.payload.status,
          title: action.payload.title,
          message: action.payload.message,
        };
      } else {
        state.notification = action.payload;
      }
    },
  },
});

export const uiActions = uiSlice.actions;
