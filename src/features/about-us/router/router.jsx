import { createBrowserRouter } from 'react-router-dom';
import AboutUs from '../About';
import Cart from '../../cart/Cart';
import NotFound from '../../not-found/NotFound';
import Layout from '../../../assets/component/Layout';
import Products from '../../products/Products';
import SingleProduct from '../../single-product/SingleProduct';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />, //will be Home page
      },
      {
        path: 'products',
        element: <Products />,
      },
      { path: '/products/:id', element: <SingleProduct /> },
      { path: 'aboutUs', element: <AboutUs /> },
      { path: 'cart', element: <Cart /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
