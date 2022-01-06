import React, { useRef, useState } from "react";
import { Card, Form, Alert, CloseButton } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Title from "./Title";
import { ButtonContainer } from "./ButtonContainer";
import { useAuth } from "../UserAuth/AuthContext";

function Login() {
  const emailRef = useRef();

  const { resetPassword } = useAuth();
  // const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions.");
    } catch (error) {
      console.log(error);
      setError("Failed to reset password.");
    }
    setLoading(false);
  }

  const handleClickErrorCloseButton = () => {
    setError("");
  };

  const handleClickSignupButton = () => {
    history.push("/signup");
  };

  const handleClickLoginButton = () => {
    history.push("/login");
  };

  const handleClickMessageCloseButton = () => {
    setMessage("");
  };

  return (
    <div className="container m-4 justify-content-center">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-lg-5">
          <Card style={{ width: "30rem", height: "28rem" }} id="loginCard">
            <Card.Body>
              <Title name="Reset" title="Password" />

              {error && (
                <Alert variant="danger">
                  {error}

                  <CloseButton
                    onClick={handleClickErrorCloseButton}
                  ></CloseButton>
                </Alert>
              )}

              {message && (
                <Alert variant="success">
                  {message}

                  <CloseButton
                    onClick={handleClickMessageCloseButton}
                  ></CloseButton>
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

                <ButtonContainer
                  disabled={loading}
                  type="submit"
                  className="w-100"
                >
                  {" "}
                  Reset Password
                </ButtonContainer>
              </Form>
            </Card.Body>
            <p className="m-2">
              To create a new account{" "}
              <ButtonContainer smallSize onClick={handleClickSignupButton}>
                Sign Up{" "}
              </ButtonContainer>
            </p>
            <p className="m-2">
              Already have an account?{" "}
              <ButtonContainer smallSize onClick={handleClickLoginButton}>
                Login In{" "}
              </ButtonContainer>
            </p>
          </Card>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default Login;
