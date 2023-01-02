import axios from "axios";
const BASE_URL = "/api/notes";
// const BASE_URL = "http://localhost:3001/api/notes";

const getAll = () => {
  const request = axios.get(BASE_URL);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(BASE_URL, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${BASE_URL}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
};
