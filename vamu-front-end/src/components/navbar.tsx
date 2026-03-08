import logoimg from "../assets/icons/logo1.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full h-[12vh] flex justify-between items-center px-4 md:px-[4%]">
      {/* Logo — sempre visível */}
      <div className="flex items-center gap-[5px]">
        <img className="w-8 md:w-10" src={logoimg} alt="Logo da Vamu" />
        <h1 className="text-xl md:text-[30px] font-medium text-[#151515]">Vamu</h1>
      </div>

      {/* Nav links — escondidos no mobile, visíveis no desktop */}
      <div className="hidden lg:flex h-full">
        <ul className="flex gap-8 h-full list-none items-center">
          <li className="hover:border-b-[3px] hover:border-vamu-green hover:pb-[1px]">
            <a className="no-underline text-vamu-dark text-base font-medium" href="/">
              Como Funciona
            </a>
          </li>
          <li className="hover:border-b-[3px] hover:border-vamu-green hover:pb-[1px]">
            <a className="no-underline text-vamu-dark text-base font-medium" href="/">
              Segurança
            </a>
          </li>
          <li className="hover:border-b-[3px] hover:border-vamu-green hover:pb-[1px]">
            <a className="no-underline text-vamu-dark text-base font-medium" href="/aboutUs">
              Sobre nós
            </a>
          </li>
        </ul>
      </div>

      {/* Botões — menores no mobile */}
      <div className="flex items-center gap-2 md:gap-[5%]">
        <Link
          to="/login"
          className="text-vamu-green bg-vamu-green-light px-3 py-2 md:px-[26px] md:py-[15px] font-semibold text-xs md:text-sm rounded-[10px] no-underline"
        >
          Entrar
        </Link>
        <Link
          to="/register"
          className="whitespace-nowrap bg-vamu-green text-vamu-dark px-3 py-2 md:px-[32px] md:py-[15px] font-semibold text-xs md:text-sm rounded-[10px] no-underline"
        >
          Criar Conta
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
