import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Navbar from "./Components/Navbar";
import ProductList from "./Components/ProductList";
import Cart from "./Components/CartComponents/Cart";
import Details from "./Components/Details";
import Default from "./Components/Default";
import Modal from ".//Components/Modal";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword";
import UpdateProfile from "./Components/UpdateProfile";
import NonPrivateRoute from "./Components/NonPrivateRoute";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" component={Navbar} />
          <Route component={Default} />
        </Switch>
        <NonPrivateRoute exact path="/login" component={Login} />
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        <NonPrivateRoute path="/forgot-password" component={ForgotPassword} />
        <NonPrivateRoute path="/signup" component={Signup} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/" component={ProductList} />
        <PrivateRoute path="/cart" component={Cart} />
        <PrivateRoute path="/details" component={Details} />
        <Modal />
      </BrowserRouter>
    );
  }
}

export default App;
