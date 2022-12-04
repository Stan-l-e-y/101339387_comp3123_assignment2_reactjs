import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '../../../interfaces';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password }: { email: string; password: string } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user == null) {
        res.status(404).json({ error: 'user not found' });
      } else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          res.status(401).json({ error: 'password incorrect' });
        }
        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + 60 * 60; // 1 hour
        const token = jwt.sign(
          { email: user.email, username: user.username, exp: exp },
          String(process.env.JWT_SECRET),
          { algorithm: 'HS256' }
        );
        res.status(200).json({ token: token });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
