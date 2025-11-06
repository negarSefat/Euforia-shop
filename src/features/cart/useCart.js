import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product, quantity = 1) => {
    const cart = get().cart;
    const foundItem = cart.find((item) => item.id === product.id);

    if (foundItem) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity }] });
    }

    localStorage.setItem('cart', JSON.stringify(get().cart));
  },

  removeFromCart: (id) => {
    set({
      cart: get().cart.filter((item) => item.id !== id),
    });
    localStorage.setItem('cart', JSON.stringify(get().cart));
  },

  increaseQuantity: (id) => {
    set({
      cart: get().cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
    localStorage.setItem('cart', JSON.stringify(get().cart));
  },

  decreaseQuantity: (id) => {
    set({
      cart: get()
        .cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    });
    localStorage.setItem('cart', JSON.stringify(get().cart));
  },

  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem('cart');
  },

  loadCartFromStorage: () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) set({ cart: JSON.parse(savedCart) });
  },
}));
