import jwt from 'jsonwebtoken';
import prisma from './prisma';
import { IJwtPayload } from '../interfaces';

export async function validateToken(token: string) {
  const { exp, email } = jwt.verify(
    token,
    String(process.env.JWT_SECRET)
  ) as IJwtPayload;

  if (exp < Date.now() / 1000) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return true;
  }

  return false;
}
