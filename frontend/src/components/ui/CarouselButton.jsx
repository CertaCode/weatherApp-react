import PropTypes from "prop-types";
import leftArrow from "../../assets/left-arrow.svg";
import rightArrow from "../../assets/right-arrow.svg";

function CarouselButton({ direction, onClick, disabled = false, className }) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? "Scroll left" : "Scroll right"}>
      <img src={isLeft ? leftArrow : rightArrow} alt="" />
    </button>
  );
}

CarouselButton.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default CarouselButton;
