import React, { createContext, useContext, useState, useEffect } from "react";

// Create a new context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Function to decode JWT and check if it's expired
const isJwtExpired = (jwt) => {
  if (!jwt) return true;  // Assume expired if no token

  const { exp } = JSON.parse(atob(jwt.split('.')[1])); // Decode JWT payload
  const now = Math.floor(Date.now() / 1000);  // Current timestamp in seconds

  return exp < now;  // Check if token expired
};

// AuthProvider component to wrap your application and provide auth context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Tracks the current user (JWT in this case)
  const [userDetails, setUserDetails] = useState(null); // Tracks user details (name, email, etc.)
  const [authChecked, setAuthChecked] = useState(false); // Tracks if the initial auth check is done

  // Async function to fetch user details
  const fetchUserDetails = async () => {
    const jwtData = JSON.parse(localStorage.getItem("jwt"));
    if (!jwtData || isJwtExpired(jwtData.jwt)) {
      localStorage.removeItem("jwt");
      setUser(null);
      setUserDetails(null);
      return;  // Exit if JWT is expired or not found
    }

    try {
      const response = await fetch("https://artist-shop-back-end.onrender.com/api/user/detail", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtData.jwt}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const details = await response.json();
      setUserDetails(details);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  // Function to handle user login
  const login = async (email, password) => {
    try {
      const response = await fetch(
        "https://artist-shop-back-end.onrender.com/api/user/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid email or password");
        } else {
          throw new Error("Failed to authenticate user");
        }
      }

      const jwt = await response.json();
      if (isJwtExpired(jwt.jwt)) {
        throw new Error("Token has expired");
      }
      
      localStorage.setItem("jwt", JSON.stringify(jwt));
      setUser(jwt);
      await fetchUserDetails();
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error; // Allows calling component to handle the error
    }
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    setUserDetails(null);
  };

  // Checks if user is authenticated
  const isAuthenticated = () => !!user;

  // Effect to perform initial auth check and fetch user details if needed
  useEffect(() => {
    const initAuthCheck = async () => {
      const storedUserData = localStorage.getItem("jwt");
      if (storedUserData && !isJwtExpired(JSON.parse(storedUserData).jwt)) {
        setUser(JSON.parse(storedUserData));
        await fetchUserDetails();
      } else {
        localStorage.removeItem("jwt");
        setUser(null);
        setUserDetails(null);
      }
      setAuthChecked(true);
    };

    initAuthCheck();
  }, []);

  // Provide the auth context
  return (
    <AuthContext.Provider
      value={{
        user,
        userDetails,
        authChecked,
        login,
        logout,
        isAuthenticated,
        fetchUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
