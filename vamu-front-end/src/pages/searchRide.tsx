import SearchRideContainer from "../components/searchRidesContainer";
import UserNavbar from "../components/userNavbar";
import userPic from "../assets/icons/user.png";
import {
  MapPin,
  ArrowLeftRight,
  Calendar,
  User,
  Clock,
  Star,
  Car,
  ShieldCheck,
} from "lucide-react";
import RideFoundCard, { type Ride } from "../components/rideFoundCard";
import { useState } from "react";
import { useRideSearch } from "../context/rideSearchContext";

export default function SearchRidePage() {
  const { rides, setRides } = useRideSearch();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={`min-h-screen  font-jakarta text-vamu-dark ${isChecked?  "bg-pink-200" : "bg-vamu-gray"}`}>
      <UserNavbar></UserNavbar>
      <main className="max-w-7xl mx-auto pt-12 pb-1 px-2  ">
        <SearchRideContainer checkUp={isChecked}></SearchRideContainer>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <aside className="bg-white rounded-3xl p-6 shadow-xl shadow-vamu-dark-deep/5 border border-vamu-border space-y-6">
            <h2 className="text-lg font-bold text-vamu-dark">Filtros</h2>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-vamu-gray-dark tracking-wider uppercase">
                Horário de saída
              </h3>

              <label className="flex items-center gap-3 text-sm text-vamu-dark cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-vamu-border text-vamu-green focus:ring-vamu-green"
                />
                <span>Manhã (06:00 - 12:00)</span>
              </label>

              <label className="flex items-center gap-3 text-sm font-semibold text-vamu-dark bg-vamu-gray p-2.5 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded border-vamu-border text-vamu-green focus:ring-vamu-green"
                />
                <span>Tarde (12:00 - 18:00)</span>
              </label>

              <label className="flex items-center gap-3 text-sm text-vamu-dark cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-vamu-border text-vamu-green focus:ring-vamu-green"
                />
                <span>Noite (18:00 - 23:59)</span>
              </label>
            </div>

            <hr className="border-vamu-border" />

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-vamu-gray-dark tracking-wider uppercase">
                Preço Máximo (R$)
              </h3>
              <input
                type="range"
                min="0"
                max="50"
                defaultValue="15"
                className="w-full accent-vamu-green cursor-pointer"
              />
              <div className="flex justify-between text-xs text-vamu-gray-dark font-medium">
                <span>R$0</span>
                <span>R$15</span>
                <span>R$50</span>
              </div>
            </div>

            <hr className="border-vamu-border" />

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-vamu-gray-dark tracking-wider uppercase">
                Preferências
              </h3>

              <label className="flex items-center gap-3 text-sm text-vamu-dark cursor-pointer">
                <ShieldCheck className="w-4 h-4 text-vamu-gray-dark" />
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-vamu-border text-vamu-green focus:ring-vamu-green"
                />
                <span>Motoristas verificados</span>
              </label>

              <label className="flex items-center gap-3 text-sm text-vamu-dark cursor-pointer">
                <User className="w-4 h-4 text-vamu-gray-dark" />
                <input
                  type="checkbox" checked= {isChecked} onChange = {(e) => setIsChecked(e.target.checked)}
                  className="w-4 h-4 rounded border-vamu-border text-vamu-green focus:ring-vamu-green"
                />
                <span>Apenas motoristas mulheres</span>
              </label>
            </div>
          </aside>

          <section
            aria-label="Resultados da busca"
            className="lg:col-span-3 space-y-4"
          >
            {rides.map((ridesi: Ride) => (
              <RideFoundCard
                key={ridesi.id}
                ride={ridesi}
                onRideAccepted={(acceptedId) => {
               
                  setRides(rides.filter((r) => r.id !== acceptedId));
                }}
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
