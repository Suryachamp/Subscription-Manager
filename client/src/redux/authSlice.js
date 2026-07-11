import { createSlice } from '@reduxjs/toolkit';

// This is the starting state of our authentication
const initialState = {
  user: null,       // Will hold user data when logged in
  isAuthenticated: false,
  loading: true,    // True while we check if they have a valid session
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to call when the user successfully logs in
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    // Action to call when the user logs out or auth fails
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    // Action to stop the loading spinner once we finish checking auth
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

// Export the actions so our components can trigger them
export const { loginSuccess, logout, setLoading } = authSlice.actions;

// Export the reducer so the store can use it
export default authSlice.reducer;
