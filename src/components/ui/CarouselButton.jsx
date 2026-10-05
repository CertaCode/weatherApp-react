import PropTypes from "prop-types";
import leftArrow from "../../assets/left-arrow.svg";
import rightArrow from "../../assets/right-arrow.svg";

function CarouselButton({ direction, onClick, ...props }) {
  return (
    <button {...props} onClick={onClick ? () => onClick() : null}>
      <img
        src={direction === "left" ? leftArrow : rightArrow}
        alt={direction === "left" ? "Left Arrow" : "Right Arroww"}
      />
    </button>
  );
}

CarouselButton.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CarouselButton;
