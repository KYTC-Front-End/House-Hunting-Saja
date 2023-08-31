import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "./style.css";

function Loading() {
  return (
    <Box className="box">
      <CircularProgress />
    </Box>
  );
}

export default Loading;
