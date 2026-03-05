import logo from "../assets/icons/logo1.png";
import placeholder from "../assets/univesidade-placeholder.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import usericon from "../assets/icons/user.png";
import emailicon from "../assets/icons/email.png";
import passwordicon from "../assets/icons/password.png";
import { Link } from "react-router-dom";
import Axios from "axios";
import * as yup from "yup";
function Register() {
  interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
  }
  const validateRegister = yup.object().shape({
    name: yup.string().required("* O nome é obrigatório"),
    email: yup
      .string()
      .email("* Email inválido")
      .required("* O email é obrigatório"),
    password: yup
      .string()
      .min(6, "* A senha deve conter no mínimo 6 caracteres")
      .required("* A senha é obrigatória"),
  });
  const handleSubmit = (values: RegisterFormValues) => {
    Axios.post("http://localhost:3000/user-register", {
      name: values.name,
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Erro ao registrar usuário:", error);
      });
  };
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
        <Formik
          initialValues={{ email: "", password: "", name: "" }}
          onSubmit={handleSubmit}
          validationSchema={validateRegister}
        >
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
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
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
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-field">
              <label>Crie Sua senha</label>
              <div className="form-field-input">
                <div className="form-field-icon">
                  <img src={passwordicon}></img>
                </div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Digite seu senha"
                />
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
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
