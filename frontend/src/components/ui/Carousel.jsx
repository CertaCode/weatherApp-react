import { Children, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import humidityIcon from "../../assets/humidity.svg";
import CarouselButton from "./CarouselButton";

const SCROLL_STEP = 0.8; // fraction of the visible width to move per click

const Carousel = ({ children }) => {
  const itemsRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const itemCount = Children.count(children);

  // Enable/disable the buttons depending on the scroll position
  useEffect(() => {
    const el = itemsRef.current;
    if (!el) return;

    const updateButtons = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 1);
      setCanScrollRight(el.scrollLeft < maxScroll - 1);
    };

    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    const observer = new ResizeObserver(updateButtons);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateButtons);
      observer.disconnect();
    };
  }, [itemCount]);

  const scroll = (direction) => {
    const el = itemsRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    el.scrollBy({
      left: direction * el.clientWidth * SCROLL_STEP,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="carousel">
      <CarouselButton
        className="carousel__btn carousel__left-btn"
        direction="left"
        onClick={() => scroll(-1)}
        disabled={!canScrollLeft}
      />
      <div className="carousel__items" ref={itemsRef}>
        <ul className="carousel__list">{children}</ul>
      </div>
      <CarouselButton
        className="carousel__btn carousel__right-btn"
        direction="right"
        onClick={() => scroll(1)}
        disabled={!canScrollRight}
      />
    </div>
  );
};

const Item = ({ time, icon, iconLabel, temperature, humidity }) => {
  return (
    <li className="carousel__item">
      <p className="carousel__time">{time}</p>
      <img src={icon} className="carousel__icon" alt={iconLabel} />
      <p className="carousel__temperature">{temperature}°</p>
      <div className="carousel__humidity-group">
        <div className="carousel__humidity">
          <img src={humidityIcon} className="carousel__humidity-icon" alt="" />
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
  icon: PropTypes.string.isRequired,
  iconLabel: PropTypes.string,
  temperature: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
};

Carousel.Item = Item;

export default Carousel;
