import React, { useState } from "react";
import Country from "./Country";

export default function ListCountry({ countryArray }) {
  const [currentCountry, setCurrentCountry] = useState(null);

  const handleShow = (country) => {
    if (country) setCurrentCountry(country);
  };

  return (
    <div>
      {countryArray.map((country, index) => (
        <ul key={index}>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              //   justifyContent: "center",
            }}
          >
            <p>{country?.name.common}</p>
            &nbsp;
            <button
              onClick={() => handleShow(country)}
              style={{ height: "20px" }}
            >
              show
            </button>
          </li>
        </ul>
      ))}
      {currentCountry ? <Country country={currentCountry} /> : ""}
    </div>
  );
}
