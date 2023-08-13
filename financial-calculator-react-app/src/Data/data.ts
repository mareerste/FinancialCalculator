import { NavComponent } from "./interface.ts";

export const base_url = "http://localhost:3000";
export const backend_url = "http://localhost:5162/api/";
export const storageKey = "JWT";
export const username = "username";

export const filterMenu = [
  "Date asc",
  "Date desc",
  "Category asc",
  "Category desc",
  "Value asc",
  "Value desc",
];

export const userComponents: NavComponent[] = [
  {
    name: "Home",
    url: "/home",
  },
  {
    name: "Expenses",
    url: "/expenses",
  },
  {
    name: "Payments",
    url: "/payments",
  },
];

export const moderatorComponents: NavComponent[] = [
  {
    name: "Categories",
    url: "/categories",
  },
  {
    name: "Users",
    url: "/users",
  },
];
