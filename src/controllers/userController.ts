import bcrypt from 'bcrypt';
import { validateFields } from '../shared/common-methods';
import { validationRegisterUser } from '../shared/const/register-user';
import User from '../models/User';
import { validationChangePassword } from '../shared/const/change-password-validation';
import mongoose from 'mongoose';

export async function searchUserById(req: any, res: any) {
  const id = req.params.id;

  const user = await User.findById(id, '-password');

  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado!' });
  }

  res.status(200).json({ user });
}

export async function registerUser(req: any, res: any) {
  const { name, email, position, password, confirmpassword } = req.body;

  const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const fieldValidation = validateFields(validationRegisterUser, req.body);
  if (!fieldValidation.valid) {
    return res.status(422).json({ msg: fieldValidation.message });
  }

  if (!regexSenha.test(password)) {
    return res.status(422).json({
      msg:
        'A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
    });
  }

  if (password !== confirmpassword) {
    return res
      .status(422)
      .json({ msg: 'A senha e a confirmação precisam ser iguais!' });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(422).json({ msg: 'Por favor, utilize outro e-mail!' });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: passwordHash,
    position,
  });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

export async function searchAllUsers(req: any, res: any) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter usuários.' });
  }
}

export async function deleteUserById(req: any, res: any) {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
}

export async function changePassword(req: any, res: any) {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.params;

  const fieldValidation = validateFields(validationChangePassword, req.body);
  const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!fieldValidation.valid) {
    return res.status(422).json({ msg: fieldValidation.message });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });

    const isMatch = await bcrypt.compare(oldPassword, user.password!);
    if (!isMatch)
      return res.status(400).json({ msg: "Senha antiga está incorreta" });

    if (!regexSenha.test(newPassword)) {
      return res.status(422).json({
        msg:
          'A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.json({ msg: "Senha alterada com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erro ao alterar a senha. Tente novamente mais tarde." });
  }
}

export default {
  registerUser,
  searchUserById,
  searchAllUsers,
  deleteUserById,
  changePassword,
};