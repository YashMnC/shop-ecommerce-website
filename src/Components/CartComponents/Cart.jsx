import React from "react";
import Title from "../Title";
import { ProductConsumer } from "../../context";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
class Cart extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ProductConsumer>
          {(value) => {
            const cartItems = [...value.cart];

            return cartItems.length ? (
              <div>
                <Title name="Your" title="Cart" />
                <CartColumns />
                <CartList value={value} />
                <CartTotals value={value} history={this.props.history} />
              </div>
            ) : (
              <div className="container mt-5">
                <Title name="Your cart is empty" title="" />
              </div>
            );
          }}
        </ProductConsumer>
      </React.Fragment>
    );
  }
}

export default Cart;
