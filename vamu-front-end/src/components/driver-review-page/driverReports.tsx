import { AlertTriangle, Check } from "lucide-react";
import type { FeedbacksReviewsProps } from "../../types/feedbackInterface";
interface DriverReportsProps {

  feedbacks?: FeedbacksReviewsProps[];
  total_rides : 50;
}
const REPORT_DESC_MAP: Record<number, string> = {
  8: "Relatado pontualmente na portaria",
  9: "Comunicação com antecedência reduzida",
  10: "Desvio no trajeto sem aviso prévio",
  11: "Conduta de direção na via",
  12: "Padrão de limpeza do veículo",
  13: "Comunicação prévia no aplicativo",
};

export default function DriverReports({ feedbacks = [], total_rides}: DriverReportsProps) {
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
        {feedbacks.map((item) => {
          const count = Number(item.total_count);
          const isZeroOccurrences = count === 0;
          const description = REPORT_DESC_MAP[item.tag_id] || "Métrica auditada pela comunidade";


          const displayValue = isZeroOccurrences
            ? "0 ocorrências"
            : total_rides
            ? `${count} de ${total_rides}`
            : `${count} ${count === 1 ? 'relato' : 'relatos'}`;

          return (
            <div
              key={item.tag_id}
              className="bg-vamu-gray/30 rounded-xl p-3 border border-slate-200/70 flex items-center justify-between gap-2"
            >
              <div className="pr-2">
                <div className="text-xs font-semibold text-vamu-dark">
                  {item.label}
                </div>
                <div className="text-[10px] text-vamu-gray-dark">
                  {description}
                </div>
              </div>

              {isZeroOccurrences ? (
                <span className="text-[11px] font-semibold text-vamu-green-dark bg-vamu-green-light border border-vamu-green/20 px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1">
                  <Check className="w-3 h-3 text-vamu-green" /> {displayValue}
                </span>
              ) : (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertTriangle className="w-3 h-3 text-amber-600" /> {displayValue}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}