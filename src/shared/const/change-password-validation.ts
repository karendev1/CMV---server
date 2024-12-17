import { ValidationField } from "../interfaces/validation-field";

export const validationChangePassword: ValidationField[] = [
  { field: "newPassword", message: "O nova senha é obrigatória!" },
  { field: "oldPassword", message: "A antiga senha é obrigatória!" },
];