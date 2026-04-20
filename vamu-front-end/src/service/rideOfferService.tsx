import Axios from "axios";
const API_URL = "http://localhost:3000";
export const offerRideSubmit = (data: {
  boarding: string;
  destination: string;
  boardingTime: string;
}) => {
  const token = localStorage.getItem("token");

  return Axios.post(
    "http://localhost:3000/offer-ride",
    {
      boarding: data.boarding,
      destination: data.destination,
      boardingTime: data.boardingTime,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
export const getDriverInfo = (token: string) => {
  return Axios.get(`${API_URL}/get-user-information-to-offer-ride`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRacesAsDriver = (token: string) => {
  return Axios.get(`${API_URL}/my-races-as-driver`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteRide = (raceid: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Usuário não autenticado");
    return;
  }
  return Axios.delete(`${API_URL}/delete-race/${raceid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
