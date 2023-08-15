import axios from "axios";
import { backend_url, storageKey } from "../Data/data.ts";
import { Category } from "../Data/interface.ts";

const url = backend_url + "category/";

export function GetUndeletedCategories() {
  return axios
    .get(url + "undeleted", {
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

export function GetAllCategories() {
  return axios
    .get(url, {
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

export function DeleteCategory(categoryId: string) {
  return axios
    .delete(url + categoryId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      return res?.status;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function AddCategory(category: Category) {
  return axios
    .post(url, category, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}

export function UpdateCategory(category: Category) {
  return axios
    .put(url, category, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}
