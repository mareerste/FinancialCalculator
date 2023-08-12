import { NavComponent } from "./interface.ts";

export const base_url = "http://localhost:3000";
export const backend_url = "http://localhost:5162/api/";

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
