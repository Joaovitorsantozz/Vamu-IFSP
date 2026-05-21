import Axios from "axios";

const API_URL = "http://localhost:3000";

export const changeRideStatus = (rideId:number,userId:number,status:string) => {
  const token = localStorage.getItem("token");
  return Axios.patch(`${API_URL}/change-ride-status/${rideId}`,{status,userId} ,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
