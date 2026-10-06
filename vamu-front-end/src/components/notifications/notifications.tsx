import React, { useState, useRef, useEffect } from "react";
import BellNotification from "../../assets/icons/bellnotifications.png"; // seu caminho para a imagem do sininho
import type { NotificationItem } from "../../types/notificationItem";
import { NotificationFilter } from "./notificationFilter";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"todas" | "caronas" | "mensagens">(
    "todas",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      type: "RIDE_CONFIRMED",
      title: "Sua corrida com Marcos foi aceita.",
      message: "Campus Central ➔ Estação Vila Madalena • Hoje...",
      timeAgo: "Há 5 minutos",
      read: false,
      category: "caronas",
      details: { driverName: "Marcos", actionButtons: true },
    },
    {
      id: "2",
      type: "GROUP_CHAT",
      title: "Nova mensagem no Grupo da Carona",
      message:
        'Lucas: "O carro é o Polo prata placa ABC-1234. Nos vemos no portão 2."',
      timeAgo: "Há 22 minutos",
      read: false,
      category: "mensagens",
    },
    {
      id: "3",
      type: "SCHEDULE_NOTICE",
      title: "Lembrete de Embarque",
      message: "Sua carona para o Campus B parte em 45 minutos. Prepare-se!",
      timeAgo: "Há 1 hora",
      read: false,
      category: "caronas",
    },
    {
      id: "4",
      type: "RATING",
      title: "Avalie sua última carona com Beatriz",
      message: "Ajude a manter a comunidade Vamu segura e colaborativa.",
      timeAgo: "Ontem às 19:40",
      read: true,
      category: "outros",
    },
  ]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "caronas") return n.category === "caronas";
    if (activeTab === "mensagens") return n.category === "mensagens";
    return true;
  });

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Botão do Sininho */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 bg-vamu-gray hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors relative cursor-pointer"
      >
        <img src={BellNotification} alt="Notificação" className="w-5 h-5" />
        {/* Badge vermelho/ponto indicando não lidas */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>

      {/* Box Popover de Notificações */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 text-left text-sm font-sans">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 text-lg">Notificações</h3>
              {unreadCount > 0 && (
                <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {unreadCount} novas
                </span>
              )}
            </div>
            <button
              onClick={markAllAsRead}
              className="text-xs text-gray-500 hover:text-emerald-600 font-medium transition-colors"
            >
              Marcar todas como lidas
            </button>
          </div>

          {/* Abas de Filtro */}
          <NotificationFilter activeTab = {activeTab}  setActiveTab={setActiveTab}/>

          {/* Lista de Notificações */}
          <div className="max-h-[360px] overflow-y-auto space-y-3 pr-1">
            {filteredNotifications.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border transition-all ${
                  !item.read
                    ? "bg-emerald-50/40 border-emerald-100"
                    : "bg-white border-gray-100"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Ícones por tipo */}
                  <div className="mt-0.5">
                    {item.type === "RIDE_CONFIRMED" && (
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                        ✓
                      </div>
                    )}
                    {item.type === "GROUP_CHAT" && (
                      <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                        💬
                      </div>
                    )}
                    {item.type === "SCHEDULE_NOTICE" && (
                      <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                        ⏰
                      </div>
                    )}
                    {item.type === "RATING" && (
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center">
                        ★
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600">
                        {item.type === "RIDE_CONFIRMED" && "Carona Confirmada"}
                        {item.type === "GROUP_CHAT" && "Chat em Grupo"}
                        {item.type === "SCHEDULE_NOTICE" && "Aviso de Horário"}
                        {item.type === "RATING" && "Avaliação"}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {item.timeAgo}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-800 text-xs mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {item.message}
                    </p>

                    {/* Botões de Ação Dinâmicos (Card do Marcos) */}
                    {item.details?.actionButtons && (
                      <div className="flex items-center gap-2 mt-3">
                        <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs px-3 py-1.5 rounded-lg transition-colors">
                          Ver Detalhes
                        </button>
                        <button className="text-xs text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1 px-2 py-1.5">
                          💬 Chat com {item.details.driverName}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        
          <div className="mt-3 pt-2 border-t border-gray-100 text-center">
            <a
              href="/notificacoes"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Ver histórico completo de notificações
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
