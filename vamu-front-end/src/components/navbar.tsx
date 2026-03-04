import logoimg from "../assets/icons/logo1.png";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logoimg} alt="Logo da Vamu" />
        <h1>Vamu</h1>
      </div>
      <div className="navbar-list">
        <ul>
          <li>
            <a href="/">Como Funciona</a>
          </li>
          <li>
            <a href="/">Segurança</a>
          </li>
          <li>
            <a href="/aboutUs">Sobre nós</a>
          </li>
        </ul>
      </div>
      <div className="navbar-options">
        {/* Quem for mexer no front-end , estuda como transformar componentes, é melhor transformar esses botões em funções componentes que ai só
        repassa os parâmetros */}
        <Link to="/login" className="login-btn">
          Entrar
        </Link>
        <Link to="/register" className="register-btn">
          Criar Conta
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
