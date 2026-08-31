import Axios from "axios";
const API_URL = "http://localhost:3000";

export const searchRideService = (
  token: string,
  boarding?: string,
  destination?: string,
) => {
  return Axios.get(`${API_URL}/rides`, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      destination: destination || undefined,
      boarding: boarding || undefined,
    },
  });
};
