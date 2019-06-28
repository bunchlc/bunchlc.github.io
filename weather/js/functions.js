/********************************
 * Weather Site JavaScript Functions
 *******************************/
console.log('My javascript is being read.');

// variables for function use
let date = new Date();
let nextHour = date.getHours() + 1;
var storage = window.localStorage;

var idHeader = {
   headers: {
      "User-Agent": "Student Learning Project - bun15009@byui.edu"
   }
};

// Calculates wind chill
function buildWC(speed, temp) {
   // Declare feelTemp and assign it to the 'feelsLike' location
   let feelsLike = document.getElementById('feelsLike');

   // Math to determine what the wc is
   let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
   console.log(wc);

   // Round to the nearest integer
   wc = Math.floor(wc);

   // if chill is greater than temp, return temp otherwise return wc
   wc = (wc > temp) ? temp : wc;

   // display windchill to console
   console.log(wc);

   // displays the wc
   feelsLike.innerHTML = wc;
}

// determines wind dial direction
function windDial(direction) {
   // linking the dial and wd variables with the HTML location
   let dial = document.getElementById("dial");
   let wd = document.getElementById("wd");

   // switch statement to determine where to point the dial
   // Also handles displaying the direction in text
   switch (direction) {
      case "N":
         dial.setAttribute("class", "n");
         console.log(direction);
         wd.innerHTML = direction;
         break;
      case "NE":
      case "NNE":
      case "ENE":
         dial.setAttribute("class", "ne");
         console.log(direction);
         wd.innerHTML = direction;
         break;
      case "NW":
      case "NNW":
      case "WNW":
         dial.setAttribute("class", "nw");
         console.log(direction);
         wd.innerHTML = direction;
         break;
      case "South":
      case "S":
         dial.setAttribute("class", "s");
         console.log(direction);
         wd.innerHTML = direction;
         break;
      case "SE":
      case "SSE":
      case "ESE":
         dial.setAttribute("class", "se");
         console.log(direction);
         wd.innerHTML = direction;
         break;
      case "SW":
      case "SSW":
      case "WSW":
         dial.setAttribute("class", "sw");
         console.log(direction);
         wd.innerHTML = direction;
         break;
      case "East":
      case "E":
         dial.setAttribute("Class", "e");
         console.log(direction);
         wd.innerHTML = direction;
         break;
      case "West":
      case "W":
         dial.setAttribute("class", "w");
         console.log(direction);
         wd.innerHTML = diretion;
         break;
   }
}

// gets the current weather condition
function getCondition(condition) {
   // creates a new variable assignin gin the lowercase version of the parameter for testing
   let lowerCondition = condition.toLowerCase()

   // if/else if statement to determine what type of weather to return
   if (lowerCondition.includes("clear") || lowerCondition.includes("sunny") || lowerCondition.includes("warm")) {
      console.log("Clear");
      return "Clear";
   } else if (lowerCondition.includes("overcast") || lowerCondition.includes("clouds") || lowerCondition.includes("cloudy")) {
      console.log("Clouds");
      return "Clouds";
   } else if (lowerCondition.includes("fog") || lowerCondition.includes("low visibility")) {
      console.log("Fog");
      return "Fog";
   } else if (lowerCondition.includes("drizzle") || lowerCondition.includes("rain") || lowerCondition.includes("storms")) {
      console.log("Rain");
      return "Rain";
   } else if (lowerCondition.includes("flurries") || lowerCondition.includes("snow") || lowerCondition.includes("blizzards")) {
      console.log("Snow");
      return "Snow";
   }
}

// changes the image in the Summary tile
function changeSummaryImage(currentCondition) {

   // to change the diferences of the summary tile
   let conditionVisual = document.getElementById("conditionVisual");

   // to change the differences of the formated tiles
   let forecast = document.getElementById("tileFormat");

   // to change the statement in the summary tile
   let statement = document.getElementById("currentCondition");

   switch (currentCondition) {
      case "Clear":
         conditionVisual.setAttribute("src", "img/weather-site-images/clear-250-o.jpg");
         conditionVisual.setAttribute("alt", "It is clear outside");
         forecast.setAttribute("class", "Clear");
         statement.innerHTML = "Clear";
         break;
      case "Clouds":
         conditionVisual.setAttribute("src", "img/weather-site-images/clouds-300-o.jpg");
         conditionVisual.setAttribute("alt", "There are clouds outside");
         forecast.setAttribute("class", "Clouds");
         statement.innerHTML = "Clouds";
         break;
      case "Fog":
         conditionVisual.setAttribute("src", "img/weather-site-images/fog-260-o.jpg");
         conditionVisual.setAttribute("alt", "It is foggy outside");
         forecast.setAttribute("class", "Fog");
         statement.innerHTML = "Fog";
         break;
      case "Rain":
         conditionVisual.setAttribute("src", "img/weather-site-images/rain-275-o.jpg");
         conditionVisual.setAttribute("alt", "It is raining outside");
         forecast.setAttribute("class", "Rain");
         statement.innerHTML = "Rain";
         break;
      case "Snow":
         conditionVisual.setAttribute("src", "img/weather-site-images/snow-563h-o.jpg");
         conditionVisual.setAttribute("alt", "It is snowing outside");
         forecast.setAttribute("class", "Snow");
         statement.innerHTML = "Snow";
         break;
   }
}

// display the Elevation in Feet or Meters
function convertMeters(meters) {
   let elevation = document.getElementById("elevation");

   let ft = meters * 3.28084;

   console.log(ft);

   ft = Math.floor(ft);

   console.log(ft);

   elevation.innerHTML = ft + " ft";
}

// convert and format hours to a 12 hour format
function format_time(hour) {
   if (hour > 23) {
      hour -= 24;
   }
   let amPM = (hour > 11) ? "pm" : "am";
   if (hour > 12) {
      hour -= 12;
   }
   if (hour == 0) {
      hour = "12";
   }
   return hour + amPM;
}

// build the hourly temperatur list
function buildHourlyData(nextHour, hourlyTemps) {
   let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F |</li>';

   for (let i = 1, x = hourlyTemps.length; i < x; i++) {
      hourlyListItems += '<li>' + format_time(nextHour + i) + ': ' + hourlyTemps[i] + '&deg;F |</li>';
   }

   console.log('hourlyList is: ' + hourlyListItems);
   return hourlyListItems;
}

// Gets location information from the NWS API
function getLocation(locale) {
   const URL = "https://api.weather.gov/points/" + locale;
   // NWS User-Agent header (built above) will be the second parameter 
   fetch(URL, idHeader)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Response not OK.');
      })
      .then(function (data) {
         // Let's see what we got back
         console.log('Json object from getLocation function:');
         console.log(data);
         // Store data to localstorage 
         storage.setItem("locName", data.properties.relativeLocation.properties.city);
         storage.setItem("locState", data.properties.relativeLocation.properties.state);

         // Next, get the weather station ID before requesting current conditions 
         // URL for station list is in the data object 
         let stationsURL = data.properties.observationStations;
         // Call the function to get the list of weather stations
         getStationId(stationsURL);
      })
      .catch(error => console.log('There was a getLocation error: ', error))
} // end getLocation function

// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) {
   // NWS User-Agent header (built above will be the second parameter
   fetch(stationsURL, idHeader)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Response not OK.');
      })
      .then(function (data) {
         // Let's see what we got back
         console.log('From getStationId function:');
         console.log(data);

         // Store station ID and elevation(in meters - will need to be converted to feet)
         let stationId = data.features[0].properties.stationIdentifier;
         let stationElevation = data.features[0].properties.elevation.value;
         console.log('Station and Elevation are: ' + stationId, stationElevation);

         // Store data to localstorage
         storage.setItem("stationId", stationId);
         storage.setItem("stationElevation", stationElevation);

         // Request the CurrentWeather for this station
         getWeather(stationId);
      })
      .catch(error => console.log('There was a getStationId error: ', error))
}

// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) {
   // This is the URL for current observation data
   const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
   // NWS User-Agent header (build above) will be the second parameter
   fetch(URL, idHeader)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Response not OK.');
      })
      .then(function (data) {
         // Let's see what we got back
         console.log('From getWeather function:');
         console.log(data);

         // Store weather information to localStorage
         storage.setItem("locTemp", data.properties.temperature.value);
         storage.setItem("locHigh", data.properties.maxTemperatureLast24Hours.value);
         storage.setItem("locLow", data.properties.minTemperatureLast24Hours.value);
         storage.setItem("locWind", data.properties.windSpeed.value);
         storage.setItem("windDirection", data.properties.windDirection.value);
         storage.setItem("WindGusts", data.properties.windGust.value);

         // Build the page for viewing

      })
      .catch(error => console.log('There was a getWeather error: ', error))
} // end getWeather function