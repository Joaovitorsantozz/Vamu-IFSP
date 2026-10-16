import React from "react";
import type { NotificationItem } from "../../types/notificationItem";

import { Trash2 } from "lucide-react";
import { formatTimeAgo } from "../../features/formatTimeAgo";

interface NotificationCardProps {
  item: NotificationItem;
  onItemClick: (item: NotificationItem) => void;
  onDelete: (id: string | number, e: React.MouseEvent) => void;
}

export function NotificationCard({ item, onItemClick, onDelete }: NotificationCardProps) {
  return (
    <div
      onClick={() => onItemClick(item)}
      className={`p-3 rounded-xl border transition-all cursor-pointer hover:shadow-sm group ${
        !item.read
          ? "bg-emerald-50/40 border-emerald-100"
          : "bg-white border-gray-100 hover:border-gray-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
    
          <div className="flex items-center justify-between mb-1 gap-2">
            <h4 className="font-bold text-gray-800 text-xs truncate">
              {item.title}
            </h4>

          
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-gray-400 font-medium group-hover:opacity-0 transition-opacity">
                {formatTimeAgo(item.created_at)}
              </span>

              <button
                onClick={(e) => onDelete(item.id, e)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50"
                title="Excluir notificação"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-gray-500 text-xs leading-relaxed">
            {item.message}
          </p>
        </div>
      </div>
    </div>
  );
}