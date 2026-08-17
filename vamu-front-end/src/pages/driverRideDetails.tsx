import map from "../assets/map.png";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRideById } from "../service/rideOfferService";
import { getPassengersInRide } from "../service/passengersService";
import { PassengerCard } from "../components/passengerOnRideCard";
import { RideNavbar } from "../components/manage-ride/rideNavbar";
import { RideHeader } from "../components/manage-ride/rideHeader";
import { TripDetailsCard } from "../components/manage-ride/rideDetailsBox";
import { TripMapCard } from "../components/manage-ride/tripMapCard";
import { RideOccupancyCard } from "../components/manage-ride/rideOccupancyCard";
type Ride = {
  available_seats: number;
  id: number;
  boarding: string;
  destination: string;
  boarding_time: string;
  is_active: boolean;
  passengers_count: number;
};
type Passenger = {
  id: number;
  ride_id: number;
  user_id: number;
  status: string;
  nome: string;
};

export default function DriverManageRide() {
  const { rideid } = useParams();
  const location = useLocation();
  const [ride, setRide] = useState<Ride | null>(location?.state.ride || null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  async function refreshPassengersInRide() {
    try {
      const token = localStorage.getItem("token");
      if (!token || !rideid) return;
      const rideIdNumber = parseInt(rideid);

      const passengersres = await getPassengersInRide(
        token,
        Number(rideIdNumber),
      );
      if (!passengersres) return;

      setPassengers(passengersres.data.passengers);
    } catch (e) {
      console.log("Erro ao buscar passageiros", e);
    }
  }
  async function refreshRideDetails() {
    try {
      const token = localStorage.getItem("token");

      if (!token || !rideid) return;
      const rideIdNumber = parseInt(rideid);

      const response = await getRideById(rideIdNumber);

      if (!response) return alert("Nenhuma corrida encontrada");

      setRide(response.data.result);
    } catch (error) {
      alert("Erro ao buscar informações da carona");
      console.log(error);
    }
  }
  async function refreshAllData() {
    await Promise.all([refreshPassengersInRide(), refreshRideDetails()]);
  }

  const handlePassengerAccept = async (passengerId: number, status: string) => {
    setPassengers((prevPassenger) =>
      prevPassenger.filter((p) => p.id !== passengerId),
    );
    if (status === "accepted")
      setRide((prevRide) =>
        prevRide
          ? { ...prevRide, passengers_count: prevRide.passengers_count + 1 }
          : null,
      );

    await refreshAllData();
  };
  useEffect(() => {
    refreshAllData();
    const interval = setInterval(() => {
      refreshAllData();
    }, 5000);

    return () => clearInterval(interval);
  }, [rideid]);

  const formatDay = (dateStr: string) => {
    return new Date(dateStr)
      .toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
      .replace(".", "");
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  if (!ride) return;
  const pendingPassengers = passengers.filter((p) => p.status === "pending");
  return (
    <div className="min-h-screen bg-vamu-gray font-jakarta text-vamu-dark">
      <RideNavbar />

      <div className="p-8 bg-[#f5f6f7] min-h-screen">
        <RideHeader isActive={ride.is_active} />

        {/* TOP GRID */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <TripDetailsCard
            ride={ride}
            formatDay={formatDay}
            formatTime={formatTime}
          />
          <TripMapCard
            mapImage={map}
            remainingSeats={
              ride.available_seats - Number(ride.passengers_count)
            }
          />
        </div>

        {/* BOTTOM GRID */}
        <div className="grid grid-cols-[2fr_1fr] gap-6 items-start">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Solicitações Pendentes</h2>
              <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                Sistema Ativo
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {pendingPassengers.length > 0 ? (
                pendingPassengers.map((passenger) => (
                  <PassengerCard
                    key={passenger.id}
                    passenger={passenger}
                    rideId={rideid}
                    onStatusChange={handlePassengerAccept}
                  />
                ))
              ) : (
                <div className="col-span-2 bg-white p-6 rounded-2xl shadow border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                  Aguardando novas solicitações...
                </div>
              )}
            </div>
          </div>

          {/* Ocupação e Confirmados */}
          <RideOccupancyCard ride={ride} passengers={passengers} />
              
        </div>
      </div>
    </div>
  );
}
