import React, { useRef, useState } from "react";
import { Card, Form, Alert, CloseButton } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Title from "./Title";
import { ButtonContainer } from "./ButtonContainer";
import { useAuth } from "../UserAuth/AuthContext";

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, changeEmail, changePassword } = useAuth();

  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [messageEmail, setMessageEmail] = useState();
  const [messagePassword, setMessagePassword] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleUpdateEmail(e) {
    e.preventDefault();
    if (emailRef.current.value === currentUser.email) {
      return setErrorEmail(emailRef.current.value + " is already registered.");
    }
    try {
      setLoading(true);
      setErrorEmail("");
      setMessageEmail("");
      await changeEmail(emailRef.current.value);
      setMessageEmail("Email is updated successfully.");
      setTimeout(() => {
        history.push("/dashboard");
      }, 4000);
    } catch (error) {
      console.log(error);
      setMessageEmail("");
      setErrorEmail("Failed to update email. Logout and try again.");
    }

    setLoading(false);
  }

  async function handlePasswordUpdate(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setErrorPassword("Password and confirm password do not match.");
    }
    try {
      setLoading(true);
      setErrorPassword("");
      setMessagePassword("");
      await changePassword(passwordRef.current.value);
      setMessagePassword("Password is updated successfully.");
      setTimeout(() => {
        history.push("/dashboard");
      }, 4000);
    } catch (error) {
      console.log(error);
      setMessagePassword("");
      setErrorPassword("Failed to update password. Logout and try again.");
    }

    setLoading(false);
  }

  const handleClickCloseButtonErrorEmail = () => {
    setErrorEmail("");
  };

  const handleClickCloseButtonMessageEmail = () => {
    setMessageEmail("");
  };

  const handleClickCloseButtonErrorPassword = () => {
    setErrorPassword("");
  };

  const handleClickCloseButtonMessagePassoword = () => {
    setMessagePassword("");
  };

  const handleClickCancel = (e) => {
    e.preventDefault();
    history.push("/dashboard");
  };

  return (
    <div className="container m-4 justify-content-center">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-lg-5">
          <Card style={{ width: "35rem", height: "38rem" }} id="signupCard">
            <Card.Body>
              <Title name="Update" title="Profile" />

              {errorEmail && (
                <Alert variant="danger">
                  {errorEmail}

                  <CloseButton
                    onClick={handleClickCloseButtonErrorEmail}
                  ></CloseButton>
                </Alert>
              )}
              {messageEmail && (
                <Alert variant="success">
                  {messageEmail}

                  <CloseButton
                    onClick={handleClickCloseButtonMessageEmail}
                  ></CloseButton>
                </Alert>
              )}
              <Form onSubmit={handleUpdateEmail}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Update email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={currentUser.email}
                    ref={emailRef}
                    required
                  />
                </Form.Group>
                <ButtonContainer
                  disabled={loading}
                  type="submit"
                  className="w-100 mb-3"
                  smallSize
                >
                  {" "}
                  Update Email
                </ButtonContainer>
              </Form>

              {errorPassword && (
                <Alert variant="danger">
                  {errorPassword}

                  <CloseButton
                    onClick={handleClickCloseButtonErrorPassword}
                  ></CloseButton>
                </Alert>
              )}
              {messagePassword && (
                <Alert variant="success">
                  {messagePassword}

                  <CloseButton
                    onClick={handleClickCloseButtonMessagePassoword}
                  ></CloseButton>
                </Alert>
              )}
              <Form onSubmit={handlePasswordUpdate}>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Update password</Form.Label>
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
                    placeholder="Confirm Password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>

                <ButtonContainer
                  disabled={loading}
                  type="submit"
                  className="w-100"
                  smallSize
                >
                  {" "}
                  Update Password
                </ButtonContainer>
              </Form>
            </Card.Body>
          </Card>
          <p>
            <ButtonContainer smallSize onClick={handleClickCancel}>
              Cancel
            </ButtonContainer>
            {/* </Link> */}
          </p>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default UpdateProfile;
