import axios from "axios";
import { backend_url, storageKey } from "../Data/data.ts";

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
