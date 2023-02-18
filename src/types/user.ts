export type LoginUser = {
  password: string;
  userEmail: string;
};

export type NewUser = {
  userName: string;
  password: string;
  userEmail: string;
};

export type User = {
  id: number;
  userName: string;
  password: string;
  userEmail: string;
  isDeleted: boolean;
  deletedAt: null;
  availableCredits: number;
};
