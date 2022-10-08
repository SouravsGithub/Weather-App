const form = document.querySelector("form");
const card = document.querySelector(".card");
const cardDetails = document.querySelector(".details");

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weather,
  };
};

const updateUI = (data) => {
  const cityDetails = data.cityDetails;
  const weather = data.weather;

  cardDetails.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;${weather.Temperature.Metric.Unit}</span>
    </div>
  `;
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
