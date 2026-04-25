import Navbar from "../components/navbar";
import Footer from "../components/footer";
import aboutUsPlaceHolder from "../assets/aboutUs-placeholder.png";
import community from "../assets/icons/logo.png";
import pig from "../assets/icons/pigsafe.png";
import leaf from "../assets/icons/leaf.png";

function AboutUs() {
    return (
        <section>
            <Navbar />

            <main>
                {/* Header — centralizado, responsivo */}
                <header className="min-h-[40vh] lg:h-[60dvh] flex p-4">
                    <div className="flex flex-col text-center justify-center items-center w-full">
                        <p className="text-vamu-green font-extrabold tracking-wider uppercase leading-relaxed mb-1 text-sm lg:text-base">
                            conheça nossa missão
                        </p>
                        <h1 className="text-3xl md:text-5xl lg:text-[4rem] font-extrabold">Sobre o Vamu</h1>
                        <p className="my-4 lg:my-6 w-[90%] md:w-[70%] lg:w-[54%] text-base lg:text-[1.1rem] font-extralight leading-relaxed">
                            Nascemos do coração das universidades para transformar a forma como
                            estudantes se deslocam, conectando pessoas e promovendo um futuro
                            mais sustentável
                        </p>
                    </div>
                </header>

                {/* Nossa História — Mobile: empilha | Desktop: lado a lado */}
                <section className="bg-[rgb(242,242,242)] flex flex-col lg:flex-row gap-8 lg:gap-12 p-6 lg:p-8">
                    {/* Imagem */}
                    <div className="mx-auto lg:ml-10 relative mb-8 lg:mb-4">
                        <img
                            className="block mt-4 lg:mt-[1.8rem] rounded-[1rem] w-full lg:w-[35dvw] h-[50vh] lg:h-[85dvh] shadow-[4px_4px_10px_rgba(0,0,0,1)] object-cover"
                            src={aboutUsPlaceHolder}
                        />
                        <div className="bg-vamu-green-cta w-[50%] lg:w-[40%] rounded-lg p-4 lg:p-6 absolute -bottom-[20px] -right-[10px] lg:-bottom-[25px] lg:-right-[25px] shadow-[2px_2px_10px_rgba(0,0,0,1)]">
                            <h3 className="font-extrabold text-xl lg:text-2xl">2024</h3>
                            <p className="text-[0.75rem] lg:text-[0.8rem] mt-1 font-medium">
                                O ano em que decidimos mudar a mobilidade acadêmica
                            </p>
                        </div>
                    </div>

                    {/* Texto */}
                    <div className="mt-4 lg:mt-8 px-2 lg:p-4">
                        <h2 className="text-2xl lg:text-[2.5rem] font-extrabold">Como tudo começou</h2>
                        <p className="mt-4 text-base lg:text-[1.2rem] w-full lg:w-[85%] leading-relaxed font-extralight">
                            A ideia do Vamu surgiu da observação direta nos estacionamentos e
                            pontos de ônibus das universidades. Percebemos o contraste: filas
                            intermináveis para o transporte público enquanto milhares de carros
                            circulavam com apenas um ocupante.
                        </p>
                        <p className="mt-4 text-base lg:text-[1.2rem] w-full lg:w-[85%] leading-relaxed font-extralight">
                            Mais do que apenas um aplicativo de caronas, queríamos criar uma rede
                            de apoio. Um lugar onde o trajeto para a aula deixasse de ser um
                            estresse financeiro e logístico para se tornar uma oportunidade de
                            networking e novas amizades.
                        </p>
                        <p className="mt-4 text-base lg:text-[1.2rem] w-full lg:w-[85%] leading-relaxed font-extralight">
                            Hoje, o Vamu é a ponte que une estudantes com um objetivo comum:
                            chegar ao destino de forma inteligente, segura e consciente.
                        </p>
                    </div>
                </section>

                {/* Impacto */}
                <section className="text-center bg-vamu-green-light p-8 lg:p-16">
                    <h2 className="text-2xl lg:text-[2.5rem] font-extrabold">Impacto Real</h2>
                    <div className="list-none flex justify-center flex-wrap mt-8 lg:mt-12 gap-4 lg:gap-8">
                        <article className="bg-[#c7f6de] rounded-2xl p-6 lg:p-8 flex-[1_1_100%] md:flex-[1_1_13.5rem]">
                            <img className="inline-block w-[15%] md:w-[10%] h-7" src={pig} alt="" />
                            <h4 className="text-[1.1rem] lg:text-[1.2rem] font-bold p-3 lg:p-4">Economia no Bolso</h4>
                            <p className="text-sm leading-relaxed text-vamu-gray-dark">
                                Redução de até 60% nos custos mensais de transporte para
                                estudantes que compartilham rotas diariamente.
                            </p>
                        </article>
                        <article className="bg-[#c7f6de] rounded-2xl p-6 lg:p-8 flex-[1_1_100%] md:flex-[1_1_13.5rem]">
                            <img className="inline-block w-[15%] md:w-[10%] h-7" src={leaf} />
                            <h4 className="text-[1.1rem] lg:text-[1.2rem] font-bold p-3 lg:p-4">Planeta mais Limpo</h4>
                            <p className="text-sm leading-relaxed text-vamu-gray-dark">
                                Toneladas de CO2 deixam de ser emitidas todos os meses graças à
                                inteligência coletiva da nossa comunidade.
                            </p>
                        </article>
                        <article className="bg-[#c7f6de] rounded-2xl p-6 lg:p-8 flex-[1_1_100%] md:flex-[1_1_13.5rem]">
                            <img className="inline-block w-[15%] md:w-[10%] h-7" src={community} alt="" />
                            <h4 className="text-[1.1rem] lg:text-[1.2rem] font-bold p-3 lg:p-4">Comunidade</h4>
                            <p className="text-sm leading-relaxed text-vamu-gray-dark">
                                Fortalecemos os laços acadêmicos. Nossa rede é exclusiva para
                                estudantes, criando um ambiente de confiança e ajuda mútua dentro
                                e fora do campus.
                            </p>
                        </article>
                    </div>
                </section>

                {/* Convite */}
                <section className=" mt-0 p-8 lg:p-16">
                    <div className="flex mx-auto mt-0 justify-center items-center w-full lg:w-[80%]">
                        <div className="bg-[#030d2c] rounded-2xl lg:rounded-[3rem] text-center p-6 lg:p-8 w-full">
                            <h2 className="mx-auto my-4 text-center w-full lg:w-[80%] text-2xl md:text-[2rem] lg:text-[3rem] font-extrabold text-white">
                                Pronto para fazer parte dessa história?
                            </h2>
                            <p className="mx-auto text-white w-[90%] lg:w-[70%] text-sm lg:text-base">
                                comece hoje a transformar sua rotina acadêmica e ajude a construir
                                um futuro melhor
                            </p>
                            <a
                                className="font-bold inline-block no-underline text-black py-3 px-6 lg:py-4 lg:px-8 my-6 lg:my-8 rounded-2xl bg-vamu-green-cta hover:bg-[#00ff5e]"
                                href="#"
                            >
                                Criar minha conta agora
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </section>
    );
}

export default AboutUs;