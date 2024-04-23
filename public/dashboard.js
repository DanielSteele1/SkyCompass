
window.addEventListener('weatherDataLoaded', function () {
    console.log(window.weatherData);
});

$.getJSON('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson', function (data) {
    L.geoJson(data).addTo(map);
});

const map = L.map('map').setView([53.5286, -3.6119], 4);

// array containing every major city in terms of population and importance geopolitically. Some extras are included in the UK, due to proof of concept.

var cities = [

    { name: 'London', lat: 51.507351, lon: -0.127758 },
    { name: 'Cardiff', lat: 51.4837, lon: -3.1681 },
    { name: 'Manchester', lat: 53.483959, lon: -2.244644 },
    { name: 'Glasgow', lat: 55.864239, lon: -4.251806 },
    { name: 'Plymouth', lat: 50.3755, lon: -4.1427 },
    { name: 'Belfast', lat: 54.5973, lon: -5.9301 },
    { name: 'Dublin', lat: 53.3498, lon: -6.2603 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'Berlin', lat: 52.5200, lon: 13.4050 },
    { name: 'Rome', lat: 41.9028, lon: 12.4964 },
    { name: 'Warsaw', lat: 52.2297, lon: 21.0122 },
    { name: 'Moscow', lat: 55.7558, lon: 37.6173 },
    { name: 'Stockholm', lat: 59.3293, lon: 18.0686 },
    { name: 'Budapest', lat: 47.4979, lon: 19.0402 },
    { name: 'Madrid', lat: 40.4168, lon: -3.7038 },
    { name: 'Kyiv', lat: 50.4504, lon: 30.5245 },
    { name: 'Oslo', lat: 59.9139, lon: 10.7522 },
    { name: 'Istanbul', lat: 41.0082, lon: 28.9784 },
    { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
    { name: 'Beijing', lat: 39.9042, lon: 116.4074 },
    { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
    { name: 'Toronto', lat: 43.65107, lon: -79.347015 },
    { name: 'Mexico City', lat: 19.4326, lon: -99.1332 },
    { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },
    { name: 'Buenos Aires', lat: -34.6037, lon: -58.3816 },
    { name: 'Cape Town', lat: -33.9249, lon: 18.4241 },
    { name: 'New Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Ottowa', lat: 45.4215, lon: -75.6972 },
    { name: 'Vancouver', lat: 49.2827, lon: -123.1207 },
    { name: 'Manila', lat: 14.5995, lon: 120.9842 },
    { name: 'Kampala', lat: 0.3136, lon: 32.5811 },
    { name: 'Washington D.C.', lat: 38.9072, lon: -77.0369 },
    { name: 'Brasilia', lat: -15.8267, lon: -47.9218 },
    { name: 'Fairbanks', lat: 64.8378, lon: -147.7164 },
    { name: 'Reykjavik', lat: 64.1265, lon: -21.8174 },
    { name: 'Riyadh', lat: 24.7136, lon: 46.6753 },
    { name: 'Nur-Sultan', lat: 51.1605, lon: 71.4704 },
    { name: 'Nairobi', lat: -1.286389, lon: 36.817223 },
    { name: 'Lagos', lat: 6.5244, lon: 3.3792 },
    { name: 'Las Vegas', lat: 36.1699, lon: -115.1398 },
    { name: 'Dallas', lat: 32.7767, lon: -96.7970 },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
    { name: 'Helsinki', lat: 60.1695, lon: 24.9354 },
    { name: 'Aukland', lat: -36.8485, lon: 174.7633 },
    { name: 'Tehran', lat: 35.6892, lon: 51.3890 },
    { name: 'Caracas', lat: 10.4806, lon: -66.9036 },
    { name: 'Nashville', lat: 36.1627, lon: -86.7816 },
    { name: 'Honolulu', lat: 21.3069, lon: -157.8583 },
    { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
    { name: 'Seattle', lat: 47.6062, lon: -122.3321 },
    { name: 'Orlando', lat: 28.5383, lon: -81.3792 },
    { name: 'Miami', lat: 25.7617, lon: -80.1918 },
    { name: 'San Francisco', lat: 37.7749, lon: -122.4194 },
    { name: 'Austin', lat: 30.2672, lon: -97.7431 },
    { name: 'Philidelphia', lat: 39.9526, lon: -75.1652 },
    { name: 'Boston', lat: 42.3601, lon: -71.0589 },
    { name: 'Houston', lat: 29.7604, lon: -95.3698 },
    { name: 'Denver', lat: 39.7392, lon: -104.9903},
    { name: 'Saint Paul', lat: 44.9537, lon: -93.09},
    { name: 'Atlanta', lat: 33.7490, lon: -84.3880},
    { name: 'Quebec', lat: 46.8139, lon: -71.2080},
    { name: 'Canberra', lat: -35.2809, lon: 149.1300},
    { name: 'Melbourne', lat: -37.8136, lon: 144.9631},
    { name: 'Perth', lat: -31.9505, lon: 115.8605},
    { name: 'Ulaanbaatar', lat: 47.8864, lon: 106.9057},
    { name: 'Lhasa', lat: 29.6500, lon: 91.1000},
];

var cityMarkers = [];

window.fetchWeatherData().then(() => {
    console.log(window.weatherData);

    cities.forEach(async function (city) {

        var temperature = await window.fetchCitytemp(city.lat, city.lon);

        var icon = L.divIcon({
            className: '.map-icons',
            html: `<div class="map-icons"> <div id="info"> ${temperature} </div> ${city.name} </div>`,
            iconSize: [100, 50],
            maxZoom: 19,
        });

        var marker = L.marker([city.lat, city.lon], { icon: icon });
        cityMarkers.push(marker);  // add to cityMarkers array 

        marker.addTo(map);  // add to map

    });

});

const tempMapButton = document.getElementById('tempMap-button');
const cloudButton = document.getElementById('cloudMap-button');
const precipButton = document.getElementById('rainMap-button');
const windButton = document.getElementById('windMap-button');
const ClearButton = document.getElementById('clear-button');

// https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid=87134d31c63c4b8b3b267b04b5416b35

const TA2 = "http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?&opacity=0.9&fill_bound=true&appid=87134d31c63c4b8b3b267b04b5416b35";
const WND = "http://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?&appid=87134d31c63c4b8b3b267b04b5416b35";
const CL = "https://maps.openweathermap.org/maps/2.0/weather/CL/{z}/{x}/{y}?palette=0:FFFFFF00; 10:FEFEFF33; 20:FCFCFF66; 30:FAFAFF99; 40:F8F8FFCC; 50:F6F6FFFF; 60:F4F4FFFF; 70:F2F2FFFF; 80:E8E8FFD9; 90:E4E4FFB3; 100:E0E0FF8D; 200:DCDCFF66&appid=87134d31c63c4b8b3b267b04b5416b35";

const PAC0 = "http://maps.openweathermap.org/maps/2.0/weather/PAC0/{z}/{x}/{y}?palette=0:00000000; 1.0:00809600; 1.0:0096AA00; 0.5:0078BE19; 1:006ECD33; 10:0050E1B2; 140:0014FFE5&appid=87134d31c63c4b8b3b267b04b5416b35";

const PR0 = "http://maps.openweathermap.org/maps/2.0/weather/PR0/{z}/{x}/{y}?palette=0.000005:FEF9CA; 0.000009:B9F7A8; 0.000014:93F57D; 0.000023:78F554; 0.000046:50B033; 0.000092:387F22; 0.000231:204E11; 0.000463:F2A33A; 0.000694:E96F2D; 0.000926:EB4726; 0.001388:B02318; 0.002315:971D13; 0.023150:090A08&appid=87134d31c63c4b8b3b267b04b5416b35";
const SD0 = "http://maps.openweathermap.org/maps/2.0/weather/SD0/{z}/{x}/{y}?palette=0.05:EDEDED; 0.1:D9F0F4; 0.2:A5E5EF; 0.3:7DDEED; 0.4:35D2EA; 0.5:00CCE8; 0.6:706DCE; 0.7:514FCC; 0.8:3333CC; 0.9:1818CC; 1.2:C454B7; 1.5:C12CB0; 1.8:BF00A8; 2.5:85408C; 3.0:7F2389; 4.0:790087; 15:E80068&appid=87134d31c63c4b8b3b267b04b5416b35";
const APM = "http://maps.openweathermap.org/maps/2.0/weather/APM/{z}/{x}/{y}?palette=94000:0073FF; 96000:00AAFF; 98000:4BD0D6; 100000:8DE7C7; 101000:B0F720; 102000:F0B800; 104000:FB5515; 106000:F3363B; 108000:C60000&appid=87134d31c63c4b8b3b267b04b5416b35";

//const Current = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=87134d31c63c4b8b3b267b04b5416b35";

// map initialisation 
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Map Layers 

const cloudsLayer = L.tileLayer(CL, {

    layer: 'clouds_new',
    appid: '87134d31c63c4b8b3b267b04b5416b35',
    attribution: '&copy; <a href="http://www.openweathermap.org/copyright">OpenWeatherMap</a>',
    maxZoom: 19,

}).addTo(map);

const precipLayer = L.tileLayer(PAC0, PR0, {

    //opacity: 1.0,
    fill_bound: true,
    appid: '87134d31c63c4b8b3b267b04b5416b35',
    attribution: '&copy; <a href="http://www.openweathermap.org/copyright">OpenWeatherMap</a>',
    maxZoom: 19,

}).addTo(map);

const tempLayer = L.tileLayer(TA2, {

    fill_bound: true,
    opacity: 0.7,
    appid: '87134d31c63c4b8b3b267b04b5416b35',
    attribution: '&copy; <a href="http://www.openweathermap.org/copyright">OpenWeatherMap</a>',
    maxZoom: 19,

}).addTo(map);

const windLayer = L.tileLayer(WND, {

    appid: '87134d31c63c4b8b3b267b04b5416b35',
    attribution: '&copy; <a href="http://www.openweathermap.org/copyright">OpenWeatherMap</a>',
    maxZoom: 19,
    use_norm: false,
    arrow_step: 32,

}).addTo(map);

// JS to switch between layers.

map.removeLayer(tempLayer);
map.removeLayer(cloudsLayer);
map.removeLayer(precipLayer);
map.removeLayer(windLayer);

cloudButton.addEventListener('click', function () {

    map.addLayer(cloudsLayer);
    map.removeLayer(precipLayer);
    map.removeLayer(tempLayer);
    map.removeLayer(windLayer);

});

tempMapButton.addEventListener('click', function () {
    map.removeLayer(cloudsLayer);
    map.removeLayer(precipLayer);
    map.removeLayer(windLayer);
    map.addLayer(tempLayer);
});

precipButton.addEventListener('click', function () {
    map.removeLayer(cloudsLayer);
    map.removeLayer(tempLayer);
    map.removeLayer(windLayer);
    map.addLayer(precipLayer);
});

windButton.addEventListener('click', function () {
    map.removeLayer(cloudsLayer);
    map.removeLayer(tempLayer);
    map.removeLayer(precipLayer);
    map.addLayer(windLayer);
});

// Clear all Layers button 

ClearButton.addEventListener('click', function () {
    map.removeLayer(cloudsLayer);
    map.removeLayer(tempLayer);
    map.removeLayer(precipLayer);
    map.removeLayer(windLayer);
});

// Allows the user to search and zoom the map to a specific location. 

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

                map.setView([latitude, longitude], 14);

            } else {
                alert("City not found, Please enter a valid location.");
            }

        });
});

// Checkbox options - Extra mapping features 
var Snow = document.getElementById('Checkbox-Snow');
var AirPressure = document.getElementById('Checkbox-Airpressure');
var DayNight = document.getElementById('Checkbox-Day-Night');
var Cities = document.getElementById('Checkbox-Cities');


const snowLayer = L.tileLayer(SD0, {

    appid: '87134d31c63c4b8b3b267b04b5416b35',
    attribution: '&copy; <a href="http://www.openweathermap.org/copyright">OpenWeatherMap</a>',
    maxZoom: 19,

});

Snow.addEventListener('change', function () {

    if (Snow.checked) {
        map.addLayer(snowLayer);
    } else {
        map.removeLayer(snowLayer);
    }
});

const AirPressureLayer = L.tileLayer(APM, {

    opacity: 1.0,
    fill_bound: 1,
    appid: '87134d31c63c4b8b3b267b04b5416b35',
    attribution: '&copy; <a href="http://www.openweathermap.org">OpenWeatherMap</a>',
    maxZoom: 19,

});

AirPressure.addEventListener('change', function () {

    if (AirPressure.checked) {

        map.addLayer(AirPressureLayer);
    }
    else {
        map.removeLayer(AirPressureLayer);
    }
});


// Default state of checkboxes
Snow.checked = false;
AirPressure.checked = false;
DayNight.checked = false;
Cities.checked = true;     // cities checked by default


// Dashboard Menu 
document.getElementById('menu-button').addEventListener('click', function () {

    var menu = document.getElementById('menu');

    menu.style.display = menu.style.display === 'none' ? '' : 'none';

});

document.getElementById('Checkbox-Cities').addEventListener('change', function () { 

    var isChecked = this.checked;

cityMarkers.forEach(function(marker) {

    if(isChecked) {
        marker.addTo(map);
    }
    else {
        marker.remove(marker);
    }

});

});