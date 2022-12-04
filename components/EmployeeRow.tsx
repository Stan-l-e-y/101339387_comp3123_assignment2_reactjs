import { type Employee } from '../interfaces/index';
import { useRouter } from 'next/router';

export default function EmployeeRow({ employee }: { employee: Employee }) {
  const router = useRouter();
  return (
    <div className="flex border">
      <div className="border-r p-2 flex-1">{employee.first_name}</div>
      <div className="border-r p-2 border-l flex-1">{employee.last_name}</div>
      <div className="border-r p-2 border-l flex-1">{employee.email}</div>
      <div className="border-r p-2 border-l flex justify-center items-center">
        <button
          className=" bg-[#0070f3] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
          type="submit"
        >
          Update
        </button>
        <button
          className=" bg-[#c53c3c] hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
          type="submit"
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
