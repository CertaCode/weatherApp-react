//import { useState } from "react";
import Header from "./components/sections/Header.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import "./styles/App.css";
import WeatherDashboard from "./components/sections/WeatherDashboard.jsx";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <WeatherDashboard />
    </>
  );
}

export default App;
