import { Expense } from "./../Data/interface.ts";
import axios from "axios";
import { backend_url, username, storageKey } from "../Data/data.ts";
import { getMonthFromDate } from "../Helper/HelperFunction.ts";

const url = backend_url + "expense/";

export function GetExpenseInMonth(date: Date) {
  return axios
    .get(url + date.getFullYear() + "/" + getMonthFromDate(date), {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function GetExpenseByUser() {
  return axios
    .get(url + sessionStorage.getItem(username), {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function GetExpenseByUserInDateRange(
  startDate: string,
  endDate: string
) {
  return axios
    .get(url + "range/" + startDate + "/" + endDate, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function AddExpense(expense: Expense) {
  return axios
    .post(url, expense, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      console.log(res);
      console.log(res.data);
      return res?.data;
    })
    .catch((err) => console.log(err));
}
