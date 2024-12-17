import { ValidationField } from "../interfaces/validation-field";

const validationRegisterUser: ValidationField[] = [
  { field: "name", message: "O nome é obrigatório!" },
  { field: "email", message: "O email é obrigatório!" },
  { field: "position", message: "O cargo é obrigatório!" },
  { field: "password", message: "A senha é obrigatória!" },
  { field: "confirmpassword", message: "A confirmação de senha é obrigatória!" }
];

export { validationRegisterUser };