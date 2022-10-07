const key = "o3atg97IcqFtP8nAdiVup7wRBuFcVGEB";

const getCity = async (city) => {
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

const getWeather = async (cityCode) => {
  const base = `https://dataservice.accuweather.com/currentconditions/v1/`;
  const query = `${cityCode}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

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
