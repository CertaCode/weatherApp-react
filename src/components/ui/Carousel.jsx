import cloudy from "../../assets/weather-icons/cloudy.svg";
import humidityIcon from "../../assets/humidity.svg";
import CarouselButton from "./CarouselButton";
import PropTypes from "prop-types";

/*
function for moving the carousel 

function handleClick() {
  console.log("works");
}
*/

const Carousel = ({ children }) => {
  return (
    <div className="carousel">
      <CarouselButton
        className="carousel__btn carousel__left-btn"
        direction="left"
      />
      <div className="carousel__items">
        <ul className="carousel__list">{children}</ul>
      </div>
      <CarouselButton
        className="carousel__btn carousel__right-btn"
        direction="right"
      />
    </div>
  );
}; // need to make button component later

const Item = ({ time, temperature, humidity }) => {
  return (
    <li className="carousel__item">
      <p className="carousel__time">{time}</p>
      <img src={cloudy} className="carousel__icon" />
      <p className="carousel__temperature">{temperature}</p>
      <div className="carousel__humidity-group">
        <div className="carousel__humidity">
          <img src={humidityIcon} className="carousel__humidity-icon" />
        </div>
        <p className="carousel__humidity-p">{humidity}%</p>
      </div>
    </li>
  );
};

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
};

Item.propTypes = {
  time: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired,
};

Carousel.Item = Item;

export default Carousel;
