import React, { useState } from "react";

import { Box, IconButton, useTheme, Menu, MenuItem } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../../services/AuthContext";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidebar from "./Sidebar";

const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    user,
    login,
    logout,
    isAuthenticated,
    userDetails,
    fetchUserDetails,
  } = useAuth();
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}

      {isMobile && <MenuIcon className="m-auto mr-5" />}

      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleMenuClick}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            ".MuiPaper-root": {
              // Targeting the Paper component inside Menu
              minWidth: "200px",
              boxShadow:
                "rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px", // Custom shadow
              borderRadius: "12px",
              overflow: "hidden",
            },
          }}
        >
          <MenuItem
            onClick={handleMenuClose}
            sx={{
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "primary.main", // Use theme's primary color on hover
                color: "primary.contrastText", // Ensures text is readable on hover
              },
            }}
          >
            hi, {userDetails?.name}
          </MenuItem>

          <Link to="/profile">
            <MenuItem
              sx={{
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "primary.main", // Use theme's primary color on hover
                  color: "primary.contrastText", // Ensures text is readable on hover
                },
              }}
            >
              Profile
            </MenuItem>
          </Link>
          <MenuItem
            onClick={handleMenuClose}
            sx={{
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "primary.main", // Use theme's primary color on hover
                color: "primary.contrastText", // Ensures text is readable on hover
              },
            }}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "red", // Use theme's primary color on hover
                color: "primary.contrastText", // Ensures text is readable on hover
              },
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
