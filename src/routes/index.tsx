// routes/index.tsx
import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './home/Home';
import AllPage from './allPage/AllPage';
import LikedPage from '../routes/likedPage/LikedPage';
import CartPage from '../routes/cartPage/CartPage';
import DynamicPage from '../routes/dynamic/DynamicPage';
import SkinPage from '../routes/skin/Skin';
import LipsPage from '../routes/lips/Lips';
import EyesPage from '../routes/eyes/Eyes';
import NailsPage from '../routes/nails/Nails';
import SearchedPage from '../routes/searchedPage/SearchedPage';
import Blog from '../routes/blog/Blog';
import BlogPost from '../routes/blog/BlogPost';


const RouteController: React.FC = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/allpage',
      element: <AllPage />,
    },
    {
      path: '/likedPage',
      element: <LikedPage />,
    },
    {
      path: '/cartPage',
      element: <CartPage />,
    },
    {
        path: '/products/:id',
        element: <DynamicPage />
    },
    {
        path:'/skin',
        element: <SkinPage />
    },
    {
        path:'/lips',
        element:<LipsPage/>
    },
    {
        path:'/eyes',
        element:<EyesPage />
    },
    {
        path:'/nails',
        element:<NailsPage/>
    },
    {
        path:'/search',
        element:<SearchedPage/>
    },
    {
      path:'/blog',
      element:<Blog />
    },
    {
      path:'/blog/:id',
      element: <BlogPost />
    }
  ]);

  return routes;
};

export default RouteController;


