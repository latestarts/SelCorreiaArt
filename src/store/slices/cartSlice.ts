import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/Product';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const LOCAL_STORAGE_KEY = 'cartItems';

// Helper: Load from localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const serialized = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!serialized) return [];
    return JSON.parse(serialized) as CartItem[];
  } catch {
    return [];
  }
};

// Helper: Save to localStorage
const saveCartToLocalStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore write errors
  }
};

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);

      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.items);
    },

    deleteFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },

    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        const item = state.items.find(item => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
      saveCartToLocalStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, deleteFromCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
