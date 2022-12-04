import { useRouter } from 'next/router';
import { type Employee } from '../../interfaces/index';
import { useEffect, useState } from 'react';
import { useFetchWithCondition } from '../../lib/hooks';
import EmployeeLayout from '../../components/EmployeeLayout';
import styles from '../../styles/Home.module.css';

export default function Employee() {
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
    <EmployeeLayout title="View">
      <div className={`${styles.grid}`}>
        <div className="mt-10">
          <h1>Employee {employeeId}</h1>
          <h1>Employee First Name : {employee.first_name}</h1>
        </div>
      </div>
    </EmployeeLayout>
  );
}
