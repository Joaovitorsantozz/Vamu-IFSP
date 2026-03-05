import placeholder from "../assets/header-placeholder.png";
import sparkle from "../assets/icons/sparkle.png";
import usericon from "../assets/icons/usericon.png";

function Header() {
  return (
    <main className="w-full min-h-[90vh]">
      {/* Mobile: flex-col (empilha) | Desktop: flex-row (lado a lado) */}
      <header className="w-full flex flex-col lg:flex-row h-full items-center">

        {/* Lado esquerdo — Mobile: full width, Desktop: 40% */}
        <div className="w-full lg:w-[40%] flex flex-col px-6 lg:ml-[4%] lg:px-0 py-10 lg:py-0 lg:h-full justify-center lg:pr-[5%]">
          <span className="flex bg-vamu-green-light text-vamu-green w-fit h-[35px] rounded-full items-center px-2.5 text-sm">
            <img className="h-[70%] mr-[5px]" src={sparkle} />
            Mobilidade Sustentável
          </span>

          {/* Título: mobile 32px, desktop 65px */}
          <h1 className="mt-2.5 font-normal text-3xl md:text-5xl lg:text-[65px] leading-tight lg:leading-[4rem] text-vamu-dark text-left">
            Compartilhe caronas com seus colegas da sua{" "}
            <span className="text-3xl md:text-5xl lg:text-[60px] font-normal text-vamu-green">
              universidade
            </span>
          </h1>

          <p className="text-sm md:text-[17px] text-[#171717] mt-4 lg:mt-5">
            Uma forma segura e econômica de se deslocar para o campus. Economize
            dinheiro, ajude o meio ambiente e faça novas amizades viajando com
            quem estuda com você.
          </p>

          {/* Botões CTA — Mobile: empilhados ou menores */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-[2%] mt-6 lg:mt-[30px] w-full">
            <a className="bg-vamu-green text-vamu-dark py-3 px-6 lg:py-[15px] lg:px-[30px] rounded-[10px] font-semibold text-center hover:brightness-90 hover:cursor-pointer">
              Começar agora
            </a>
            <a className="py-3 px-6 lg:py-[15px] lg:px-10 rounded-[10px] font-semibold bg-[#f1f0f0] text-center hover:brightness-90 hover:cursor-pointer">
              Saiba mais
            </a>
          </div>

          {/* Avatares */}
          <div className="mt-6 lg:mt-[30px] flex items-center gap-3">
            <div className="flex items-center">
              <img className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-white" src={usericon} alt="Aluno 1" />
              <img className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-white -ml-3" src={usericon} alt="Aluno 2" />
              <img className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-white -ml-3" src={usericon} alt="Aluno 3" />
            </div>
            <span className="text-sm lg:text-base">+2.000 alunos já estão usando o Vamu</span>
          </div>
        </div>

        {/* Lado direito — imagem hero */}
        <div className="w-full lg:flex-1 flex items-center justify-center px-6 lg:px-0 pb-10 lg:pb-0 lg:h-[90%]">
          <img className="rounded-[15px] w-full lg:w-[80%]" src={placeholder} />
        </div>
      </header>
    </main>
  );
}

export default Header;
