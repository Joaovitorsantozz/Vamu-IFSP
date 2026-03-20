import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo1.png";
import placeholder from "../assets/univesidade-placeholder.png";
import { Formik, Form } from "formik";
import { registerUser } from "../service/authservice";
import { validateRegister } from "../validations/registerSchema";
import RegisterForm from "../features/authentication/registerForm";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      const response = await registerUser(values);
      alert(response.data.message);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={validateRegister}
    >
      <Form>
        <section className="w-full min-h-screen flex flex-col md:flex-row">
          {/* ===== LADO ESQUERDO (DESKTOP) ===== */}
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
                  className="font-semibold text-[26px] no-underline text-black"
                  to="/"
                >
                  Vamu
                </Link>
              </div>

              <div className="flex flex-col mt-[5%]">
                <h1 className="text-[50px] max-w-[70%] font-semibold">
                  Onde sua vida acadêmica acontece.
                </h1>
                <p className="mt-[3%] max-w-[75%] text-base">
                  Conecte-se com seus colegas, acesse benefícios exclusivos e
                  simplifique sua rotina na universidade.
                </p>
              </div>
            </div>
          </div>

          {/* ===== LADO DIREITO ===== */}
          <div className="flex-1 min-h-screen md:bg-vamu-gray-light">
            {/* ===== MOBILE ===== */}
            <img
              className="md:hidden fixed inset-0 w-full h-full object-cover z-0"
              src={placeholder}
              alt=""
            />

            <div className="md:hidden relative z-10 pt-[25vh] mx-3 rounded-t-3xl">
              <div className="bg-vamu-gray-light rounded-t-3xl px-6 pt-6 pb-8 min-h-screen">
                {/* Header mobile */}
                <div className="flex items-center gap-2 mb-6">
                  <img className="w-8" src={logo} alt="Logo" />
                  <Link
                    className="font-semibold text-xl no-underline text-black"
                    to="/"
                  >
                    Vamu
                  </Link>
                </div>

                <h2 className="text-2xl font-semibold text-[#0f0f0f]">
                  Crie sua conta
                </h2>
                <p className="mt-2 text-sm text-[rgb(87,87,87)] mb-6">
                  Junte-se a maior comunidade acadêmica no país
                </p>

               
                <RegisterForm />
              </div>
            </div>

            {/* ===== DESKTOP ===== */}
            <div className="hidden md:block">
              <div className="w-full px-[15%] pt-[6%] pb-[2%]">
                <h2 className="text-[35px] font-semibold text-[#0f0f0f]">
                  Crie sua conta
                </h2>
                <p className="mt-2.5 text-base text-[rgb(87,87,87)]">
                  Junte-se a maior comunidade acadêmica no país
                </p>
              </div>

             
              <div className="w-full px-[15%]">
                <RegisterForm />
              </div>
            </div>
          </div>
        </section>
      </Form>
    </Formik>
  );
}

export default Register;
