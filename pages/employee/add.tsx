import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRequestDeps } from '../../lib/functions';
import { useForm } from 'react-hook-form';
import { IEmployeeData } from '../../interfaces';
import { SubmitHandler } from 'react-hook-form/dist/types';
import EmployeeLayout from '../../components/EmployeeLayout';

export default function Add() {
  const router = useRouter();

  const { fetcher, token } = getRequestDeps();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmployeeData>();

  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IEmployeeData> = async (
    data: IEmployeeData
  ) => {
    console.log(data);
    // const res = await fetcher('/api/employee/post', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  };

  return (
    <EmployeeLayout title="Add">
      <form onSubmit={handleSubmit(onSubmit)} className="h-[40rem] flex-col">
        <div className="mt-10 flex flex-col">
          <label htmlFor="first_name" className="font-semibold mb-2">
            First Name
          </label>
          <input
            type="text"
            className="form-control
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
          {errors.first_name && <p>{errors.first_name.message}</p>}
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
          {errors.last_name && <p>{errors.last_name.message}</p>}
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
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="mt-5 flex flex-col">
          <label htmlFor="gender" className="font-semibold mb-2">
            Gender
          </label>
          <select
            className="p-2.5 bg-inherit text-base
            font-normal  border border-solid border-gray-700 rounded-lg transition
                      ease-in-out  focus:outline-none  focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 text-white"
            {...register('gender', { required: true })}
          >
            <option className="bg-black">Prefer not to say</option>
            <option className="bg-black">Male</option>
            <option className="bg-black">Female</option>
            <option className="bg-black">Other</option>
          </select>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>
        <div className="mt-5 flex flex-col">
          <label htmlFor="salary" className="font-semibold mb-2">
            Salary
          </label>
          <input
            type="number"
            className="form-control
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
            {...register('salary', {
              required: true,
              min: 0,
              max: 1000000,
              setValueAs(value) {
                return Number(value);
              },
            })}
            placeholder="Enter Salary* (in CAD)"
          ></input>
          {errors.salary && <p>{errors.salary.message}</p>}
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
