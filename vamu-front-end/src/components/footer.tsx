import logo from "../assets/icons/logo1.png";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo-icon"><img src={logo}></img></div>
          <span>Vamu</span>
        </div>

        <nav className="footer-links">
          <a href="#">Termos de Uso</a>
          <a href="#">Privacidade</a>
          <a href="#">Contato</a>
        </nav>

        <div className="footer-social">
          <button className="social-btn">↗</button>
          <button className="social-btn">🌐</button>
        </div>
      </div>

      <p className="footer-copy">
        © 2026 Vamu Mobilidade Universitária. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
