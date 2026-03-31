import React from "react";
import {
  Car,
  Route,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import Logo from "../assets/icons/logo1.png";
import User from "../assets/icons/user.png";
import { Link } from "react-router-dom";
import BellNotification from "../assets/icons/bellnotifications.png";
const ridePage = () => {
  return (
    <div className="min-h-screen bg-vamu-gray font-jakarta text-vamu-dark">
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
      <main className="flex-grow pt-12 pb-20 px-6 font-jakarta bg-vamu-gray">
        <div className="max-w-4xl mx-auto">
          {/* Header da Página */}
          <header className="mb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-vamu-dark tracking-tight mb-4">
              Oferecer uma{" "}
              <span className="text-vamu-green-cta italic">Carona</span>
            </h1>
            <p className="text-vamu-gray-dark text-lg max-w-2xl">
              Compartilhe sua rota, economize custos e ajude a comunidade
              acadêmica a se movimentar com mais facilidade.
            </p>
          </header>

          <form className="space-y-8">
            {/* Seção 1: Dados do Veículo */}
            <section className="bg-white rounded-3xl shadow-xl shadow-vamu-dark-deep/5 p-8 border border-vamu-border">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-vamu-green-light p-2.5 rounded-xl text-vamu-green-dark">
                  <Car className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-vamu-dark">
                  Dados do Veículo
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                    Nome do Proprietário
                  </label>
                  <input
                    type="text"
                    className="w-full bg-vamu-gray border border-vamu-border rounded-xl p-4 focus:ring-2 focus:ring-vamu-green/20 focus:border-vamu-green outline-none text-vamu-dark font-medium transition-all"
                    placeholder="Ex: João Silva"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                    Placa do Carro
                  </label>
                  <input
                    type="text"
                    className="w-full bg-vamu-gray border border-vamu-border rounded-xl p-4 focus:ring-2 focus:ring-vamu-green/20 focus:border-vamu-green outline-none text-vamu-dark font-medium transition-all"
                    placeholder="ABC-1234"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                    Modelo do Carro
                  </label>
                  <input
                    type="text"
                    className="w-full bg-vamu-gray border border-vamu-border rounded-xl p-4 focus:ring-2 focus:ring-vamu-green/20 focus:border-vamu-green outline-none text-vamu-dark font-medium transition-all"
                    placeholder="Ex: Volkswagen Gol"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                    Cor
                  </label>
                  <div className="relative">
                    <select className="w-full bg-vamu-gray border border-vamu-border rounded-xl p-4 focus:ring-2 focus:ring-vamu-green/20 focus:border-vamu-green outline-none text-vamu-dark font-medium transition-all appearance-none">
                      <option disabled selected value="">
                        Selecione a cor
                      </option>
                      <option>Branco</option>
                      <option>Preto</option>
                      <option>Cinza/Prata</option>
                      <option>Vermelho</option>
                      <option>Azul</option>
                      <option>Outra</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-vamu-gray-dark pointer-events-none" />
                  </div>
                </div>
              </div>
            </section>

            {/* Seção 2: Dados do Trajeto */}
            <section className="bg-white rounded-3xl shadow-xl shadow-vamu-dark-deep/5 p-8 border border-vamu-border relative overflow-hidden">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-vamu-green-light p-2.5 rounded-xl text-vamu-green-dark">
                  <Route className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-vamu-dark">
                  Dados do Trajeto
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 relative z-10">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                    Local de Saída
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-vamu-green-dark w-5 h-5" />
                    <input
                      type="text"
                      className="w-full bg-vamu-gray border border-vamu-border rounded-xl pl-12 p-4 focus:ring-2 focus:ring-vamu-green/20 focus:border-vamu-green outline-none text-vamu-dark font-medium transition-all"
                      placeholder="Ex: Campus Central - Bloco A"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                      Cidade de Encontro
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-vamu-green-dark w-5 h-5" />
                      <input
                        type="text"
                        className="w-full bg-vamu-gray border border-vamu-border rounded-xl pl-12 p-4 focus:ring-2 focus:ring-vamu-green/20 focus:border-vamu-green outline-none text-vamu-dark font-medium transition-all"
                        placeholder="Ex: São Paulo"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                      Horário de Saída
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-vamu-green-dark w-5 h-5" />
                      <input
                        type="time"
                        className="w-full bg-vamu-gray border border-vamu-border rounded-xl pl-12 p-4 focus:ring-2 focus:ring-vamu-green/20 focus:border-vamu-green outline-none text-vamu-dark font-medium transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Botões de Ação */}
            <div className="flex flex-col md:flex-row items-center justify-end gap-4 mt-12">
              <button
                type="button"
                className="w-full md:w-auto px-8 py-4 text-vamu-gray-dark font-bold hover:text-vamu-dark transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full md:w-auto bg-vamu-green-cta text-white font-bold py-4 px-12 rounded-2xl shadow-xl shadow-vamu-green/20 hover:bg-vamu-green-dark hover:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                Publicar Carona
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* <div className="mt-12 p-6 bg-white rounded-2xl flex items-center gap-6 border-l-4 border-vamu-green-cta shadow-sm border border-vamu-border">
          <div className="hidden sm:block text-vamu-green-cta">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-bold text-vamu-dark">Segurança em primeiro lugar</h3>
            <p className="text-sm text-vamu-gray-dark leading-relaxed">
              Lembre-se de conferir os perfis dos passageiros que solicitarem sua carona e mantenha sua documentação em dia.
            </p>
          </div>
        </div> */}
        </div>
      </main>
      <footer className="w-full bg-white border-t border-vamu-border py-10">
        {/* Container interno para alinhar o conteúdo com o resto do site */}
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition">
            <img src={Logo} alt="VAMU Logo" className="w-6 h-6" />
            <h1 className="text-xl md:text-[20px] font-bold text-vamu-dark">
              Vamu
            </h1>
          </div>

          <div className="flex gap-8 text-sm text-vamu-gray-dark font-medium">
            <a
              href="#"
              className="hover:text-vamu-green-dark transition-colors"
            >
              Termos
            </a>
            <a
              href="#"
              className="hover:text-vamu-green-dark transition-colors"
            >
              Privacidade
            </a>
            <a
              href="#"
              className="hover:text-vamu-green-dark transition-colors"
            >
              Suporte
            </a>
          </div>

          <p className="text-xs text-vamu-gray-dark font-medium">
            © 2024 Vamu Tecnologias Ltda.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ridePage;
