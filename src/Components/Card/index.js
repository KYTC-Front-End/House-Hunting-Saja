import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BathroomIcon from "@mui/icons-material/Bathroom";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { HOUSES } from "../../Utils/routes.constant";
import AuthContext from "../../Components/Context/AuthContext";
import "./style.css";

export default function CardComponent({ house }) {
  const { isAuth } = useContext(AuthContext);
  const { id, image, title, description, city, price, bedroom, bathroom } =
    house;

  const [isFavorite, setIsFavorite] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const addToFavorite = async (id) => {
    const response = await fetch(
      `https://my-json-server.typicode.com/SajaRa20/newapi/houses/${id}`
    );
    const item = await response.json();
    fetch("https://my-json-server.typicode.com/SajaRa20/newapi/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => {
        if (response.ok) {
          setIsFavorite(true);
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {});
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Card sx={{ borderRadius: "10px", margin: "10px" }}>
      <CardMedia sx={{ height: 180 }} image={image} title="Image House" />
      <CardContent className="CardContent">
        <Box className="CardContentTitle">
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            style={{ fontSize: "25px" }}
          >
            {title.split("").splice(0, 10).join("")}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            style={{ fontSize: "25px" }}
          >
            ${price}
          </Typography>
        </Box>

        <Box className="detailsCardBox">
          <Typography variant="body2" color="#909090" className="detailsCard">
            <LocalHotelIcon
              style={{ fontSize: "15px", marginRight: "5px", color: "#2A5555" }}
            />
            {bedroom}bd
          </Typography>

          <Typography variant="body2" color="#909090" className="detailsCard">
            <BathroomIcon
              style={{ fontSize: "15px", marginRight: "5px", color: "#2A5555" }}
            />
            {bathroom}ba
          </Typography>

          <Typography variant="body2" color="#909090" className="detailsCard">
            <LocationOnIcon
              style={{ fontSize: "15px", marginRight: "5px", color: "#2A5555" }}
            />
            {city}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          style={{ color: "#7D7D7D", fontSize: "18px" }}
        >
          {description.split("").splice(0, 40).join("") + "......"}
        </Typography>
      </CardContent>

      <CardActions className="cardActions">
        <Link
          to={`${HOUSES}/${id}`}
          sx={{ bgcolor: "#EB9235", color: "white", fontWeight: "500" }}
          className="detailsLink"
        >
          More Details
        </Link>

        <>
          {isAuth && (
            <Button style={{ padding: "1px", color: "#000" }}>
              {isFavorite ? (
                <FavoriteIcon style={{ color: "red", fontSize: "30px" }} />
              ) : (
                <FavoriteBorderIcon
                  className="favorite"
                  onClick={addToFavorite}
                  style={{ fontSize: "30px", color: "#ABABAB" }}
                />
              )}
            </Button>
          )}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              House added to favorites successfully!
            </Alert>
          </Snackbar>
        </>
      </CardActions>
    </Card>
  );
}
