import Userpic from "../../assets/icons/usericon.png";
import { CheckCircle, ShieldCheck, Clock } from "lucide-react";
import type { DriverCar, DriverInformation } from "../../types/driver";


interface DriverHeaderProps {
  driver?: DriverInformation;
  driverCar?: DriverCar;
}

export default function DriverHeader({ driver, driverCar }: DriverHeaderProps) {
  const data = driver?.created_at || "";
  const dataobj = new Date(data);
  const mesNome = dataobj.toLocaleString("pt-BR", { month: "long" });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex flex-col sm:flex-row items-start gap-5">
        <div className="relative">
          <img
            src={Userpic}
            alt={driver?.nome || "Motorista"}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-vamu-green-light shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 bg-vamu-green text-white p-1 rounded-full shadow-sm">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-vamu-green-dark bg-vamu-green-light px-2.5 py-0.5 rounded-full border border-vamu-green/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Conta Universitária Verificada
            </span>
            <span className="text-xs font-mono text-vamu-gray-dark">
              RA 2021****-SP
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-vamu-dark">{driver?.nome}</h1>
            <p className="text-sm text-vamu-gray-dark">
              {driver?.course} • {driver?.semester}º Semestre • Universidade Central (Campus A)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-vamu-gray-dark pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-vamu-gray-dark" /> Membro desde {mesNome} de 2023
            </span>
            <span>•</span>
            <span>Habitual de seg. a qui. às 18h20</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 text-center">
        <div className="bg-vamu-gray/50 p-3 rounded-xl">
          <span className="text-xs uppercase font-semibold text-vamu-gray-dark tracking-wider block">
            Caronas Dadas
          </span>
          <span className="text-2xl font-bold text-vamu-dark">
            {driver?.total_rides}{" "}
            <span className="text-xs font-normal text-vamu-gray-dark">viagens</span>
          </span>
        </div>
        <div className="bg-vamu-gray/50 p-3 rounded-xl">
          <span className="text-xs uppercase font-semibold text-vamu-gray-dark tracking-wider block">
            Conclusão
          </span>
          <span className="text-2xl font-bold text-vamu-green-dark">
            96%{" "}
            <span className="text-xs font-normal text-vamu-gray-dark">
              {driver?.total_rides}
            </span>
          </span>
        </div>
      </div>

     
      <div className="mt-6 bg-vamu-gray/40 rounded-xl p-4 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-24 h-16 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0 border border-slate-300">
            <img
              src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=200&auto=format&fit=crop&q=80"
              alt="Veículo"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-1 left-1 text-[9px] bg-vamu-dark/80 text-white font-bold px-1 rounded">
              OFICIAL
            </span>
          </div>
          <div>
            <div className="text-[10px] font-bold text-vamu-gray-dark uppercase tracking-wider">
              Veículo Cadastrado
            </div>
            <div className="font-bold text-vamu-dark text-sm">{driverCar?.modelo}</div>
            <div className="flex items-center gap-3 text-xs text-vamu-gray-dark mt-0.5">
              <span><strong>Cor:</strong> {driverCar?.cor}</span>
              <span><strong>Placa:</strong> {driverCar?.placa}</span>
              <span><strong>Ano:</strong> 2022</span>
            </div>
          </div>
        </div>
        <span className="text-xs bg-vamu-green-light text-vamu-green-dark font-semibold px-3 py-1.5 rounded-full text-center w-full sm:w-auto">
          4 vagas livres
        </span>
      </div>
    </div>
  );
}