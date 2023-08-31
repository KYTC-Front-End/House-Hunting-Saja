import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import AuthContext from "../Context/AuthContext";

function PublicRoute({ ...rest }) {
  const { isAuth } = useContext(AuthContext);

  return !isAuth ? <Outlet {...rest}> </Outlet> : <Navigate to="/" />;
}

export default PublicRoute;
