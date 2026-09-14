import { Formik, Form } from "formik";
import { fetchBrazilianCities } from "../service/ibgeAPIcities";
import AsyncSelect from "react-select/async";
import { MapPin, GraduationCap, Calendar, Users, X } from "lucide-react";
import { searchRideService } from "../service/searchRideService";
import { useCallback, useEffect, useRef, type RefObject } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useRideSearch } from "../context/rideSearchContext";

interface FormValues {
  cityBoarding: string;
  cityDestination: string;
  data: string;
}
interface SelectOption {
  label: string;
  value: string;
}
export default function SearchRideContainer( {checkUp} ) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const timeFilter = searchParams.get("time");
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker();
      } catch {
        dateInputRef.current.focus();
      }
    }
  };
  const {
    tripType,
    setTripType,
    setCityBoarding,
    setCityDestination,
    setRides,
    setDate,
  } = useRideSearch();
  const boarding = searchParams.get("boarding") || "";
  const destination = searchParams.get("destination") || "";
  const dateRide = searchParams.get("date") || "";

  const executeSearch = useCallback(
    async (b: string, d: string, date: string, timeFilter: string) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await searchRideService(
          token,
          b,
          tripType === "ida" ? "" : d,
          date,
          timeFilter,
        );
        setRides(response.data.rides);
      } catch (error) {
        console.log("erro ao buscar corridas", error);
      }
    },
    [tripType, setRides],
  );

  useEffect(() => {
    if (boarding || destination || dateRide || timeFilter) {
      if (setCityBoarding) setCityBoarding(boarding);
      if (setCityDestination) setCityDestination(destination);
      if (setDate) setDate(dateRide);

      executeSearch(boarding, destination, dateRide, timeFilter || "");
    }
  }, [
    boarding,
    destination,
    dateRide,
    timeFilter,
    setCityBoarding,
    setCityDestination,
    setDate,
    executeSearch,
  ]);

  const handleSubmit = (values: FormValues) => {
    const params = new URLSearchParams(searchParams);

    if (values.cityBoarding) params.set("boarding", values.cityBoarding);
    else params.delete("boarding");

    if (values.cityDestination && tripType !== "ida") {
      params.set("destination", values.cityDestination);
    } else {
      params.delete("destination");
    }

    if (values.data) params.set("date", values.data);
    else params.delete("date");

    if (setCityBoarding) setCityBoarding(values.cityBoarding);
    if (setCityDestination) setCityDestination(values.cityDestination);
    if (setDate) setDate(values.data);

    navigate(`/result-rides?${params.toString()}`);
  };
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
          data: dateRide,
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
                  <MapPin className={`${checkUp? "text-vamu-dark-pink":"text-vamu-green-dark"} w-5 h-5 mr-3 shrink-0`} />
                  <div className="w-full">
                    <AsyncSelect<SelectOption>
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
                      onChange={(option) =>
                        setFieldValue(
                          "cityBoarding",
                          option ? option.value : "",
                        )
                      }
                    />
                  </div>
                </div>
              </div>

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
                        : checkUp? "text-vamu-dark-pink" : "text-vamu-green-dark"
                    }`}
                  />
                  <div className="w-full">
                    <AsyncSelect<SelectOption>
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
                      onChange={(option) =>
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

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2 p-1 bg-vamu-gray rounded-xl">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    tripType === "ida"
                      ? (checkUp?"bg-vamu-pink-cta hover:bg-vamu-dark-pink-cta text-white":"bg-vamu-green text-white shadow-md shadow-vamu-green/20 scale-[1.02]")
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
                      ? checkUp?"bg-vamu-pink-cta hover:bg-vamu-dark-pink-cta text-white":"bg-vamu-green text-white shadow-md shadow-vamu-green/20 scale-[1.02]"
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
                <CalendarBox
                  handleContainerClick={handleContainerClick}
                  dateInputRef={dateInputRef}
                  setFieldValue={setFieldValue}
                  values={values}
                  setDate={setDate}
                ></CalendarBox>
                <div className="flex items-center gap-2 border border-vamu-border rounded-xl px-4 py-2.5 text-vamu-gray-dark bg-white">
                  <Users className="w-4 h-4 text-vamu-gray-dark" />
                  <span className="text-sm">1 passageiro</span>
                </div>
                <button
                  type="submit"
                  className={`${checkUp? "bg-vamu-pink-cta hover:bg-vamu-dark-pink-cta" : "bg-vamu-green-cta hover:bg-vamu-green-dark "} font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-vamu-green/20 text-white`}
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
interface CalendarBoxProps {
  handleContainerClick: () => void;
  dateInputRef: RefObject<HTMLInputElement | null>;
  setFieldValue: (field: string, value: any) => void;
  values: { data: string };
  setDate?: (date: string) => void;
}
export const CalendarBox: React.FC<CalendarBoxProps> = ({
  handleContainerClick,
  dateInputRef,
  setFieldValue,
  values,
  setDate,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleDateChange = (newDate: string) => {
    setFieldValue("data", newDate);
    if (setDate) setDate(newDate);

    const params = new URLSearchParams(searchParams);
    if (newDate) {
      params.set("date", newDate);
    } else {
      params.delete("date");
    }

    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <div
      onClick={handleContainerClick}
      className="flex items-center gap-2.5 border border-vamu-border rounded-xl px-3.5 py-2.5 bg-white cursor-pointer hover:border-vamu-green/50 focus-within:ring-2 focus-within:ring-vamu-green/20 transition-all select-none group"
    >
      <Calendar className="w-4 h-4 text-vamu-gray-dark group-hover:text-vamu-green-dark transition-colors shrink-0" />

      <div className="relative flex-1 flex items-center min-w-0">
        <input
          ref={dateInputRef}
          type="date"
          id="date"
          name="date"
          onChange={(e) => handleDateChange(e.target.value)}
          value={values.data}
          className={`text-sm bg-transparent outline-none cursor-pointer text-vamu-gray-dark w-full appearance-none [&::-webkit-calendar-picker-indicator]:hidden ${
            !values.data ? "opacity-0 absolute inset-0 z-10" : "relative"
          }`}
        />

        {!values.data && (
          <span className="text-sm text-slate-400 font-normal truncate">
            Todas as datas
          </span>
        )}
      </div>

      {values.data ? (
        <button
          type="button"
          title="Buscar em qualquer data"
          onClick={(e) => {
            e.stopPropagation();
            handleDateChange("");
          }}
          className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors p-1 rounded-lg shrink-0 -mr-1 z-20"
        >
          <X className="w-4 h-4" />
        </button>
      ) : (
        <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap bg-slate-100 group-hover:bg-vamu-green/10 group-hover:text-vamu-green-dark transition-colors px-2 py-0.5 rounded-md shrink-0">
          Qualquer data
        </span>
      )}
    </div>
  );
};
