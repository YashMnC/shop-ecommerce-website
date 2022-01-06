import React, { useRef, useState } from "react";
import { Card, Form, Alert, CloseButton } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Title from "./Title";
import { ButtonContainer } from "./ButtonContainer";
import { useAuth } from "../UserAuth/AuthContext";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password and confirm password do not match.");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Failed to create an account. Please try again. ");
    }
    setLoading(false);
  }

  const handleClickCloseButton = () => {
    setError("");
  };

  const handleClickLogin = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  return (
    <div className="container m-4 justify-content-center">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-lg-5">
          <Card style={{ width: "35rem", height: "30rem" }} id="signupCard">
            <Card.Body>
              <Title name="Sign" title="Up" />

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

                <Form.Group className="mb-3" controlId="password-confirm">
                  {/* <Form.Label>Confirm Password</Form.Label> */}
                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Accept the terms and conditions"
                  />
                </Form.Group>

                <ButtonContainer
                  disabled={loading}
                  type="submit"
                  className="w-100"
                >
                  {" "}
                  Sign Up
                </ButtonContainer>
              </Form>
            </Card.Body>
          </Card>
          <p>
            Already have an account?{" "}
            <ButtonContainer smallSize onClick={handleClickLogin}>
              Log In
            </ButtonContainer>
            {/* </Link> */}
          </p>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default Signup;
