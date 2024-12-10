import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: {
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    phone: "",
  },
  isAuthenticated: false,
  products: [],
  checkedBrands: [],
  checkedCategorys: [],
  checkoutData: {
    totalAmt: 0,
    shippingCharge: 0,
  },
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      // Dispatch a success toast
      toast.success("Product added to cart");
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
        // Dispatch a success toast
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
        // Dispatch a success toast
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      // Dispatch a success toast
      toast.error("Product removed from cart");
    },

    setCart(state, action) {
      state.products = action.payload;
    },

    resetCart: (state) => {
      state.products = [];
      // Dispatch a success toast
    },

    toggleBrand: (state, action) => {
      const brand = action.payload;
      const isBrandChecked = state.checkedBrands.some(
        (b) => b._id === brand._id
      );

      if (isBrandChecked) {
        state.checkedBrands = state.checkedBrands.filter(
          (b) => b._id !== brand._id
        );
      } else {
        state.checkedBrands.push(brand);
      }
    },

    toggleCategory: (state, action) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategorys.some(
        (b) => b._id === category._id
      );

      if (isCategoryChecked) {
        state.checkedCategorys = state.checkedCategorys.filter(
          (b) => b._id !== category._id
        );
      } else {
        state.checkedCategorys.push(category);
      }
    },
    UserInfo: (state, action) => {
      state.user = action.payload; // Update user with payload (name and email)
      state.isAuthenticated = true; // Set authenticated state to true
    },

    LogOutUser: (state) => {
      state.user = { name: "", email: "" }; // Reset user info
      state.isAuthenticated = false; // Set authentication to false
    },

    setCheckoutData: (state, action) => {
      state.checkoutData = action.payload;
    },
  },
});

export const {
  setCart,
  LogOutUser,
  setCheckoutData,
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  toggleBrand,
  toggleCategory,
  UserInfo,
} = orebiSlice.actions;

export default orebiSlice.reducer;
