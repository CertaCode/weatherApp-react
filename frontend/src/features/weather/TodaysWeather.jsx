import PropTypes from "prop-types";
import Card from "../../components/ui/Card";
import "./TodaysWeather.css";

export default function TodaysWeather({ today }) {
  const { tonight } = today;

  return (
    <Card
      title="TODAY'S WEATHER"
      date={today.dateLabel}
      className="todays-weather">
      <>
        <p>
          {today.condition.text} HI: {today.hi}°
        </p>
        {tonight && (
          <p>
            Tonight: {tonight.condition.text} Lo: {tonight.lo}°
          </p>
        )}
      </>
    </Card>
  );
}

const conditionShape = PropTypes.shape({
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
});

TodaysWeather.propTypes = {
  today: PropTypes.shape({
    dateLabel: PropTypes.string.isRequired,
    condition: conditionShape.isRequired,
    hi: PropTypes.number.isRequired,
    tonight: PropTypes.shape({
      condition: conditionShape.isRequired,
      lo: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
