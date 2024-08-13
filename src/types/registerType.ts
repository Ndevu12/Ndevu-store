export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  password: string;
  userType: string;
};

export type RegisterResponse = {
  data: {
    code: number;
    message: string;
  };
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: string;
  message?: string;
  data?: {
    message: string;
    token: string;
    email?: string;
  };
};
