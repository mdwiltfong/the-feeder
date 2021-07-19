import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

// For Private Routes

// Use component to determine if the user is valid, and redirects to
// route if so. If user is not valid, it will redirect to login form.


function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);

  if(!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;