import { Award, Music, Shield, Smile, Sparkles } from "lucide-react";

interface DriverComplimentsProps {
  driverName?: string;
}

export default function DriverCompliments({ driverName }: DriverComplimentsProps) {
  const compliments = [
    {
      id: 1,
      icon: Shield,
      label: "Direção Segura",
      count: 24,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      id: 2,
      icon: Smile,
      label: "Boa Conversa",
      count: 19,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      id: 3,
      icon: Sparkles,
      label: "Carro Limpo",
      count: 31,
      color: "text-purple-600 bg-purple-50 border-purple-200",
    },
    {
      id: 4,
      icon: Music,
      label: "Ótima Playlist",
      count: 12,
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-vamu-green" />
        <h2 className="text-lg font-bold text-vamu-dark">
          Elogios Recebidos por {driverName || "Motorista"}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {compliments.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 ${item.color}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-bold">{item.label}</span>
              <span className="text-[10px] font-semibold opacity-80">
                {item.count} caronas
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}