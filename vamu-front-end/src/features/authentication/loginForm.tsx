import { Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import emailicon from "../../assets/icons/email.png";
import passwordicon from "../../assets/icons/password.png";
export default function LoginForm() {
  return (
    <div className="flex flex-col gap-5">

    
      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-semibold">Seu email</label>

        <div className="flex h-[45px] rounded-[10px] border-2 bg-[rgb(248,248,248)] overflow-hidden">
          <div className="w-12 md:w-[10%] flex items-center justify-center">
            <img className="w-[15px]" src={emailicon} />
          </div>

          <Field
            name="email"
            type="text"
            placeholder="Digite seu email"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        <ErrorMessage
          name="email"
          component="span"
          className="text-red-500 text-xs"
        />
      </div>


      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-semibold">Senha</label>

        <div className="flex h-[45px] rounded-[10px] border-2 bg-[rgb(248,248,248)] overflow-hidden">
          <div className="w-12 md:w-[10%] flex items-center justify-center">
            <img className="w-[15px]" src={passwordicon} />
          </div>

          <Field
            name="password"
            type="password"
            placeholder="Digite sua senha"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        <ErrorMessage
          name="password"
          component="span"
          className="text-red-500 text-xs"
        />
      </div>

     
      <button
        type="submit"
        className="w-full h-[50px] rounded-xl bg-gradient-to-r from-[#09CC71] to-vamu-green-dark font-semibold"
      >
        Entrar →
      </button>

      <p className="text-sm text-center">
        Não possui conta?{" "}
        <Link className="text-[#09CC71]" to="/register">
          Criar conta
        </Link>
      </p>
    </div>
  );
}