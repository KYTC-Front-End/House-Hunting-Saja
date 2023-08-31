import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import image from "../../Utils/images/login.png";
import validationRegister from "../../Utils/validations/register";
import "./style.css";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const validationErrors = {};

  const handleSignin = (event) => {
    navigate("/login");
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleusername = (event) => {
    setUsername(event.target.value);
  };
  const handlepassword = (event) => {
    setPassword(event.target.value);
  };

  const handleconfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlemobile = (event) => {
    setMobile(event.target.value);
  };

  const clear = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setMobile("");
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      await validationRegister.validate(
        { username, password, confirmPassword, mobile },
        { abortEarly: false }
      );

      const userData = {
        username,
        password,
        mobile,
      };
      const response = await fetch(
        "https://my-json-server.typicode.com/SajaRa20/newapi/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        clear();
        setOpen(true);
        handleClose();
        navigate("/login");
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
    <Container maxWidth="lg" className="divregister">
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={12}
        paddingTop="2em"
      >
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <CardMedia className="imgregister" component="img" image={image} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <article className="article-register">
            <Typography variant="h2"> Sign Up</Typography>
            <FormControl defaultValue="" className="formregister" required>
              <TextField
                id="outlined-basic"
                label="Enter user name..."
                variant="outlined"
                value={username}
                onChange={handleusername}
                required
              />
              {error && (
                <Typography variant="p" className="error">
                  {error.username}
                </Typography>
              )}
              <br />

              <TextField
                type="password"
                id="outlined-basic"
                label="Enter Password..."
                variant="outlined"
                value={password}
                onChange={handlepassword}
                required
              />
              {error && (
                <Typography variant="p" className="error">
                  {error.password}
                </Typography>
              )}
              <br />
              <TextField
                type="password"
                id="outlined-basic"
                label="Confirm password...."
                variant="outlined"
                value={confirmPassword}
                onChange={handleconfirmPassword}
                required
              />
              {error && (
                <Typography variant="p" className="error">
                  {error.confirmPassword}
                </Typography>
              )}
              <br />
              <TextField
                type="text"
                id="outlined-basic"
                label="Enter you phone number..."
                variant="outlined"
                value={mobile}
                onChange={handlemobile}
                required
              />
              {error && (
                <Typography variant="p" className="error">
                  {error.mobile}
                </Typography>
              )}
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="success">
                  Congrats! Signed up Successfully
                </Alert>
              </Snackbar>
              <Button
                onClick={handleAddUser}
                sx={{
                  marginTop: "1.5em",
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
                Sign up
              </Button>
              <Typography variant="p" className="Account">
                {" "}
                Do You Account?<span onClick={handleSignin}> Signin here</span>
              </Typography>
            </FormControl>
          </article>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
