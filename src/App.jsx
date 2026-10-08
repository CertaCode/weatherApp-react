import { useState } from "react";
import Header from "./components/sections/Header.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import WeatherDashboard from "./components/sections/WeatherDashboard.jsx";
import HourlyPage from "./components/sections/HourlyPage.jsx";

function App() {
  const [page, setPage] = useState("today");

  return (
    <>
      <Header />
      <Navbar activePage={page} onNavigate={setPage} />
      {page === "today" && <WeatherDashboard />}
      {page === "hourly" && <HourlyPage />}
      {page === "7days" && <main></main>}
    </>
  );
}

export default App;
