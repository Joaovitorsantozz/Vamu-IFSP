import { Formik, Form } from "formik";
import { fetchBrazilianCities } from "../service/ibgeAPIcities";
import AsyncSelect from "react-select/async";
import {
  MapPin,
  GraduationCap,
  Calendar,
  Users,
  VenetianMask,
} from "lucide-react";
import { searchRideService } from "../service/searchRideService";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useRideSearch } from "../context/rideSearchContext";

interface FormValues {
  cityBoarding: string;
  cityDestination: string;
}
export default function SearchRideContainer() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    city_boarding,
    city_destination,
    tripType,
    setTripType,
    setCityBoarding,
    setCityDestination,
    setRides,
  } = useRideSearch();
  const boarding = searchParams.get("boarding") || "";
  const destination = searchParams.get("destination") || "";
  const executeSearch = useCallback(
    async (b: string, d: string) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await searchRideService(
          token,
          b,
          tripType === "ida" ? "" : d,
        );  
        setRides(response.data.rides);
      } catch (error) {
        console.log("erro ao buscar corridas", error);
      }
    },
    [tripType, setRides],
  );

  useEffect(()=>{
    if(boarding || destination){
      if(setCityBoarding) setCityBoarding(boarding);
      if(setCityDestination) setCityDestination(destination);
      executeSearch(boarding,destination);
    }
  },[boarding,destination,setCityBoarding,setCityBoarding,executeSearch])

  const handleSubmit= (values:FormValues)=>{
    const params = new URLSearchParams();
    if(values.cityBoarding) params.append("boarding",values.cityBoarding);
    if(values.cityDestination)params.append("destination",values.cityDestination);

    if (setCityBoarding) setCityBoarding(values.cityBoarding);
    if (setCityDestination) setCityDestination(values.cityDestination);


    navigate(`/result-rides?${params.toString()}`);
  }
  const selectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      minHeight: "auto",
      cursor: state.isDisabled ? "not-allowed" : "text",
      width: "100%",
      padding: 0,
      opacity: state.isDisabled ? 0.6 : 1,
      "&:hover": {
        border: "none",
      },
    }),
    placeholder: (provided: any, state: any) => ({
      ...provided,
      margin: 0,
      color: state.isDisabled ? "#94A3B8" : "#94A3B8",
      fontSize: "0.875rem",
      fontStyle: state.isDisabled ? "italic" : "normal",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: "0px",
    }),
    input: (provided: any) => ({
      ...provided,
      margin: 0,
      padding: 0,
      color: "#1E293B",
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      margin: 0,
      color: state.isDisabled ? "#94A3B8" : "#1E293B",
    }),
    indicatorsContainer: () => ({
      display: "none",
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  return (
    <section className="bg-white rounded-3xl shadow-xl shadow-vamu-dark-deep/5 p-8 mb-16 border border-vamu-border">
      <Formik<FormValues>
        initialValues={{
          cityBoarding: boarding,
          cityDestination: destination,
        }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="text-xs font-bold text-vamu-gray-dark uppercase ml-1 mb-2 block">
                  Saindo de
                </label>
                <div className="flex items-center bg-vamu-gray border border-vamu-border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-vamu-green/20 transition">
                  <MapPin className="text-vamu-green-dark w-5 h-5 mr-3 shrink-0" />
                  <div className="w-full">
                    <AsyncSelect
                      name="cityBoarding"
                      isClearable
                      defaultOptions={false}
                      loadOptions={fetchBrazilianCities}
                      placeholder="Digite a cidade de saída"
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
                </div>
              </div>

              {/* Input Destino */}
              <div className="relative">
                <label className="text-xs font-bold text-vamu-gray-dark uppercase ml-1 mb-2 block">
                  Indo para
                </label>
                <div
                  className={`flex items-center border border-vamu-border rounded-xl px-4 py-3 transition ${
                    tripType === "ida"
                      ? "bg-slate-100/80 cursor-not-allowed opacity-70"
                      : "bg-vamu-gray focus-within:ring-2 focus-within:ring-vamu-green/20"
                  }`}
                >
                  <GraduationCap
                    className={`w-5 h-5 mr-3 shrink-0 transition-colors ${
                      tripType === "ida"
                        ? "text-slate-400"
                        : "text-vamu-green-dark"
                    }`}
                  />
                  <div className="w-full">
                    <AsyncSelect
                      name="cityDestination"
                      isClearable
                      isDisabled={tripType === "ida"}
                      defaultOptions={false}
                      loadOptions={fetchBrazilianCities}
                      placeholder={
                        tripType === "ida"
                          ? "Apenas ida selecionada"
                          : "Digite a cidade de desembarque"
                      }
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
                        values.cityDestination && tripType !== "ida"
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
                </div>
              </div>
            </div>

            {/* Controles e Submissão */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2 p-1 bg-vamu-gray rounded-xl">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    tripType === "ida"
                      ? "bg-vamu-green text-white shadow-md shadow-vamu-green/20 scale-[1.02]"
                      : "text-vamu-gray-dark hover:text-vamu-dark hover:bg-black/5"
                  }`}
                  onClick={() => {
                    if (setTripType) setTripType("ida");
                    setFieldValue("cityDestination", "");
                  }}
                >
                  Apenas ida
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    tripType === "idavolta"
                      ? "bg-vamu-green text-white shadow-md shadow-vamu-green/20 scale-[1.02]"
                      : "text-vamu-gray-dark hover:text-vamu-dark hover:bg-black/5"
                  }`}
                  onClick={() => {
                    if (setTripType) setTripType("idavolta");
                  }}
                >
                  Ida e Volta
                </button>
              </div>

              <div className="flex items-center gap-4 flex-1 justify-end">
                <div className="flex items-center gap-2 border border-vamu-border rounded-xl px-4 py-2.5 text-vamu-gray-dark bg-white">
                  <Calendar className="w-4 h-4 text-vamu-gray-dark" />
                  <span className="text-sm">Hoje, 24 de Outubro</span>
                </div>
                <div className="flex items-center gap-2 border border-vamu-border rounded-xl px-4 py-2.5 text-vamu-gray-dark bg-white">
                  <Users className="w-4 h-4 text-vamu-gray-dark" />
                  <span className="text-sm">1 passageiro</span>
                </div>
                <button
                  type="submit"
                  className="bg-vamu-green-cta hover:bg-vamu-green-dark text-white font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-vamu-green/20"
                >
                  Buscar
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
