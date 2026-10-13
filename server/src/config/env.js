import "dotenv/config";

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  WEATHER_API_KEY: required("WEATHER_API_KEY"),
  WEATHER_API_URL: required("WEATHER_API_URL"),
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
};