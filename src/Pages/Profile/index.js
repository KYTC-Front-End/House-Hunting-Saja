import React from "react";

import Container from "@mui/material/Container";

import SideBar from "./SideBar";

import "./style.css";

function Profile() {
  return (
    <Container maxWidth="lg" className="rootprofile">
      <SideBar />
    </Container>
  );
}

export default Profile;
