import { useState } from "react";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { AuthProvider, useAuth } from "./services/AuthContext";
import RegistrationPage from "./scenes/register";
import HeaderMain from "./components/HeaderMain";
import LoginPage from "./scenes/login";
import AddProduct from "./scenes/addProduct";

import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // Remove BrowserRouter as Router
import Header from "./components/Header";
import Product from "./scenes/products";

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const { isAuthenticated, authChecked } = useAuth();

  // Wait for the authentication check to complete before rendering the routes
  if (!authChecked) {
    return <div>Loading...</div>;
  }

  const auth = isAuthenticated();
  const noHeaderSidebar =
    location.pathname !== "/register" && location.pathname !== "/login";

  return (
    <>
      {/* <ColorModeContext.Provider value={colorMode}> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {auth && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {auth && <Topbar setIsSidebar={setIsSidebar} />}
            {/* <Header /> */}
            {!auth && <HeaderMain />}
            <div className="flex w-full h-auto p-2">
              {/* {noHeaderSidebar && <Sidebar />} */}
              <div className="px-7 w-full p-3">
                <Routes>
                  <Route
                    path="/"
                    element={auth ? <Dashboard /> : <Navigate to="/register" />}
                  />
                  <Route
                    path="/register"
                    element={auth ? <Navigate to="/" /> : <RegistrationPage />}
                  />
                  <Route
                    path="/login"
                    element={auth ? <Navigate to="/" /> : <LoginPage />}
                  />

                  <Route path="/products" element={<Product />} />
                  <Route path="/add-product" element={<AddProduct />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </ThemeProvider>
      {/* </ColorModeContext.Provider> */}
    </>
  );
};

export default App;
