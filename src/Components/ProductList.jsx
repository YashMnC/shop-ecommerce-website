import React from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../context";

class ProductList extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <React.Fragment>
        <div className="py-5 mt-4">
          <div className="container">
            <Title name="buy" title="products" />
            <div className="row">
              <ProductConsumer>
                {(value) => {
                  return value.products.map((product) => {
                    return (
                      <Product
                        key={product.id}
                        product={product}
                        handleDetail={value.handleDetail}
                        addToCart={value.addToCart}
                        openModal={value.openModal}
                      />
                    );
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>

      // <div>
      //   <Product />
      // </div>
    );
  }
}

export default ProductList;
