import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const employee = await prisma.employee.create({
  //   data: {
  //     email: 'test',
  //     first_name: 'asdsad',
  //     gender: 'asdasd',
  //     last_name: 'asdasd',
  //     salary: 123,
  //   },
  // });

  const employees = await prisma.employee.findMany();
  res.status(200).json(employees);
}
