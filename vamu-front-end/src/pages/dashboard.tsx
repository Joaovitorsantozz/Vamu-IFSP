import {

  Car,
  Clock,
  ArrowRight,
} from "lucide-react";
import Logo from "../assets/icons/logo1.png";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { getActiveRaces} from "../service/rideOfferService";
import { RideCard } from "../components/ridecard";

import UserNavbar from "../components/userNavbar";
import SearchRideContainer from "../components/searchRidesContainer";
type Ride = {
  id: number;
  boarding: string;

  destination: string;
  boarding_time: string;
  is_active: boolean;
  passengers_count: number;
  role:string;
};
const VamuDashboard = () => {
  const { car } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [activeRaces, setActiveRaces] = useState<Ride[]>([]);

async function fetchData() {
    try {
      if (!token) return;
      const response = await getActiveRaces(token);

      setActiveRaces(
        Array.isArray(response.data.result)
          ? response.data.result
          : [response.data.result],
      );
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [token]);
  return (
    <div className="min-h-screen bg-vamu-gray font-jakarta text-vamu-dark">
      <UserNavbar></UserNavbar>

      <main className="max-w-5xl mx-auto pt-12 pb-20 px-6">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-vamu-dark mb-3 tracking-tight">
            Para onde vamos hoje?
          </h1>
          <p className="text-vamu-gray-dark">
            Encontre ou ofereça caronas universitárias seguras com quem estuda
            com você.
          </p>
        </section>

     
        <SearchRideContainer></SearchRideContainer>
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="flex items-center gap-2 font-bold text-vamu-dark text-lg">
              <Car className="w-5 h-5 text-vamu-green" /> Minhas Caronas Ativas
            </h2>
            <button className="text-vamu-green-dark text-sm font-bold hover:underline">
              Ver todas
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeRaces.map((ride) => (
              <RideCard key={ride?.id} ride={ride} onUpdate={fetchData} />
            ))}

            <div className="border-2 border-dashed border-vamu-green/30 rounded-2xl flex flex-col items-center justify-center p-6 text-center hover:bg-vamu-green-light/50 transition cursor-pointer group">
              <p className="text-vamu-dark-green font-semibold text-sm mb-1">
                Vai sair de carro?
              </p>
              {car ? (
                <Link to="/offer-ride">
                  <p className="text-vamu-green-dark font-black text-xs uppercase tracking-widest underline decoration-2 underline-offset-4 group-hover:text-vamu-green-cta">
                    Oferecer nova carona
                  </p>
                </Link>
              ) : (
                <p className="text-vamu-gray-dark font-black text-xs uppercase tracking-widest opacity-50 cursor-not-allowed">
                  Cadastre um carro para oferecer caronas
                </p>
              )}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-vamu-gray-dark" />
            <h2 className="font-bold text-vamu-dark text-lg">
              Caronas Recentes
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-vamu-border overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-vamu-gray text-[11px] font-bold text-vamu-gray-dark uppercase tracking-widest border-b border-vamu-border">
                  <th className="px-6 py-4">Rota</th>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Com quem</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-vamu-border hover:bg-vamu-gray/30 transition">
                  <td className="px-6 py-4 font-semibold text-vamu-dark">
                    Terminal Barra Funda{" "}
                    <ArrowRight className="inline w-3 h-3 mx-1 text-vamu-green" />{" "}
                    UNESP
                  </td>
                  <td className="px-6 py-4 text-vamu-gray-dark">
                    22 Out, 2024
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-vamu-gray-light rounded-full"></div>
                      <span className="text-vamu-gray-dark">Ana Julia L.</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-vamu-gray-light text-vamu-gray-dark text-[10px] font-bold px-2 py-1 rounded">
                      FINALIZADA
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-vamu-gray/30 transition">
                  <td className="px-6 py-4 font-semibold text-vamu-dark">
                    Home Office{" "}
                    <ArrowRight className="inline w-3 h-3 mx-1 text-vamu-green" />{" "}
                    Mackenzie
                  </td>
                  <td className="px-6 py-4 text-vamu-gray-dark">
                    20 Out, 2024
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-vamu-gray-light rounded-full"></div>
                      <span className="text-vamu-gray-dark">Felipe M.</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-vamu-gray-light text-vamu-gray-dark text-[10px] font-bold px-2 py-1 rounded">
                      FINALIZADA
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-10 border-t border-vamu-border flex flex-wrap justify-between items-center gap-6">
        <div className="flex items-center gap-2 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition">
          <img src={Logo} alt="VAMU Logo" className="w-6 h-6" />
          <h1 className="text-xl md:text-[20px] font-bold text-vamu-dark">
            Vamu
          </h1>
        </div>
        <div className="flex gap-6 text-sm text-vamu-gray-dark font-medium">
          <a href="#" className="hover:text-vamu-green-dark">
            Termos
          </a>
          <a href="#" className="hover:text-vamu-green-dark">
            Privacidade
          </a>
          <a href="#" className="hover:text-vamu-green-dark">
            Suporte
          </a>
        </div>
        <p className="text-xs text-vamu-gray-dark">
          © 2024 Vamu Tecnologias Ltda.
        </p>
      </footer>
    </div>
  );
};
export default VamuDashboard;
