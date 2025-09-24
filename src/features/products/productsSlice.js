import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    // simple cart count for header demo
    cartCount: 0,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: {
            reducer(state, action) {
                state.items.push(action.payload);
            },
            prepare(product) {
                return {
                    payload: {
                        id: nanoid(),
                        name: product.name,
                        category: product.category,
                        expiryDate: product.expiryDate,
                        cost: Number(product.cost) || 0,
                    },
                };
            },
        },
        updateProduct(state, action) {
            const { id, changes } = action.payload;
            const idx = state.items.findIndex((p) => p.id === id);
            if (idx !== -1) {
                state.items[idx] = { ...state.items[idx], ...changes };
            }
        },
        deleteProduct(state, action) {
            const id = action.payload;
            state.items = state.items.filter((p) => p.id !== id);
        },
        addToCart(state) {
            state.cartCount += 1;
        },
        removeFromCart(state) {
            state.cartCount = Math.max(0, state.cartCount - 1);
        },
        resetAll(state) {
            state.items = [];
            state.cartCount = 0;
        },
    },
});

export const {
    addProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    removeFromCart,
    resetAll,
} = productsSlice.actions;

export default productsSlice.reducer;


