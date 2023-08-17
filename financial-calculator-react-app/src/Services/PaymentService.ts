import { Payment } from "./../Data/interface.ts";
import axios from "axios";
import { backend_url, username, storageKey } from "../Data/data.ts";
import { getMonthFromDate } from "../Helper/HelperFunction.ts";

const url = backend_url + "payment/";

export function GetAllPaymentsByUser() {
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

export function GetPaymentsByUserInMonth(year: number, month: number) {
  return axios
    .get(url + year + "/" + month, {
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

export function AddPayment(payment: Payment) {
  return axios
    .post(url, payment, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => console.log(err));
}

export function DeletePayment(paymentId: string) {
  return axios
    .delete(url + paymentId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      return res.status;
    })
    .catch((err) => console.log(err));
}

export function UpdatePayment(paymentDto: Payment) {
  return axios
    .put(url, paymentDto, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}
