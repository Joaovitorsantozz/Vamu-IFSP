import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Car, Route, MapPin, Clock, Send, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDriverInfo, offerRideSubmit } from "../service/rideOfferService";
import { rideSchema } from "../validations/rideOfferSchema";
const RideForm = () => {
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    ownerName: "",
    carPlate: "",
    carModel: "",
    carColor: "",
    departureLocation: "",
    meetingCity: "",
    departureTime: "",
  });
  const token = localStorage.getItem("token");
 useEffect(() => {
 

  async function fetchData() {
    if (!token) return;
    try {
      const response = await getDriverInfo(token);

      const { user, car } = response.data;

      setInitialValues({
        ownerName: user?.nome || "",
        carPlate: car?.placa || "",
        carModel: car?.modelo || "",
        carColor: car?.cor || "",
        departureLocation: "",
        meetingCity: "",
        departureTime: "",
      });
    } catch (error) {
      console.log("erro no fetch das informações do motorista", error);
    }
  }

  fetchData();
}, [token]);

  const handleSubmit = async (values: any) => {
    const payload = {
      boarding: values.departureLocation,
      destination: values.meetingCity,
      boardingTime: values.departureTime,
    };
    try {
      const response = await offerRideSubmit(payload);
      alert(response?.data.message);
      navigate("/dashboard");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Erro ao registrar carona";
      alert(message);
    }
  };

  const inputStyle =
    "w-full bg-vamu-gray border border-vamu-border rounded-xl p-4 focus:ring-2 focus:ring-vamu-green/20 focus:border-vamu-green outline-none text-vamu-dark font-medium transition-all";

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={rideSchema}
      enableReinitialize={true}
    >
      {() => (
        <Form className="space-y-8">
          <section className="bg-white rounded-3xl shadow-xl shadow-vamu-dark-deep/5 p-8 border border-vamu-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-vamu-green-light p-2.5 rounded-xl text-vamu-green-dark">
                <Car className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-vamu-dark">
                Dados do Veículo
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                  Nome do Proprietário
                </label>
                <Field name="ownerName" className={inputStyle} disabled />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                  Placa do Carro
                </label>
                <Field name="carPlate" className={inputStyle} disabled />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                  Modelo do Carro
                </label>
                <Field name="carModel" disabled className={inputStyle} />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                  Cor
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    name="carColor"
                    disabled
                    className={`${inputStyle} appearance-none`}
                  >
                    <option value="" disabled>
                      Selecione a cor
                    </option>
                    <option value="Branco">Branco</option>
                    <option value="Preto">Preto</option>
                    <option value="Cinza/Prata">Cinza/Prata</option>
                    <option value="Vermelho">Vermelho</option>
                    <option value="Azul">Azul</option>
                    <option value="Outra">Outra</option>
                  </Field>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-vamu-gray-dark pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-xl shadow-vamu-dark-deep/5 p-8 border border-vamu-border relative overflow-hidden">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-vamu-green-light p-2.5 rounded-xl text-vamu-green-dark">
                <Route className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-vamu-dark">
                Dados do Trajeto
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 relative z-10">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                  Local de Saída
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-vamu-green-dark w-5 h-5" />
                  <Field
                    name="departureLocation"
                    placeholder="Ex: Campus Central - Bloco A"
                    className={`${inputStyle} pl-12`}
                  />
                  <ErrorMessage
                    name="departureLocation"
                    component="span"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                    Cidade de Encontro
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-vamu-green-dark w-5 h-5" />
                    <Field
                      name="meetingCity"
                      placeholder="Ex: São Paulo"
                      className={`${inputStyle} pl-12`}
                    />
                    <ErrorMessage
                      name="meetingCity"
                      component="span"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                    Horário de Saída
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-vamu-green-dark w-5 h-5" />
                    <Field
                      name="departureTime"
                      type="time"
                      className={`${inputStyle} pl-12`}
                    />
                    <ErrorMessage
                      name="departureTime"
                      component="span"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-col md:flex-row items-center justify-end gap-4 mt-12">
            <button
              type="button"
              className="w-full md:w-auto px-8 py-4 text-vamu-gray-dark font-bold hover:text-vamu-dark transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full md:w-auto bg-vamu-green-cta text-white font-bold py-4 px-12 rounded-2xl shadow-xl shadow-vamu-green/20 hover:bg-vamu-green-dark hover:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              Publicar Carona
              <Send className="w-5 h-5" />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RideForm;
