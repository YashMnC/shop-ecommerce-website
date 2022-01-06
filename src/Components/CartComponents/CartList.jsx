import React from "react";
import CartItem from "./CartItem";
import { ProductConsumer } from "../../context";
class CartList extends React.Component {
  render() {
    const value = this.props.value;
    const cart = this.props.value.cart;

    return (
      <React.Fragment>
        <div className="container-fluid">
          {cart.map((item) => {
            return <CartItem key={item.id} item={item} value={value} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default CartList;
