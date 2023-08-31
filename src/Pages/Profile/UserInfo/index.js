import React, { useContext, useState, useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import "./style.css";

function UserInfo() {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [open, setOpen] = useState(false);
  const [openalert, setOpenalert] = useState(false);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenalert(false);
  };

  const handleUserName = (event) => {
    setUsername(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleMobile = (event) => {
    setMobile(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const user = { username, mobile, email };

      const response = await fetch(
        "https://my-json-server.typicode.com/SajaRa20/newapi/users",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        setOpenalert(true);
      }
    } catch (err) {}
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/SajaRa20/newapi/users"
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data[0]);
        }
      } catch (error) {}
    })();
  }, [user]);

  return (
    <TableContainer component={Paper}>
      <Typography
        variant="h4"
        textAlign="center"
        paddingTop="0.5em"
        paddingBottom="0.5em"
        color="#2A5555"
      >
        User Information
      </Typography>
      <Table>
        <TableBody>
          <TableRow align="center">
            <FormControl defaultValue="" className="formlogin" required>
              <TextField
                id="outlined"
                label="User Name"
                defaultValue="Saja"
                value={username}
                onChange={handleUserName}
              />
              <br />
              <br />
              <TextField
                id="outlined"
                label="Email"
                defaultValue="sajarabie2@gmail.com"
                value={email}
                onChange={handleEmail}
              />
              <br />
              <br />
              <TextField
                id="outlined"
                label="Mobile"
                defaultValue="0599169669"
                value={mobile}
                onChange={handleMobile}
              />
              <Button
                onClick={() => setOpen(true)}
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
                Save
              </Button>
              <Dialog open={open} onClose={() => setOpen(false)}>
                <CreditScoreIcon className="icon-Dialog-edit" />
                <DialogTitle>Confirm Updating</DialogTitle>
                <DialogContent>
                  {" "}
                  Are you sure you want to update this personal?
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setOpen(false)}
                    className="btn-Dialog-Cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleSubmit();
                      setOpen(false);
                    }}
                    className="btn-Dialog-Updat"
                  >
                    Update
                  </Button>
                </DialogActions>
              </Dialog>
              <Snackbar
                open={openalert}
                autoHideDuration={8000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="success">
                  User updated successfully
                </Alert>
              </Snackbar>
            </FormControl>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default UserInfo;
