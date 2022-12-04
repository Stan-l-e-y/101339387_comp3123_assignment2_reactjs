import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '../../../interfaces';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password, username } = req.body;
    try {
      await prisma.user.create({
        data: {
          email: email,
          password: password,
          username: username,
        },
      });
      res.status(200).end();
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
