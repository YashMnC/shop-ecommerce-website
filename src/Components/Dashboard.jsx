import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Alert, CloseButton } from "react-bootstrap";
import { ButtonContainer } from "./ButtonContainer";
import Title from "./Title";
import { useAuth } from "../UserAuth/AuthContext";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const guestEmail = process.env.REACT_APP_GUEST_EMAIL;
  const isCurrentUserGuest = currentUser.email == guestEmail ? true : false;

  async function handleLogout(e) {
    e.preventDefault();
    try {
      setError("");
      await logout();

      setTimeout(() => history.push("/login"), 2000);

      window.location.reload(false);
    } catch (error) {
      setError("Failed to log out");
      console.log(error);
    }
  }

  const handleClickCloseButton = () => {
    setError("");
  };

  const handleUpdateProfile = () => {
    history.push("/update-profile");
  };

  return (
    <div className="container m-4 justify-content-center text-align-center">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-lg-5" id="dashboardContainer">
          <Card style={{ width: "30rem", height: "24rem" }} id="dashboard">
            <Card.Body>
              {!isCurrentUserGuest && <Title name="Profile" title="" />}
              {isCurrentUserGuest && <Title name="Welcome" title="Guest!" />}
              {error && (
                <Alert variant="danger">
                  {error}

                  <CloseButton onClick={handleClickCloseButton}></CloseButton>
                </Alert>
              )}
              <div className="text-align-center">
                {!isCurrentUserGuest && <strong>Email:</strong>}
                {!isCurrentUserGuest && currentUser && currentUser.email}
              </div>
              {!isCurrentUserGuest && (
                <ButtonContainer
                  onClick={handleUpdateProfile}
                  className="w-100 mt-3"
                >
                  Update Profile
                </ButtonContainer>
              )}
            </Card.Body>
            <p className="m-4">
              <ButtonContainer
                className="w-50 position-absolute top-65 start-50 translate-middle"
                smallSize
                onClick={handleLogout}
              >
                Log Out
              </ButtonContainer>
            </p>
          </Card>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
