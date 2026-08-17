interface RideHeaderProps {
  isActive: boolean;
}

export function RideHeader({ isActive }: RideHeaderProps) {
  return (
    <div className="mb-8">
      <span
        className={`text-xs ${
          isActive ? "text-green-500" : "text-red-500"
        } font-semibold uppercase tracking-wider`}
      >
        Status: {isActive ? "em andamento" : "finalizada"}
      </span>

      <div className="flex justify-between items-center mt-1">
        <h1 className="text-4xl font-bold text-gray-800">
          Gerenciar Carona
        </h1>

        <span
          className={`${
            isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          } px-4 py-2 rounded-full text-sm font-semibold`}
        >
          {isActive ? "Ativa" : "Inativa"}
        </span>
      </div>
    </div>
  );
}