import { useState, useEffect } from "react";

import ManyCountries from "./components/ManyCountries";
import Country from "./components/Country";
import ListCountry from "./components/ListCountry";

import { getCountries } from "./api";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState([]);

  useEffect(() => {
    // axios.get(ENDPOINT_URL).then((response) => {
    //   setCountries(response.data);
    // });
    getCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  const handleOnChange = (e) => {
    const findCountry = e.target.value;

    setCountryFilter(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(findCountry)
      )
    );
  };

  return (
    <div>
      <h1>Countries</h1>
      <div>
        <span>Find countries</span>
        <input
          type="text"
          onChange={handleOnChange}
        />
        {countryFilter.length > 10 && <ManyCountries />}
      </div>
      <div>
        {countryFilter.length === 1 && <Country country={countryFilter[0]} />}
        {countryFilter.length > 1 && countryFilter.length <= 10 && (
          <ListCountry countryArray={countryFilter} />
        )}
      </div>
    </div>
  );
}

export default App;
