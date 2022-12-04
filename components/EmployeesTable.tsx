import { KeyedMutator } from 'swr';
import { type Employee } from '../interfaces/index';
import EmployeeRow from './EmployeeRow';

export default function EmployeesTable({
  employees,
  refetchEmployees,
  setServerError,
}: {
  employees: Employee[];
  refetchEmployees: any;
  setServerError: any;
}) {
  return (
    <div className="mt-10 mb-20">
      <div className="header flex w-[70rem] border justify-center  ">
        <div className="border-r p-2 flex w-[20rem]">First Name</div>
        <div className="border-r p-2 border-l w-[20rem] ">Last Name</div>
        <div className="border-r p-2 border-l w-[20rem] ">Email</div>
        <div className="border-r p-2 border-l w-[22.3rem] ">actions</div>
      </div>
      {employees.map((employee) => (
        <EmployeeRow
          key={employee.id}
          employee={employee}
          refetchEmployees={refetchEmployees}
          setServerError={setServerError}
        />
      ))}
    </div>
  );
}
