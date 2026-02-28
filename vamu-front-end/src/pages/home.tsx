import Navbar from "../components/navbar";
import Header from "./header";
import pig from "../assets/icons/pigsafe.png";
import leaf from "../assets/icons/leaf.png";
import safe from "../assets/icons/safe.png";
import Footer from "../components/footer";
function Home() {
  return (
    <section className="home">
      <Navbar></Navbar>
      <Header></Header>
      <div className="features">
        <header>
          <h2>Por que escolher a Vamu?</h2>
          <p>
            Transformamos a mobilidade acadêmica através da colaboração e
            tecnologia.
          </p>
        </header>
        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-icon">
              <img src={pig} />
            </div>
            <h3>Economia real</h3>
            <p>
              Divida os custos de combustível e estacionamento. Reduza seus
              gastos mensais com transporte significativamente.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <img src={safe} />
            </div>
            <h3>Segurança verificada</h3>
            <p>
              Nossa plataforma é exclusiva para universitários. Todos os
              usuários passam por validação de vínculo institucional.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <img src={leaf} />
            </div>
            <h3>Sustentabilidade</h3>
            <p>
              Menos carros nas ruas significam menos emissões de CO2 e um campus
              mais organizado para todos.
            </p>
          </article>
        </div>
      </div>
      <div className="cta-content">
        <h2>Pronto para começar sua jornada?</h2>
        <p>
          Junte-se à maior comunidade de caronas universitárias e mude sua
          rotina de transporte.
        </p>
        <button className="cta-button">Cadastre-se agora</button>
      </div>
      <Footer></Footer>
    </section>
  );
}

export default Home;
