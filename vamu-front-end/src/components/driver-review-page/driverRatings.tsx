import { ThumbsUp } from "lucide-react";

export default function DriverRatings() {
  return (
    <div className="space-y-6">
      {/* Card: Avaliações da Comunidade */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-vamu-dark">
              Avaliações da Comunidade
            </h2>
            <p className="text-xs text-vamu-gray-dark">
              Notas calculadas unicamente a partir de passageiros acadêmicos
              confirmados
            </p>
          </div>
          <span className="text-xs font-semibold text-vamu-green-dark bg-vamu-green-light px-2.5 py-1 rounded-full border border-vamu-green/20">
            Nível Diamante VAMU
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          {/* Nota Grande */}
          <div className="sm:col-span-4 bg-vamu-gray/50 rounded-2xl p-6 text-center border border-slate-100">
            <div className="text-5xl font-black text-vamu-dark tracking-tight">
              4.9
            </div>
            <div className="flex justify-center my-2 text-amber-400 text-lg">
              ★★★★★
            </div>
            <div className="text-xs font-medium text-vamu-gray-dark">
              118 avaliações totais
            </div>
            <span className="inline-block mt-3 text-[10px] uppercase tracking-wider font-bold text-vamu-green-dark bg-vamu-green-light px-2.5 py-0.5 rounded-full">
              Excelente Reputação
            </span>
          </div>

          {/* Barras de Progresso */}
          <div className="sm:col-span-8 space-y-2">
            {[
              { star: 5, pct: 88, count: 104 },
              { star: 4, pct: 8, count: 10 },
              { star: 3, pct: 2, count: 3 },
              { star: 2, pct: 1, count: 1 },
              { star: 1, pct: 0, count: 0 },
            ].map((item) => (
              <div
                key={item.star}
                className="flex items-center gap-3 text-xs text-vamu-dark"
              >
                <span className="w-4 font-medium flex items-center">
                  {item.star}{" "}
                  <span className="text-amber-400 text-xs ml-0.5">★</span>
                </span>
                <div className="flex-1 bg-vamu-gray h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-vamu-green h-full rounded-full"
                    style={{ width: `${item.pct}%` }}
                  ></div>
                </div>
                <span className="w-12 text-right text-vamu-gray-dark font-mono">
                  {item.count} ({item.pct}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card: Elogios Mais Recorrentes */}
      {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-vamu-dark">
              Elogios Mais Recorrentes
            </h2>
            <p className="text-xs text-vamu-gray-dark">
              Reconhecimentos frequentes enviados por quem já viajou com o
              Lucas
            </p>
          </div>
          <ThumbsUp className="w-5 h-5 text-vamu-green" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { tag: "Super Pontual", count: 56, icon: "⭐" },
            { tag: "Direção Segura", count: 48, icon: "🛡️" },
            { tag: "Carro Impecável", count: 42, icon: "✨" },
            { tag: "Ótima Conversa", count: 35, icon: "💬" },
            { tag: "Boa Escolha Musical", count: 28, icon: "🎵" },
            { tag: "Ar-condicionado", count: 22, icon: "❄️" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-vamu-gray/40 border border-slate-200/80 rounded-xl p-3 hover:border-vamu-green transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{item.icon}</span>
                <span className="text-xs font-semibold text-vamu-dark">
                  {item.tag}
                </span>
              </div>
              <span className="text-xs font-bold text-vamu-dark bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}