import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';

export const store = configureStore({
    reducer:{
        // As my app will grow i will be able to add more slices here example subscriptions, subscriptionReducers etc...
        auth: authReducer,
    }
})