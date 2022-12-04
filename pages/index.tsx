import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import EmployeesTable from '../components/EmployeesTable';
import { type Employee } from '../interfaces/index';
import { useFetch } from '../lib/hooks';
import EmployeeLayout from '../components/EmployeeLayout';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const {
    data: employees,
    error: errorEmployees,
    mutate: mutateEmployees,
  }: { data: Employee[]; error: any; mutate: any } = useFetch('/api/employees');

  const [error, setError] = useState(null);

  if (errorEmployees) return <div>failed to load</div>;

  if (!employees) return <div>loading...</div>;

  if (employees.length === 0) {
    return (
      <EmployeeLayout title="List">
        <div className="flex flex-col justify-start items-center h-[40rem]">
          <h1 className="text-2xl mt-10">
            No Employees, please click below to add some{' '}
          </h1>
          <button
            className="mt-10  bg-[#0070f3] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            type="submit"
            onClick={() => router.push('/employee/add')}
          >
            Add Employee
          </button>
        </div>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout title="List">
      <div className="flex flex-col justify-start items-center h-[40rem] ">
        {error && <div className="text-red-500">{error}</div>}
        <button
          className="mt-10  bg-[#0070f3] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          type="submit"
          onClick={() => router.push('/employee/add')}
        >
          Add Employee
        </button>
        <div className={styles.grid}>
          <EmployeesTable
            employees={employees}
            refetchEmployees={mutateEmployees}
            setServerError={setError}
          />
        </div>
      </div>
    </EmployeeLayout>
  );
}
