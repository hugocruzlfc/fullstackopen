import axios from "axios";
const BASE_URL = "/api/notes";
// const BASE_URL = "http://localhost:3001/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(BASE_URL);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(BASE_URL, newObject, config);
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
  setToken,
};
