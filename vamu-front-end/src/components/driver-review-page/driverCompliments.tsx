import { Award, Clock, Music, Shield, Smile, Sparkles, Thermometer, ThumbsUp } from "lucide-react";
import type { FeedbacksReviewsProps } from "../../types/feedbackInterface";

interface DriverComplimentsProps {
  driverName?: string;
  feedbacks?: FeedbacksReviewsProps[];
}
const TAG_STYLE_MAP: Record<number, { icon: any; color: string }> = {
  2: { icon: Clock, color: "bg-blue-50 border-blue-100 text-blue-700" },          
  3: { icon: Shield, color: "bg-emerald-50 border-emerald-100 text-emerald-700" }, 
  4: { icon: Sparkles, color: "bg-purple-50 border-purple-100 text-purple-700" },
  5: { icon: Smile, color: "bg-amber-50 border-amber-100 text-amber-700" },       
  6: { icon: Music, color: "bg-indigo-50 border-indigo-100 text-indigo-700" },    
  7: { icon: Thermometer, color: "bg-cyan-50 border-cyan-100 text-cyan-700" },    
};
export default function DriverCompliments({ driverName, feedbacks = [] }: DriverComplimentsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-vamu-green" />
        <h2 className="text-lg font-bold text-vamu-dark">
          Elogios Recebidos por {driverName || "Motorista"}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {feedbacks.map((item) => {
      
          const style = TAG_STYLE_MAP[item.tag_id] || { 
            icon: ThumbsUp, 
            color: "bg-slate-50 border-slate-100 text-slate-700" 
          };
          const Icon = style.icon;

          return (
            <div
              key={item.tag_id}
              className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 ${style.color}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-bold">{item.label}</span>
              <span className="text-[10px] font-semibold opacity-80">
                {item.total_count} {Number(item.total_count) === 1 ? 'carona' : 'caronas'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}