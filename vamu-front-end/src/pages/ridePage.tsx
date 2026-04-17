import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/icons/logo1.png";
import UserIcon from "../assets/icons/user.png";
import BellNotification from "../assets/icons/bellnotifications.png";
import RideForm from "../features/ridePageForm";

const RidePage = () => {
  return (
    <div className="min-h-screen bg-vamu-gray font-jakarta text-vamu-dark flex flex-col">

      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-vamu-border">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="VAMU Logo" className="w-8 h-8" />
          <Link to="/dashboard">
            <h1 className="text-xl md:text-[20px] font-bold text-vamu-dark">Vamu</h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-8 text-sm font-medium text-vamu-gray-dark">
          <a href="#" className="hover:text-vamu-green-dark transition">Minhas Caronas</a>
          <a href="#" className="hover:text-vamu-green-dark transition">Oferecer Carona</a>
          <div className="flex items-center gap-3 pl-4 border-l border-vamu-border">
            <div className="relative">
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-vamu-gray rounded-full flex items-center justify-center">
                <img src={BellNotification} alt="Notificação" className="w-5 h-5" />
              </div>
            </div>
            <div className="w-8 h-8 border-2 border-vamu-green rounded-full flex items-center justify-center">
              <img src={UserIcon} alt="Perfil" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>


      <main className="flex-grow pt-12 pb-20 px-6 bg-vamu-gray">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-vamu-dark tracking-tight mb-4">
              Oferecer uma <span className="text-vamu-green-cta italic">Carona</span>
            </h1>
            <p className="text-vamu-gray-dark text-lg max-w-2xl">
              Compartilhe sua rota, economize custos e ajude a comunidade acadêmica.
            </p>
          </header>

          <RideForm />
        </div>
      </main>

    
      <footer className="w-full bg-white border-t border-vamu-border py-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition">
            <img src={Logo} alt="VAMU Logo" className="w-6 h-6" />
            <h1 className="text-xl font-bold text-vamu-dark">Vamu</h1>
          </div>
          <div className="flex gap-8 text-sm text-vamu-gray-dark font-medium">
            <a href="#" className="hover:text-vamu-green-dark transition">Termos</a>
            <a href="#" className="hover:text-vamu-green-dark transition">Privacidade</a>
            <a href="#" className="hover:text-vamu-green-dark transition">Suporte</a>
          </div>
          <p className="text-xs text-vamu-gray-dark font-medium">
            © 2024 Vamu Tecnologias Ltda.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RidePage;