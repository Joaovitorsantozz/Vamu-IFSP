import User from "../../assets/icons/user.png";
import BellNotification from "../../assets/icons/bellnotifications.png";
import Logo from "../../assets/icons/logo1.png";

import { Link } from "react-router-dom";

export function RideNavbar() {
  return (
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
  );
}
