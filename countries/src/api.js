import axios from "axios";

const ENDPOINT_URL_COUNTRIES = "https://restcountries.com/v3.1/all";
const ENDPOINT_URL_WEATHER = "http://api.weatherstack.com/current";
const API_KEY_WEATHER = process.env.REACT_APP_WEATHER_API_KEY;

export async function getCountries() {
  try {
    const response = await axios.get(ENDPOINT_URL_COUNTRIES);
    return response.data;
  } catch (error) {
    console.log(error.menssage);
  }
}

export async function getWeatherInCapital(capital) {
  try {
    const response = await axios.get(
      ENDPOINT_URL_WEATHER + `?access_key=${API_KEY_WEATHER}&query=${capital}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.menssage);
  }
}

// http://api.weatherstack.com/current
//     ? access_key = YOUR_ACCESS_KEY
//     & query = New York
