import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/register";
import Category from "./Category/Category";
import CreatedCategory from "./Category/CreatedCategory";
import EditCategory from "./Category/EditCategory";
import FullPage from "./WebMain/FullPage";
import CoverType from "./CoverType/CoverType";
import CreatedCover from "./CoverType/CreatedCover";
import EditCover from "./CoverType/EditCover";
import { Product } from "./Product/Product";
import CreateProduct from "./Product/CreateProduct";
import Customer from "./Customer/Customer";
import CartShopping from "./CartShopping/CartShopping";
import Summary from "./CartShopping/Summary";
import Success from "./ConfirmationOrder/Success";
import Orders from "./Orders/Orders";
import Shipping from "./Orders/Shipping";
import NewCustomer from "./Customer/NewCustomer";
import Failure from "./ConfirmationOrder/Failure";
import PrivateRoutes from "./Services/PrivateRoutes";
import Provider from "./Context/Provider";
import { NavBar } from "./WebMain/NavBar";

function App() {
  return (
    //<Provider>
    <Router>
      <div className="main">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/welcome" element={<FullPage />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/categories/create" element={<CreatedCategory />} />
            <Route path="/categories/:id" element={<EditCategory />} />
            <Route path="/coverType" element={<CoverType />} />
            <Route path="/coverType/create" element={<CreatedCover />} />
            <Route path="/coverType/:id" element={<EditCover />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/upset" element={<CreateProduct />} />
            <Route path="/product/upset/:id" element={<CreateProduct />} />
            <Route path="/Customer/Details/:id" element={<NewCustomer />} />
            <Route path="/Cart" element={<CartShopping />} />
            <Route path="/Cart/Summary" element={<Summary />} />
            <Route
              path="/OrderConfirmation/Success/:id"
              element={<Success />}
            />
            <Route path="/Order/:status" element={<Orders />} />
            <Route path="/Order/Shipping/:id" element={<Shipping />} />
          </Route>
          <Route path="*" element={<Failure />} />
        </Routes>
      </div>
    </Router>
    // </Provider>
  );
}

export default App;
