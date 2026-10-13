import searchbar from "../../assets/searchBar-icon.svg";
import "./Header.css";

export default function Header() {
  return (
    <header className="app-header">
      <section className="app-header__inner">
        <div className="app-header__title">
          <h1>FishWeather</h1>
        </div>
        <div className="app-header__group">
          <form action="/search" className="app-header__form">
            <div className="searchbar-icon">
              <img src={searchbar} />
            </div>
            <input
              type="text"
              placeholder="Search"
              content="test"
              className="app-header__input"></input>
          </form>
        </div>
      </section>
    </header>
  );
}
