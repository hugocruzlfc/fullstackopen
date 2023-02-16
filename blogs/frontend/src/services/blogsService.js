T

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

const addLike = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.patch(`${BASE_URL}/like/${id}`, {}, config);
  const response = await request;
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${BASE_URL}/${id}`, config);
  const response = await request;
  return response;
};

export default { setToken, getAll, create, addLike, deleteBlog };
