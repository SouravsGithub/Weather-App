const form = document.querySelector("form");
const card = document.querySelector(".card");
const cardDetails = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weather,
  };
};

const updateUI = (data) => {
  const { cityDetails, weather } = data;

  // change the html of the cardDetails like cityname, weather condition and temperature
  cardDetails.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;${weather.Temperature.Metric.Unit}</span>
    </div>
  `;

  // update the day and night images depending upon the time of the location
  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "img/day.svg";
  } else {
    console.log("THIS IS NOT WORKING");
    timeSrc = "img/night.svg";
  }

  time.setAttribute("src", timeSrc);

  // display the card when the user enters a location
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

form.addEventListener("submit", (event) => {
  // prevent the default action
  event.preventDefault();

  // This city variable will have the value of the city that the user has entered
  const city = form.city.value.trim();
  // After getting the city variable we can reset the form and empty all the inputs of that
  form.reset();

  // update url with the new city
  updateCity(city)
    .then((data) => {
      console.log(data);
      updateUI(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
