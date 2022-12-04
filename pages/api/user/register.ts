import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '../../../interfaces';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          username: username,
        },
      });
      res.status(200).end();
    } catch (e: any) {
      res.status(500).json({
        error: e.message,
        userError: 'user already exists, email must be unique',
      });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
