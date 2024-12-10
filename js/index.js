let searchBar = document.querySelector("#searchBar");
let searchCountry = searchBar.value;
let country = document.querySelector("#country");
let currentTemp = document.getElementById("current-temp");
let currentTempPic = document.getElementById("currentTempPic");
let weatherCondition = document.getElementById("weatherCondition");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let windDirection = document.getElementById("windDirection");
let todayDateNumber = document.getElementById("todayDateNumber");
let monthName = document.getElementById("monthName");
let todayName = document.getElementById("todayName");

let secondDayMaxTemp = document.getElementById("secondDayMaxTemp");
let secondDayMinTemp = document.getElementById("secondDayMinTemp");
let secondDayCondition = document.getElementById("secondDayCondition");
let secondDayName = document.getElementById("secondDayName");
let nextDayPic = document.getElementById("nextDayPic");

let finalDayName = document.getElementById("finalDayName");
let finalDayPic = document.getElementById("finalDayPic");
let finalDayMaxTemp = document.getElementById("finalDayMaxTemp");
let finalDayMinTemp = document.getElementById("finalDayMinTemp");
let finalDayCondition = document.getElementById("finalDayCondition");
async function searchAPI(city = "london") {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=88d81296f61042349e963004240612&q=${city}&days=3`
  );
  let finalRes = await response.json();
  console.log(finalRes);
  country.innerHTML = finalRes.location.name;
  currentTemp.innerHTML = finalRes.current.temp_c;
  console.log(finalRes.current.condition.icon);
  let currentDate = new Date(finalRes.forecast.forecastday[0].date);
  console.log(currentDate);
  let dayName = currentDate.toLocaleString("default", { weekday: "long" });
  let month = currentDate.toLocaleString("default", { month: "long" });
  let date = currentDate.getDate();

  let nextDate = new Date(finalRes.forecast.forecastday[1].date);
  let nextDayName = nextDate.toLocaleString("default", { weekday: "long" });

  todayName.innerHTML = dayName;
  currentTempPic.setAttribute("src", finalRes.current.condition.icon);
  weatherCondition.innerHTML = finalRes.current.condition.text;
  humidity.innerHTML = finalRes.current.humidity;
  windSpeed.innerHTML = finalRes.current.wind_kph;
  windDirection.innerHTML = finalRes.current.wind_dir;
  monthName.innerHTML = month;

  secondDayMaxTemp.innerHTML = finalRes.forecast.forecastday[1].day.maxtemp_c;
  secondDayMinTemp.innerHTML = finalRes.forecast.forecastday[1].day.mintemp_c;
  secondDayCondition.innerHTML =
    finalRes.forecast.forecastday[1].day.condition.text;
  secondDayName.innerHTML = nextDayName;
  nextDayPic.setAttribute(
    "src",
    finalRes.forecast.forecastday[1].day.condition.icon
  );

  let thirdDayDate = new Date(finalRes.forecast.forecastday[2].date);

  let thirdDayName = thirdDayDate.toLocaleString("default", {
    weekday: "long",
  });
  finalDayName.innerHTML = thirdDayName;

  finalDayPic.setAttribute(
    "src",
    finalRes.forecast.forecastday[2].day.condition.icon
  );

  finalDayMaxTemp.innerHTML = finalRes.forecast.forecastday[2].day.maxtemp_c;
  finalDayMinTemp.innerHTML = finalRes.forecast.forecastday[2].day.mintemp_c;
  finalDayCondition.innerHTML =
    finalRes.forecast.forecastday[2].day.condition.text;
}

searchBar.addEventListener("keyup", function () {
  searchAPI(searchBar.value);
});
