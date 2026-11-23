// WeatherAPI condition codes grouped by the app's icon keys.
// Every precipitation type (drizzle, rain, sleet, snow, thunder) uses the rain icon,
// because the app has no separate snow or storm icon.
const CLEAR = [1000];
const PARTLY_CLOUDY = [1003];
const CLOUDY = [1006, 1009, 1030, 1135, 1147];
const PRECIPITATION = [
  1063, 1066, 1069, 1072, 1087, 1114, 1117, 1150, 1153, 1168, 1171, 1180, 1183,
  1186, 1189, 1192, 1195, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222,
  1225, 1237, 1240, 1243, 1246, 1249, 1252, 1255, 1258, 1261, 1264, 1273, 1276,
  1279, 1282,
];

// code -> { day, night } icon keys
const ICONS = new Map([
  ...CLEAR.map((code) => [code, { day: "sunny", night: "night" }]),
  ...PARTLY_CLOUDY.map((code) => [code, { day: "partly-cloudy", night: "cloudy-night" }]),
  ...CLOUDY.map((code) => [code, { day: "cloudy", night: "cloudy-night" }]),
  ...PRECIPITATION.map((code) => [code, { day: "rain", night: "rain" }]),
]);

/**
 * Convert a WeatherAPI condition code and is_day flag (1 or 0) into one of the
 * app's icon keys: sunny, partly-cloudy, cloudy, rain, night, cloudy-night.
 * Unknown or missing codes fall back to cloudy (day) or cloudy-night (night).
 */
export function getConditionIcon(code, isDay) {
  const time = Number(isDay) === 1 ? "day" : "night";
  return ICONS.get(Number(code))?.[time] ?? (time === "day" ? "cloudy" : "cloudy-night");
}
