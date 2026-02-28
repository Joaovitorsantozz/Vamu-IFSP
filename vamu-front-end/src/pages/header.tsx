import placeholder from "../assets/header-placeholder.png";
import sparkle from "../assets/icons/sparkle.png";
import usericon from "../assets/icons/usericon.png";
function Header() {
  return (
    <main className="header-main">
      <header>
        <div className="header-left">
          <span>
            <img src={sparkle}></img>Mobilidade Sustentável
          </span>
          <h1>
            Compartilhe caronas com seus colegas da sua{" "}
            <span>universidade</span>
          </h1>
          <p>
            Uma forma segura e econômica de se deslocar para o campus. Economize
            dinheiro, ajude o meio ambiente e faça novas amizades viajando com
            quem estuda com você.
          </p>
          <div className="cta-buttons">
            {/* Igual tem na navbar o ideal seria criar um componente botão e chamar ele aqui também ao invés de usar o 'a'*/}
            <a className="start-btn">Começar agora</a>
            <a className="about-btn">Saiba mais</a>
          </div>
          <div className="users">
            <div className="avatar-group">
              <img src={usericon} alt="Aluno 1" />
              <img src={usericon} alt="Aluno 2" />
              <img src={usericon} alt="Aluno 3" />
            </div>
            <span>+2.000 alunos já estão usando o Vamu</span>
          </div>
        </div>
        <div className="header-right">
          <img src={placeholder}></img>
        </div>
      </header>
    </main>
  );
}

export default Header;
