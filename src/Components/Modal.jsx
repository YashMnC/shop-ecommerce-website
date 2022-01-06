import React from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./ButtonContainer";
import { Link } from "react-router-dom";
class Modal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ProductConsumer>
          {(value) => {
            const isModalOpen = value.modalOpen;
            const { openModal, closeModal, modalProduct } = value;
            const { img, title, price } = modalProduct;
            return isModalOpen ? (
              <ModalContainer>
                <div className="container">
                  <div className="row">
                    <div
                      id="modal"
                      className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
                    >
                      <h5>Item added to the cart</h5>
                      <img
                        src={img}
                        className="img-fluid"
                        alt="product image"
                      />

                      <h5>{title}</h5>
                      <h5 className="text-muted">price: $ {price}</h5>
                      <Link to="/">
                        <ButtonContainer onClick={() => closeModal()}>
                          store
                        </ButtonContainer>
                      </Link>
                      <Link to="/cart">
                        <ButtonContainer cartProp onClick={() => closeModal()}>
                          go to cart
                        </ButtonContainer>
                      </Link>
                    </div>
                  </div>
                </div>
              </ModalContainer>
            ) : null;
          }}
        </ProductConsumer>
      </React.Fragment>
    );
  }
}

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
