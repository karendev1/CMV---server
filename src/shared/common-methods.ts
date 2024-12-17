import jwt, { JwtPayload } from 'jsonwebtoken';

function checkToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'Acesso negado!' });

  try {
    const secret = process.env.SECRET as string;
    jwt.verify(token, secret) as JwtPayload;

    next();
  } catch (err) {
    res.status(400).json({ msg: 'O Token é inválido!' });
  }
}

interface Field {
  field: string;
  message: string;
}

const validateFields = (fields: Field[], body: any) => {
  for (const field of fields) {
    if (!body[field.field]) {
      return { valid: false, message: field.message };
    }
  }
  return { valid: true };
};

export { checkToken, validateFields };