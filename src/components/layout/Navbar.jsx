import PropTypes from "prop-types";
import "../../styles/components/layout/Navbar.css";

const tabs = [
  { id: "today", label: "Today" },
  { id: "hourly", label: "Hourly" },
  { id: "7days", label: "7-Days" },
];

export default function Navbar({ activePage, onNavigate }) {
  return (
    <nav className="app-navbar">
      <ul className="app-navbar__list">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`app-navbar__item ${
              activePage === tab.id ? "app-navbar__item--active" : ""
            }`}>
            <a
              href={`/${tab.id}`}
              className="app-navbar__a"
              aria-current={activePage === tab.id ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(tab.id);
              }}>
              <p className="app-navbar__p">{tab.label}</p>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  activePage: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};
