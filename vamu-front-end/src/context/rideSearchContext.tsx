import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { Ride } from "../components/rideFoundCard";

export interface RideSearchInterface {
  city_destination: string;
  city_boarding: string;
  setCityBoarding: (city: string) => void;
  setCityDestination: (city: string) => void;
  tripType: "ida" | "idavolta";
  setTripType: (type: "ida" | "idavolta") => void;
  rides: any[];
  setRides: React.Dispatch<React.SetStateAction<Ride[]>>;
  date:string;
  setDate:(date:string)=>void;
}

const RideSearchContext = createContext<RideSearchInterface>({} as RideSearchInterface);

export const RideProvider = ({ children }: { children: ReactNode }) => {
  const [cityBoarding, setCityBoarding] = useState("");
  const [cityDestination, setCityDestination] = useState("");
  const [tripType, setTripType] = useState<"ida" | "idavolta">("idavolta");
  const [rides, setRides] = useState<any[]>([]);
  const [date,setDate]=useState("");
  return (
    <RideSearchContext.Provider
      value={{
        city_boarding: cityBoarding,
        city_destination: cityDestination,
        setCityBoarding,
        setCityDestination,
        tripType,
        setTripType,
        rides,
        setRides,
        date,
        setDate
      }}
    >
      {children}
    </RideSearchContext.Provider>
  );
};

export const useRideSearch = () => useContext(RideSearchContext);