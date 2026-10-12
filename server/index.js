import "dotenv/config";
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = Number(process.env.PORT) || 3000;
const API_KEY = String(process.env.API_KEY) || null;
const API_URL = String(process.env.API_URL) || null;

app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const config = {
  params: {
    key: API_KEY,
    q: "Hamburg",
    days: 3,
    aqi: "yes",
  },
};

app.get("/api/health", (req, res) => {
  console.log("Health check: Passed!");
  res.json({ status: "ok" });
});

app.get("/api/today-weather", async (req, res) => {
  if (API_URL === null || API_KEY === null) return null;
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: "Hamburg",
        days: 1,
        aqi: "yes",
      },
    });
    const data = response.data;
    let JSONData = JSON.parse(JSON.stringify(data));
    let forecastTodayDate = JSONData.forecast.forecastday[0];
    console.log(forecastTodayDate.day);
    res.json(forecastTodayDate.day);
  } catch (error) {
    console.log(
      error && error.response && error.response.data ?
        error.response.data
      : (error && error.message) || String(error),
    );
  }
});

app.get("/api/forecast", async (req, res) => {
  if (API_URL === null || API_KEY === null) return null;
  console.log("API_URL: " + API_URL, " API_KEY : " + API_KEY);

  try {
    const response = await axios.get(API_URL, config);
    const data = response.data;
    let JSONData = JSON.parse(JSON.stringify(data));
    res.json(JSONData);
  } catch (error) {
    console.log(
      error && error.response && error.response.data ?
        error.response.data
      : (error && error.message) || String(error),
    );
  }
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
