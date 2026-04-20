import * as Yup from "yup";

export const rideSchema = Yup.object().shape({
  boarding: Yup.string()
    .required("Local de saída é obrigatório")
    .min(5, "Muito curto"),

  destination: Yup.string()
    .required("Destino é obrigatório")
    .min(3, "Muito curto"),

  boarding_time: Yup.date()
    .required("Data e horário são obrigatórios")
    .typeError("Formato inválido"),
});
