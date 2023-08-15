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
