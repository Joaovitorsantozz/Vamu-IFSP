import logo from "../assets/icons/logo1.png";
import placeholder from "../assets/univesidade-placeholder.png";
import { Formik, Form, Field } from "formik";
import usericon from "../assets/icons/user.png";
import emailicon from "../assets/icons/email.png";
import passwordicon from "../assets/icons/password.png";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row">
      {/* Lado esquerdo — escondido no mobile, visível no desktop */}
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
            <Link className="font-semibold text-[26px] no-underline text-black" to="/">
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

      {/* Lado direito — ocupa tudo no mobile */}
      <div className="flex-1 min-h-screen md:h-full md:bg-vamu-gray-light">

        {/* ===== MOBILE: Layout em camadas ===== */}
        {/* Imagem fixa no fundo — ocupa 100% da tela */}
        <img
          className="md:hidden fixed inset-0 w-full h-full object-cover z-0"
          src={placeholder}
          alt=""
        />

        {/* Form card — sobe sobre a imagem com pt-[45vh] */}
        <div className="md:hidden relative z-10 pt-[25vh] mx-3 rounded-t-3xl">
          <div className="bg-vamu-gray-light rounded-t-3xl px-6 pt-6 pb-8 min-h-screen">
            <div className="flex items-center gap-2 mb-6">
              <img className="w-8" src={logo} alt="Logo" />
              <Link className="font-semibold text-xl no-underline text-black" to="/">
                Vamu
              </Link>
            </div>

            <h2 className="text-2xl font-semibold text-[#0f0f0f]">Crie sua conta</h2>
            <p className="mt-2 text-sm text-[rgb(87,87,87)] mb-6">
              Junte-se a maior comunidade acadêmica no país
            </p>

            <Formik initialValues={{ email: "", password: "" }} onSubmit={() => { }}>
              <Form className="flex flex-col gap-5">
                <div className="w-full flex flex-col gap-2.5">
                  <label className="text-sm font-semibold text-[rgb(41,41,41)]">
                    Nome Completo
                  </label>
                  <div className="w-full h-[45px] flex rounded-[10px] border-2 border-[rgb(221,221,221)] bg-[rgb(248,248,248)] overflow-hidden">
                    <div className="w-12 h-full flex items-center justify-center shrink-0">
                      <img className="w-[15px] h-[15px]" src={usericon} />
                    </div>
                    <Field
                      className="flex-1 h-full bg-[rgb(248,248,248)] border-none outline-none text-sm"
                      name="name"
                      type="text"
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col gap-2.5">
                  <label className="text-sm font-semibold text-[rgb(41,41,41)]">
                    Seu email
                  </label>
                  <div className="w-full h-[45px] flex rounded-[10px] border-2 border-[rgb(221,221,221)] bg-[rgb(248,248,248)] overflow-hidden">
                    <div className="w-12 h-full flex items-center justify-center shrink-0">
                      <img className="w-[15px] h-[15px]" src={emailicon} />
                    </div>
                    <Field
                      className="flex-1 h-full bg-[rgb(248,248,248)] border-none outline-none text-sm"
                      name="email"
                      type="text"
                      placeholder="Digite seu email"
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col gap-2.5">
                  <label className="text-sm font-semibold text-[rgb(41,41,41)]">
                    Crie Sua senha
                  </label>
                  <div className="w-full h-[45px] flex rounded-[10px] border-2 border-[rgb(221,221,221)] bg-[rgb(248,248,248)] overflow-hidden">
                    <div className="w-12 h-full flex items-center justify-center shrink-0">
                      <img className="w-[15px] h-[15px]" src={passwordicon} />
                    </div>
                    <Field
                      className="flex-1 h-full bg-[rgb(248,248,248)] border-none outline-none text-sm"
                      name="password"
                      type="text"
                      placeholder="Digite seu senha"
                    />
                  </div>
                </div>

                <div className="w-full mt-5 text-center">
                  <button
                    type="submit"
                    className="w-full h-[50px] border-none rounded-xl bg-gradient-to-r from-[#09CC71] to-vamu-green-dark text-black font-semibold text-base cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Cadastrar Agora <span>→</span>
                  </button>

                  <p className="mt-3 text-sm text-[#7a8ca3]">
                    Já possui uma conta?{" "}
                    <a className="text-[#09CC71] font-medium no-underline" href="/login">
                      Entrar no Vamu
                    </a>
                  </p>

                  <div className="w-full h-px bg-[#e5e5e5] my-6"></div>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#8a9bb0] tracking-widest">
                    <img className="w-4 h-4" src={emailicon} alt="segurança" />
                    <span>PLATAFORMA 100% SEGURA E PRIVADA</span>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>

        {/* ===== DESKTOP: Layout original ===== */}
        <div className="hidden md:block">
          <div className="w-full px-[15%] pt-[6%] pb-[6%]">
            <h2 className="text-[35px] font-semibold text-[#0f0f0f]">Crie sua conta</h2>
            <p className="mt-2.5 text-base text-[rgb(87,87,87)]">
              Junte-se a maior comunidade acadêmica no país
            </p>
          </div>

          <Formik initialValues={{ email: "", password: "" }} onSubmit={() => { }}>
            <Form className="w-full px-[15%] flex flex-col gap-5">
              <div className="w-full flex flex-col gap-2.5">
                <label className="text-sm font-semibold text-[rgb(41,41,41)]">
                  Nome Completo
                </label>
                <div className="w-full h-[45px] flex rounded-[10px] border-2 border-[rgb(221,221,221)] bg-[rgb(248,248,248)] overflow-hidden">
                  <div className="w-[10%] h-full flex items-center justify-center shrink-0">
                    <img className="w-[15px] h-[15px]" src={usericon} />
                  </div>
                  <Field
                    className="flex-1 h-full bg-[rgb(248,248,248)] border-none outline-none text-sm"
                    name="name"
                    type="text"
                    placeholder="Digite seu nome completo"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-2.5">
                <label className="text-sm font-semibold text-[rgb(41,41,41)]">
                  Seu email
                </label>
                <div className="w-full h-[45px] flex rounded-[10px] border-2 border-[rgb(221,221,221)] bg-[rgb(248,248,248)] overflow-hidden">
                  <div className="w-[10%] h-full flex items-center justify-center shrink-0">
                    <img className="w-[15px] h-[15px]" src={emailicon} />
                  </div>
                  <Field
                    className="flex-1 h-full bg-[rgb(248,248,248)] border-none outline-none text-sm"
                    name="email"
                    type="text"
                    placeholder="Digite seu email"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-2.5">
                <label className="text-sm font-semibold text-[rgb(41,41,41)]">
                  Crie Sua senha
                </label>
                <div className="w-full h-[45px] flex rounded-[10px] border-2 border-[rgb(221,221,221)] bg-[rgb(248,248,248)] overflow-hidden">
                  <div className="w-[10%] h-full flex items-center justify-center shrink-0">
                    <img className="w-[15px] h-[15px]" src={passwordicon} />
                  </div>
                  <Field
                    className="flex-1 h-full bg-[rgb(248,248,248)] border-none outline-none text-sm"
                    name="password"
                    type="text"
                    placeholder="Digite seu senha"
                  />
                </div>
              </div>

              <div className="w-full mt-5 text-center">
                <button
                  type="submit"
                  className="w-full h-[50px] border-none rounded-xl bg-gradient-to-r from-[#09CC71] to-vamu-green-dark text-black font-semibold text-base cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                >
                  Cadastrar Agora <span>→</span>
                </button>

                <p className="mt-3 text-sm text-[#7a8ca3]">
                  Já possui uma conta?{" "}
                  <a className="text-[#09CC71] font-medium no-underline" href="/login">
                    Entrar no Vamu
                  </a>
                </p>

                <div className="w-full h-px bg-[#e5e5e5] my-[25px]"></div>

                <div className="flex items-center justify-center gap-2 text-xs text-[#8a9bb0] tracking-widest">
                  <img className="w-4 h-4" src={emailicon} alt="segurança" />
                  <span>PLATAFORMA 100% SEGURA E PRIVADA</span>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
}

export default Register;
