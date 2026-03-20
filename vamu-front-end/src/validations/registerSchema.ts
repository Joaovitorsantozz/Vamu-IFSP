import * as yup from "yup";

export const validateRegister = yup.object().shape({
  name: yup.string().required("* O nome é obrigatório"),
  email: yup
    .string()
    .email("* Email inválido")
    .required("* O email é obrigatório"),
  password: yup
    .string()
    .min(6, "* A senha deve conter no mínimo 6 caracteres")
    .required("* A senha é obrigatória"),
});
