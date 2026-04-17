import Axios from "axios";
const API_URL = "http://localhost:3000";
export const offerRideSubmit = (data: {
  boarding: string;
  destination: string;
  boardingTime: string;
}) => {
  console.log(data.boardingTime);
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!timeRegex.test(data.boardingTime)) {
    throw new Error("Horário inválido"); 
  }

  const today = new Date().toISOString().split("T")[0];

  const payload = {
    boarding: data.boarding,
    destination: data.destination,
    boardingTime: `${today}T${data.boardingTime}:00`,
  };

  const token = localStorage.getItem("token");

  return Axios.post("http://localhost:3000/offer-ride", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getDriverInfo = (token: string) => {
  return Axios.get(`${API_URL}/get-user-information-to-offer-ride`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
