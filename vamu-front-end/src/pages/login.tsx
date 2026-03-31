import logo from "../assets/icons/logo1.png";
import placeholder from "../assets/univesidade-placeholder.png";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { Link, useNavigate } from "react-router-dom";
import { validateLogin } from "../validations/loginSchema";
import { loginUser } from "../service/authservice";
import LoginForm from "../features/authentication/loginForm";

function Login() {
  const navigate = useNavigate();
  interface LoginFormValues {
    email: string;
    password: string;
  }

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const response = await loginUser(values);
      const token = response.data.token;
      localStorage.setItem("token", token);
      alert(response.data.message);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={validateLogin}
    >
      <Form>
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
                  <span className="text-black font-bold text-[25px]">
                    15k +
                  </span>
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
                  className="font-semibold text-[26px] text-black no-underline"
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

          <div className="flex-1 min-h-screen md:bg-vamu-gray-light">
            <img
              className="md:hidden fixed inset-0 w-full h-full object-cover z-0"
              src={placeholder}
              alt=""
            />

            <div className="relative z-10 px-6 md:px-[15%] pt-[25vh] md:pt-[6%]">
              <div className="flex items-center gap-2 mb-6 md:mb-10">
                <img className="w-8 md:w-[6%]" src={logo} alt="Logo" />
                <Link
                  className="font-semibold text-xl md:text-[26px] text-black no-underline"
                  to="/"
                >
                  Vamu
                </Link>
              </div>

              <h2 className="text-2xl md:text-[35px] font-semibold text-[#0f0f0f]">
                Entrar
              </h2>

              <p className="mt-2 mb-6 text-sm md:text-base text-[rgb(87,87,87)]">
                Acesse sua conta
              </p>

              <LoginForm />
            </div>
          </div>
        </section>
      </Form>
    </Formik>
  );
}

export default Login;
