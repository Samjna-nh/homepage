function getLocation() {
  return new Promise((resolve) => {
    $.ajax({
      url: "https://geolocation-db.com/jsonp",
      dataType: "jsonp",
      jsonpCallback: "callback",
      cache: "false",
      success: (data) => {
        resolve(data);
      }
    });
  }, 1000);
}

/* Thanks to openweathermap.org. */
// TODO let's add some even fancier effects!
// Like temperatures, country-related things, or an animated background!
const weatherAPIKey = "0a707c2d14e06c94ed2ea0f33e749dc4";
const weatherIcons = {
  "Thunderstorm": "cloud-lightning-rain-fill",
  "Drizzle": "cloud-drizzle-fill",
  "Rain": "cloud-rain-fill",
  "Snow": "cloud-snow-fill",
  "Clear": "brightness-low-fill",
  "Clouds": "cloud-fill",
  "Misc": "cloud-haze2-fill",
};

function getWeatherInfo(location) {
  return new Promise((resolve) => {
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather",
      dataType: "json",
      data: {
        lat: location.latitude,
        lon: location.longitude,
        appid: weatherAPIKey
      },
      cache: "false",
      success: (data) => {
        resolve(data);
      }
    });
  }, 1000);
}

function showDate() {
  // TODO time formmat
  var now = new Date();
  $("#timestamp").text(
    now.toLocaleString()
  );
}

const timeIcons = [
  "moon-stars",
  "moon-stars",
  "moon-stars",
  "moon-stars",
  "moon-stars",
  "sunrise",
  "sunrise",
  "sun",
  "sun",
  "sun",
  "sun",
  "sun",
  "sun",
  "sun",
  "sun",
  "sun",
  "sun",
  "sunset",
  "sunset",
  "moon-stars",
  "moon-stars",
  "moon-stars",
  "moon-stars",
  "moon-stars",
];
function showLocalInfo() {
  $("#time-icon").attr("class", "bi bi-" + timeIcons[new Date().getHours()]);
  getLocation().then((location) => {
    $("#position").html(location.state);
    getWeatherInfo(location).then((weather) => {
      $("#weather-icon").attr("class", "bi bi-" + weatherIcons[weather.weather[0].main]);
    });
  });
}

$(() => {
  /* set the info block */
  showDate();
  showLocalInfo();
  setInterval(showDate, 30000);
  setInterval(showLocalInfo, 600000);
});
