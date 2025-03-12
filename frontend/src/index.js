import React from "react";
import ReactDOM from "react-dom/client";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import store from "./store";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import App from "./App";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import PoemListScreen from "./screens/admin/PoemListScreen"; // Import PoemListScreen
import PoemEditScreen from "./screens/admin/PoemEditScreen"; // Import PoemEditScreen
import PoemCreateScreen from "./screens/admin/PoemCreateScreen"; // Import PoemCreateScreen
import PoemScreen from "./screens/PoemScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart/" element={<CartScreen />} />
      <Route path="/login/" element={<LoginScreen />} />
      <Route path="/register/" element={<RegisterScreen />} />
      <Route path="/poems" element={<PoemScreen />} />

      <Route path="/poem/:id" element={<PoemScreen />} />


      {/* user private route */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping/" element={<ShippingScreen />} />
        <Route path="/payment/" element={<PaymentScreen />} />
        <Route path="/placeorder/" element={<PlaceOrderScreen />} />
        <Route path="/order/:id/" element={<OrderScreen />} />
        <Route path="/profile/" element={<ProfileScreen />} />
      </Route>

      {/* admin routes */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist/" element={<OrderListScreen />} />
        <Route path="/admin/productlist/" element={<ProductListScreen />} />
        <Route path="/admin/productlist/:pageNumber/" element={<ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/userlist/" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />

        {/* Poem admin routes */}        
        <Route path="/admin/poemlist/" element={<PoemListScreen />} /> {/* Poem List Screen */}
        <Route path="/admin/poems/:pageNumber/" element={<PoemListScreen />} /> {/* Paginated Poem List */}
        <Route path="/admin/poem/create" element={<PoemCreateScreen />} /> {/* Create Poem Screen */}
        <Route path="/admin/poem/:id/edit" element={<PoemEditScreen />} /> {/* Edit Poem Screen */}
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
