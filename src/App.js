import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import OtpPage from "./components/OtpPage";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetails from "./components/RestaurantDetails";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route
        path="/restaurants"
        element={isLoggedIn ? <RestaurantList /> : <Navigate to="/" />}
      />
      <Route
        path="/restaurant/:id"
        element={isLoggedIn ? <RestaurantDetails /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
