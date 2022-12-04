import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// GET /api/employee/:id
// PUT /api/employee/:id
// DELETE /api/employee/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const employeeId = req.query.id;
  if (req.method === 'GET') {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id: String(employeeId) },
      });
      res.json(employee);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === 'PUT') {
    const { first_name, email, gender, last_name, salary } = req.body;

    if (!first_name || !email || !gender || !last_name || !salary) {
      res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      await prisma.employee.update({
        where: { id: String(employeeId) },
        data: { first_name, email, gender, last_name, salary },
      });
      res.status(200).end();
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.employee.delete({
        where: { id: String(employeeId) },
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
