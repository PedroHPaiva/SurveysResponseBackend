import * as Yup from "yup";

export const userCredentialsValidation = Yup.object().shape({
  email: Yup.string().email().required("Email é obrigatório"),
  password: Yup.string().min(5).required("Senha é obrigatória"),
});
