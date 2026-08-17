type Ride = {
  boarding: string;
  destination: string;
  boarding_time: string;
  available_seats: number;
  passengers_count: number;
};

interface TripDetailsCardProps {
  ride: Ride;
  formatDay: (dateStr: string) => string;
  formatTime: (dateStr: string) => string;
}

export function TripDetailsCard({ ride, formatDay, formatTime }: TripDetailsCardProps) {
  return (
    <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-6">Detalhes da Viagem</h2>

      <div className="flex justify-between">
        <div className="space-y-4">
          <div>
            <span className="text-xs text-gray-400 uppercase">Origem</span>
            <p className="font-semibold">{ride.boarding}</p>
          </div>
          <div>
            <span className="text-xs text-gray-400 uppercase">Destino</span>
            <p className="font-semibold">{ride.destination}</p>
          </div>
        </div>

        <div className="bg-gray-100 px-6 py-4 rounded-xl text-center">
          <span className="text-xs text-gray-400 uppercase">Data</span>
          <p className="font-bold text-lg">{formatDay(ride.boarding_time)}</p>
        </div>

        <div className="bg-gray-100 px-6 py-4 rounded-xl text-center">
          <span className="text-xs text-gray-400 uppercase">Horário</span>
          <p className="font-bold text-lg">{formatTime(ride.boarding_time)}</p>
        </div>
      </div>

      <div className="mt-6 bg-green-50 p-4 rounded-xl flex items-center gap-4">
        <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
          🚗
        </div>
        <div>
          <p className="font-semibold">Vagas Totais: {ride.available_seats}</p>
          <span className="text-sm text-gray-500">
            Passageiros confirmados: {ride.passengers_count}
          </span>
        </div>
      </div>
    </div>
  );
}