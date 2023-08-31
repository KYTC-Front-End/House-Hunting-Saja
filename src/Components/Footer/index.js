import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box } from "@mui/material";

function Footer() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/about-us");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleTwitterClick = () => {
    const twitterLink = "https://twitter.com/home";
    window.open(twitterLink, "_blank");
  };

  const handleEmailClick = () => {
    const emailLink = "https://mail.google.com/mail/u/0/#inbox";
    window.open(emailLink, "_blank");
  };

  const handleLinkedClick = () => {
    const Link = "https://www.linkedin.com/messaging/thread/new/";
    window.open(Link, "_blank");
  };

  return (
    <Box
      component="footer"
      sx={{ p: 4, bgcolor: "#2A5555", marginTop: " 39px" }}
    >
      <Container maxWidth="lg">
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={6} sm={4}>
            <Typography variant="h6" sx={{ color: "#EB9235" }} gutterBottom>
              About us
            </Typography>
            <Typography variant="body2" color="white">
              Specializes in presenting properties in a distinctive way,
              allowing you to search for your desired property based on the
              specifications you have in mind
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="h6" sx={{ color: "#EB9235" }} gutterBottom>
              Important links
            </Typography>
            <Typography variant="body2" color="white" onClick={handleHome}>
              Home
            </Typography>
            <Typography variant="body2" color="white" onClick={handleClick}>
              about us
            </Typography>
            <Typography variant="body2" color="white">
              contact us
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="h6" sx={{ color: "#EB9235" }} gutterBottom>
              contact us
            </Typography>
            <Link sx={{ color: "white" }} onClick={handleTwitterClick}>
              <TwitterIcon />
            </Link>
            <Link
              sx={{ pl: 1, pr: 1, color: "white" }}
              onClick={handleEmailClick}
            >
              <EmailIcon />
            </Link>
            <Link sx={{ color: "white" }} onClick={handleLinkedClick}>
              <LinkedInIcon />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
