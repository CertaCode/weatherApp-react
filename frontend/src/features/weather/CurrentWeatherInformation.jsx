export default function CurrentWeatherInformation() {
  return (
    <div className="current-weather__information">
      <div className="current-weather__information-list">
        <ul>
          <li>
            <p>Wind</p>
            <p>W 10 km/h</p>
          </li>
          <li>
            <p>Wind Gust</p>
            <p>16 km/h</p>
          </li>
          <li>
            <p>Air Quality</p>
            <p>Fair</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
