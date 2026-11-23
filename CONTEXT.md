# FishWeather

A weather app that shows current conditions and forecasts for one city at a time.

## Time

**City-local time**:
The clock time at the city being viewed. All times and dates in the app are city-local, never the viewer's own.
_Avoid_: browser time, local time (ambiguous)

**Today**:
The city-local calendar day that contains the current moment.

**Tonight**:
The stretch from 18:00 (or now, if later) until 06:00 the next morning, city-local.
_Avoid_: overnight, evening

## Weather

**Current conditions**:
The weather at the city right now.
_Avoid_: current weather (as a data term), live weather

**Condition**:
A short description of the weather (e.g. "Patchy rain nearby") together with its icon key.
_Avoid_: weather type, summary

**Icon key**:
The category a condition is drawn as: sunny, partly-cloudy, cloudy, rain, night or cloudy-night.

**Today's hi**:
The highest temperature during Today.

**Tonight's lo**:
The lowest temperature during Tonight.
_Avoid_: today's low (the calendar-day minimum usually falls before dawn and has already passed)

**Humidity**:
Relative humidity, in percent. This is what the droplet icon's number means on the Today page.
_Avoid_: using the droplet number to mean chance of rain

## Forecasts

**Hourly window**:
The 24 hours starting at the current city-local hour.

**Daily forecast**:
One entry per day, starting with Today, for as many days as the weather provider returns.
_Avoid_: 7-day forecast (the provider may return fewer days)
