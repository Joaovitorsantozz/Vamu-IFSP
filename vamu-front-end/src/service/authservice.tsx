import Axios from "axios";

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return Axios.post("http://localhost:3000/user-register", data);
};

export const loginUser = (data: { email: string; password: string }) => {
  return Axios.post("http://localhost:3000/login", data);
};
