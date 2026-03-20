import { Field } from "formik";

import usericon from "../../assets/icons/user.png";
import emailicon from "../../assets/icons/email.png";
import passwordicon from "../../assets/icons/password.png";
import { Link} from "react-router-dom";

function UserRegisterForm() {
 

  return (
   <>
        {/* NOME */}
        <div className="w-full flex flex-col gap-2.5">
          <label className="text-sm font-semibold text-[rgb(41,41,41)]">
            Nome Completo
          </label>

          <div className="w-full h-[45px] flex rounded-[10px] border-2 border-[rgb(221,221,221)] bg-[rgb(248,248,248)] overflow-hidden">
            {/* Ícone responsivo */}
            <div className="w-12 md:w-[10%] h-full flex items-center justify-center shrink-0">
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

        {/* EMAIL */}
        <div className="w-full flex flex-col gap-2.5">
          <label className="text-sm font-semibold text-[rgb(41,41,41)]">
            Seu email
          </label>

          <div className="w-full h-[45px] flex rounded-[10px] border-2 border-[rgb(221,221,221)] bg-[rgb(248,248,248)] overflow-hidden">
            <div className="w-12 md:w-[10%] h-full flex items-center justify-center shrink-0">
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

        {/* SENHA */}
        <div className="w-full flex flex-col gap-2.5">
          <label className="text-sm font-semibold text-[rgb(41,41,41)]">
            Crie sua senha
          </label>

          <div className="w-full h-[45px] flex rounded-[10px] border-2 border-[rgb(221,221,221)] bg-[rgb(248,248,248)] overflow-hidden">
            <div className="w-12 md:w-[10%] h-full flex items-center justify-center shrink-0">
              <img className="w-[15px] h-[15px]" src={passwordicon} />
            </div>

            <Field
              className="flex-1 h-full bg-[rgb(248,248,248)] border-none outline-none text-sm"
              name="password"
              type="password"
              placeholder="Digite sua senha"
            />
          </div>
        </div>

        {/* BOTÃO */}
        <div className="w-full mt-5 text-center">
          <button
            type="submit"
            className="w-full h-[50px] border-none rounded-xl bg-gradient-to-r from-[#09CC71] to-vamu-green-dark text-black font-semibold text-base cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
          >
            Cadastrar Agora →
          </button>

          <p className="mt-3 text-sm text-[#7a8ca3]">
            Já possui uma conta?{" "}
            <Link
              className="text-[#09CC71] font-medium no-underline"
              to="/login"
            >
              Entrar no Vamu
            </Link>
          </p>

          <div className="w-full h-px bg-[#e5e5e5] my-6"></div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#8a9bb0] tracking-widest">
            <img className="w-4 h-4" src={emailicon} />
            <span>PLATAFORMA 100% SEGURA E PRIVADA</span>
          </div>
        </div>
     </>
  );
}

export default UserRegisterForm;