import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { ProductConsumer } from "../context";
import PropTypes from "prop-types";
import { ButtonContainer } from "./ButtonContainer";

class Product extends React.Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;
    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <div
            className="img-container p-5"
            onClick={() => this.props.handleDetail(id)}
          >
            <Link to="/details">
              <img src={img} alt="product image" className="card-img-top" />
            </Link>
          </div>

          <div className="container">
            <ButtonContainer
              smallSize
              cartProp
              className="card-body btn btn-sm"
              id={inCart ? "inCart" : "add-to-cart"}
              disabled={inCart ? true : false}
              onClick={() => {
                this.props.addToCart(id);
                this.props.openModal(id);
              }}
            >
              {inCart ? (
                <p className="text-capitalize mb-0">Item In Cart</p>
              ) : (
                <p className="text-capitalize mb-0">Add to Cart</p>
              )}
            </ButtonContainer>
          </div>
          {/* card footer */}
          <div className="card-footer d-flex justify-content-between">
            <p className="align-self-center mb-0">{title}</p>
            <h5 className="text-blue font-italic mb-0">
              <span className="mr-1">$</span>
              {price}
            </h5>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    img: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
  }).isRequired,
};

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    // transition: all 1s linear;
    background: var(--lightGrey);
    border: 0.04rem solid rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
  }

  .card:hover {
  }

  .card-footer {
    background-color: transparent;
    border-top: transparent;
    // transition: all 1s linear;
    background: rgba(247, 247, 247);
  }

  // .card:hover {
  //   border: 0.04rem solid rgba(0, 0, 0, 0.2);
  //   box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
  // }

  // .card-footer:hover {
  //   background: rgba(247, 247, 247);
  // }

  .img-container {
    position: relative;
    overflow: hidden;
  }

  .card-img-top {
    transition: all 1s linear;
  }

  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }

  #add-to-cart {
    opacity: 0;
  }

  .card:hover #add-to-cart {
    opacity: 1 !important;
  }

  // #add-to-cart:hover {
  //   background: var(--mainYellow);
  //   color: var(--mainBlue);
  //   cursor: pointer;
  // }

  #inCart {
    opacity: 1;
  }

  #inCart:hover {
  }
`;

export default Product;
