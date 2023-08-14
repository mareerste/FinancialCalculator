import axios from "axios";
import { backend_url, storageKey } from "../Data/data.ts";
import { LoginUserDTO } from "../Data/interface.ts";

const url = backend_url + "authenticate/";

export function postCredentials(user: LoginUserDTO) {
  return axios.post(url + "login", user).then((res) => {
    return res;
  });
}

export function WhoAmI() {
  return axios
    .get(url + "whoami", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem(storageKey),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}
