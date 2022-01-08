import React from "react";
import { Route, Redirect } from "react-router";
import { useAuth } from "../UserAuth/AuthContext";

export default function NonPrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return !currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect to="/dashboard" />
          );
        }}
      />
    </div>
  );
}
