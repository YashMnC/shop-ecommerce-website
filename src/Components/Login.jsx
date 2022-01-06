import React, { useRef, useState } from "react";
import { Card, Form, Alert, CloseButton } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Title from "./Title";
import { ButtonContainer } from "./ButtonContainer";
import { useAuth } from "../UserAuth/AuthContext";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  // const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const guestEmail = process.env.REACT_APP_GUEST_EMAIL;
  const guestPassword = process.env.REACT_APP_GUEST_PASSWORD;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Failed to login. Please try again. ");
    }
    setLoading(false);
  }

  const handleClickCloseButton = () => {
    setError("");
  };

  const handleClickSignupButton = () => {
    history.push("/signup");
  };

  const handleClickForgotPassword = () => {
    history.push("/forgot-password");
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(guestEmail, guestPassword);
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Failed to login. Please try again. ");
    }
    setLoading(false);
  };

  return (
    <div className="container m-4 justify-content-center">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-lg-5">
          <Card style={{ width: "30rem", height: "30rem" }} id="loginCard">
            <Card.Body>
              <Title name="Log" title="In" />

              {error && (
                <Alert variant="danger">
                  {error}

                  <CloseButton onClick={handleClickCloseButton}></CloseButton>
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  {/* <Form.Label>Email address</Form.Label> */}
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    ref={emailRef}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  {/* <Form.Label>Password</Form.Label> */}
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                    required
                  />
                  <Form.Text className="text-muted">
                    Password must be minimum of 7 characters. Should have at
                    least one special character, one number and one uppercase
                    Letter
                  </Form.Text>
                </Form.Group>

                <ButtonContainer
                  disabled={loading}
                  type="submit"
                  className="w-100"
                >
                  {" "}
                  Log In
                </ButtonContainer>

                <ButtonContainer
                  disabled={loading}
                  type="submit"
                  className="w-100"
                  onClick={handleGuestLogin}
                >
                  {" "}
                  Guest Log In
                </ButtonContainer>

                <ButtonContainer
                  onClick={handleClickForgotPassword}
                  className="text-align-center justify-content-center mt-3"
                  smallSize
                >
                  Forgot Password?
                </ButtonContainer>
              </Form>
            </Card.Body>
          </Card>
          <p>
            To create a new account{" "}
            <ButtonContainer smallSize onClick={handleClickSignupButton}>
              Sign Up{" "}
            </ButtonContainer>
          </p>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default Login;
