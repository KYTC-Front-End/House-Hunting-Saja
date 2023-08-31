import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UpdateHouse from "../UpdateHouse";
import "./style.css";
function Houses() {
  const [houses, setHouses] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const [openalert, setOpenalert] = useState(false);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenalert(false);
  };
  const handleClick = () => {
    setOpenalert(true);
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/SajaRa20/newapi/houses"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHouses(data);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [refresh]);

  const deleteHouse = async (houseId) => {
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/SajaRa20/newapi/houses/${houseId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setOpenalert(true);
      }
      const updatedHouses = houses.filter((house) => house.id !== houseId);
      setHouses(updatedHouses);
    } catch (error) {
      setError("Failed to delete the house");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/SajaRa20/newapi/houses"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHouses(data);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [refresh]);

  return (
    <TableContainer component={Paper}>
      <Typography
        variant="h4"
        textAlign="center"
        paddingTop="0.5em"
        paddingBottom="0.5em"
        color="#2A5555"
      >
        My Houses
      </Typography>
      <Table>
        <TableBody>
          {houses.length ? (
            houses.slice(0, 4).map((house) => (
              <>
                <TableRow align="right">
                  <TableCell>
                    <img className="img" src={house.image} alt="house " />
                  </TableCell>
                  <TableCell style={{ color: "#7D7D7D", fontSize: "20px" }}>
                    {house.title} <br />
                    <br />
                    {house.price} $ / week
                  </TableCell>
                  <TableCell style={{ color: "#7D7D7D", fontSize: "20px" }}>
                    {" "}
                    {house.city}{" "}
                  </TableCell>
                  <TableCell>
                    <Button
                      style={{ color: "red" }}
                      color="primary"
                      onClick={() => setOpen(true)}
                    >
                      <DeleteIcon />
                    </Button>
                    <UpdateHouse
                      house={{
                        title: house.title,
                        description: house.description,
                        city: house.city,
                        category: house.category,
                        bathroom: house.bathroom,
                        price: house.price,
                        bedroom: house.bedroom,
                        image: house.image,
                      }}
                    />
                  </TableCell>
                </TableRow>
                <Dialog open={open} onClose={() => setOpen(false)}>
                  <HighlightOffIcon className="icon-Dialog" />
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogContent>
                    {" "}
                    Do you really want to delete these records? <br />
                    This process cannot be undone.
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
                        deleteHouse(house.id);
                        setOpen(false);
                      }}
                      className="btn-Dialog-Delete"
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ))
          ) : (
            <Alert severity="info">no houses added yet </Alert>
          )}
        </TableBody>
        <Snackbar
          open={openalert}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Deleted successfully
          </Alert>
        </Snackbar>
      </Table>
    </TableContainer>
  );
}
export default Houses;
