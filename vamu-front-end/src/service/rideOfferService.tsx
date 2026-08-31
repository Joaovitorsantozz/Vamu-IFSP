import Axios from "axios";
const API_URL = "http://localhost:3000";
export const offerRideSubmit = (data: {
  boarding: string;
  destination: string;
  boardingTime: string;
  cityDestination:string;
  cityBoarding:string;
}) => {
  const token = localStorage.getItem("token");
  console.log("ola axios",data);
  return Axios.post(
    "http://localhost:3000/offer-ride",
    {
      boarding: data.boarding,
      destination: data.destination,
      boardingTime: data.boardingTime,
      cityBoarding:data.cityBoarding,
      cityDestination:data.cityDestination
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

export const getActiveRaces = (token: string) => {
  return Axios.get(`${API_URL}/my-actives-races`, {
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

export const getRideById = (id: number) => {
  const token = localStorage.getItem("token");
   if (!token) {
    alert("Usuário não autenticado");
    return;
  }
  return Axios.get(`${API_URL}/get-ride-by-id/${id}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
};
