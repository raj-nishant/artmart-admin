import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { Avatar, Modal, TextField, Button } from "@mui/material";
import ScrollingBanner from "../scenes/register/ScrollingBanner";

const HeaderMain = () => {
  const {
    user,
    login,
    logout,
    isAuthenticated,
    userDetails,
    fetchUserDetails,
  } = useAuth();

  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && !userDetails) {
      fetchUserDetails(); // Fetch user details only if authenticated and userDetails is not already fetched
    }
  }, [isAuthenticated()]);

  const handleLogout = () => {
    logout();
  };

  const handleLogoutClick = () => {
    handleLogout();
    setShowUserDetails(false); // Close the tooltip after logout
    navigate("/login");
  };

  const handleTooltipMouseEnter = () => {
    setShowUserDetails(true);
  };

  const handleTooltipMouseLeave = () => {
    setShowUserDetails(false);
  };

  const handleContactButtonClick = () => {
    setShowContactModal(true);
  };

  const handleCloseModal = () => {
    setShowContactModal(false);
  };

  const handleSubmit = () => {
    // Implement your logic to handle form submission
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Query:", query);
    // Reset fields and close modal
    setName("");
    setEmail("");
    setQuery("");
    setShowContactModal(false);
  };

  return (
    <>
      <ScrollingBanner />
      <header className=" text-black w-full px-7 py-7  flex items-center justify-between bg-gradient-to-b from-slate-200 to-white">
        <Link to={"/"}>
          <img className="w-32" src="/logo.png" alt="Logo" />
        </Link>
        <div className="flex items-center">
          {isAuthenticated() && userDetails ? (
            <div
              className="relative"
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            >
              <Avatar
                alt={userDetails.name}
                src={userDetails.profilePhotoUrl}
              />
              {showUserDetails && userDetails && (
                <div className="absolute flex flex-col items-center bg-white shadow-md rounded-md p-5 w-40 gap-2 right-0 top-full">
                  <div>
                    Hi,
                    <span className="text-yellow-600"> {userDetails.name}</span>
                  </div>
                  {/* <div>{userDetails.email}</div> */}

                  <Link to={"/profile"}>
                    <button className="text-gray-700 p-2  underline hover:text-gray-900">
                      My Account
                    </button>
                  </Link>

                  <button
                    onClick={handleLogoutClick}
                    className="text-red-500 p-2 underline hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Contact Us
              </button>
            </>
          )}
        </div>
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
