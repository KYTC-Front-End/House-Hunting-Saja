import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import Cookies from "js-cookie";

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState(null);

  const login = (userData, tokens) => {
    setUser(userData);
    Cookies.set("accessToken", tokens.accessToken);
    Cookies.set("refreshToken", tokens.refreshToken);
    setIsAuth(true);
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsAuth(false);
  };

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ setIsAuth, isAuth, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
