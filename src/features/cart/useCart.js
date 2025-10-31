import { ResetTvRounded } from '@mui/icons-material';
import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const cart = get().cart;
    const foundItem = cart.find((item) => item.id === product.id);

    if (foundItem) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (id) => {
    set({
      cart: get().cart.filter((item) => item.id !== id),
    });
  },

  increaseQuantity: (id) => {
    set({
      cart: get().cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  },

  decreaseQuantity: (id) => {
    set({
      cart: get()
        .cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0), // اگر صفر شد حذف بشه
    });
  },

  clearCart: () => set({ cart: [] }),
}));
