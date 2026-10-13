import { useState } from "react";
import Header from "./components/layout/Header.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import WeatherDashboard from "./pages/WeatherDashboard.jsx";
import HourlyPage from "./pages/HourlyPage.jsx";
import DailyPage from "./pages/DailyPage.jsx";

function App() {
  const [page, setPage] = useState("today");

  return (
    <>
      <Header />
      <Navbar activePage={page} onNavigate={setPage} />
      {page === "today" && <WeatherDashboard />}
      {page === "hourly" && <HourlyPage />}
      {page === "7days" && <DailyPage />}
    </>
  );
}

export default App;
