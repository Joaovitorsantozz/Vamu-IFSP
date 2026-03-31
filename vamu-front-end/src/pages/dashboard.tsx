
import {

  MapPin,
  GraduationCap,
  Calendar,
  Users,
  Car,
  Clock,
  ArrowRight,
} from "lucide-react";
import Logo from "../assets/icons/logo1.png";
import User from "../assets/icons/user.png";
import BellNotification from "../assets/icons/bellnotifications.png";
import { Link } from "react-router-dom";
const VamuDashboard = () => {
  return (
    /* Alterado para font-jakarta e text-vamu-dark */
    <div className="min-h-screen bg-vamu-gray font-jakarta text-vamu-dark">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-vamu-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img src={Logo} alt="VAMU Logo" className="w-8 h-8" />
          </div>
          <Link to="/dashboard">
            <h1 className="text-xl md:text-[20px] font-bold text-vamu-dark">
              Vamu
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium text-vamu-gray-dark">
          <a href="#" className="hover:text-vamu-green-dark transition">
            Minhas Caronas
          </a>
          <a href="#" className="hover:text-vamu-green-dark transition">
            Oferecer Carona
          </a>
          <div className="flex items-center gap-3 pl-4 border-l border-vamu-border">
            <div className="relative">
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-vamu-gray rounded-full flex items-center justify-center">
                <img
                  src={BellNotification}
                  alt="Notificação"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div className="w-8 h-8 border-2 border-vamu-green rounded-full flex items-center justify-center">
              <img src={User} alt="Perfil do usuário" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto pt-12 pb-20 px-6">
        {/* Header Hero */}
        <section className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-vamu-dark mb-3 tracking-tight">
            Para onde vamos hoje?
          </h1>
          <p className="text-vamu-gray-dark">
            Encontre ou ofereça caronas universitárias seguras com quem estuda
            com você.
          </p>
        </section>

        {/* Search Card */}
        <section className="bg-white rounded-3xl shadow-xl shadow-vamu-dark-deep/5 p-8 mb-16 border border-vamu-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <label className="text-xs font-bold text-vamu-gray-dark uppercase ml-1 mb-2 block">
                Saindo de
              </label>
              <div className="flex items-center bg-vamu-gray border border-vamu-border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-vamu-green/20 transition">
                <MapPin className="text-vamu-green-dark w-5 h-5 mr-3" />
                <input
                  type="text"
                  placeholder="Ex: Estação Butantã"
                  className="bg-transparent w-full outline-none text-vamu-dark"
                />
              </div>
            </div>
            <div className="relative">
              <label className="text-xs font-bold text-vamu-gray-dark uppercase ml-1 mb-2 block">
                Indo para
              </label>
              <div className="flex items-center bg-vamu-gray border border-vamu-border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-vamu-green/20 transition">
                <GraduationCap className="text-vamu-green-dark w-5 h-5 mr-3" />
                <input
                  type="text"
                  placeholder="Ex: Portão 3 USP"
                  className="bg-transparent w-full outline-none text-vamu-dark"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 p-1 bg-vamu-gray rounded-xl">
              <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-white text-vamu-green-dark shadow-sm">
                Apenas ida
              </button>
              <button className="px-4 py-2 text-sm font-semibold rounded-lg text-vamu-gray-dark hover:text-vamu-dark">
                Ida e Volta
              </button>
            </div>

            <div className="flex items-center gap-4 flex-1 justify-end">
              <div className="flex items-center gap-2 border border-vamu-border rounded-xl px-4 py-2.5 text-vamu-gray-dark bg-white">
                <Calendar className="w-4 h-4 text-vamu-gray-dark" />
                <span className="text-sm">Hoje, 24 de Outubro</span>
              </div>
              <div className="flex items-center gap-2 border border-vamu-border rounded-xl px-4 py-2.5 text-vamu-gray-dark bg-white">
                <Users className="w-4 h-4 text-vamu-gray-dark" />
                <span className="text-sm">1 passageiro</span>
              </div>
              <button className="bg-vamu-green-cta hover:bg-vamu-green-dark text-white font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-vamu-green/20">
                Buscar
              </button>
            </div>
          </div>
        </section>

        {/* Active Rides */}
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
            {/* Card Passenger */}
            <div className="bg-white p-5 rounded-2xl border border-vamu-border shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold text-vamu-gray-dark uppercase tracking-wider block">
                    VOCÊ É PASSAGEIRO
                  </span>
                  <h3 className="font-bold text-vamu-dark">USP - Portão 1</h3>
                </div>
                <span className="bg-vamu-green-light text-vamu-green-dark text-[10px] font-bold px-2 py-1 rounded">
                  ATIVA
                </span>
              </div>
              <div className="flex items-center gap-2 text-vamu-gray-dark text-sm mb-6">
                <Clock className="w-4 h-4" /> <span>Hoje às 18:30</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-vamu-gray-light rounded-full border border-white"></div>
                  <span className="text-xs text-vamu-gray-dark font-medium">
                    Marcos S. (Motorista)
                  </span>
                </div>
                <button className="text-[11px] font-bold bg-vamu-gray text-vamu-gray-dark px-3 py-1.5 rounded-lg border border-vamu-border">
                  Detalhes
                </button>
              </div>
            </div>

            {/* Card Driver */}
            <div className="bg-white p-5 rounded-2xl border border-vamu-border shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold text-vamu-gray-dark uppercase tracking-wider block">
                    VOCÊ É MOTORISTA
                  </span>
                  <h3 className="font-bold text-vamu-dark">
                    Estação Pinheiros
                  </h3>
                </div>
                <span className="bg-vamu-green-light text-vamu-green-dark text-[10px] font-bold px-2 py-1 rounded">
                  ATIVA
                </span>
              </div>
              <div className="flex items-center gap-2 text-vamu-gray-dark text-sm mb-6">
                <Clock className="w-4 h-4" /> <span>Amanhã às 07:15</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 bg-vamu-gray-light rounded-full border-2 border-white"></div>
                  <div className="w-7 h-7 bg-vamu-gray-medium rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
                    +1
                  </div>
                </div>
                <button className="text-[11px] font-bold bg-vamu-gray text-vamu-gray-dark px-3 py-1.5 rounded-lg border border-vamu-border">
                  Gerenciar
                </button>
              </div>
            </div>

            {/* Offer Ride Dotted Box */}
            <div className="border-2 border-dashed border-vamu-green/30 rounded-2xl flex flex-col items-center justify-center p-6 text-center hover:bg-vamu-green-light/50 transition cursor-pointer group">
              <p className="text-vamu-dark-green font-semibold text-sm mb-1">
                Vai sair de carro?
              </p>
              <Link to="/offer-ride">
              <p className="text-vamu-green-dark font-black text-xs uppercase tracking-widest underline decoration-2 underline-offset-4 group-hover:text-vamu-green-cta">
                Oferecer nova carona
              </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Rides Table */}
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

      {/* Footer */}
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
