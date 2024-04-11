import React from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { CameraAltOutlined } from "@mui/icons-material";
import { useAuth } from "../../services/AuthContext";

const Profile = () => {
  const {
    user,
    login,
    logout,
    isAuthenticated,
    userDetails,
    fetchUserDetails,
  } = useAuth();

  return (
    <div className="bg-white p-10 max-w-3xl mx-auto my-auto rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Avatar src={userDetails?.profileurl} className="w-28 h-28" />
          <div>
            <h1 className="text-xl font-bold">{userDetails?.name}</h1>
            <p className="text-gray-600">{userDetails?.name}</p>
          </div>
        </div>
        <Button variant="contained" startIcon={<CameraAltOutlined />}>
          Change profile photo
        </Button>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
        <form>
          <div className="mb-4">
            <TextField
              label="Name"
              defaultValue={userDetails?.name}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Email"
              defaultValue={userDetails?.username}
              variant="outlined"
              fullWidth
            />
          </div>
          <h2 className="text-lg font-semibold mb-4">Edit Password</h2>
          <div className="mb-4">
            <TextField
              label="Your Old Password"
              //   defaultValue="Your Old Password"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Your New Password"
              //   defaultValue="Your New Password"
              variant="outlined"
              fullWidth
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
