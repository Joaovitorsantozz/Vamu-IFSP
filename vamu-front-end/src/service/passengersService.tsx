import Axios from "axios";
const API_URL = "http://localhost:3000";


export const getPassengersInRide=(token:string,rideId:number)=>{
     return Axios.get(`${API_URL}/get-passengers-in-ride/${rideId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
     });
}
