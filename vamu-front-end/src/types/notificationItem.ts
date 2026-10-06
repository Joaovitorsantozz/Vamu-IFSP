export interface NotificationItem {
  id: string;
  type: "RIDE_CONFIRMED" | "GROUP_CHAT" | "SCHEDULE_NOTICE" | "RATING";
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  category: "caronas" | "mensagens" | "outros";
  details?: {
    route?: string;
    actionButtons?: boolean;
    driverName?: string;
  };
}