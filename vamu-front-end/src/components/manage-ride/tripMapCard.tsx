interface TripMapCardProps {
  mapImage: string;
  remainingSeats: number;
}

export function TripMapCard({ mapImage, remainingSeats }: TripMapCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden relative">
      <img src={mapImage} alt="Mapa da rota" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-sm">Vagas restantes</p>
        <p className="text-2xl font-bold">{remainingSeats}</p>
      </div>
    </div>
  );
}