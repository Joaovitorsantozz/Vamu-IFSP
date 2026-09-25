import { Check } from "lucide-react";

export default function DriverReports() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-lg font-bold text-vamu-dark">
            Reports da Comunidade & Histórico de Incidentes
          </h2>
          <p className="text-xs text-vamu-gray-dark">
            Auditoria contínua para segurança coletiva e transparência
            recíproca entre estudantes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-vamu-gray-dark bg-vamu-gray px-2 py-1 rounded">
            Últimos 6 meses
          </span>
          <span className="text-[10px] font-semibold text-vamu-green-dark bg-vamu-green-light px-2 py-1 rounded border border-vamu-green/20">
            Contabilidade Auditada
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {[
          {
            title: "Atraso no embarque",
            desc: "Relatado pontualmente na portaria",
            val: "5 de 148",
            alert: true,
          },
          {
            title: "Cancelou em cima da hora / sem motivo",
            desc: "Comunicação com antecedência reduzida",
            val: "3 de 148",
            alert: true,
          },
          {
            title: "Mudou o trajeto sem avisar",
            desc: "Desvio no trajeto sem aviso prévio",
            val: "1 de 148",
            alert: false,
          },
          {
            title: "Direção imprudente/perigosa",
            desc: "Nenhuma queixa registrada",
            val: "0 ocorrências",
            ok: true,
          },
          {
            title: "Veículo sem condições de higiene",
            desc: "Padrão limpo verificado",
            val: "0 ocorrências",
            ok: true,
          },
          {
            title: "Falta de resposta no chat",
            desc: "Tempo de resposta médio: 3 min",
            val: "0 ocorrências",
            ok: true,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-vamu-gray/30 rounded-xl p-3 border border-slate-200/70 flex items-center justify-between"
          >
            <div className="pr-2">
              <div className="text-xs font-semibold text-vamu-dark">
                {item.title}
              </div>
              <div className="text-[10px] text-vamu-gray-dark">
                {item.desc}
              </div>
            </div>
            {item.ok ? (
              <span className="text-[11px] font-semibold text-vamu-green-dark bg-vamu-green-light border border-vamu-green/20 px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1">
                <Check className="w-3 h-3 text-vamu-green" /> {item.val}
              </span>
            ) : (
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                  item.alert
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-vamu-gray text-vamu-dark"
                }`}
              >
                {item.val}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}