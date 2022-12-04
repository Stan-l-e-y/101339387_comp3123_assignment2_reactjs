export type Employee = {
  id: string;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  salary: number;
};

export interface EmployeeLayoutProps {
  children?: React.ReactNode;
  title: string;
}
