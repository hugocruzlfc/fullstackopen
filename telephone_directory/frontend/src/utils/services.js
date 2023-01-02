import axios from "axios";

const BASE_URL = "/api/persons";
//const BASE_URL = "http://localhost:3001/persons";

const getPersons = () => {
  const request = axios.get(BASE_URL);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(BASE_URL, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (personId) => {
  const request = axios.delete(`${BASE_URL}/${personId}`);
  return request.then((response) => response.data);
};

const updateNumber = (id, newObject) => {
  const request = axios.put(`${BASE_URL}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getPersons,
  create,
  deletePerson,
  updateNumber,
};
