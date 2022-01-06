import React from "react";
// import { isElement } from "react-dom/test-utils";
import { storeProducts, detailProduct } from "./data";
const ProductContext = React.createContext();

class ProductProvider extends React.Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });

    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = (id) => {
    const tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    product.total = product.price;
    tempProducts[index] = product;
    this.setState(
      () => {
        return {
          products: tempProducts,
          cart: [...this.state.cart, product],
        };
      },
      () => this.handleTotal()
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(
      () => {
        return { modalProduct: product, modalOpen: true };
      },
      () => this.handleTotal()
    );
  };

  closeModal = () => {
    this.setState(
      () => {
        return { modalOpen: false };
      },
      () => this.handleTotal()
    );
  };

  increment = (id) => {
    const products = [...this.state.cart];

    products.forEach((item) => {
      if (item.id === id) {
        item.count = item.count + 1;
        item.total = item.price * item.count;
      }
    });
    this.setState(
      () => {
        return { cart: [...products] };
      },
      () => this.handleTotal()
    );
  };

  decrement = (id) => {
    const products = [...this.state.cart];
    let isCountZero = false;

    products.forEach((item) => {
      if (item.id === id && item.count > 0) {
        item.count = item.count - 1;
        item.total = item.price * item.count;

        if (item.count === 0) {
          isCountZero = true;
          this.removeItem(id);
        }
      }
    });
    if (!isCountZero) {
      this.setState(() => {
        return { cart: [...products] };
      });
    }
    this.handleTotal();
  };

  removeItem = (id) => {
    const products = [...this.state.cart];
    const newProducts = [];

    products.forEach((item) => {
      if (item.id !== id) newProducts.push(item);
      else if (item.id === id) {
        item.inCart = false;
        item.count = 0;
        item.total = 0;
      }
    });

    this.setState(() => {
      return { cart: [...newProducts] };
    });
    this.handleTotal();
  };

  clearCart = () => {
    this.setState(
      () => {
        return {
          cart: [],
          cartSubtotal: 0,
          cartTax: 0,
          cartTotal: 0,
        };
      },
      () => this.setProducts()
    );
  };

  handleTotal = () => {
    let { cartTotal, cartSubtotal, cartTax } = this.state;
    const cart = this.state.cart;
    let total = 0;
    cart.forEach((item) => {
      total = total + item.price * item.count;
    });
    cartSubtotal = total;
    cartTax = 0.1 * cartSubtotal;
    cartTax = Math.round(100 * cartTax) / 100;
    cartTotal = cartSubtotal + cartTax;
    this.setState(() => {
      return { cartSubtotal, cartTax, cartTotal };
    });
  };

  render() {
    return (
      <React.Fragment>
        <ProductContext.Provider
          value={{
            ...this.state,
            handleDetail: this.handleDetail,
            addToCart: this.addToCart,
            openModal: this.openModal,
            closeModal: this.closeModal,
            increment: this.increment,
            decrement: this.decrement,
            removeItem: this.removeItem,
            clearCart: this.clearCart,
          }}
        >
          {this.props.children}
        </ProductContext.Provider>
      </React.Fragment>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
