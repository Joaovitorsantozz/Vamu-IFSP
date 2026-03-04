import Navbar from "../components/navbar";
import Footer from "../components/footer";
import aboutUsPlaceHolder from "../assets/aboutUs-placeholder.png"
import community from "../assets/icons/logo.png"
import pig from "../assets/icons/pigsafe.png";
import leaf from "../assets/icons/leaf.png";



function AboutUs(){
    return(
        <section className="aboutUs">
            <Navbar></Navbar>
            
            <main className="aboutUsMain">
                <header className="aboutUsHeader">
                    <div className="aboutUsFeatures">
                        <p className="eyebrow">conheça nossa missão</p>
                        <h1>Sobre o Vamu</h1>
                        <p className="aboutUsHeaderParagraph">
                            Nascemos do coração das universidades para transformar a forma como estudantes se deslocam, conectando pessoas e promovendo um futuro mais sustentável
                        </p>
                    </div>
                </header>

                <section className="aboutUsStory">
                    <div className="leftContent">
                        <img src={aboutUsPlaceHolder}/>
                        <div className="overImage">
                            <h3>2024</h3>
                            <p>
                                O ano em que decidimos mudar a mobilidade acadêmica
                            </p>
                        </div>
                    </div>
                    <div className="rightContent">
                        <h2>Como tudo começou</h2>

                        <p>A ideia do Vamu surgiu da observação direta nos estacionamentos e pontos de ônibus das universidades. Percebemos o contraste: filas intermináveis para o transporte público enquanto milhares de carros circulavam com apenas um ocupante.
                        </p>

                        <p>
                            Mais do que apenas um aplicativo de caronas, queríamos criar uma rede de apoio. Um lugar onde o trajeto para a aula deixasse de ser um estresse financeiro e logístico para se tornar uma oportunidade de networking e novas amizades. 
                        </p>


                        <p>
                            Hoje, o Vamu é a ponte que une estudantes com um objetivo comum: chegar ao destino de forma inteligente, segura e consciente.
                        </p>
                    </div>
            </section>

         

            <section className="projectImpact">
                <h2>Impacto Real</h2>
                <div className="impactCardsContainer">
                    <article className="impactCards">
                        <img src={pig} alt="" />
                        <h4>Economia no Bolso</h4>
                        <p>Redução de até 60% nos custos mensais de transporte para estudantes que compartilham rotas diariamente.</p>
                    </article>
                    <article  className="impactCards">
                       
                        <img src={leaf}></img>
                        <h4>Planeta mais Limpo</h4>
                        <p>Toneladas de CO2 deixam de ser emitidas todos os meses graças à inteligência coletiva da nossa comunidade.</p>
                    </article>
                    <article className="impactCards">
                       
                            <img src={community} alt="" />
                        
                        <h4>Comunidade</h4>
                        <p>Fortalecemos os laços acadêmicos. Nossa rede é exclusiva para estudantes, criando um ambiente de confiança e ajuda mútua dentro e fora do campus.</p>
                    </article>
                </div>
            </section>
            <section className="inviteSection">
            <div className="inviteContainer"> 
                <div>
                    <h2>Pronto para fazer parte dessa história?</h2>
                    <p>
                       comece hoje a transformar  sua rotina acadêmica e ajude a construir um futuro melhor
                    </p>
                    <a className="aboutUsBtn"href="#">Criar minha conta agora</a>
                </div>
                
            </div>
            </section>    
            </main>
            <Footer></Footer>
        </section>


    )

}
export default AboutUs