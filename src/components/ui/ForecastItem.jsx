function ForecastItem({ data }) {
  return (
    <div className="forecastItem">
      <div className="forecastDate">
        <p>{data.date}</p>
        <p>{data.day}</p>
      </div>
      <div className="forecastTemperature">
        {/* <img src="" /> */}
        <p>{data.hiTemp}</p>
        <p>{data.loTemp}</p>
      </div>
      <div className="forecastDetails">
        <p>{data.dayWeather}</p>
        <p>{data.nightWeather}</p>
      </div>
      <div className="forecastHumidity">
        {/* <img src="" /> */}
        <p>{data.humidity}</p>
      </div>
    </div>
  );
}

export default ForecastItem;
