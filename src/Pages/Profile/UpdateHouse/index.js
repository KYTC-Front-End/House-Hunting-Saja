import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { locationFilter, categorFilter } from "../../../Utils/staticData";

import "./style.css";

function UpdateHouse({ house }) {
  const [title, setTitle] = useState(house.title);
  const [description, setDescription] = useState(house.description);
  const [city, setLocation] = useState(house.city);
  const [category, setCategory] = useState(house.category);
  const [bedroom, setRooms] = useState(house.bedroom);
  const [bathroom, setBathRooms] = useState(house.bathroom);
  const [price, setPrice] = useState(house.price);
  const [image, setImage] = useState(house.image);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleRooms = (event) => {
    setRooms(event.target.value);
  };

  const handleBathrooms = (event) => {
    setBathRooms(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      const userDate = {
        title,
        description,
        city,
        category,
        bedroom,
        bathroom,
        price,
        image,
      };

      const response = await fetch(
        "https://my-json-server.typicode.com/SajaRa20/newapi/houses",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDate),
        }
      );

      if (!response.ok) {
        setOpen(true);
      }
    } catch (err) {}
  };

  const handleClickDialog = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <Button
        onClick={handleClickDialog}
        style={{ color: "#7D7D7D" }}
        color="primary"
      >
        <EditCalendarIcon />
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Updating</DialogTitle>
        <DialogContent>
          {" "}
          <TextField
            className="title"
            id="outlined-basic"
            label="Title"
            placeholder="Enter the Title"
            variant="outlined"
            required
            onChange={handleTitle}
            value={title}
          />
          <br />
          <br />
          <TextField
            className="description"
            id="outlined-basic"
            label="Description"
            placeholder="Enter the Description"
            multiline
            rows={4}
            required
            maxRows={4}
            onChange={handleDescription}
            value={description}
          />
          <br />
          <br />
          <div className="divnum">
            <TextField
              variant="outlined"
              placeholder="Enter the Room"
              type="number"
              label="Rooms"
              name="rooms"
              required
              onChange={handleRooms}
              value={bedroom}
            />
            <TextField
              variant="outlined"
              type="number"
              placeholder="Enter the Bathrooms"
              label="Bathrooms"
              name="bathrooms"
              required
              onChange={handleBathrooms}
              value={bathroom}
            />
            <TextField
              variant="outlined"
              type="number"
              placeholder="Enter the Price"
              label="Price ₪"
              name="price"
              required
              onChange={handlePrice}
              value={price}
            />
          </div>
          <br />
          <br />
          <div className="divnum">
            <TextField
              placeholder="Choose the location"
              className="location"
              id="filled-select-location"
              select
              required
              label="location"
              variant="outlined"
              name="location"
              value={city}
              onChange={handleLocation}
            >
              {locationFilter.map((item) => (
                <MenuItem value={item}>{item.toLocaleLowerCase()}</MenuItem>
              ))}
            </TextField>
            <TextField
              className="category"
              required
              placeholder="Choose the category"
              id="filled-select-category"
              select
              label="category"
              variant="outlined"
              name="category"
              value={category}
              onChange={handleCategory}
            >
              {categorFilter.map((item) => (
                <MenuItem value={item}>{item.toLocaleLowerCase()}</MenuItem>
              ))}
            </TextField>
          </div>
          <br />
          <br />
          <TextField
            className="image"
            variant="outlined"
            placeholder="Enter the url image"
            type="text"
            name="image"
            required
            value={image}
            onChange={handleImage}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            className="btn-Dialog-Cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              setOpenDialog(false);
            }}
            className="btn-Dialog-Updat"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Update successfully
        </Alert>
      </Snackbar>
    </>
  );
}

export default UpdateHouse;
