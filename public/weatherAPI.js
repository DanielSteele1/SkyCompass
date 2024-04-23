
var cityName = document.getElementById('search-input').value;
var GeoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=87134d31c63c4b8b3b267b04b5416b35`;

window.fetchWeatherData = async function (latitude = 51.5074, longitude = -0.1278) {

    var params = {

        "current": ["temperature_2m", "apparent_temperature", "relative_humidity_2m", "is_day", "precipitation", "rain", "snowfall", "weather_code", "cloud_cover", "wind_speed_10m", "wind_direction_10m"],
        "hourly": ["temperature_2m", "apparent_temperature", "precipitation_probability", "rain", "snowfall", "cloud_cover", "wind_speed_10m", "wind_direction_10m", "relative_humidity_2m"],
        "daily": ["temperature_2m_max", "apparent_temperature_max", "precipitation_probability_max", "daylight_duration", "wind_speed_10m_max"]
    };

    // weather forecast api call (openMeteo)
    var url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m&minutely_15=temperature_2m,rain,wind_speed_10m,wind_speed_80m&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m,relative_humidity_2m&daily=temperature_2m_max,apparent_temperature_max,precipitation_probability_max,daylight_duration,wind_speed_10m_max`;

    console.log(url);
    var response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    var data = await response.json();

    var current = data.current;
    var hourly = data.hourly;
    var daily = data.daily;

    // Users local time 
    var now = new Date();
    var currentHour = now.getHours();

    console.log('current', current);
    console.log('hourly', hourly);
    console.log('daily', daily);

    if (current && hourly && daily) {

        // filter hourly data to the next 24hrs, and get data every hour
       
        var hourlyData = [];

        for (let i = currentHour; i < currentHour + 5; i++) {

            hourlyData.push({
                time: new Date(hourly.time[i] + 'Z'), 
                temperature2m: hourly.temperature_2m[i],
                apparentTemperature: hourly.apparent_temperature[i],
                precipitation_probability: hourly.precipitation_probability[i],
                rain: hourly.rain[i],
                snowfall: hourly.snowfall[i],
                cloudCover: hourly.cloud_cover[i],
                windSpeed10m: hourly.wind_speed_10m[i],
                windDirection10m: hourly.wind_direction_10m[i],
                relativehumidity2m: hourly.relative_humidity_2m[i],

            });
        };

       // just like hourly filter, but for daily. getting data only for the next 7 days from the users 
       // local date. 

       var dailyData = [];

       for (let i = 0; i < 7; i++) {
            dailyData.push({

            time: new Date(daily.time[i] + 'Z'), // Append 'Z' to indicate that the time is in UTC
            temperature2m_max: daily.temperature_2m_max[i],
            precipitation_probability_max: daily.precipitation_probability_max[i],
            apparent_temperature: daily.apparent_temperature_max[i],
            daylight_duration: daily.daylight_duration[i],  // converting seconds to hours. 3600 seconds in an houe
            wind_speed_10m_max: daily.wind_speed_10m_max[i],

            });
       };

        weatherData = {

            current: {
                time: new Date(current.time + 'Z'), // Append 'Z' to indicate that the time is in UTC
                temperature2m: current.temperature_2m,
                apparent_temperature: current.apparent_temperature,
                isDay: current.is_day,
                precipitation: current.precipitation,
                rain: current.rain,
                showers: current.showers,
                snowfall: current.snowfall,
                cloudCover: current.cloud_cover,
                windSpeed10m: current.wind_speed_10m,
                windDirection10m: current.wind_direction_10m,
                relativehumidity2m: current.relative_humidity_2m,
                // sunrise: current.sunrise,
                // sunset: current.sunset,

            },

            hourly: hourlyData,
            daily: dailyData,


        };

        // Dispatch a custom event to indicate that the fetch request is complete
        window.dispatchEvent(new Event('weatherDataLoaded'));
        window.weatherData = weatherData;
    }

    else {
        console.log('current or hourly is undefined. here is the data object', data);
    }
}

/// get's each temperature for each city.
window.fetchCitytemp = async function (lat, lon) {

    var url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;

    var response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    );

    var data = await response.json();
    return data.current.temperature_2m;


}

fetchWeatherData();
