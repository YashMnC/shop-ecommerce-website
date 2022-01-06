import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import cartImage from "../cart.svg";
import { ButtonContainer } from "./ButtonContainer";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <Link to="/">
          <img
            src="https://img.icons8.com/officel/40/000000/shopping-basket.png"
            alt="logo"
          />
        </Link>
        <ul className="navbar-nav align-items-center">
          <ProductLinkWrapper>
            <li className="nav-item" id="productsLink">
              <Link to="/" className="nav-link">
                Products
              </Link>
            </li>
          </ProductLinkWrapper>
        </ul>
        <Link to="/cart" className="ml-auto">
          <CartButtonWrapper>
            <button
              className="btn btn-outline-primary text-white"
              id="cartBtn"
              // onClick={() => console.log("add to cart from product component")}
            >
              <span className="mr-2">
                {" "}
                <i className="fas fa-cart-plus"></i>{" "}
              </span>
              My Cart
            </button>
          </CartButtonWrapper>
        </Link>
        <Link to="/dashboard">
          <ButtonContainer smallSize className="m-1">
            My profile
          </ButtonContainer>
        </Link>
      </nav>
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
    transform: scale(1.05, 1.05);
    cursor: pointer;
    color: var(--mainBlue) !important;
  }
  #cartBtn:focus {
    outline: none !important;
  }
`;

const ProductLinkWrapper = styled.div`
  #productsLink {
    color: (--mainWhite);
    transition: all 1s linear;
  }
  #productsLink:hover {
    transform: scale(1.05, 1.05);
    cursor: pointer;
  }
`;

export default Navbar;
