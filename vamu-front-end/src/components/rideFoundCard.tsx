import { Star, Clock } from "lucide-react";
import userPic from "../assets/icons/user.png";
import Axios from "axios";
import { date } from "yup";
export interface Ride {
 
  id: number;
  available_seats?: number;
  boarding?: string;
  boarding_time?: string;
  car_sign?: string;
  city_boarding?: string;
  city_destination?: string;
  destination?: string;
  owner_name?: string;
  price?: number | string;
  rating?: number | string;
}

export interface RideCardProps {
  ride: Ride;
  onRideAccepted?: (rideId: number) => void;
}
function formatDate(date: string) {
  const d = new Date(date);

  return d.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
export default function RideFoundCard({ ride, onRideAccepted }: RideCardProps) {
  const driverName = ride?.owner_name ?? "Motorista";

  const carModel = ride?.car_sign ? `Placa: ${ride.car_sign}` : "Veículo";

  const numericRating = Number(ride?.rating ?? 5.0);
  const formattedRating = !isNaN(numericRating)
    ? numericRating.toFixed(1)
    : "5.0";

  const numericPrice = Number(ride?.price ?? 30.0);
  const formattedPrice = !isNaN(numericPrice)
    ? numericPrice.toFixed(2)
    : "0.00";

  const availableSeats = ride?.available_seats ?? 0;
  const isFull = availableSeats <= 0;
  const boarding_time= ride.boarding_time ? ride.boarding_time : "";
  const dataObj = new Date(boarding_time);
  const dia=dataObj.toLocaleDateString("pt-BR");
  const hora=dataObj.toLocaleTimeString("pt-BR",{
    hour:"2-digit",
    minute:"2-digit"
  })
  const [dayTime,hourTime]=boarding_time.split(/[ T]/);
  const originCity = ride?.city_boarding ?? ride?.boarding ?? "Origem";
  const destinationCity =
    ride?.city_destination ?? ride?.destination ?? "Destino";

  const acceptRide = async (rideId: number) => {
    const token = localStorage.getItem("token");
    if (!rideId || !token) return;
    try {
      console.log("id", rideId);
      await Axios.post(
        `http://localhost:3000/request-ride/${rideId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (onRideAccepted) {
        onRideAccepted(rideId);
      }
    } catch (error) {
      console.log("Erro ao aceitar carona", error);
      alert("Não foi possivel aceitar a carona, tente novamente");
    }
  };
  return (
    <article
      className={`bg-white rounded-3xl p-6 shadow-xl shadow-vamu-dark-deep/5 border border-vamu-border flex flex-col md:flex-row items-center justify-between gap-6 transition-opacity ${
        isFull ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-center gap-4 min-w-[220px]">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border border-vamu-border bg-vamu-gray p-0.5 flex items-center justify-center overflow-hidden">
            <img
              src={userPic}
              alt={`Foto de ${driverName}`}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div
            className={`absolute -bottom-1 -right-1 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-white ${
              isFull ? "bg-vamu-dark" : "bg-vamu-green"
            }`}
          >
            {formattedRating} <Star className="w-2.5 h-2.5 fill-current" />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-vamu-dark text-base">{driverName}</h3>
          <p className="text-xs text-vamu-gray-dark flex items-center gap-1 mt-0.5">
            {carModel}
          </p>
        </div>
      </div>

      {/* Rota e Horário */}
      <div className="flex items-center gap-4 flex-1 justify-center w-full md:w-auto">
        <div className="text-center min-w-[90px] flex flex-col gap-1" >
          <time className="text-xl font-bold text-vamu-dark block">
            {hora}
          </time>
          <span
            className="block text-xs text-vamu-gray-dark truncate max-w-[120px]"

          >{dia}</span>
          <span
            className="block text-xs text-vamu-gray-dark truncate max-w-[120px]"
            title={originCity}
          >
            {originCity}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold text-vamu-green-dark bg-vamu-green/10 border border-vamu-green/20 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" /> Emb. Direto
          </span>
          <div className="w-20 md:w-24 h-[2px] bg-vamu-border"></div>
        </div>

        <div className="text-center min-w-[90px]">
          <span
            className="block text-xs text-vamu-gray-dark truncate max-w-[120px]"
            title={destinationCity}
          >
            {destinationCity}
          </span>
        </div>
      </div>

      {/* Valor e Ação */}
      <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-vamu-border pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-between md:justify-end">
        <div className="text-right">
          <span className="text-xl font-black text-vamu-dark block">
            R$ {formattedPrice}
          </span>

          {isFull ? (
            <span className="block text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full uppercase mt-1">
              Esgotado
            </span>
          ) : (
            <span className="block text-[10px] font-bold text-vamu-green-dark bg-vamu-green/10 px-2 py-0.5 rounded-full uppercase mt-1">
              {availableSeats}{" "}
              {availableSeats === 1 ? "vaga restante" : "vagas restantes"}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={isFull}
          onClick={() => acceptRide(ride.id)}
          className={`font-bold text-sm px-5 py-3 rounded-xl transition ${
            isFull
              ? "bg-vamu-gray text-vamu-gray-dark font-semibold cursor-not-allowed"
              : "bg-vamu-green-cta hover:bg-vamu-green-dark text-white shadow-md shadow-vamu-green/20 cursor-pointer"
          }`}
        >
          {isFull ? "Esgotado" : "Reservar Vaga"}
        </button>
      </div>
    </article>
  );
}

