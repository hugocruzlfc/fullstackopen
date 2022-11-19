import { useState, useEffect } from "react";

import { getWeatherInCapital } from "../api";

export default function Country({ country }) {
  const [weatherCapital, setWeatherCapital] = useState(null);

  useEffect(() => {
    getWeatherInCapital(country?.capital).then((response) => {
      setWeatherCapital(response);
    });
  }, [country]);

  return (
    <div>
      <h1>Country Name: {country.name.common}</h1>
      <h3>Capital: {country.capital}</h3>
      <h3>Population: {country.population}</h3>
      <h3>Spoken Languages:</h3>
      {Object.values(country.languages).map((leng, index) => (
        <ul key={index}>
          <li>{leng}</li>
        </ul>
      ))}
      <img
        style={{ width: "100px" }}
        src={country.flags.png}
        alt={country.name.common}
      />
      <h3>Weather in {country.capital}</h3>
      <div>
        <span style={{ display: "flex", alignItems: "center" }}>
          {weatherCapital?.current?.weather_icons.map((ic, index) => (
            <img
              src={ic[index]}
              key={index}
              alt=""
            />
          ))}
        </span>
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          <h4>Temperature:</h4>
          &nbsp;
          {weatherCapital?.current?.temperature} Celcius
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <h4>Wind:</h4>
          &nbsp;
          {weatherCapital?.current?.wind_speed} mph direction
          {weatherCapital?.current?.wind_dir}
        </span>
      </div>
    </div>
  );
}
