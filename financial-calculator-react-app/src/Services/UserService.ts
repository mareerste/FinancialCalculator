import axios from "axios";
import { backend_url, storageKey } from "../Data/data.ts";
import { User } from "../Data/interface.ts";

const url = backend_url + "user/";

export function GetAllUsers() {
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

export function DeleteUser(userId: string) {
  return axios
    .delete(url + userId, {
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

export function AddUser(userDto: User) {
  return axios
    .post(url, userDto)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
}

export function UpdateUser(userDto: User) {
  return axios
    .put(url, userDto, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}
