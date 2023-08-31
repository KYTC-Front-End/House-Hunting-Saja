import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import CardContainer from "../../Components/CardContainer";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import "./style.css";

function Landing() {
  const [houses, setHouses] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const navigate = useNavigate();

  const handleinput = () => {
    navigate("/houses");
  };

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/SajaRa20/newapi/houses")
      .then((response) => response.json())
      .then((data) => {
        setHouses(data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const priceThreshold = 300;
    const filteredHouses = houses.filter(
      (house) => house.price < priceThreshold
    );
    filteredHouses.length = 6;
    houses.length = 3;
    setBestSellers(filteredHouses);
  }, [houses]);

  return (
    <>
      <Box className="header" sx={{ width: "100%" }}>
        <Grid container className="divhero">
          <Grid item xs={12} md={12}>
            <Typography variant="h4" className="herotext">
              Find the most suitable property for you.
            </Typography>
            <Typography
              variant="h4"
              className="herotext"
              paddingBottom={"0.5em"}
            >
              You have the opportunity to list your property.
            </Typography>
          </Grid>

          <Grid item xs={8} md={12}>
            <TextField
              onClick={handleinput}
              className="herosearch"
              variant="outlined"
              placeholder="search about house"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth="lg">
        <div className="housesSection">
          <Typography variant="h4" className="sectionTitle">
            Best Sellers House
          </Typography>
          <CardContainer houses={bestSellers} className="card" />
        </div>

        <div className="housesSection">
          <Typography variant="h4" className="sectionTitle">
            Newest House
          </Typography>
          <CardContainer houses={houses} />
        </div>
      </Container>
    </>
  );
}

export default Landing;
