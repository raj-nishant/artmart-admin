import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import {
  Avatar,
  Modal,
  TextField,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ScrollingBanner from "../scenes/register/ScrollingBanner";

const HeaderMain = () => {
  const { isAuthenticated, userDetails, fetchUserDetails } = useAuth();
  const [showContactModal, setShowContactModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && !userDetails) {
      fetchUserDetails();
    }
  }, [isAuthenticated()]);

  const handleContactButtonClick = () => {
    setShowContactModal(true);
    toggleMenu(); // Close menu when opening the contact modal
  };

  const handleCloseModal = () => {
    setShowContactModal(false);
  };

  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Query:", query);
    setName("");
    setEmail("");
    setQuery("");
    setShowContactModal(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <ScrollingBanner />
      <header className="text-black w-full px-7 py-7 flex items-center justify-between bg-gradient-to-b from-slate-200 to-white">
        <div className="md:hidden">
          <IconButton onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
        </div>
        <Link to={"/"}>
          <img className="w-32" src="/logo.png" alt="Logo" />
        </Link>
        <div className="hidden md:flex items-center">
          <Link to={"/login"}>
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-4">
              Login
            </button>
          </Link>
          <Link to={"/register"}>
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-4">
              Join Us
            </button>
          </Link>
          <button
            onClick={handleContactButtonClick}
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            Contact Us
          </button>
        </div>
        <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
          <div className="p-5">
            <Link to={"/login"} className="block mb-2">
              <Button fullWidth variant="outlined" onClick={toggleMenu}>
                Login
              </Button>
            </Link>
            <Link to={"/register"} className="block mb-2">
              <Button fullWidth variant="outlined" onClick={toggleMenu}>
                Join Us
              </Button>
            </Link>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleContactButtonClick}
            >
              Contact Us
            </Button>
          </div>
        </Drawer>
        <Modal open={showContactModal} onClose={handleCloseModal}>
          <div className="bg-white p-8 rounded-md w-80 mx-auto mt-20">
            <h2 className="text-2xl mb-4">Contact Us</h2>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
              className="mb-4"
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              className="mb-4"
            />
            <TextField
              label="Query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              className="mb-4"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Modal>
      </header>
    </>
  );
};

export default HeaderMain;
