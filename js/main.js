let countryValue = document.getElementById("countryValue");
let showCard = document.getElementById("showCard");
let data = ``;
async function getWeather(country) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=52208995e8f845cbacd112139231008&q=${country}&days=3`
  );
  data = await response.json();
  console.log(data);
  displayData();
}
getWeather("cairo");
// search by country name
countryValue.addEventListener("keyup", function () {
  getWeather(countryValue.value);
});

function displayData() {
  const { name } = data.location;
  const { temp_c, wind_kph, wind_dir, humidity } = data.current;
  const { icon, text } = data.forecast.forecastday[0].day.condition;
  let container = `
<div class="item text-white">
<div class="d-flex justify-content-between py-2 px-3">
    <span>${getDay(x)}</span>
    <span>${getDateOfDay()}</span>
</div>
<div class="location-info px-4 pt-3 pb-5">
    <div class="country">${name}</div>
    <div class="degree">
        <div class="num">${temp_c}<sup>o</sup>C</div>
        <div>
            <img src="${icon}" alt="">
        </div>
    </div>
    <div class="airStatus">${text}</div>
    <span class="me-3"><img src="images/icon-umberella.png" class="pe-2 d-inline-block"
            alt="">${humidity}%</span>
    <span class="me-3"><img src="images/icon-wind.png" class="pe-2 d-inline-block"
            alt="">${wind_kph} km/h</span>
    <span><img src="images/icon-compass.png" class="pe-2 d-inline-block" alt="">${wind_dir}</span>
</div>
</div>
<div class="item text-white">
<div class="text-center p-2">${getDay(x + 1)}</div>
<div class="content py-4 d-flex align-items-center justify-content-center flex-column">
    <img src="${
      data.forecast.forecastday[1].day.condition.icon
    }" class="d-block my-2" alt="">
    <div class="degree">${
      data.forecast.forecastday[1].day.maxtemp_c
    }<sup>o</sup>C</div>
    <small class="my-2">${
      data.forecast.forecastday[1].day.mintemp_c
    }23.8<sup>o</sup></small>
    <div class="airStatus">${
      data.forecast.forecastday[1].day.condition.text
    }</div>
</div>
</div>
<div class="item text-white">
<div class="text-center p-2">${getDay(x + 2)}</div>
<div class="content py-4 d-flex align-items-center justify-content-center flex-column">
    <img src="${
      data.forecast.forecastday[2].day.condition.icon
    }" class="d-block my-2" alt="">
    <div class="degree">${
      data.forecast.forecastday[2].day.maxtemp_c
    }<sup>o</sup>C</div>
    <small class="my-2">${
      data.forecast.forecastday[2].day.mintemp_c
    }<sup>o</sup></small>
    <div class="airStatus">${
      data.forecast.forecastday[2].day.condition.text
    }</div>
</div>
</div>
`;
  showCard.innerHTML = container;
}
// get day name
const d = new Date();
let x = d.getDay();
function getDay(x) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (x > 6) {
    x = (x % 6) - 1;
  }
  let day = days[x];
  return day;
}
// get date of day
function getDateOfDay() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  let day = d.getDate();
  let month = months[d.getMonth()];
  let date = `${day + month}`;
  return date;
}
// move active links
let navItem = document.querySelectorAll(".nav-item");
for (let i = 0; i < navItem.length; i++) {
  navItem[i].addEventListener("click", function () {
    let activeLink = document.querySelector(".nav-item a.active");
    activeLink.classList.remove("active");
    navItem[i].firstElementChild.classList.add("active");
  });
}
