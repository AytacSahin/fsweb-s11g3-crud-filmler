import axios from "axios";

export const axiosWithAuth = () => {

  return axios.create({
    baseURL: "https://620d69fb20ac3a4eedc05e3a.mockapi.io/api/",
  });
};

export default axiosWithAuth();

