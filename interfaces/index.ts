export type Employee = {
  id: string;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  salary: number;
};

export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
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

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
