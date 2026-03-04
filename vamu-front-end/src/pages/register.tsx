import logo from "../assets/icons/logo1.png";
import placeholder from "../assets/univesidade-placeholder.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import usericon from "../assets/icons/user.png";
import emailicon from "../assets/icons/email.png";
import passwordicon from "../assets/icons/password.png";
import { Link } from 'react-router-dom';
function Register() {
  return (
    <section className="register-section">
      <div className="register-left">
        <img className="register-bg" src={placeholder} alt="" />

        <div className="register-overlay">
  
          <div className="register-left-footer">
            <div className="register-left-footer-content">
              <span>15k +</span>
              <p>Alunos ativos</p>
            </div>
             <div className="register-left-footer-content">
              <span>40+</span>
              <p>Universidades</p>
            </div>
          </div>
        </div>

        <div className="register-content">
          <div className="register-page-logo">
            <img src={logo} alt="Logo" />
            <Link to="/">Vamu</Link>
          </div>

          <div className="register-page-title">
            <h1>Onde sua vida acadêmica acontece.</h1>
            <p>
              Conecte-se com seus colegas, acesse benefícios exclusivos e
              simplifique sua rotina na universidade.
            </p>
          </div>
        </div>
      </div>
      <div className="register-right">
        <div className="register-title">
          <h2>Crie sua conta</h2>
          <p>Junte-se a maior comunidade acadêmica no país</p>
        </div>
        <Formik initialValues={{ email: "", password: "" }} onSubmit={() => {}}>
          <Form className="user-register-form">
            <div className="form-field">
              <label>Nome Completo</label>
              <div className="form-field-input">
                <div className="form-field-icon">
                  <img src={usericon}></img>
                </div>
                <Field
                  name="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                />
              </div>
            </div>
            <div className="form-field">
              <label>Seu email</label>
              <div className="form-field-input">
                <div className="form-field-icon">
                  <img src={emailicon}></img>
                </div>
                <Field
                  name="email"
                  type="text"
                  placeholder="Digite seu email"
                />
              </div>
            </div>
            <div className="form-field">
              <label>Crie Sua senha</label>
              <div className="form-field-input">
                <div className="form-field-icon">
                  <img src={passwordicon}></img>
                </div>
                <Field
                  name="password"
                  type="text"
                  placeholder="Digite seu senha"
                />
              </div>
            </div>
            <div className="register-actions">
              <button type="submit" className="register-submit">
                Cadastrar Agora <span>→</span>
              </button>

              <p className="login-link">
                Já possui uma conta? <a href="/login">Entrar no Vamu</a>
              </p>

              <div className="register-divider"></div>

              <div className="register-security">
                <img src={emailicon} alt="segurança" />
                <span>PLATAFORMA 100% SEGURA E PRIVADA</span>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
}

export default Register;
