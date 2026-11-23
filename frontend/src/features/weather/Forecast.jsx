import PropTypes from "prop-types";
import Card from "../../components/ui/Card";
import ForecastItem from "./ForecastItem";
import "./Forecast.css";

function Forecast({ days }) {
  return (
    <Card title="DAILY FORECAST" className="forecast-weather">
      {days.map((day) => (
        <ForecastItem data={day} key={day.date} />
      ))}
    </Card>
  );
}

Forecast.propTypes = {
  days: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Forecast;
