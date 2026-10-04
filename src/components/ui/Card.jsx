import "../../styles/components/ui/Card.css";
import PropTypes from "prop-types";

Card.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  CardTitleComponent: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
  className: PropTypes.string.isRequired,
};

export default function Card({
  title,
  date,
  CardTitleComponent,
  children,
  className,
}) {
  return (
    <section className={`card ${className ? className : ""}`}>
      <div className="card__title">
        {title && <p>{title}</p>}
        {date && <p>{date}</p>}
        {CardTitleComponent && <CardTitleComponent />}
      </div>
      <div className="card__content">{children}</div>
    </section>
  );
}
