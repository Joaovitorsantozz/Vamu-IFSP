import { Clock } from "lucide-react";
import { deleteRide } from "../service/rideOfferService";
interface RideCardProps {
  ride: Ride;
  onUpdate: () => void; 
}
type Ride = {
  id: number;
  boarding: string;
  destination: string;
  boarding_time: string;
  is_active: boolean;
  passengers_count: number;
};

export function RideCard({ ride, onUpdate }: RideCardProps) {
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta carona?");
    
    if (confirmDelete) {
      try {
      
        await deleteRide(id); 
        
       
        onUpdate(); 
      } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Não foi possível excluir a carona.");
      }
    }
  };
  return (
    <div className="bg-white p-6 rounded-2xl border border-vamu-border shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-bold text-vamu-gray-dark uppercase tracking-wider">
          VOCÊ É MOTORISTA
        </span>

        <span className="bg-vamu-green-light text-vamu-green-dark text-[10px] font-bold px-2 py-1 rounded">
          {ride.is_active ? "ATIVA" : "INATIVA"}
        </span>
      </div>

      {/* Origem / Destino */}
      <div className="space-y-2 mb-5">
        <div className="flex items-baseline gap-2">
          <span className="text-[11px] font-bold text-vamu-gray-dark uppercase w-16">
            Saída:
          </span>
          <span className="text-vamu-dark font-bold text-[13px]">
            {ride.boarding}
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-[11px] font-bold text-vamu-gray-dark uppercase w-16">
            Destino:
          </span>
          <span className="text-vamu-dark font-bold text-[13px]">
            {ride.destination}
          </span>
        </div>
      </div>

      {/* Horário */}
      <div className="flex items-center gap-2 text-vamu-gray-dark text-sm mb-6">
        <Clock className="w-4 h-4" />
        <span>{formatDate(ride.boarding_time)}</span>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          <div className="w-7 h-7 bg-vamu-gray-light rounded-full border-2 border-white"></div>

          {ride.passengers_count > 0 && (
            <div className="w-7 h-7 bg-vamu-gray-medium rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
              +{ride.passengers_count}
            </div>
          )}
        </div>

        <button className="text-[11px] font-bold bg-vamu-gray text-vamu-gray-dark px-3 py-1.5 rounded-lg border border-vamu-border">
          Gerenciar
        </button>
        <button
          onClick={()=>{handleDelete(ride.id)}}
          className="text-[11px] font-bold bg-red-100 text-red-600 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-200 transition"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

function formatDate(date: string) {
  const d = new Date(date);

  return d.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
