import { configureStore } from "@reduxjs/toolkit";
import rollsList from "./features/rollsList";

export const store = configureStore({
  reducer: {
    rollsList,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
