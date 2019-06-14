/********************************
 * Weather Site JavaScript Functions
 *******************************/
console.log('My javascript is being read.');

// variables for function use
const temp = 40;
const speed = 5;
const direction = "SW";
let condition = "fog";
let currentCondition = getCondition(condition);

buildWC(speed, temp);
windDial(direction);
changeSummaryImage(currentCondition);



// Calculates wind chill
function buildWC(speed, temp) {
   // Declare feelTemp and assign it to the 'feelsLike' location
   const feelsLike = document.getElementById('feelsLike');

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
   const dial = document.getElementById("dial");
   const wd = document.getElementById("wd");

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

   const conditionVisual = document.getElementById("conditionVisual");
   const forecast = document.getElementById("tileFormat");

   switch (currentCondition) {
      case "Clear":
         conditionVisual.setAttribute("src", "img/weather-site-images/clear-250-o.jpg");
         forecast.setAttribute("class", "Clear");
         break;
      case "Clouds":
         conditionVisual.setAttribute("src", "img/weather-site-images/clouds-300-o.jpg");
         forecast.setAttribute("class", "Clouds");
         break;
      case "Fog":
         conditionVisual.setAttribute("src", "img/weather-site-images/fog-260-o.jpg");
         forecast.setAttribute("class", "Fog");
         break;
      case "Rain":
         conditionVisual.setAttribute("src", "img/weather-site-images/rain-275-o.jpg");
         forecast.setAttribute("class", "Rain");
         break;
      case "Snow":
         conditionVisual.setAttribute("src", "img/weather-site-images/snow-563h-o.jpg");
         forecast.setAttribute("class", "Snow");
         break;
   }
}