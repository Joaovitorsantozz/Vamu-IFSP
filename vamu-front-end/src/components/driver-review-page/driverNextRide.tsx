import { MessageSquare } from "lucide-react";

interface DriverNextRideCardProps {
  driverName?: string;
}

export default function DriverNextRideCard({ driverName }: DriverNextRideCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 top-20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-vamu-green-dark uppercase bg-vamu-green-light px-2 py-0.5 rounded-full border border-vamu-green/20 tracking-wider">
          Disponibilidade Imediata
        </span>
        <span className="text-xs font-medium text-vamu-gray-dark">Hoje 18:20</span>
      </div>

      <h3 className="text-lg font-bold text-vamu-dark mb-4">Próxima Carona</h3>

      <div className="space-y-3 relative pl-4 border-l-2 border-vamu-green/30 ml-2 mb-6">
        <div className="relative">
          <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-vamu-green rounded-full ring-4 ring-white" />
          <div className="text-[10px] uppercase font-bold text-vamu-gray-dark">Origem</div>
          <div className="text-xs font-semibold text-vamu-dark">Campus Central (Portão 2)</div>
        </div>

        <div className="relative">
          <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-vamu-dark rounded-full ring-4 ring-white" />
          <div className="text-[10px] uppercase font-bold text-vamu-gray-dark">Destino</div>
          <div className="text-xs font-semibold text-vamu-dark">Estação Vila Madalena / Linha 2</div>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-vamu-gray/50 rounded-xl mb-5">
        <span className="text-xs text-vamu-gray-dark">Preço sugerido:</span>
        <span className="text-xl font-extrabold text-vamu-dark">
          R$ 8,50 <span className="text-xs font-normal text-vamu-gray-dark">/vaga</span>
        </span>
      </div>

      <div className="space-y-2">
        <button className="w-full bg-vamu-green hover:bg-vamu-green-dark text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-vamu-green/20 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer">
          Solicitar Carona com {driverName || "Motorista"}
        </button>
        <button className="w-full bg-vamu-gray hover:bg-slate-200 text-vamu-dark font-semibold py-2.5 px-4 rounded-xl transition-colors text-xs flex items-center justify-center gap-2 cursor-pointer">
          <MessageSquare className="w-4 h-4 text-vamu-gray-dark" /> Enviar Mensagem no Chat
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-vamu-gray-dark text-center">
        Reserva confirmada via protocolo institucional VAMU
      </div>
    </div>
  );
}