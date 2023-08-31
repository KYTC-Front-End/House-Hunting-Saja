import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import AuthContext from "../Context/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuth } = useContext(AuthContext);
  return <Outlet {...rest}>{isAuth && <Component />}</Outlet>;
}

export default PrivateRoute;
