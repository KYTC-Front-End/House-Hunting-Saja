import React, { useState } from "react";

import { Tabs, Typography, Tab, Avatar, Box } from "@mui/material";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import Favorite from "../FavoriteList";
import Houses from "../Houses";
import UserInfo from "../UserInfo";
import AddHouse from "../AddHouse";
import image from "../../../Utils/images/me.jpg";

import "./style.css";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function SideBar() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="sideBarroot">
      <div className="sideBarContainer">
        <div className="userAvatar">
          <Avatar
            className="avatar"
            src={image}
            sx={{ width: 150, height: 150 }}
          />
          <Typography variant="h3">Saja Rabie</Typography>
        </div>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className="tabs"
        >
          <Tab
            label="Personal Inforamtion "
            icon={<PersonOutlineIcon />}
            className="tab"
            {...a11yProps(0)}
          />
          <Tab
            label="Houses"
            icon={<HouseSidingIcon />}
            className="tab"
            {...a11yProps(1)}
          />
          <Tab
            label="Favorites House"
            icon={<FavoriteBorderIcon />}
            className="tab"
            {...a11yProps(2)}
          />
          <Tab
            label="Add Houses"
            icon={<AddIcon />}
            className="tab"
            {...a11yProps(3)}
          />
        </Tabs>
      </div>
      <TabPanel value={value} index={0} className="mainContent">
        <UserInfo />
      </TabPanel>
      <TabPanel value={value} index={1} className="mainContent">
        <Houses />
      </TabPanel>
      <TabPanel value={value} index={2} className="mainContent">
        <Favorite />
      </TabPanel>
      <TabPanel value={value} index={3} className="mainContent">
        <AddHouse />
      </TabPanel>
    </div>
  );
}

export default SideBar;
