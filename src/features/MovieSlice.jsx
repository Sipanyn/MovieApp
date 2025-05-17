import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchSearchMovie = createAsyncThunk(
  "fetchingsearch",
  async (inputValue) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWY3NmI5OTY1YWFiNDg3MjM3NjUwYjVmYWQ2YmM4YyIsIm5iZiI6MTc0Njg3MTA2My41MTQsInN1YiI6IjY4MWYyMzE3YmE1ZTk4YmJhZjczODZlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W18-cIUEFvo7Fl00DW7_445C5IQ2Z5x09JLZyhN7oR4",
      },
    };

    let response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false&language=en-US&page=1`,
      options
    );
    let data = await response.json();
    return data;
  }
);
export const fetchTrending = createAsyncThunk("fetchingtrend", async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWY3NmI5OTY1YWFiNDg3MjM3NjUwYjVmYWQ2YmM4YyIsIm5iZiI6MTc0Njg3MTA2My41MTQsInN1YiI6IjY4MWYyMzE3YmE1ZTk4YmJhZjczODZlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W18-cIUEFvo7Fl00DW7_445C5IQ2Z5x09JLZyhN7oR4",
    },
  };

  let response = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  );
  let data = await response.json();
  // Add favorite: false to each movie item
  const resultsWithFavorite = data.results.map((item) => ({
    ...item,
    favorite: false,
  }));
  return resultsWithFavorite;
});
const MovieSlice = createSlice({
  name: "movie",
  initialState: {
    trendingArray: [],
    selectedTrending: null,
    favoriteArray: [],
    searchedMovies: [],
  },
  reducers: {
    selectT: (state, action) => {
      state.selectedTrending = action.payload;
    },
    addFav: (state, action) => {
      // Check if the movie is already in favorites
      const exists = state.favoriteArray.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        // Set favorite to true before adding
        state.favoriteArray.push({ ...action.payload, favorite: true });
        state.selectedTrending = { ...action.payload, favorite: true };
        state.trendingArray.map((item) => {
          if (item.id === action.payload.id) {
            return (item.favorite = true);
          }
        });
      }
      if (exists) {
        state.favoriteArray.forEach((item) => {
          if (item.id === action.payload.id) {
            state.favoriteArray = state.favoriteArray.filter(
              (fav) => fav.id !== action.payload.id
            );
            state.selectedTrending = { ...action.payload, favorite: false };
            state.trendingArray.map((item) => {
              if (item.id === action.payload.id) {
                return (item.favorite = false);
              }
            });
          }
        });
      }
    },
    searchFa: (state, action) => {
      const exists = state.favoriteArray.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        // Set favorite to true before adding

        state.favoriteArray.push({ ...action.payload, favorite: true });
        state.selectedTrending = { ...action.payload, favorite: true };
        state.trendingArray.map((item) => {
          if (item.id === action.payload.id) {
            return (item.favorite = true);
          }
        });
      }
      if (exists) {
        state.favoriteArray.forEach((item) => {
          if (item.id === action.payload.id) {
            state.favoriteArray = state.favoriteArray.filter(
              (fav) => fav.id !== action.payload.id
            );
          }
          state.selectedTrending = { ...action.payload, favorite: false };
          state.trendingArray.map((item) => {
            if (item.id === action.payload.id) {
              return (item.favorite = false);
            }
          });
        });
      }
    },
    removeFa: (state, action) => {
      state.favoriteArray = state.favoriteArray.filter(
        (fav) => fav.id !== action.payload
      );
      state.trendingArray.map((item) => {
        if (item.id === action.payload) {
          return (item.favorite = false);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.trendingArray = action.payload;
      })
      .addCase(fetchSearchMovie.fulfilled, (state, action) => {
        state.searchedMovies = action.payload.results;
        console.log(state.searchedMovies);
      });
  },
});
export const { selectT, addFav, removeFa, searchFa } = MovieSlice.actions;
export default MovieSlice.reducer;
