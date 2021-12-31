import axios from "axios";

const qrmAxios = axios.create({
  baseURL: "http://10.1.13.5:8000/api",
  headers: {
    Authorization: `Bearer`,
  },
});

export default qrmAxios;
