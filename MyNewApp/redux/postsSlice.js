// redux/postsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
      state.loading = false;
    },
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setPosts, addPost, setLoading, setError } = postsSlice.actions;
export default postsSlice.reducer;
