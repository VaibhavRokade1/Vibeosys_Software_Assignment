import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";

// Load persisted state from localStorage
const loadState = () => {
    try {
        const raw = localStorage.getItem("app_state");
        if (!raw) return undefined;
        return JSON.parse(raw);
    } catch (err) {
        console.error("Failed to load state from localStorage", err);
        return undefined;
    }
};

// Save state to localStorage
const saveState = (state) => {
    try {
        const serialised = JSON.stringify({ products: state.products });
        localStorage.setItem("app_state", serialised);
    } catch (err) {
        console.error("Failed to save state to localStorage", err);
    }
};

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
    preloadedState: loadState(),
});

// Persist to localStorage on any change
store.subscribe(() => saveState(store.getState()));

export default store;


