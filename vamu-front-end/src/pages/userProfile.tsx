import AutNavBar from "../components/authenticatedNavBar";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

function UserProf() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Novo estado de carregamento

  useEffect(() => {
    async function getUser() {
      try {
        const token = localStorage.getItem("token");
        
        // Buscamos dados do usuário e do carro para que ambos os formulários iniciem preenchidos
        const [resUser, resCar] = await Promise.all([
          Axios.get("http://localhost:3000/user-information", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          Axios.get("http://localhost:3000/car-information", { 
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        const userData = resUser.data;
        const carData = resCar.data;

        console.log("Dados do carro recebidos:", carData.result);

        setUser({
          ...(userData.user || userData),
          modelo: carData.result?.modelo || "",
          placa: carData.result?.placa || "",
          cor: carData.result?.cor || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Dados chegaram (ou deu erro), para de carregar
      }
    }
    getUser();
  }, []);

  // Se estiver carregando, mostra um aviso e NÃO renderiza os forms
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando dados do perfil...
      </div>
    );
  }

  {
    /*função de salvar no botão*/
  }
  // Função para atualizar os dados de perfil (Tabela users)
  async function updateUserData(values: any) {
    try {
      const token = localStorage.getItem("token");
      // Note: O back-end espera chaves em português no body (idade, telefone, etc)
      const userData = {
        idade: values.age ? parseInt(values.age) : 0,
        semestre: values.semester === "Null" ? null : parseInt(values.semester),
        curso: values.course,
        telefone: values.phone_number,
        localidade: values.city,
        descricao: values.description,
      };

      const response = await Axios.patch("http://localhost:3000/user-information", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Informações pessoais atualizadas com sucesso!");
        // Atualiza o estado local para que o Formik reflita as mudanças imediatamente
        setUser((prev: any) => ({
          ...prev,
          age: values.age, // Mantemos inglês no estado local para o Formik
          semester: values.semester,
          course: values.course,
          phone_number: values.phone_number,
          city: values.city,
          description: values.description,
        }));
      }
    } catch (err: any) {
      console.error(err);
      alert(`Erro Perfil: ${err.response?.data?.message || "Erro ao atualizar dados"}`);
    }
  }

  // Função para atualizar os dados do veículo (Tabela users_cars)
  async function updateCarData(values: any) {
    try {
      const token = localStorage.getItem("token");
      const carData = {
        carModel: values.modelo,
        placa: values.placa,
        cor: values.cor,
      };

      console.log("Enviando dados do carro para o backend:", carData);

      const response = await Axios.patch("http://localhost:3000/register-car-information", carData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Informações do veículo atualizadas com sucesso!");
        // Sincroniza o estado local do carro
        setUser((prev: any) => ({
          ...prev,
          modelo: values.modelo,
          placa: values.placa,
          cor: values.cor,
        }));
      }
    } catch (err: any) {
      console.error(err);
      alert(`Erro Veículo: ${err.response?.data?.message || "Erro ao atualizar veículo"}`);
    }
  }

  return (
    <section>
      <AutNavBar></AutNavBar>
      <section className="bg-vamu-gray-light2 min-h-screen flex flex-col items-center gap-8 pt-8 px-4">
        <header className="bg-white p-6 md:p-8 w-full max-w-5x1 flex flex-col md:w-7/10 md:flex-row md:gap-8 items-center rounded-md">
          <div className="relative">
            <div className="bg-red-500 w-32 h-32 md:w-50 md:h-50 rounded-full "></div>
            <div className="bg-vamu-green absolute w-10 h-10 bottom-2 right-2 md:bottom-4 md:left-40 rounded-full p-2 hover:brightness-90 hover:cursor-pointer ">
              <span className="material-symbols-outlined text-white hover:cursor-pointer">
                photo_camera
              </span>
              <input
                className="absolute  text-transparent w-10 h-10 rounded-full top-0 left-0 opacity-0 hover:cursor-pointer "
                placeholder=""
                type="file"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="font-bold text-2x1 md:text-[2rem]">{user?.nome}</h1>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <p className="bg-vamu-green-light text-vamu-green-cta rounded-full flex items-center gap-1 px-3 py-1 capitalize text-sm ">
                <span className="material-symbols-outlined text-vamu-green-cta text-center text-sm ">
                  school
                </span>
                {user?.course || "Curso não informado"}
              </p>
              <p className="bg-vamu-gray-light capitalize flex items-center gap-1 px-3 py-1 rounded-full text-sm">
                <span className="material-symbols-outlined  text-sm ">
                  account_balance
                </span>
                Universidade pública
              </p>
            </div>
          </div>
        </header>
        {/*---------------------------------------------------------------primeiro forms-------------------------*/}
        <form
          className="bg-white p-6 w-full max-w-5x1  flex flex-col gap-6 md:gap-8 md:w-7/10 rounded-md"
          action=""
        >
          <legend className="flex items-center gap-1 text-xl md:text-[1.5rem] font-semibold border-b-vamu-green-light border-b-1 pb-4">
            <span className="material-symbols-outlined text-vamu-green-cta">
              person
            </span>{" "}
            Informações Básicas
          </legend>

          <div className="justify-between flex flex-col gap-4 md:flex-row md:gap-6 ">
            <div className="flex flex-col w-full ">
              <label htmlFor="username" className="capitalize font-[380]">
                Nome Completo
              </label>
              <input
                className="bg-vamu-green-light text-vamu-gray-medium mt-1 p-[.6rem] font-thin rounded-md hover:outline-0 focus:outline-0 "
                value={user?.nome}
                type="text"
                readOnly
                id="username"
                required
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="usermail" className="capitalize font-[380]">
                Email acadêmico
              </label>
              <input
                className="bg-vamu-green-light text-vamu-gray-medium mt-1 p-[.6rem] font-thin rounded-md hover:outline-0 focus:outline-0"
                type="email"
                name=""
                value={user?.email}
                id="usermail"
                readOnly
                required
              />
            </div>
          </div>

          <a
            href="3"
            className="text-white inline-block w-fit bg-vamu-green-dark py-4 px-6 md:p-[.6rem] rounded-md ml-auto mr-auto md:ml-auto md:mr-0 font-semibold hover:bg-vamu-green-cta hover:text-red-500 focus:text-red-500 capitalize"
          >
            alterar senha
          </a>
        </form>

        {/*--------------------------------------------segundo Forms----------------------------------*/}
        <Formik
          enableReinitialize
          initialValues={{
            age: user?.age || "",
            course: user?.course || "",
            semester: user?.semester || "Null",
            phone_number: user?.phone_number || "",
            city: user?.city || "",
            description: user?.description || "",
          }}
          onSubmit={updateUserData}
        >
        <Form
          className="bg-white p-6 w-full max-w-5x1  flex flex-col gap-6 md:gap-8 md:w-7/10 rounded-md"
          action=""
        >
          <legend className="flex flex-wrap gap-2 items-center border-b-vamu-green-light border-b-1 pb-4">
            <span className="material-symbols-outlined text-vamu-green-cta">
              info
            </span>
            <h2 className="font-semibold text-xl md:text-[1.5rem]">
              Sobre Você
            </h2>
            <p className="text-vamu-gray-medium capitalize">(opcional)</p>
          </legend>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex flex-col md:w-3/10">
              <label htmlFor="age">Idade</label>
              <Field
                type="number"
                name="age"
                id="age"
                className="bg-vamu-green-light mt-1 p-[.6rem] rounded-md focus:border-[1px] focus:border-vamu-green-cta focus:outline-0"
                placeholder="Ex:21"
              
                required
              />
            </div>
            <div className="flex flex-col md:w-3/10">
              <label htmlFor="major">Curso</label>
              <Field
                type="text"
                name="course"
                className="bg-vamu-green-light mt-1 p-[.6rem] rounded-md focus:border-[1px] focus:border-vamu-green-cta focus:outline-0"
                id="major"
                placeholder="Seu Curso"
                required
              />
            </div>
            <div className="flex flex-col md:w-3/10">
              <label htmlFor="semester">Semestre</label>
              <Field
                as="select"
                name="semester"
                id="semester"
                className="bg-vamu-green-light mt-1 p-[.6rem] rounded-md mb-[1px] focus:border-[1px] focus:border-vamu-green-cta focus:outline-0"
               
              >
                <option value="Null">Selecione...</option>
                <option value="1">1º Semestre</option>
                <option value="2">2º Semestre</option>
                <option value="3">3º Semestre</option>
                <option value="4">4º Semestre</option>
                <option value="5">5º Semestre</option>
                <option value="6">6º Semestre</option>
                <option value="7">7º Semestre</option>
                <option value="8">8º Semestre</option>
                <option value="9">9º Semestre</option>
                <option value="10">10º Semestre</option>
              </Field>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex flex-col md:w-55/100 ">
              <label htmlFor="phoneNumber">Número de Telefone</label>
              <Field
                type="tel"
                name="phone_number"
                id="phoneNumber"
                className="bg-vamu-green-light mt-1 p-[.6rem] rounded-md focus:border-[1px] focus:border-vamu-green-cta focus:outline-0"
                placeholder="00 (00) 00000-0000"
               
              />
            </div>
            <div className="flex flex-col md:w-45/100">
              <label htmlFor="origin">Cidade</label>
              <Field
                type="text"
                name="city"
                id="origin"
                className="bg-vamu-green-light mt-1 p-[.6rem] rounded-md focus:border-[1px] focus:border-vamu-green-cta focus:outline-0"
                placeholder="Onde Você Mora?"
                
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="description">Descrição</label>
            <Field
                as="textarea"
              className="resize-none bg-vamu-green-light mt-1 p-[1.3rem] rounded-md w-full focus:border-[1px] focus:border-vamu-green-cta focus:outline-0"
              name="description"
              id="description"
              maxLength={200}
              placeholder="Conte um pouco sobre você, hobbies ou rotina na faculdade(em até 200 palavras)"
              required
              
            />
          </div>
          <div className="flex justify-end mt-2">
            <button // Adicionado w-full para ocupar a largura total em telas pequenas
              type="submit"
              className="w-full md:w-auto hover:brightness-120 hover:cursor-pointer flex justify-center items-center gap-3 rounded-md bg-vamu-green-cta py-3.5 px-5"
            >
              <span className="material-symbols-outlined text-vamu-dark">
                check_circle
              </span>
              <p className="capitalize font-semibold whitespace-nowrap">salvar informações</p>
            </button>
          </div>
        </Form>
        </Formik>
        {/*--------------------------------------------terceiro Forms----------------------------------*/}
        <Formik
          enableReinitialize
          initialValues={{
            modelo: user?.modelo || "",
            placa: user?.placa || "",
            cor: user?.cor || "",
          }}
          onSubmit={updateCarData}
        >
        <Form className="bg-white p-6 w-full max-w-5x1  flex flex-col gap-6 md:gap-8 md:w-7/10 rounded-md">
          <legend className="flex flex-wrap gap-2 items-center border-b-vamu-green-light border-b-1 pb-4">
            <span className="material-symbols-outlined text-vamu-green-cta">
              directions_car
            </span>
            <h2 className="font-semibold text-[1.5rem]">
              Informações do Veículo{" "}
            </h2>
            <p className="uppercase text-vamu-green-cta">
              (obrigatório para motoristas)
            </p>
          </legend>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-2">
            <div className="flex flex-col w-full md:w-3/10">
              <label htmlFor="carModel">Modelo do carro</label>
              <Field
                type="text"
                name="modelo"
                className="bg-vamu-green-light mt-1 p-[.6rem] rounded-md focus:border-[1px] focus:border-vamu-green-cta focus:outline-0"
                placeholder="Porsche"
                id="carModel"
              />
            </div>
            <div className="flex flex-col w-full md:w-3/10">
              <label htmlFor="plate">Placa</label>
              <Field
                type="text"
                name="placa"
                id="plate"
                className="bg-vamu-green-light mt-1 p-[.6rem] rounded-md focus:border-[1px] focus:border-vamu-green-cta focus:outline-0"
                placeholder="ABC1234"
                maxLength={7}
              />
            </div>
            <div className="flex flex-col w-full md:w-3/10">
              <label htmlFor="carColor">Cor</label>
              <Field
                type="text"
                name="cor"
                className="bg-vamu-green-light mt-1 p-[.6rem] rounded-md focus:border-[1px] focus:border-vamu-green-cta focus:outline-0 "
                id="carColor"
                placeholder="Roxa"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-end mt-4">
          <a
            href="/userProfile"
            className="font-medium text-center flex items-center justify-center border-[1px] border-vamu-gray-medium rounded-md py-3 px-6 hover:bg-red-500 hover:text-white transition-colors"
          >
            Cancelar
          </a>
          <button
            type="submit"
            className=" hover:brightness-120 hover:cursor-pointer flex justify-center items-center gap-3 rounded-md bg-vamu-green-cta py-3 px-7"
          >
            <span className="material-symbols-outlined text-vamu-dark">
              check_circle
            </span>
            <p className="capitalize font-semibold">salvar veículo</p>
          </button>
        </div>
        </Form>
        </Formik>

        {/*espaçamento inferior */}
        <div className="pb-10"></div>

        <footer className="p-4 bg-white w-full text-center font-light border-t-[1px] border-t-vamu-green mt-4">
          <p>
            © 2026 Vamu-Conectando estudantes para um futuro mais sustentável
          </p>
        </footer>
      </section>
    </section>
  );
}

export default UserProf;
