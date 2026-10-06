export type TabType = "todas" | "caronas" | "mensagens";
interface Tabs {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}

export function NotificationFilter({ activeTab, setActiveTab }: Tabs) {
  return (
    <div className="flex bg-gray-100/80 p-1 rounded-xl mb-4 text-xs font-medium text-gray-600">
      <button
        onClick={() => setActiveTab("todas")}
        className={`flex-1 py-1.5 rounded-lg transition-all ${
          activeTab === "todas"
            ? "bg-white text-gray-900 shadow-sm font-semibold"
            : "hover:text-gray-900"
        }`}
      >
        Todas
      </button>
      <button
        onClick={() => setActiveTab("caronas")}
        className={`flex-1 py-1.5 rounded-lg transition-all ${
          activeTab === "caronas"
            ? "bg-white text-gray-900 shadow-sm font-semibold"
            : "hover:text-gray-900"
        }`}
      >
        Caronas
      </button>
      <button
        onClick={() => setActiveTab("mensagens")}
        className={`flex-1 py-1.5 rounded-lg transition-all ${
          activeTab === "mensagens"
            ? "bg-white text-gray-900 shadow-sm font-semibold"
            : "hover:text-gray-900"
        }`}
      >
        Mensagens
      </button>
    </div>
  );
}
