import Navbar from "../components/navbar";
import Header from "./header";
import pig from "../assets/icons/pigsafe.png";
import leaf from "../assets/icons/leaf.png";
import safe from "../assets/icons/safe.png";
import Footer from "../components/footer";

function Home() {
  return (
    <section className="w-full min-h-screen">
      <Navbar />
      <Header />

      {/* Features Section */}
      <div className="w-full min-h-[40vh] py-10 lg:py-20">
        <header className="flex flex-col gap-2.5 px-6 lg:pl-[4%]">
          <h2 className="text-2xl md:text-[35px] font-bold">Por que escolher a Vamu?</h2>
          <p className="text-base lg:text-lg text-[rgb(63,63,63)]">
            Transformamos a mobilidade acadêmica através da colaboração e
            tecnologia.
          </p>
        </header>

        {/* Grid: 1 coluna mobile → 2 colunas tablet → 3 colunas desktop */}
        <div className="mt-6 lg:mt-[30px] grid px-6 lg:px-[4%] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          <article className="bg-vamu-card-bg rounded-2xl p-6 lg:p-7 flex flex-col gap-3.5 border border-vamu-border transition-all duration-200 hover:-translate-y-1">
            <div className="w-[42px] h-[42px] bg-vamu-green-light flex items-center justify-center rounded-[10px]">
              <img className="w-[70%]" src={pig} />
            </div>
            <h3 className="text-lg font-semibold text-vamu-dark">Economia real</h3>
            <p className="text-sm leading-relaxed text-vamu-gray-dark">
              Divida os custos de combustível e estacionamento. Reduza seus
              gastos mensais com transporte significativamente.
            </p>
          </article>

          <article className="bg-vamu-card-bg rounded-2xl p-6 lg:p-7 flex flex-col gap-3.5 border border-vamu-border transition-all duration-200 hover:-translate-y-1">
            <div className="w-[42px] h-[42px] bg-vamu-green-light flex items-center justify-center rounded-[10px]">
              <img className="w-[70%]" src={safe} />
            </div>
            <h3 className="text-lg font-semibold text-vamu-dark">Segurança verificada</h3>
            <p className="text-sm leading-relaxed text-vamu-gray-dark">
              Nossa plataforma é exclusiva para universitários. Todos os
              usuários passam por validação de vínculo institucional.
            </p>
          </article>

          <article className="bg-vamu-card-bg rounded-2xl p-6 lg:p-7 flex flex-col gap-3.5 border border-vamu-border transition-all duration-200 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
            <div className="w-[42px] h-[42px] bg-vamu-green-light flex items-center justify-center rounded-[10px]">
              <img className="w-[70%]" src={leaf} />
            </div>
            <h3 className="text-lg font-semibold text-vamu-dark">Sustentabilidade</h3>
            <p className="text-sm leading-relaxed text-vamu-gray-dark">
              Menos carros nas ruas significam menos emissões de CO2 e um campus
              mais organizado para todos.
            </p>
          </article>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full mx-auto bg-gradient-to-r from-vamu-dark-deep to-vamu-dark-green rounded-none py-12 lg:py-[70px] px-6 lg:px-10 text-center flex flex-col items-center gap-4 lg:gap-[18px]">
        <h2 className="text-2xl md:text-4xl lg:text-[42px] font-medium text-white">
          Pronto para começar sua jornada?
        </h2>
        <p className="max-w-[520px] text-[#cfe9dc] text-sm lg:text-base leading-relaxed">
          Junte-se à maior comunidade de caronas universitárias e mude sua
          rotina de transporte.
        </p>
        <button className="mt-2.5 py-3 px-6 lg:py-3.5 lg:px-8 text-sm lg:text-base border-none rounded-xl bg-vamu-green-cta text-[#052e1a] font-semibold cursor-pointer shadow-[0_10px_25px_rgba(34,197,94,0.35)] transition-all duration-200 hover:-translate-y-0.5">
          Cadastre-se agora
        </button>
      </div>

      <Footer />
    </section>
  );
}

export default Home;
