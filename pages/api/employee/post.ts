import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// POST /api/employee/post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { first_name, email, gender, last_name, salary } = req.body;
  try {
    const result = await prisma.employee.create({
      data: {
        email: email,
        first_name: first_name,
        gender: gender,
        last_name: last_name,
        salary: salary,
      },
    });
    res.json(result);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
    return;
  }
}
