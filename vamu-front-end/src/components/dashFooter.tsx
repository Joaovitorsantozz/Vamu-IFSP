import logoimg from "../assets/icons/logo1.png";

export default function DashFooter(){
    return(
    
    <footer className="max-w-5xl mx-auto px-6 py-10 border-t border-vamu-border flex flex-wrap justify-between items-center gap-6">
        <div className="flex items-center gap-2 ">
          <img src={logoimg} alt="VAMU Logo" className="w-6 h-6" />
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
          © 2025 Vamu Tecnologias Ltda.
        </p>
      </footer>
    );
}