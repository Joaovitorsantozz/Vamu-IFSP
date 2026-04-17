import * as Yup from "yup";

export const rideSchema = Yup.object().shape({
  departureLocation: Yup.string()
    .required("Local de saída é obrigatório")
    .min(5, "Muito curto"),

  meetingCity: Yup.string()
    .required("Destino é obrigatório")
    .min(3, "Muito curto"),

  departureTime: Yup.string()
    .required("Horário é obrigatório")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato inválido (HH:mm)"),
});