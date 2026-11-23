import sunnyIcon from "../../assets/weather-icons/sun.svg";
import rainIcon from "../../assets/weather-icons/rain.svg";
import cloudyIcon from "../../assets/weather-icons/cloudy.svg";
import partlyCloudyIcon from "../../assets/weather-icons/partly-cloudy.svg";
import nightIcon from "../../assets/weather-icons/night.svg";
import cloudyNightIcon from "../../assets/weather-icons/cloudy-night.svg";

// Icon keys are chosen by the server (see server/src/utils/conditionIcon.js).
const icons = {
  sunny: sunnyIcon,
  rain: rainIcon,
  cloudy: cloudyIcon,
  "partly-cloudy": partlyCloudyIcon,
  night: nightIcon,
  "cloudy-night": cloudyNightIcon,
};

export default function getWeatherIcon(iconKey) {
  return icons[iconKey] ?? cloudyIcon;
}
