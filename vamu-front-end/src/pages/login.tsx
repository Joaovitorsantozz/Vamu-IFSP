import logo from "../assets/icons/logo1.png";
import placeholder from "../assets/univesidade-placeholder.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import emailicon from "../assets/icons/email.png";
import passwordicon from "../assets/icons/password.png";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Axios from "axios";

function Login() {
  const navigate=useNavigate();
  interface LoginFormValues {
    email: string;
    password: string;
  }

  const validateLogin = yup.object().shape({
    email: yup
      .string()
      .email("* Email inválido")
      .required("* O email é obrigatório"),
    password: yup.string().required("* A senha é obrigatória"),
  });

  const handleSubmit = (values: LoginFormValues) => {
    Axios.post("http://localhost:3000/login", {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        const token = response.data.token;
        if (token) {
          alert(response.data.message);
          localStorage.setItem("token", token);
          navigate("/"); // Tem que ver a rota que vai ir
        }
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
        console.log("Resposta do servidor:", error.response?.data);
      });
  };

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block w-[50vw] h-screen bg-[rgb(179,179,179)] pl-[2%] relative overflow-hidden">
        <img
          className="absolute bottom-0 left-0 w-full h-full object-contain object-bottom z-0"
          src={placeholder}
          alt=""
        />

        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(187,203,195,0.8)_0%,rgba(182,190,186,0.22)_25%,rgba(243,243,243,0.75)_55%,rgba(227,243,232,0.95)_80%,rgb(227,243,232)_100%)]">
          <div className="absolute bottom-0 flex p-5 gap-10">
            <div>
              <span className="text-black font-bold text-[25px]">15k +</span>
              <p className="text-[rgb(42,42,42)]">Alunos ativos</p>
            </div>
            <div>
              <span className="text-black font-bold text-[25px]">40+</span>
              <p className="text-[rgb(42,42,42)]">Universidades</p>
            </div>
          </div>
        </div>

        <div className="relative z-20">
          <div className="w-full flex pt-10 items-center gap-[1%]">
            <img className="w-[6%]" src={logo} alt="Logo" />
            <Link
              className="font-semibold text-[26px] no-underline text-black"
              to="/"
            >
              Vamu
            </Link>
          </div>

          <div className="flex flex-col mt-[5%]">
            <h1 className="text-[50px] max-w-[70%] font-semibold">
              Bem-vindo de volta.
            </h1>
            <p className="mt-[3%] max-w-[75%] text-base">
              Entre na sua conta e continue conectado com a comunidade
              acadêmica.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-screen md:h-full md:bg-vamu-gray-light">
        <img
          className="md:hidden fixed inset-0 w-full h-full object-cover z-0"
          src={placeholder}
          alt=""
        />

        <div className="md:hidden relative z-10 pt-[25vh] mx-3 rounded-t-3xl">
          <div className="bg-vamu-gray-light rounded-t-3xl px-6 pt-6 pb-8 min-h-screen">
            <div className="flex items-center gap-2 mb-6">
              <img className="w-8" src={logo} alt="Logo" />
              <Link
                className="font-semibold text-xl no-underline text-black"
                to="/"
              >
                Vamu
              </Link>
            </div>

            <h2 className="text-2xl font-semibold text-[#0f0f0f]">Entrar</h2>
            <p className="mt-2 text-sm text-[rgb(87,87,87)] mb-6">
              Acesse sua conta
            </p>

            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={handleSubmit}
              validationSchema={validateLogin}
            >
              <Form className="flex flex-col gap-5">
                <div className="w-full flex flex-col gap-2.5">
                  <label className="text-sm font-semibold">Seu email</label>

                  <div className="w-full h-[45px] flex rounded-[10px] border-2 border-[rgb(221,221,221)] bg-[rgb(248,248,248)] overflow-hidden">
                    <div className="w-12 flex items-center justify-center">
                      <img className="w-[15px]" src={emailicon} />
                    </div>

                    <Field
                      name="email"
                      type="text"
                      placeholder="Digite seu email"
                      className="flex-1 bg-[rgb(248,248,248)] outline-none text-sm"
                    />
                  </div>

                  <ErrorMessage
                    component="span"
                    name="email"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="w-full flex flex-col gap-2.5">
                  <label className="text-sm font-semibold">Senha</label>

                  <div className="w-full h-[45px] flex rounded-[10px] border-2 border-[rgb(221,221,221)] bg-[rgb(248,248,248)] overflow-hidden">
                    <div className="w-12 flex items-center justify-center">
                      <img className="w-[15px]" src={passwordicon} />
                    </div>

                    <Field
                      name="password"
                      type="password"
                      placeholder="Digite sua senha"
                      className="flex-1 bg-[rgb(248,248,248)] outline-none text-sm"
                    />
                  </div>

                  <ErrorMessage
                    component="span"
                    name="password"
                    className="text-red-500 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-[50px] border-none rounded-xl bg-gradient-to-r from-[#09CC71] to-vamu-green-dark text-black font-semibold text-base cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                >
                  Entrar <span>→</span>
                </button>

                <p className="text-sm text-center">
                  Não possui conta?{" "}
                  <Link className="text-[#09CC71]" to="/register">
                    Criar conta
                  </Link>
                </p>
              </Form>
            </Formik>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="w-full px-[15%] pt-[6%] pb-[6%]">
            <h2 className="text-[35px] font-semibold">Entrar</h2>
            <p className="mt-2.5 text-base text-[rgb(87,87,87)]">
              Acesse sua conta
            </p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validateLogin}
          >
            <Form className="w-full px-[15%] flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-semibold">Seu email</label>

                <div className="w-full h-[45px] flex rounded-[10px] border-2 border-[rgb(221,221,221)] bg-[rgb(248,248,248)] overflow-hidden">
                  <div className="w-[10%] flex items-center justify-center">
                    <img className="w-[15px]" src={emailicon} />
                  </div>

                  <Field
                    name="email"
                    type="text"
                    placeholder="Digite seu email"
                    className="flex-1 bg-[rgb(248,248,248)] outline-none text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-semibold">Senha</label>

                <div className="w-full h-[45px] flex rounded-[10px] border-2 border-[rgb(221,221,221)] bg-[rgb(248,248,248)] overflow-hidden">
                  <div className="w-[10%] flex items-center justify-center">
                    <img className="w-[15px]" src={passwordicon} />
                  </div>

                  <Field
                    name="password"
                    type="password"
                    placeholder="Digite sua senha"
                    className="flex-1 bg-[rgb(248,248,248)] outline-none text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-[50px] border-none rounded-xl bg-gradient-to-r from-[#09CC71] to-vamu-green-dark text-black font-semibold text-base cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
              >
                Entrar <span>→</span>
              </button>

              <p className="text-sm text-center">
                Não possui conta?{" "}
                <Link className="text-[#09CC71]" to="/register">
                  Criar conta
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
}

export default Login;
