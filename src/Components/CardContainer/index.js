import React from "react";

import Container from "@mui/material/Container";

import Grid from "@mui/material/Grid";

import Loading from "../Loading";
import Card from "../Card";

import "./style.css";

function CardContainer({ houses }) {
  return (
    <Container>
      {houses.length ? (
        <Grid
          container
          rowSpacing={2}
          spacing={{ xs: 2, md: 12 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {houses.map((house) => (
            <Grid item key={house.id} xs={12} sm={4} md={4} lg={4}>
              <Card house={house} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default CardContainer;
