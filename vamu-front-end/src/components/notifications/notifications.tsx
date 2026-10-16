import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BellNotification from "../../assets/icons/bellnotifications.png";
import type { NotificationItem } from "../../types/notificationItem";
import { NotificationFilter } from "./notificationFilter";

import Axios from "axios";
import { NotificationCard } from "./notificationCard";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"todas" | "caronas" | "mensagens">(
    "todas",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  async function fetchNotifications() {
    try {
      setLoading(true);
      const response = await Axios.get("http://localhost:3000/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseData = response.data;
      let listaFinal: NotificationItem[] = [];

      if (Array.isArray(responseData)) {
        listaFinal = responseData;
      } else if (responseData && Array.isArray(responseData.notifications)) {
        listaFinal = responseData.notifications;
      } else if (responseData && Array.isArray(responseData.data)) {
        listaFinal = responseData.data;
      }

      setNotifications(listaFinal);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, [token]);

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

  const safeNotifications = Array.isArray(notifications) ? notifications : [];
  const unreadCount = safeNotifications.filter((n) => !n.read).length;

  const handleToggleOpen = async () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      await fetchNotifications();

      if (unreadCount > 0) {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

        try {
          await Axios.patch(
            "http://localhost:3000/notifications/read-all",
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
        } catch (error) {
          console.error(
            "Erro ao marcar notificações como lidas no servidor:",
            error,
          );
        }
      }
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDeleteNotification = async (
    id: string | number,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation(); // Evita que clique na lixeira acione o redirecionamento do card

    try {
      setNotifications((prev) => prev.filter((n) => n.id !== id));

      await Axios.delete(`http://localhost:3000/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Erro ao excluir notificação:", error);
    }
  };

  const handleNotificationClick = (item: NotificationItem) => {
    setIsOpen(false);

    if (item.link) {
      try {
        const url = new URL(item.link);
        if (url.origin === window.location.origin) {
          navigate(url.pathname + url.search);
        } else {
          window.open(item.link, "_blank");
        }
      } catch {
        navigate(item.link);
      }
    }
  };

  const filteredNotifications = safeNotifications.filter((n) => {
    if (activeTab === "caronas") return n.category === "caronas";
    if (activeTab === "mensagens") return n.category === "mensagens";
    return true;
  });

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={handleToggleOpen}
        className="w-8 h-8 bg-vamu-gray hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors relative cursor-pointer"
      >
        <img src={BellNotification} alt="Notificação" className="w-5 h-5" />

        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 text-left text-sm font-sans">
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

          <NotificationFilter
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="max-h-[360px] overflow-y-auto space-y-3 pr-1">
            {loading ? (
              <p className="text-center text-xs text-gray-400 py-4">
                Carregando...
              </p>
            ) : filteredNotifications.length === 0 ? (
              <p className="text-center text-xs text-gray-400 py-4">
                Nenhuma notificação encontrada.
              </p>
            ) : (
              filteredNotifications.map((item) => (
                <NotificationCard
                  key={item.id}
                  item={item}
                  onItemClick={handleNotificationClick}
                  onDelete={handleDeleteNotification}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
