import React, { useState } from "react";
import { User } from "../Data/interface.ts";
import UserModelForm from "./UserModelForm.tsx";
import { UpdateUser } from "../Services/UserService.ts";

const ShowProfileComponent = ({ user, changeUser }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 16);

  const onSubmit = (userDto: User) => {
    UpdateUser(userDto)
      .then((res) => {
        changeUser(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <a className="nav-link" role="button" onClick={handleShow}>
        {user?.username}
      </a>
      <UserModelForm
        show={show}
        editable={true}
        handleClose={handleClose}
        handleSubmitForm={onSubmit}
        title={"Users informations"}
        user={user}
      ></UserModelForm>
    </>
  );
};
export default ShowProfileComponent;
