export interface MyError {
  status?: number;
  message: string;
}

export interface FormErrors {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  confPassword?: string;
  // to allow dynamic fields
  [key: string]: string | undefined;
}
