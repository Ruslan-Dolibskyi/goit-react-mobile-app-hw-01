import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateUserProfile,
  getUserProfile,
  monitorAuthState,
} from "../firebase";

export const updateProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async ({ displayName, photoURL }, { rejectWithValue }) => {
    try {
      await updateUserProfile(displayName, photoURL);
      return getUserProfile();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuthStatusThunk = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { dispatch }) => {
    monitorAuthState((user) => {
      if (user) {
        dispatch(
          setUser({
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
