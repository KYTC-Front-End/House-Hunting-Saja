import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./style.css";
function Favorite() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#2A5555",
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      color: "707070",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [houses, setHouses] = useState([]);
  const [errorMsg, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenalert(false);
  };

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
        My Favorite Houses
      </Typography>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {houses.slice(0, 4).map((house, idx) => (
            <>
              <StyledTableRow>
                <StyledTableCell align="left">{idx}</StyledTableCell>
                <StyledTableCell align="center">{house.title}</StyledTableCell>
                <StyledTableCell align="center">{house.price}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    style={{ color: "red" }}
                    color="primary"
                    onClick={() => setOpen(true)}
                  >
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
              <Dialog
                class="modal fade"
                open={open}
                onClose={() => setOpen(false)}
              >
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
          ))}
          <Snackbar
            open={openalert}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              Deleted successfully
            </Alert>
          </Snackbar>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Favorite;
