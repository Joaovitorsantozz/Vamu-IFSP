type Passenger = {
  id: number;
  nome: string;
  status: string;
};

type Ride = {
  available_seats: number;
  passengers_count: number;
};

interface RideOccupancyCardProps {
  ride: Ride;
  passengers: Passenger[];
}

export function RideOccupancyCard({
  ride,
  passengers,
}: RideOccupancyCardProps) {
  const remainingSeats = ride.available_seats - Number(ride.passengers_count);
  const acceptedPassengers = passengers.filter((p) => p.status === "accepted");
  console.log("aceito", acceptedPassengers);

  return (
    <div className="bg-white p-6 rounded-2xl shadow h-fit">
      <h2 className="text-lg font-semibold mb-4">Ocupação Atual</h2>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-vamu-green-light rounded-full flex items-center justify-center font-bold text-vamu-green-dark">
          {ride.passengers_count}
        </div>
        <div className="flex-1">
          <p className="font-semibold">Passageiros no carro</p>
          <span className="text-xs text-green-500 font-bold uppercase">
            Confirmados
          </span>
        </div>
      </div>

      {/* Lista de Passageiros Aceitos */}
      <div className="space-y-2 border-t border-gray-100 pt-4 mb-4">
        <span className="text-xs text-gray-400 uppercase font-semibold">
          Passageiros A bordo
        </span>
      </div>
      {acceptedPassengers.length > 0 ? (
        acceptedPassengers.map((passenger) => (
          <div
            key={passenger.id}
            className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl"
          >
            <div className="w-7 h-7 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold text-xs">
              {passenger.nome.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-sm text-gray-700">
              {passenger.nome}
            </span>
          </div>
        ))
      ) : (
        <p className="text-xs text-gray-400 italic">
          Nenhum passageiro confirmado ainda.
        </p>
      )}
      {remainingSeats > 0 ? (
        <div className="border-2 border-dashed rounded-xl p-4 text-center text-gray-400 text-sm">
          {remainingSeats} Vaga(s) disponível(eis)
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-4 text-center text-vamu-gray-dark font-bold text-sm">
          Carona Lotada
        </div>
      )}
    </div>
  );
}
