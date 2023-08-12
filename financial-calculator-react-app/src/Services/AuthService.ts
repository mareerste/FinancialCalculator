import axios from "axios";
import { backend_url } from "../Data/data.ts";
import { LoginUserDTO } from "../Data/interface.ts";

const url = backend_url + "authenticate/login";

export function postCredentials(user: LoginUserDTO) {
  return axios
    .post(url, user)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}
