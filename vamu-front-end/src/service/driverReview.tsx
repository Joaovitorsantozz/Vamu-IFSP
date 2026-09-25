import Axios from "axios";

export const getDriverInfoService = (driver_id: string) => {
  const token = localStorage.getItem("token");
  return Axios.get(`http://localhost:3000/driver-review/${driver_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDriverCarInformation = (driver_id: string) => {
  const token = localStorage.getItem("token");
  return Axios.get(`http://localhost:3000/car-information/${driver_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
