import React from "react";
import { Link } from "react-router-dom";
import PayPalButton from "./PayPalButton";
class CartTotals extends React.Component {
  render() {
    const { cartSubtotal, cartTax, cartTotal, clearCart } = this.props.value;
    const history = this.props.history;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
              <Link to="/">
                <button
                  className="btn btn-outline-danger text-uppercase mb-3 px-3"
                  tyle="button"
                  onClick={() => clearCart()}
                >
                  clear cart
                </button>
              </Link>
              <h5>
                <span className="text-title">subtotal : </span>
                <strong>$ {cartSubtotal}</strong>
              </h5>
              <h5>
                <span className="text-title">tax : </span>
                <strong>$ {cartTax}</strong>
              </h5>
              <h5>
                <span className="text-title">total : </span>
                <strong>$ {cartTotal}</strong>
              </h5>
              <PayPalButton
                total={cartTotal}
                clearCart={clearCart}
                history={history}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CartTotals;
