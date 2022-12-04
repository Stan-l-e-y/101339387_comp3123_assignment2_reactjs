import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// POST /api/employee/post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
  const { first_name, email, gender, last_name, salary } = req.body;

  if (!first_name || !email || !gender || !last_name || !salary) {
    res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await prisma.employee.create({
      data: {
        email: email,
        first_name: first_name,
        gender: gender,
        last_name: last_name,
        salary: salary,
      },
    });
    res.status(200).end();
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
