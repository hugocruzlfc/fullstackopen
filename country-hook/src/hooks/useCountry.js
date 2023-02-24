import { useEffect, useState } from "react";
import axios from "axios";

export const useCountry = ({ name }) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name)
      axios
        .get(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => {
          setCountry(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err.message);
          setCountry([]);
        });
  }, [name]);

  return { country };
};
