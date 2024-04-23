
document.getElementById('search-button').addEventListener('click', function () {

  var cityName = document.getElementById('search-input').value;
  var GeoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=87134d31c63c4b8b3b267b04b5416b35`;

  // fetch request

  fetch(GeoUrl)
    .then(response => response.json())
    .then(data => {
      if (data[0]) {
        var latitude = data[0].lat;
        var longitude = data[0].lon;

        console.log(`Longitude: ${longitude}, Latitude: ${latitude}`);

        window.fetchWeatherData(latitude, longitude);

        lat.textContent = `Latitude: ${latitude}`;
        lon.textContent = `Longitude: ${longitude}`;
        city.textContent = `Location: ${cityName}`;

      } else {
        alert("City not found, Please enter a valid location.");
      }

    });
});

// location

const lat = document.getElementById("latText");
const lon = document.getElementById("lonText");
const city = document.getElementById("locationText");

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// current

const temperature = document.getElementById("tempText");
const apparentTemperature = document.getElementById("feelslikeText");
const precipitation = document.getElementById("precipText");
const time = document.getElementById("timeText");
const windSpeed10m = document.getElementById("windSpeedText");
const windDirection10m = document.getElementById("windDirectionText");
const cloud_cover = document.getElementById("cloudCoverText");

window.addEventListener('weatherDataLoaded', function () {
  var weatherData = window.weatherData;

  console.log(weatherData.hourly);

  // current
  temperature.textContent = `Temperature: ${weatherData.current.temperature2m}°C`;
  apparentTemperature.textContent = `Feels Like: ${weatherData.current.apparent_temperature}°C`;
  precipitation.textContent = `Rainfall: ${weatherData.current.precipitation}mm`;
  windSpeed10m.textContent = `Wind Speed: ${weatherData.current.windSpeed10m}m/s`;
  windDirection10m.textContent = `Wind Direction: ${weatherData.current.windDirection10m}°`;
  cloud_cover.textContent = `Cloud Cover: ${weatherData.current.cloudCover}%`;
  time.textContent = `Information correct as of: ${weatherData.current.time}`;

  // --------------------------------
  // daily 0 - 7

  console.log(weatherData.hourly);

for (let i = 0; i < 5; i++ ) {

  document.getElementById(`tempText${i}h`).textContent = `Temperature: ${weatherData.hourly[i].temperature2m}°C`;
  document.getElementById(`feelslikeText${i}h`).textContent = `Feels Like: ${weatherData.hourly[i].apparentTemperature}°C`;
  document.getElementById(`precipText${i}h`).textContent = `Chance of Rain: ${weatherData.hourly[i].precipitation_probability}%`;
  document.getElementById(`windSpeedText${i}h`).textContent = `Wind Speed: ${weatherData.hourly[i].windSpeed10m}m/s`;
  document.getElementById(`windDirectionText${i}h`).textContent = `Wind Direction: ${weatherData.hourly[i].windDirection10m}°`;
  document.getElementById(`cloudCoverText${i}h`).textContent = `Cloud Cover: ${weatherData.hourly[i].cloudCover}%`;
  document.getElementById(`timeText${i}h`).textContent = `${weatherData.hourly[i].time.toLocaleTimeString()}`;

}

for (let i = 0; i < 7; i++) {

  const date = new Date(weatherData.daily[i].time);

  const getDayName = days[date.getDay()];

  var daylightHrs = Math.floor(weatherData.daily[i].daylight_duration / 3600);
  var daylightMins = Math.floor((weatherData.daily[i].daylight_duration % 3600) / 60);

  document.getElementById(`dayNameText${i}`).textContent = getDayName;
  document.getElementById(`tempMaxText${i}`).textContent = `Max Temperature: ${weatherData.daily[i].temperature2m_max}°C`;
  document.getElementById(`precipMaxText${i}`).textContent = `Chance of Rain: ${weatherData.daily[i].precipitation_probability_max}%`;
  document.getElementById(`daylightDurationText${i}`).textContent = `Daylight Duration: ${daylightHrs} Hours & ${daylightMins} Minutes`;
  document.getElementById(`windSpeedMaxText${i}`).textContent = `Max Wind Speed: ${weatherData.daily[i].wind_speed_10m_max}m/s`;
}
});