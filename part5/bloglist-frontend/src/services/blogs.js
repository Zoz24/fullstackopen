import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  // console.log("Token during creating:", token); // For debugging purposes
  // console.log("newObject:", newObject); // For debugging purposes
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  // console.log("response.data:", response.data); // For debugging purposes
  return response.data;
};

export default { getAll, setToken, create };
