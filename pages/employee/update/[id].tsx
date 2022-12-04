//update employee
import { useRouter } from 'next/router';
import { type Employee } from '../../../interfaces/index';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import EmployeeLayout from '../../../components/EmployeeLayout';
import { useFetchWithCondition } from '../../../lib/hooks';

export default function Update() {
  const router = useRouter();
  const { id } = router.query;

  const [employeeId, setEmployeeId] = useState<string | string[]>('');

  const { data: employee, error }: { data: Employee; error: any } =
    useFetchWithCondition(`/api/employee/${employeeId}`, employeeId);

  useEffect(() => {
    if (id) {
      setEmployeeId(id);
    }
  }, [id]);

  if (error) return <div>failed to load</div>;

  if (!employee) return <div>loading...</div>;

  return (
    <EmployeeLayout title="Update">
      <div className="h-[40rem] mt-20">
        <h1>Update Employee</h1>
        <div>{employee.first_name}</div>
      </div>
    </EmployeeLayout>
  );
}
