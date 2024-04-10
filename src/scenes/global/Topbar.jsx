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
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
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
          PaperProps={{
            sx: {
              minWidth: "200px", // Adjust the minimum width of the menu
            },
          }}
        >
          <MenuItem onClick={handleMenuClose} sx={{ fontSize: "1rem" }}>
            Name
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ fontSize: "1rem" }}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ fontSize: "1rem" }}>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ fontSize: "1rem" }}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
