import { Star, Clock, MapPin, Circle } from "lucide-react";
import userPic from "../assets/icons/user.png";
import Axios from "axios";

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

  // Trata a data e hora com fallback seguro
  const boarding_time = ride?.boarding_time ?? "";
  const dataObj = boarding_time ? new Date(boarding_time) : null;
  const isDateValid = dataObj && !isNaN(dataObj.getTime());

  const dia = isDateValid ? dataObj.toLocaleDateString("pt-BR") : "--/--/----";
  const hora = isDateValid
    ? dataObj.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : "--:--";

  const originCity = ride?.city_boarding ?? "Origem";
  const destinationCity = ride?.city_destination ?? "Destino";
  const boardingPoint = ride?.boarding ?? "Ponto de embarque";
  const destinationPoint = ride?.destination ?? "Ponto de desembarque";

  const acceptRide = async (rideId: number) => {
    const token = localStorage.getItem("token");
    if (!rideId || !token) return;
    try {
      await Axios.post(
        `http://localhost:3000/request-ride/${rideId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (onRideAccepted) {
        onRideAccepted(rideId);
      }
    } catch (error) {
      console.error("Erro ao aceitar carona", error);
      alert("Não foi possível aceitar a carona, tente novamente.");
    }
  };

  return (
    <article
      className={`bg-white rounded-3xl p-6 md:p-7 shadow-xl shadow-vamu-dark-deep/5 border border-vamu-border flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 transition-all ${
        isFull ? "opacity-75" : ""
      }`}
    >
      {/* 1. MOTORISTA */}
      <div className="flex items-center gap-4 min-w-[200px]">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full border border-vamu-border bg-vamu-gray p-0.5 flex items-center justify-center overflow-hidden">
            <img
              src={userPic}
              alt={`Foto de ${driverName}`}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div
            className={`absolute -bottom-1 -right-1 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-white shadow-sm ${
              isFull ? "bg-vamu-dark" : "bg-vamu-green"
            }`}
          >
            {formattedRating} <Star className="w-2.5 h-2.5 fill-current" />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-vamu-dark text-lg leading-tight">
            {driverName}
          </h3>
          <p className="text-xs font-medium text-vamu-gray-dark mt-1">
            {carModel}
          </p>
        </div>
      </div>

      {/* 2. DATA / HORA E TRAJETO COMPLETO */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 flex-1 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
        
        {/* Bloco da Data e Hora */}
        <div className="flex flex-col justify-center items-center sm:items-start sm:border-r border-slate-200 sm:pr-6 min-w-[110px]">
          <span className="text-[11px] font-semibold text-vamu-gray-dark uppercase tracking-wide">
            Saída
          </span>
          <time className="text-2xl font-black text-vamu-dark leading-none my-1">
            {hora}
          </time>
          <span className="text-xs font-semibold text-slate-500">{dia}</span>
        </div>

        {/* Linha do Trajeto (Cidades + Locais exatos) */}
        <div className="flex-1 flex flex-col justify-center gap-3">
          
          {/* Origem */}
          <div className="flex items-start gap-2.5">
            <Circle className="w-3.5 h-3.5 text-vamu-green shrink-0 mt-0.5 fill-vamu-green/20" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-vamu-dark truncate">
                {originCity}
              </span>
              <span
                className="text-[11px] text-slate-500 truncate"
                title={boardingPoint}
              >
                {boardingPoint}
              </span>
            </div>
          </div>

          {/* Destino */}
          <div className="flex items-start gap-2.5">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5 fill-rose-50" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-vamu-dark truncate">
                {destinationCity}
              </span>
              <span
                className="text-[11px] text-slate-500 truncate"
                title={destinationPoint}
              >
                {destinationPoint}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. PREÇO E AÇÃO */}
      <div className="flex items-center gap-5 border-t lg:border-t-0 lg:border-l border-vamu-border pt-4 lg:pt-0 lg:pl-6 justify-between lg:justify-end">
        <div className="text-left lg:text-right">
          <span className="text-2xl font-black text-vamu-dark block leading-none">
            R$ {formattedPrice}
          </span>

          {isFull ? (
            <span className="inline-block text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full uppercase mt-2">
              Esgotado
            </span>
          ) : (
            <span className="inline-block text-[10px] font-bold text-vamu-green-dark bg-vamu-green/10 px-2 py-0.5 rounded-full uppercase mt-2">
              {availableSeats}{" "}
              {availableSeats === 1 ? "vaga restante" : "vagas restantes"}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={isFull}
          onClick={() => acceptRide(ride.id)}
          className={`font-bold text-sm px-6 py-3.5 rounded-xl transition-all shrink-0 ${
            isFull
              ? "bg-vamu-gray text-vamu-gray-dark font-semibold cursor-not-allowed"
              : "bg-vamu-green-cta hover:bg-vamu-green-dark text-white shadow-md shadow-vamu-green/20 cursor-pointer active:scale-95"
          }`}
        >
          {isFull ? "Esgotado" : "Reservar Vaga"}
        </button>
      </div>
    </article>
  );
}