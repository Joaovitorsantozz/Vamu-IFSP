import User from "../assets/icons/user.png";
import BellNotification from "../assets/icons/bellnotifications.png";
import Logo from "../assets/icons/logo1.png";
import map from "../assets/map.png";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRacesAsDriver, getRideById } from "../service/rideOfferService";
import { getPassengersInRide } from "../service/passengersService";
import { PassengerCard } from "../components/passengerOnRideCard";
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
  useEffect(() => {
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
    refreshPassengersInRide();
    const interval = setInterval(() => {
      refreshPassengersInRide();
    }, 5000);

    return () => clearInterval(interval);
  }, [rideid]);
  useEffect(() => {
    async function refreshRideDetails() {
      if (location?.state.ride) return;
      try {
        const token = localStorage.getItem("token");

        if (!token || !rideid) return;
        const rideIdNumber = parseInt(rideid);

        const response = await getRideById(rideIdNumber);

        if (!response) return alert("Nenhuma corrida encontrada");

        setRide(response.data);

        console.log("Sua corrida", response.data);
      } catch (error) {
        alert("Erro ao buscar informações da carona");
        console.log(error);
      }
    }
    refreshRideDetails();
  }, [rideid, location?.state.ride]);
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
  return (
    <div className="min-h-screen bg-vamu-gray font-jakarta text-vamu-dark">
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-vamu-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img src={Logo} alt="VAMU Logo" className="w-8 h-8" />
          </div>
          <Link to="/dashboard">
            <h1 className="text-xl md:text-[20px] font-bold text-vamu-dark">
              Vamu
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium text-vamu-gray-dark">
          <a href="#" className="hover:text-vamu-green-dark transition">
            Minhas Caronas
          </a>
          <a href="#" className="hover:text-vamu-green-dark transition">
            Oferecer Carona
          </a>
          <div className="flex items-center gap-3 pl-4 border-l border-vamu-border">
            <div className="relative">
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-vamu-gray rounded-full flex items-center justify-center">
                <img
                  src={BellNotification}
                  alt="Notificação"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div className="w-8 h-8 border-2 border-vamu-green rounded-full flex items-center justify-center">
              <img src={User} alt="Perfil do usuário" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>

      <div className="p-8 bg-[#f5f6f7] min-h-screen">
        {/* HEADER */}
        <div className="mb-8">
          <span
            className={`text-xs ${ride.is_active ? "text-green-500" : "text-red-500"} font-semibold uppercase tracking-wider`}
          >
            Status: {ride.is_active ? "em andamento" : "finalizada"}
          </span>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Gerenciar Carona
            </h1>

            <span
              className={`${ride.is_active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} px-4 py-2 rounded-full text-sm font-semibold`}
            >
              {ride.is_active ? "Ativa" : "Inativa"}
            </span>
          </div>
        </div>

        {/* TOP GRID */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* DETALHES */}
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-6">Detalhes da Viagem</h2>

            <div className="flex justify-between">
              {/* ORIGEM DESTINO */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-400 uppercase">
                    Origem
                  </span>
                  <p className="font-semibold">{ride.boarding}</p>
                </div>

                <div>
                  <span className="text-xs text-gray-400 uppercase">
                    Destino
                  </span>
                  <p className="font-semibold">{ride.destination}</p>
                </div>
              </div>

              {/* DATA */}
              <div className="bg-gray-100 px-6 py-4 rounded-xl text-center">
                <span className="text-xs text-gray-400 uppercase">Data</span>
                <p className="font-bold text-lg">
                  {formatDay(ride.boarding_time)}
                </p>
              </div>

              {/* HORÁRIO */}
              <div className="bg-gray-100 px-6 py-4 rounded-xl text-center">
                <span className="text-xs text-gray-400 uppercase">Horário</span>
                <p className="font-bold text-lg">
                  {formatTime(ride.boarding_time)}
                </p>
              </div>
            </div>

            {/* CARRO */}
            <div className="mt-6 bg-green-50 p-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                🚗
              </div>
              <div>
                <p className="font-semibold">
                  Vagas Totais: {ride.available_seats}
                </p>
                <span className="text-sm text-gray-500">
                  Passageiros confirmados: {ride.passengers_count}
                </span>
              </div>
            </div>
          </div>

          {/* MAPA */}
          <div className="bg-white rounded-2xl shadow overflow-hidden relative">
            <img src={map} alt="map" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm">Vagas restantes</p>
              <p className="text-2xl font-bold">
                {ride.available_seats - Number(ride.passengers_count)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-6 items-start">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Solicitações Pendentes</h2>

              <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                Sistema Ativo
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {passengers.length > 0 ? (
                passengers
                  .filter((passenger) => passenger.status === "pending")
                  .map((passenger) => (
                    <PassengerCard passenger={passenger} rideId={rideid} />
                  ))
              ) : (
                <div className="col-span-2 bg-white p-6 rounded-2xl shadow border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                  Aguardando novas solicitações...
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow h-fit">
            <h2 className="text-lg font-semibold mb-4">Ocupação Atual</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-vamu-green-light rounded-full flex items-center justify-center font-bold text-vamu-green-dark">
                  {ride.passengers_count}
                </div>

                <div className="flex-1">
                  <p className="font-semibold">Passageiros no carro</p>

                  <span className="text-xs text-green-500 font-bold uppercase">
                    Confirmados
                  </span>
                </div>
              </div>
            </div>

            {ride.available_seats - Number(ride.passengers_count) > 0 ? (
              <div className="mt-6 border-2 border-dashed rounded-xl p-4 text-center text-gray-400">
                {ride.available_seats - Number(ride.passengers_count)} Vaga(s)
                disponível(eis)
              </div>
            ) : (
              <div className="mt-6 bg-gray-50 rounded-xl p-4 text-center text-vamu-gray-dark font-bold">
                Carona Lotada
              </div>
            )}
          </div>
        </div>
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center text-xl">
          ↑
        </button>
      </div>
    </div>
  );
}
