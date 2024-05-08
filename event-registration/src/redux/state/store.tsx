import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./reducers/getEventReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import signupSlice from "./reducers/signUp";

const store = configureStore({
  reducer: {
    events: eventSlice,
    signUp: signupSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
