import { type Employee } from '../interfaces/index';
import { useRouter } from 'next/router';
import { getRequestDeps } from '../lib/functions';
import { KeyedMutator } from 'swr';
import { useState } from 'react';

export default function EmployeeRow({
  employee,
  refetchEmployees,
  setServerError,
}: {
  employee: Employee;
  refetchEmployees: any;
  setServerError: any;
}) {
  const router = useRouter();

  const { fetcher, token } = getRequestDeps();

  const onDelete = async () => {
    try {
      const res: Response = await fetcher(`/api/employee/${employee.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        refetchEmployees();
      }
    } catch (e: any) {
      setServerError(e.message);
      setTimeout(() => {
        setServerError(null);
      }, 4000);

      console.log(e);
    }
  };

  return (
    <div className="flex border">
      <div className="border-r p-2 flex-1">{employee.first_name}</div>
      <div className="border-r p-2 border-l flex-1">{employee.last_name}</div>
      <div className="border-r p-2 border-l flex-1">{employee.email}</div>
      <div className="border-r p-2 border-l flex justify-center items-center">
        <button
          className=" bg-[#0070f3] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
          type="submit"
          onClick={() => router.push(`/employee/update/${employee.id}`)}
        >
          Update
        </button>
        <button
          className=" bg-[#c53c3c] hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
          type="submit"
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          className=" bg-[#45b495] hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mx-2"
          type="submit"
          onClick={() => router.push(`/employee/${employee.id}`)}
        >
          View
        </button>
      </div>
    </div>
  );
}
