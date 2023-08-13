export interface NavComponent {
  name: string;
  url: string;
}

export interface LoginUserDTO {
  username: string;
  password: string;
}

export interface Expense {
  expenseId: string;
  dateTime: string;
  description: string;
  categoryId: string;
  category: Category;
  value: number;
  isDeleted: boolean;
  userId: string;
  user: User;
}

export interface Category {
  categoryId: string;
  name: string;
  isDeleted: boolean;
}

export interface Payment {
  paymentId: string;
  description: string;
  dateTime: string;
  userId: string;
  user: User;
  value: number;
  isDeleted: boolean;
}

export interface User {
  userId: string;
  username: string;
  password: string;
  role: ERole;
  birthDate: string;
  mail: string;
  currentBalance: number;
  isDeleted: boolean;
}

enum ERole {
  User = "User",
  Moderator = "Moderator",
}
