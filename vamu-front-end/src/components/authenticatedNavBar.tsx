import logoimg from "../assets/icons/logo1.png";

function AutNavBar(){
    return(
      <nav className="bg-white sticky top-0 z-10 w-full h-[12vh] flex px-4 md:px-[4%] items-center justify-between border-b border-gray-100">

        <div className="flex items-center gap-2 md:gap-4">
            <img className="w-8 md:w-10" src={logoimg} alt="" />
            <h1 className="text-xl md:text-[30px] font-medium text-[#151515]">Vamu</h1>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden lg:flex items-center gap-10">
                <a className="no-underline text-vamu-dark hover:border-b-[3px] hover:border-vamu-green hover:pb-[1px] text-base" href="">Minhas Caronas</a>
                <a className="no-underline text-vamu-dark hover:border-b-[3px] hover:border-vamu-green hover:pb-[1px] text-base" href="">Oferecer Carona</a>
            </div>
        <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-lg bg-vamu-green-light flex items-center justify-center hover:brightness-90 hover:cursor-pointer">
                <span className="material-symbols-outlined text-vamu-green">notifications</span>
            </button>
            <a href="/userProfile" className="bg-red-500 h-10 w-10 rounded-full border-2 border-vamu-green hover:brightness-90 hover:cursor-pointer block"></a>
        </div>

        </div>
        
              
        
        
      </nav>  
    )
}

export default AutNavBar;