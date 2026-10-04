import "../../styles/components/layout/Navbar.css";

export default function Navbar() {
  return (
    <nav className="app-navbar">
      <ul className="app-navbar__list">
        <li className="app-navbar__item app-navbar__item--active">
          <a href="/today" className="app-navbar__a">
            <p className="app-navbar__p">Today</p>
          </a>
        </li>
        <li className="app-navbar__item">
          <a href="/hourly" className="app-navbar__a">
            <p className="app-navbar__p">Hourly</p>
          </a>
        </li>
        <li className="app-navbar__item">
          <a href="/7days" className="app-navbar__a">
            <p className="app-navbar__p">7-Days</p>
          </a>
        </li>
      </ul>
    </nav>
  );
}
