import { Gender, UserRole } from 'src/constants';

export interface User {
  email: string;

  password: string;

  username: string;

  firstName: string;

  lastName: string;

  gender: Gender;

  age: number;

  role: UserRole;
}
