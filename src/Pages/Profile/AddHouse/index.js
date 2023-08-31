import React, { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import { locationFilter, categorFilter } from "../../../Utils/staticData";
import validationAdd from "../../../Utils/validations/Addhouse";

import "./style.css";

function AddHouse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [bedroom, setRooms] = useState();
  const [bathroom, setBathRooms] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const validationErrors = {};
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

  const clear = () => {
    setTitle("");
    setDescription("");
    setRooms("");
    setBathRooms("");
    setPrice("");
    setImage("");
    setCategory("");
    setLocation("");
  };
  const handelAddHouse = async (event) => {
    event.preventDefault();
    try {
      await validationAdd.validate(
        { title, description, city, bedroom, bathroom, category, price, image },
        { abortEarly: false }
      );

      const houseDate = {
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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(houseDate),
        }
      );
      if (response.ok) {
        const data = await response.json();
        clear();
        setOpen(true);
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      }
      setError(validationErrors);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography
        variant="h4"
        textAlign="center"
        paddingTop="0.5em"
        paddingBottom="0.5em"
        color="#2A5555"
      >
        Add House
      </Typography>
      <Table>
        <TableBody>
          <TableRow align="center">
            <FormControl defaultValue="" className="formlogin" required>
              <TextField
                id="outlined-basic"
                label="Title"
                placeholder="Enter the Title"
                variant="outlined"
                required
                onChange={handleTitle}
                value={title}
              />
              {error && (
                <Typography variant="p" className="error">
                  {error.title}
                </Typography>
              )}
              <br />
              <br />
              <TextField
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
              {error && (
                <Typography variant="p" className="error">
                  {error.description}
                </Typography>
              )}
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
                {error && (
                  <Typography variant="p" className="error">
                    {error.bedroom}
                  </Typography>
                )}
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
                {error && (
                  <Typography variant="p" className="error">
                    {error.bathroom}
                  </Typography>
                )}
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
                {error && (
                  <Typography variant="p" className="error">
                    {error.price}
                  </Typography>
                )}
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
                {error && (
                  <Typography variant="p" className="error">
                    {error.city}
                  </Typography>
                )}
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
                {error && (
                  <Typography variant="p" className="error">
                    {error.category}
                  </Typography>
                )}
              </div>
              <br />
              <br />
              <TextField
                variant="outlined"
                placeholder="Enter the url image"
                type="text"
                name="image"
                required
                value={image}
                onChange={handleImage}
              />
              {error && (
                <Typography variant="p" className="error">
                  {error.image}
                </Typography>
              )}
              <Button
                onClick={handelAddHouse}
                className="btnadd"
                sx={{
                  marginLeft: "13em",
                  width: "200px",
                  marginTop: "2.5em",
                  marginBottom: "2.5em",
                  color: "white",
                  bgcolor: "#EB9235",
                  fontSize: "20px",
                  fontWeight: "300",
                  "&:hover": {
                    backgroundColor: "#EB9235",
                    color: "white",
                  },
                }}
              >
                Add
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="success">
                  Added successfully
                </Alert>
              </Snackbar>
            </FormControl>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AddHouse;
