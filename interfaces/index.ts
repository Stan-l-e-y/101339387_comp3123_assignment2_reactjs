export type Employee = {
  id: string;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  salary: number;
};

export interface IEmployeeLayoutProps {
  children?: React.ReactNode;
  title: string;
}

export interface IEmployeeData {
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  salary: number;
}
