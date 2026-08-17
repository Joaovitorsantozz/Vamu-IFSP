import { useState } from "react";
import { changeRideStatus } from "../service/changeRideStatusService";

export function PassengerCard({ passenger, rideId, onStatusChange }: any) {
  const [loading, setLoading] = useState(false);
  async function handleAccept(status: string) {
    setLoading(true);
    try {
      await changeRideStatus(rideId, passenger.user_id, `${status}`);
      onStatusChange(passenger.id,status);
    } catch (error) {
      console.error("Erro ao aceitar passageiro", error);
      alert("Não foi possível aceitar a solicitação.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      key={passenger.id}
      className="bg-white p-5 rounded-2xl shadow border border-gray-100 hover:shadow-lg transition"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
          {passenger.nome.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{passenger.nome}</h3>

          <span className="text-xs text-yellow-500 font-bold uppercase">
            Solicitação pendente
          </span>
        </div>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          className="cursor-pointer flex-1 bg-green-500 hover:bg-green-600 transition text-white py-2 rounded-xl font-semibold"
          onClick={() => {
            handleAccept("accepted");
          }}
          disabled={loading}
        >
          Aceitar
        </button>

        <button
          className="cursor-pointer flex-1 bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-xl font-semibold"
          onClick={() => {
            handleAccept("rejected");
          }}
          disabled={loading}
        >
          Recusar
        </button>
      </div>
    </div>
  );
}
