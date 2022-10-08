// This is the key that api is using for authentication purposes
const key = "o3atg97IcqFtP8nAdiVup7wRBuFcVGEB";

// function to get information of the city
const getCity = async (city) => {
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

// function to get information of the weather in that city
const getWeather = async (cityKey) => {
  const base = "https://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${cityKey}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// calling the function and printing the information in the console
getCity("kamakhyanagar")
  .then((data) => {
    return getWeather(data.Key);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
