import Axios from "axios";
import { useState } from "react";
import type { RatingData } from "../../types/rating";
interface driverRatingProps {
  ratings ?: RatingData;
}




export default function DriverRatings({ ratings}: driverRatingProps) {
  


  if (!ratings) {
    return <div className="p-6 text-center text-xs text-vamu-gray-dark">A carregar avaliações...</div>;
  }

  
  const total = Number(ratings.total_rating) || 0;
  const media = ratings.media_rating ? Number(ratings.media_rating).toFixed(1) : "0.0";


  const starsBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const countKey = `count_${star}_estrela` as keyof RatingData;
    const count = Number(ratings[countKey]) || 0;
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;

    return { star, count, pct };
  });

  return (
    <div className="space-y-6">
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
          <div className="sm:col-span-4 bg-vamu-gray/50 rounded-2xl p-6 text-center border border-slate-100">
            <div className="text-5xl font-black text-vamu-dark tracking-tight">
              {media}
            </div>
            <div className="flex justify-center my-2 text-amber-400 text-lg">
              {"★".repeat(Math.round(Number(media)))}
              {"☆".repeat(5 - Math.round(Number(media)))}
            </div>
            <div className="text-xs font-medium text-vamu-gray-dark">
              {total} avaliações totais
            </div>
            <span className="inline-block mt-3 text-[10px] uppercase tracking-wider font-bold text-vamu-green-dark bg-vamu-green-light px-2.5 py-0.5 rounded-full">
              Excelente Reputação
            </span>
          </div>

         
          <div className="sm:col-span-8 space-y-2">
            {starsBreakdown.map((item) => (
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
                    className="bg-vamu-green h-full rounded-full transition-all duration-300"
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
    </div>
  );
}