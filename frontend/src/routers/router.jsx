import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import CategoryPage from "../pages/categoryLink/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetail/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";

const routerA = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      
      {
        path: "/categories/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
        },
        {
            path: "/shop/:id",
            element: <SingleProduct/>
      }
    ],
  },
  {
    path: '/login',
    element: <Login/>
  },
  // {
  //   path: '/register',
  //   element: <Register/>
  // }
]);

export default routerA;
