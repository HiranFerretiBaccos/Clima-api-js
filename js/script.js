const apiKey = "82cc4895b40abb664ca33ffc004e32ea";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const countryElement = document.querySelector("#country");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");
const detailsContainerHumidity = document.querySelector(
  "#details-container #humidity"
);
const detailsContainerWindy = document.querySelector(
  "#details-container #wind"
);

//Acessa a API (Lógica) 1ª
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  return data;
};

//Exibe os dados da API (DOM) 2ª
const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  weatherContainer.classList.remove("hide");
  detailsContainerHumidity.classList.remove("hide");
  detailsContainerWindy.classList.remove("hide");
};

//3ª
searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;
  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});
