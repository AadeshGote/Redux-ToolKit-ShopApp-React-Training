import React from "react";
import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import API from "./AxiosInstance";
// import { CartItems } from "./CreateSlice";

//FETCH DATA USING THUNK
export const fetchProducts: any = createAsyncThunk("products", async () => {
  try {
    const response = await API.get("/products");
    return response.data;
  } catch (error) {
    throw error;
  }
});

//TYPE CHECK
export interface products {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: File;
}

interface prodArr {
  products: products[];
  loading: boolean;
  error: string | undefined;
}

//INITIAL VALUES
const initialProducts: prodArr = {
  products: [],
  loading: false,
  error: "",
};

//SLICE FUNCTON FOR API
const CreateSlice = createSlice({
  name: "products",
  initialState: initialProducts,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.products = [];
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message;
      });
  },
});

export const sliceReducer = CreateSlice.reducer;

//COUNTER APP
export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const Counter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state: any) => {
      state.value += 1;
    },
    decrement: (state: any) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = Counter.actions;
export const counterReducer = Counter.reducer;

//CART ITEMS
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

interface CartState {
  items: CartItem[];
}

const initialCartState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, price, thumbnail } = action.payload;
      const existingItem = state.items.find((items) => items.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: id,
          title: title,
          price: price,
          quantity: 1,
          thumbnail: thumbnail,
        });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
