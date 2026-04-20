import { useState, createContext, useEffect } from "react";

import { getDriverInfo } from "../service/rideOfferService";

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [car, setCar] = useState(null);
  const [token,setToken]=useState(localStorage.getItem("token"));

  const resetUser = () => {
    setUser(null);
    setCar(null);
  };
  useEffect(() => {
    async function fetchUser() {
      if (!token) return;
      try {
        const response = await getDriverInfo(token);
        setUser(response.data.user);
        setCar(response.data.car);
      } catch (error) {
        console.log("Erro ao buscar user global", error);
      }
    }
    fetchUser();
  }, [token]);
  return (
    <UserContext.Provider value={{ user, car, resetUser,setToken}}>
      {children}
    </UserContext.Provider>
  );
};
