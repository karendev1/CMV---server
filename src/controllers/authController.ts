import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDocument } from "../shared/interfaces/user-document";
import { UserLogin } from "../shared/interfaces/user-login";
import  User from "../models/User";

export async function login(req: any, res: any) {
  const { email, password }: UserLogin = req.body;

  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  const user: UserDocument | null = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET as string;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

export default login;
