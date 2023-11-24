import { useState, useEffect } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      console.log(response.data);
      setResources(response.data);
    });
  }, [baseUrl]);

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then((response) => setResources([...resources, response.data]));
  };

  const services = {
    create,
  };

  return [resources, services];
};

export default useResource;
