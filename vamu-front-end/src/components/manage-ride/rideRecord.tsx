import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Axios from "axios";

type RideHistoryItem = {
  id: number;
  boarding: string;
  destination: string;
  boarding_time: string;
  status: string;
  role: "MOTORISTA" | "PASSAGEIRO";
};

export default function RideRecord() {
  const [rides, setRides] = useState<RideHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem("token");

  async function fetchRideHistory() {
    try {
      if (!token) return;
      const response = await Axios.get("http://localhost:3000/rides-history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseData = response.data;
      const listaFinal = Array.isArray(responseData.result)
        ? responseData.result
        : [];

      setRides(listaFinal);
    } catch (error) {
      console.error("Erro ao buscar histórico de caronas:", error);
    } finally {
      setLoading(false);
    }
  }

 
  useEffect(() => {
    fetchRideHistory();
  }, [token]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr)
      .toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
      .replace(".", "");
  };

  return (
    <div className="bg-white rounded-2xl border border-vamu-border overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-vamu-gray text-[11px] font-bold text-vamu-gray-dark uppercase tracking-widest border-b border-vamu-border">
            <th className="px-6 py-4">Rota</th>
            <th className="px-6 py-4">Data</th>
            <th className="px-6 py-4">Sua Função</th>
            <th className="px-6 py-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {loading && rides.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-6 text-center text-gray-400">
                Carregando histórico...
              </td>
            </tr>
          ) : rides.length > 0 ? (
            rides.map((ride) => (
              <tr
                key={ride.id}
                className="border-b border-vamu-border hover:bg-vamu-gray/30 transition"
              >
                <td className="px-6 py-4 font-semibold text-vamu-dark">
                  {ride.boarding}{" "}
                  <ArrowRight className="inline w-3 h-3 mx-1 text-vamu-green" />{" "}
                  {ride.destination}
                </td>
                <td className="px-6 py-4 text-vamu-gray-dark">
                  {formatDate(ride.boarding_time)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-[10px] font-extrabold px-2 py-1 rounded tracking-wider ${
                      ride.role === "MOTORISTA"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {ride.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                      ride.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {ride.status === "completed" ? "Finalizada" : "Cancelada"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-6 text-center text-gray-400">
                Nenhuma carona recente encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}