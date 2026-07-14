import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import subscriptionReducer from './subscriptionSlice'; // <-- Import the new Chef!

export const store = configureStore({
    reducer: {
        // Our cooking stations:
        auth: authReducer,
        subscriptions: subscriptionReducer, 
    }
})
