import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { validateToken } from '../../lib/serverfunctions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.json({ message: 'Hello' });
  const employees = await prisma.employee.findMany();
  res.status(200).json(employees);
  // const token = req.headers.authorization?.split(' ')[1];
  // if (!token) {
  //   res.status(401).json({ error: 'unauthorized' });
  // } else {
  //   const isValid = await validateToken(token);
  //   if (isValid) {
  //     const employees = await prisma.employee.findMany();
  //     res.status(200).json(employees);
  //   } else {
  //     res.status(401).json({ error: 'unauthorized' });
  //   }
  // }
}
