import Head from 'next/head';
import styles from '../styles/Home.module.css';
import useSWR from 'swr';
import { useEffect } from 'react';
import EmployeesTable from '../components/EmployeesTable';
import { type Employee } from '../interfaces/index';
import { useFetch } from '../lib/hooks';
import EmployeeLayout from '../components/EmployeeLayout';

export default function Home() {
  const {
    data: employees,
    error: errorEmployees,
  }: { data: Employee[]; error: any } = useFetch('/api/employees');

  useEffect(() => {
    console.log(employees);
  }, [employees]);

  if (errorEmployees) return <div>failed to load</div>;

  if (!employees) return <div>loading...</div>;

  return (
    <EmployeeLayout title="List">
      <button
        className="mt-10 bg-[#0070f3] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Add Employee
      </button>

      <div className={styles.grid}>
        <EmployeesTable employees={employees} />
      </div>
    </EmployeeLayout>
  );
}
