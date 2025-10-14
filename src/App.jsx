import { BrowserRouter, Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Navbar from './assets/component/Navbar';
import Header from './assets/component/Header';
import Footer from './assets/component/Footer';
import Layout from './assets/component/Layout';

const Products = lazy(() => import('./features/products/Products'));
const AboutUs = lazy(() => import('./features/about-us/About'));
const NotFound = lazy(() => import('./features/not-found/NotFound'));
const Cart = lazy(() => import('./features/cart/Cart'));

const queryClient = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="products" element={<Products />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
