//update employee
import { useRouter } from 'next/router';
import { type Employee } from '../../../interfaces/index';
import { useEffect, useState } from 'react';
import EmployeeLayout from '../../../components/EmployeeLayout';
import { useFetchWithCondition } from '../../../lib/hooks';
import { useForm } from 'react-hook-form';
import { IEmployeeData } from '../../../interfaces/index';
import { getRequestDeps } from '../../../lib/functions';

export default function Update() {
  const router = useRouter();
  const { id } = router.query;

  const { fetcher, token } = getRequestDeps();

  const [employeeId, setEmployeeId] = useState<string | string[]>('');

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    data: employee,
    error: employeeError,
  }: { data: Employee; error: any } = useFetchWithCondition(
    `/api/employee/${employeeId}`,
    employeeId
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEmployeeData>();

  const onSubmit = async (data: IEmployeeData) => {
    try {
      const res = await fetcher(`/api/employee/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        router.push('/');
      }
    } catch (error: any) {
      setServerError(error.message);
      setTimeout(() => {
        setServerError(null);
      }, 4000);
    }
  };

  useEffect(() => {
    if (id) {
      setEmployeeId(id);
    }
  }, [id]);

  useEffect(() => {
    if (employee) {
      reset(employee);
    }
  }, [employee, reset]);

  if (employeeError) return <div>failed to load</div>;

  if (!employee) return <div>loading...</div>;

  return (
    <EmployeeLayout title="Update">
      {serverError && <div className="text-red-500 mt-10">{serverError}</div>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-[40rem] w-[20rem] flex-col"
      >
        <div className="mt-10 flex flex-col">
          <label htmlFor="first_name" className="font-semibold mb-2">
            First Name
          </label>
          <input
            type="text"
            className="form-control
            w-full
                      self-start
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-white
                      border border-solid border-gray-700
                      rounded-lg
                      transition
                      ease-in-out
                      m-0 focus:outline-none  focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 bg-inherit flex-1"
            {...register('first_name', { required: true })}
            placeholder="Enter first name*"
          ></input>
          {errors.first_name && (
            <p className="text-red-500 mt-3">{errors.first_name.message}</p>
          )}
        </div>
        <div className="mt-5 flex flex-col">
          <label htmlFor="last_name" className="font-semibold mb-2">
            Last Name
          </label>
          <input
            type="text"
            className="form-control
                      self-start
                      px-3
                      w-full
                      py-1.5
                      text-base
                      font-normal
                      text-white
                      border border-solid border-gray-700
                      rounded-lg
                      transition
                      ease-in-out
                      m-0 focus:outline-none  focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 bg-inherit flex-1"
            {...register('last_name', { required: true })}
            placeholder="Enter last name*"
          ></input>
          {errors.last_name && (
            <p className="text-red-500 mt-3">{errors.last_name.message}</p>
          )}
        </div>
        <div className="mt-5 flex flex-col">
          <label htmlFor="email" className="font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            className="form-control
                      self-start
                      px-3
                      py-1.5
                      w-full
                      text-base
                      font-normal
                      text-white
                      border border-solid border-gray-700
                      rounded-lg
                      transition
                      ease-in-out
                      m-0 focus:outline-none  focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 bg-inherit flex-1"
            {...register('email', { required: true })}
            placeholder="Enter Email*"
          ></input>
          {errors.email && (
            <p className="text-red-500 mt-3">{errors.email.message}</p>
          )}
        </div>
        <div className="mt-5 flex flex-col">
          <label htmlFor="gender" className="font-semibold mb-2">
            Gender
          </label>
          <select
            className="p-2.5  bg-inherit text-base
            font-normal  border border-solid border-gray-700 rounded-lg transition
                      ease-in-out  focus:outline-none  focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 text-white w-full"
            {...register('gender', { required: true })}
          >
            <option className="bg-black">Prefer not to say</option>
            <option className="bg-black">Male</option>
            <option className="bg-black">Female</option>
            <option className="bg-black">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 mt-3">{errors.gender.message}</p>
          )}
        </div>
        <div className="mt-5 flex flex-col">
          <label htmlFor="salary" className="font-semibold mb-2">
            Salary
          </label>
          <input
            type="number"
            className="form-control
                      self-start
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-white
                      border border-solid border-gray-700
                      rounded-lg
                      transition
                      ease-in-out
                      m-0 focus:outline-none  focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 bg-inherit flex-1"
            {...register('salary', {
              required: true,
              min: { value: 0, message: 'Salary must be greater than 0' },
              max: {
                value: 1000000000,
                message:
                  'Salary must be less than 1000000000, you are too rich',
              },
              setValueAs(value) {
                return Number(value);
              },
            })}
            placeholder="Enter Salary* (in CAD)"
          ></input>
          {errors.salary && (
            <p className="text-red-500 mt-3">{errors.salary.message}</p>
          )}
        </div>
        <div className="flex justify-start">
          <button
            className=" bg-[#0070f3] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  mt-10"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </EmployeeLayout>
  );
}
