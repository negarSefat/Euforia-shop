import { BrowserRouter, Router, RouterProvider } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, lazy, useReducer } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Navbar from './assets/component/Navbar';
import Header from './assets/component/Header';
import Footer from './assets/component/Footer';
import Layout from './assets/component/Layout';
import router from './features/about-us/router/router';

// const Products = lazy(() => import('./features/products/Products'));
import Products from './features/products/Products';
// import CartReducer from './Reducer/CartReducer';
const AboutUs = lazy(() => import('./features/about-us/About'));
const NotFound = lazy(() => import('./features/not-found/NotFound'));
const Cart = lazy(() => import('./features/cart/Cart'));

// export const CartContext = createContext();

const queryClient = new QueryClient();
function App() {
  // const [state, dispatch] = useReducer(CartReducer, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        {/* <CartContext.Provider
          value={{ cart: state, setCart: dispatch }}
        ></CartContext.Provider> */}
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
