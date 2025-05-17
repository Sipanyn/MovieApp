import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./features/MovieSlice";
export const store = configureStore({ reducer: { movie: MovieReducer } });
