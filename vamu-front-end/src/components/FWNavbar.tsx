
import User from "../assets/icons/user.png";

import Logo from "../assets/icons/logoFW.png";
import { Link } from "react-router-dom";
import { NotificationBell } from "./notifications/notifications";

export default function FWNavbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-vamu-border">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <img src={Logo} alt="VAMU FW Logo" className="w-8 h-8" />
        </div>

        <Link to="/dashboard">
          <h1 className="text-xl md:text-[20px] font-bold text-vamu-dark">
            Vamu FW
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-8 text-sm font-medium text-vamu-gray-dark">
        <a href="#" className="hover:text-vamu-pink transition">
          Minhas Caronas
        </a>

        <a href="#" className="hover:text-vamu-pink transition">
          Oferecer Carona
        </a>

        <div className="flex items-center gap-3 pl-4 border-l border-vamu-border">
          <div className="relative">
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>

            <div className="w-8 h-8 bg-vamu-gray rounded-full flex items-center justify-center">
              <NotificationBell />
            </div>
          </div>

          <div className="w-8 h-8 border-2 border-vamu-pink rounded-full flex items-center justify-center">
            <Link to="/my-profile">
              <img
                src={User}
                alt="Perfil do usuário"
                className="w-5 h-5"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
