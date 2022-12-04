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
    const employee = await prisma.employee.findUnique({
      where: { id: String(employeeId) },
    });
    res.json(employee);
  } else if (req.method === 'PUT') {
    const { first_name, email } = req.body;
    const employee = await prisma.employee.update({
      where: { id: String(employeeId) },
      data: { first_name, email },
    });
    res.json(employee);
  } else if (req.method === 'DELETE') {
    const employee = await prisma.employee.delete({
      where: { id: String(employeeId) },
    });
    res.json(employee);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
