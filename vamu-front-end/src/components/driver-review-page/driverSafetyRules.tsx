import { ShieldCheck, UserCheck, PhoneCall } from "lucide-react";

export default function DriverSafetyRules() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
      <h3 className="text-sm font-bold text-vamu-dark flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-vamu-green" />
        Garantias VAMU
      </h3>

      <ul className="space-y-3 text-xs text-vamu-gray-dark">
        <li className="flex items-start gap-2.5">
          <UserCheck className="w-4 h-4 text-vamu-green flex-shrink-0 mt-0.5" />
          <span>Apenas alunos, professores e funcionários cadastrados via e-mail acadêmico.</span>
        </li>
        <li className="flex items-start gap-2.5">
          <PhoneCall className="w-4 h-4 text-vamu-green flex-shrink-0 mt-0.5" />
          <span>Botão de emergência 24h e compartilhamento da rota em tempo real com contatos do campus.</span>
        </li>
      </ul>
    </div>
  );
}