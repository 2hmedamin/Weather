const inputSearch = document.getElementById("inputSearch");
const btnSearch = document.getElementById("btnSearch");

const currentDate = new Date();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

Display();

function getDay(dataSet) {
  const date = new Date();
  date.setDate(currentDate.getDate() + dataSet);

  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return {
    dayOfWeek: dayOfWeek,
    date: `${day} ${monthName}`,
  };
}

async function apiWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=f0079e5548a54f89ac4175459240410&q=${city}&days=3`
    );
    if (!response.ok) throw new Error("No weather data found");
    return await response.json();
  } catch (error) {
    console.error(error);
    alert("There is no data for this city. Please enter it correctly.");
  }
}

async function Display(city = "cairo") {
  const weatherData = await apiWeather(city);
  if (!weatherData) return;
  const cityName = weatherData.location.name;
  const today = getDay(0);
  const tomorrow = getDay(1);
  const afterTomorrow = getDay(2);
  let cartonaDisplay = ``;

  // today
  cartonaDisplay += `
            <div class="col-md-4">
            <div class="card text-center bg-dark text-white">
              <div class="card-header d-flex justify-content-between">
                <h6>${today.dayOfWeek}</h6>
                <h6>${today.date}</h6>
              </div>
              <div class="card-body py-5">
                <h5 class="card-title d-flex py-1">${cityName}</h5>
              <div class="d-flex justify-content-between align-items-center">
                <h1 class="fw-bold">${weatherData.forecast.forecastday[0].day.avgtemp_c}°C </h1>
                <img src="https:${weatherData.forecast.forecastday[0].day.condition.icon}" alt="Weather Icon" />
              </div>
              </div>
              <div class="d-flex px-3">
                <p class="text-info lead fs-6">${weatherData.forecast.forecastday[0].day.condition.text}</p>
              </div>
              <div class="d-flex py-4 ">
              <span class="px-2 text-secondary"><img src="image/icon-umberella.png" alt="">  20%</span>
              <span class="px-2 text-secondary"><img src="image/icon-wind.png" alt="">  18km/h</span>
              <span class="px-2 text-secondary"><img src="image/icon-compass.png" alt="">  East</span>
              </div>
            </div>
          </div> `;

  // tomorrow
  cartonaDisplay += `
          <div class="col-md-4">
            <div class="card text-center bg-secondary text-white">
              <div class="card-header">
                <h6>${tomorrow.dayOfWeek}</h6>
              </div>
              <div class="card-body py-5">
                <img src="https:${weatherData.forecast.forecastday[1].day.condition.icon}" alt="Weather Icon"/>
                <h3 class="fw-bold">${weatherData.forecast.forecastday[1].day.maxtemp_c}°C</h3>
                <h6>${weatherData.forecast.forecastday[1].day.mintemp_c}°C</h6>
                <p class="text-warning py-4 lead fs-6">${weatherData.forecast.forecastday[1].day.condition.text}</p>
              </div>
            </div>
          </div> `;

  // after tomorrow
  cartonaDisplay += `

                 <div class="col-md-4">
            <div class="card text-center bg-dark text-white">
              <div class="card-header">
                <h6>${afterTomorrow.dayOfWeek}</h6>
              </div>
              <div class="card-body py-5">
                <img src="https:${weatherData.forecast.forecastday[2].day.condition.icon}" alt="Weather Icon"/>
                <h3 class="fw-bold">${weatherData.forecast.forecastday[2].day.maxtemp_c}°C</h3>
                <h6>${weatherData.forecast.forecastday[2].day.mintemp_c}°C</h6>
                <p class="text-warning py-4 lead fs-6">${weatherData.forecast.forecastday[2].day.condition.text}</p>
              </div>
            </div>
          </div>`;

  document.getElementById("playList").innerHTML = cartonaDisplay;
  btnSearch.value = "";
}

btnSearch.addEventListener("click", async () => {
  await Display(inputSearch.value);
});

inputSearch.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    await Display(inputSearch.value);
  }
});
