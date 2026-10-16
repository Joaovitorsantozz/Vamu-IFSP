export interface NotificationItem {
  id: string | number;
  type: 
    | "RIDE_REQUESTED"
    | "RIDE_ACCEPTED"
    | "DRIVER_RIDE_ACCEPTED"
    | "PASSENGER_RIDE_REQUESTED"
    | "RIDE_CONFIRMED" 
    | "GROUP_CHAT" 
    | "SCHEDULE_NOTICE" 
    | "RATING";
  title: string;
  message: string;
  link?: string;
  read: boolean;
  metadata?: {
    rideId?: number;
    passengerId?: number | string;
    driverId?: number | string;
    [key: string]: any; // Permite outros campos flexíveis se precisar
  };
  created_at: string;
  category?: "caronas" | "mensagens" | "outros";
}