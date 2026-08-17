import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Car, Route, MapPin, Clock, Send, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { offerRideSubmit } from "../../service/rideOfferService";
import { rideSchema } from "../../validations/rideOfferSchema";
import { UserContext } from "../../context/userContext";

import AsyncSelect from "react-select/async";
import { fetchBrazilianCities } from "../../service/ibgeAPIcities";

const RideForm = () => {
  const navigate = useNavigate();
  const { user, car } = useContext(UserContext);

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "#f8fafc",
      borderColor: "#e2e8f0",
      borderRadius: "0.75rem",
      paddingLeft: "2.25rem",
      paddingTop: "0.35rem",
      paddingBottom: "0.35rem",
      boxShadow: "none",
      "&:hover": { borderColor: "#10b981" },
    }),
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  };

  const handleSubmit = async (values: any) => {
    const payload = {
      boarding: values.boarding,
      destination: values.destination,
      boardingTime: values.boarding_time,
      cityBoarding: values.cityBoarding,
      cityDestination: values.cityDestination,
    };

    try {
      console.log(payload);
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

  if (!user || !car) {
    return <div>Carregando...</div>;
  }

  return (
    <Formik
      initialValues={{
        ownerName: user.nome,
        carPlate: car.placa,
        carModel: car.modelo,
        carColor: car.cor,
        boarding: "",
        destination: "",
        boarding_time: "",
        cityBoarding: "",
        cityDestination: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={rideSchema}
    >
   
      {({ setFieldValue, values }) => (
        <Form className="space-y-8">
     
          <section className="bg-white rounded-3xl shadow-xl shadow-vamu-dark-deep/5 p-8 border border-vamu-border">
   
          </section>

     
          <section className="bg-white rounded-3xl shadow-xl shadow-vamu-dark-deep/5 p-8 border border-vamu-border relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-vamu-green-light p-2.5 rounded-xl text-vamu-green-dark">
                <Route className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-vamu-dark">
                Dados do Trajeto
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 relative z-10">
             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                    Local de Saída
                  </label>
                  <div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-vamu-green-dark w-5 h-5 pointer-events-none" />
                      <Field
                        name="boarding"
                        placeholder="Ex: Campus Central - Bloco A"
                        className={`${inputStyle} pl-12`}
                      />
                    </div>
                    <ErrorMessage
                      name="boarding"
                      component="span"
                      className="text-red-500 text-xs mt-1 block"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                    Data e horário de saída
                  </label>
                  <div>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-vamu-green-dark w-5 h-5 pointer-events-none" />
                      <Field
                        name="boarding_time"
                        type="datetime-local"
                        className={`${inputStyle} pl-12`}
                      />
                    </div>
                    <ErrorMessage
                      name="boarding_time"
                      component="span"
                      className="text-red-500 text-xs mt-1 block"
                    />
                  </div>
                </div>
              </div>

    
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                  Ponto de Referência no Destino
                </label>
                <div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-vamu-green-dark w-5 h-5 pointer-events-none" />
                    <Field
                      name="destination"
                      placeholder="Ex: Av. Paulista, 1000"
                      className={`${inputStyle} pl-12`}
                    />
                  </div>
                  <ErrorMessage
                    name="destination"
                    component="span"
                    className="text-red-500 text-xs mt-1 block"
                  />
                </div>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                    Cidade Saída
                  </label>
                  <div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-vamu-green-dark w-5 h-5 pointer-events-none z-10" />
                      <AsyncSelect
                        name="cityBoarding"
                        cacheOptions
                        defaultOptions={false}
                        loadOptions={fetchBrazilianCities}
                        placeholder="Digite pelo menos 2 letras..."
                        loadingMessage={() => "Buscando cidades..."}
                        noOptionsMessage={({ inputValue }) =>
                          inputValue.length < 2
                            ? "Digite ao menos 2 caracteres"
                            : "Nenhuma cidade encontrada"
                        }
                        styles={selectStyles}
                        menuPortalTarget={
                          typeof window !== "undefined" ? document.body : null
                        }
                        value={
                          values.cityBoarding
                            ? {
                                label: values.cityBoarding,
                                value: values.cityBoarding,
                              }
                            : null
                        }
                        onChange={(option: any) =>
                          setFieldValue(
                            "cityBoarding",
                            option ? option.value : "",
                          )
                        }
                      />
                    </div>
                    <ErrorMessage
                      name="city_boarding"
                      component="span"
                      className="text-red-500 text-xs mt-1 block ml-1"
                    />
                  </div>
                </div>

                
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-vamu-gray-dark ml-1">
                    Cidade Destino
                  </label>
                  <div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-vamu-green-dark w-5 h-5 pointer-events-none z-10" />
                      <AsyncSelect
                        name="cityDestination"
                        cacheOptions
                        defaultOptions={false}
                        loadOptions={fetchBrazilianCities}
                        placeholder="Digite pelo menos 2 letras..."
                        loadingMessage={() => "Buscando cidades..."}
                        noOptionsMessage={({ inputValue }) =>
                          inputValue.length < 2
                            ? "Digite ao menos 2 caracteres"
                            : "Nenhuma cidade encontrada"
                        }
                        styles={selectStyles}
                        menuPortalTarget={
                          typeof window !== "undefined" ? document.body : null
                        }
                        value={
                          values.cityDestination
                            ? {
                                label: values.cityDestination,
                                value: values.cityDestination,
                              }
                            : null
                        }
                        onChange={(option: any) =>
                          setFieldValue(
                            "cityDestination",
                            option ? option.value : "",
                          )
                        }
                      />
                    </div>
                    <ErrorMessage
                      name="city_destination"
                      component="span"
                      className="text-red-500 text-xs mt-1 block ml-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

       
          <div className="flex flex-col md:flex-row items-center justify-end gap-4 mt-12">
            <Link
              to="/dashboard"
              className="w-full md:w-auto px-8 py-4 text-vamu-gray-dark font-bold hover:text-vamu-dark transition-colors duration-200 text-center"
            >
              Cancelar
            </Link>

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
