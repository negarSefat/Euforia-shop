import { BrowserRouter, Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import './App.css';
import Navbar from './assets/component/Navbar';
import Products from './features/products/Products';
import AboutUs from './features/about-us/AboutUs';
import Footer from './assets/component/Footer';
import Header from './assets/component/Header';
import NotFound from './features/not-found/NotFound';
import Layout from './assets/component/Layout';
// import Cart from './assets/component/Cart';
// import { createContext } from 'react';

// const cartContext = createContext(null);

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="aboutUs" element={<AboutUs />} />
          {/* <Route path="cart" element={<Cart />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
  // <cardContex value={}></cardContex>
}

export default App;
