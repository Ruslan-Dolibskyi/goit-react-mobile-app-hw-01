import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, addPost } from "../firebase";

export const fetchPostsThunk = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchPosts();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPostThunk = createAsyncThunk(
  "posts/addPost",
  async (post, { rejectWithValue }) => {
    try {
      await addPost(post);
      return post;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPostThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(addPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoading, setError } = postsSlice.actions;
export default postsSlice.reducer;
