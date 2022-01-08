import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import cartImage from "../cart.svg";
import { ButtonContainer } from "./ButtonContainer";
import { ProductConsumer } from "../context";

class Navbar extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div id="navbar">
        <nav className="navbar navbar-expand-sm navbar-dark px-sm-5 flex-sm-row">
          <Link to="/">
            <img
              src="https://img.icons8.com/officel/40/000000/shopping-basket.png"
              alt="logo"
            />
          </Link>
          <ul className="navbar-nav align-items-center">
            <ProductLinkWrapper>
              <li className="nav-item">
                <Link to="/" className="nav-link" id="productsLink">
                  PRODUCTS
                </Link>
              </li>
            </ProductLinkWrapper>
          </ul>

          <ProductConsumer>
            {(value) => {
              return (
                <Link to="/cart" className="ml-auto">
                  <CartButtonWrapper>
                    <button
                      className="btn btn-outline-light text-white"
                      id="cartBtn"
                      // onClick={() => console.log("add to cart from product component")}
                    >
                      <span className="mr-2">
                        {" "}
                        <i className="fas fa-cart-plus"></i>{" "}
                      </span>
                      Cart
                      <span class="badge badge-warning m-1">
                        {value.cart.length}
                      </span>
                    </button>
                  </CartButtonWrapper>
                </Link>
              );
            }}
          </ProductConsumer>

          <Link to="/dashboard" className="text-dark">
            {/* <ButtonContainer smallSize className="m-1">
              My profile
            </ButtonContainer> */}
            <CartButtonWrapper className="m-1">
              <button className="btn btn-outline-light text-white" id="cartBtn">
                Profile
              </button>
            </CartButtonWrapper>
          </Link>
        </nav>
      </div>
    );
  }
}

const CartButtonWrapper = styled.div`
  #cartBtn {
    border-radius: 0.3rem;

    padding: 0.2rem 0.5rem;
    transition: all 1s linear;
  }
  #cartBtn:hover {
    //   transform: scale(1.05, 1.05);
    //   cursor: pointer;
    //   color: grey !important;
    color: var(--mainDark) !important;
  }
  // #cartBtn:focus {
  //   outline: none !important;
  // }
`;

const ProductLinkWrapper = styled.div`
  #productsLink {
    color: var(--mainWhite);
    transition: all 1s linear;
  }
  #productsLink:hover {
    //   transform: scale(1.05, 1.05);
    cursor: pointer !important;
    color: var(--mainDark) !important;
  }
`;

export default Navbar;
