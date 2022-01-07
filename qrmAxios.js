import axios from "axios";

const qrmAxios = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "https://qrmangala.azurewebsites.net/api",
  headers: {
    Authorization: `Bearer`,
  },
});

export default qrmAxios;
