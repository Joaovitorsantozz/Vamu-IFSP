import logo from "../assets/icons/logo1.png";

function Footer() {
  return (
    <footer className="w-full mt-[10vh] px-6 lg:px-[6%] py-8 lg:py-10 bg-vamu-gray flex flex-col gap-6">
      {/* Mobile: empilha | Desktop: lado a lado */}
      <div className="flex flex-col md:flex-row items-center justify-evenly gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5 text-lg font-medium text-[#0f172a]">
          <div className="w-[34px] h-[34px] bg-vamu-green-cta rounded-lg  ">
            <img className="w-full" src={logo} />
          </div>
          <span>Vamu</span>
        </div>

        {/* Links */}
        <nav className="flex gap-6 lg:gap-[30px]">
          <a className="no-underline text-vamu-gray-medium text-sm hover:text-vamu-green-dark" href="#">
            Termos de Uso
          </a>
          <a className="no-underline text-vamu-gray-medium text-sm hover:text-vamu-green-dark" href="#">
            Privacidade
          </a>
          <a className="no-underline text-vamu-gray-medium text-sm hover:text-vamu-green-dark" href="#">
            Contato
          </a>
        </nav>


        {/*div para links de redes sociais*/}
          <div className="flex gap-2.5">
          <button className="w-9 h-9 rounded-full border-none  cursor-pointer text-sm">
            
          </button>
          <button className="w-9 h-9 rounded-full border-none  cursor-pointer text-sm">
            
          </button>
        </div>

        
      
      </div>

      <p className="text-center text-[13px] text-vamu-gray-medium">
        © 2025 Vamu Mobilidade Universitária. Todos os direitos reservados.
      </p>

    </footer>
  );
}

export default Footer;
