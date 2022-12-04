//update employee
import { useRouter } from 'next/router';
import { type Employee } from '../../../interfaces/index';
import useSWR from 'swr';
import { useEffect } from 'react';

export default function Update() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div>
      <h1>Update Employee</h1>
    </div>
  );
}
