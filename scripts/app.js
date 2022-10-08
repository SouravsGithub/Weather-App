const form = document.querySelector("form");

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails: cityDetails,
    weather: weather,
  };
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
    })
    .catch((error) => {
      console.log(error);
    });
});
