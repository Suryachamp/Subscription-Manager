import { createSlice } from '@reduxjs/toolkit';

// 1. The Starting Ingredients: An empty list of subscriptions
const initialState = {
  subscriptions: [], // Will hold an array of objects like { name: 'Netflix', price: 15 }
  loading: false,
  error: null
};

// 2. The Cooking Station (Slice)
const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    // Action: When we load the page, put all the subscriptions from the database into the vault
    setSubscriptions: (state, action) => {
      state.subscriptions = action.payload;
    },
    // Action: When the user creates a new subscription, add it to the existing list
    addSubscription: (state, action) => {
      // 'push' means "add this to the end of the array"
      state.subscriptions.push(action.payload);
    }
  }
});

// 3. Export the actions (Order Tickets) so our components can use them
export const { setSubscriptions, addSubscription } = subscriptionSlice.actions;

// 4. Export the reducer (The Chef)
export default subscriptionSlice.reducer;
