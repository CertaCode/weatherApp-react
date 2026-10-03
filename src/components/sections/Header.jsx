import searchbar from "../../assets/searchBar-icon.svg";

export default function Header() {
  return (
    <header>
      <section>
        <div>
          <h1>FishWeather</h1>
        </div>
        <div>
          <form action="/search">
            <div className="searchbar-icon">
              <img src={searchbar} />
            </div>
            <input type="text" placeholder="Search" content="test"></input>
          </form>
        </div>
      </section>
    </header>
  );
}
