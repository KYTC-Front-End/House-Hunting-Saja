import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Pages/Layout";
import Landing from "../Pages/Landing";
import DetailsHouse from "../Pages/DetailsHouse";
import AboutUs from "../Pages/AboutUs";
import SearchPage from "../Pages/Houses";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Profile from "../Pages/Profile";
import PublicRoute from "../Components/Route/PublicRoute";
import PrivateRoute from "../Components/Route/PrivateRoute";
import AuthProvider from "../Components/Context/Authorization";
import NotFound from "../Pages/NotFound";

import {
  HOME_PAGE,
  LOGIN_PAGE,
  SIGNUP_PAGE,
  HOUSES,
  PROFILE,
  ABOUT_US,
} from "../Utils/routes.constant";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route exact path={HOME_PAGE} element={<Landing />} />
          <Route exact path={HOME_PAGE} element={<PublicRoute />}>
            <Route
              exact
              path={LOGIN_PAGE}
              component={Login}
              element={<Login />}
            />
            <Route
              exact
              path={SIGNUP_PAGE}
              component={Register}
              element={<Register />}
            />
          </Route>

          <Route exact path={HOME_PAGE} element={<PrivateRoute />}>
            <Route
              exact
              path={PROFILE}
              component={Profile}
              element={<Profile />}
            />
          </Route>

          <Route exact path={ABOUT_US} element={<AboutUs />} />
          <Route exact path={HOUSES} element={<SearchPage />} />
          <Route exact path={`${HOUSES}/:id`} element={<DetailsHouse />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
