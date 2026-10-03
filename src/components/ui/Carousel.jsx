import cloudy from "../../assets/weather-icons/cloudy.svg";
import humidityIcon from "../../assets/humidity.svg";
const Carousel = ({ children }) => {
  return (
    <div className="carousel">
      <button className="leftBtn btn" />
      <div className="carouselItems">
        <ul>{children}</ul>
      </div>
      <button className="rightBtn btn" />
    </div>
  );
}; // need to make button component later

const Item = ({ time, temperature, humidity }) => {
  return (
    <li className="carouselItem">
      <p className="carouselItemTime">{time}</p>
      <img src={cloudy} className="carouselItemWeatherIcon" />
      <p className="carouselItemTemperature">{temperature}</p>
      <div>
        <div className="carouselItemHumidity">
          <img src={humidityIcon} className="carouselItemHumidityIcon" />
        </div>
        <p>{humidity}%</p>
      </div>
    </li>
  );
};

Carousel.Item = Item;

export default Carousel;
