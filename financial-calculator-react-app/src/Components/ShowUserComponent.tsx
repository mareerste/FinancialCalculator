import React, { useState } from "react";
import { User } from "../Data/interface.ts";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { userRoles, username } from "../Data/data.ts";

const ShowUserComponent = ({ user, title, editable, onSubmitUpdate }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 16,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  /*
  export interface User {
  userId: string;
  username: string;
  password: string;
  role: ERole;
  birthDate: string;
  mail: string;
  currentBalance: number;
  isDeleted: boolean;
}*/
  const onSubmit = () => {
    const userDto: User = {
      UserId: user.userId,
      Username: user.username,
      Mail: getValues("mail"),
      CurrentBalance: Number(getValues("currentBalnce")),
      BirthDate: getValues("birthDate"),
      Role: user.role,
      IsDeleted: user.isDeleted,
    };
    console.log(userDto);
    // UpdateUser(userDto)
    //   .then((res) => {
    //     onSubmitUpdate(res);
    //     handleClose();
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <>
      <Button
        variant="warning-outline"
        onClick={handleShow}
        className={"btn btn-outline-warning text-dark"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentFill"
          className="bi bi-arrow-up-right-square"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
          />
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="username">
              <Form.Label className="fs-4 mb-2">Username:</Form.Label>
              <Form.Control
                defaultValue={user.username}
                type="text"
                readOnly={true}
                className="form-control mb-4 border-primary-subtle"
                {...register("username", { required: true })}
              />
            </Form.Group>
            <Form.Group controlId="mail">
              {errors.mail && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <p className="fs-5">Required field.</p>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
              <Form.Label className="fs-4 mb-2">Mail:</Form.Label>
              <Form.Control
                defaultValue={user.mail}
                type="text"
                readOnly={!editable}
                className="form-control mb-4 border-primary-subtle"
                {...register("mail", { required: true })}
              />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label className="fs-4 mb-2">Role:</Form.Label>
              <Form.Control
                defaultValue={userRoles[user?.role]}
                type="text"
                readOnly={true}
                className="form-control mb-4 border-primary-subtle"
                {...register("role", { required: true })}
              />
            </Form.Group>
            <Form.Group controlId="isDeleted">
              <Form.Label className="fs-4 mb-2">Status:</Form.Label>
              <Form.Control
                defaultValue={user?.isDeleted ? "Deleted" : "Exist"}
                type="text"
                readOnly={true}
                className="form-control mb-4 border-primary-subtle"
                {...register("isDeleted", { required: true })}
              />
            </Form.Group>
            <Form.Group controlId="dateTime">
              {errors.birthDate && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <p className="fs-5">
                    Required field (Should be 16 years old or over).
                  </p>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
              <Form.Label className="fs-4 mb-2">Birth date:</Form.Label>
              <Form.Control
                defaultValue={user.birthDate}
                type="datetime-local"
                readOnly={!editable}
                className="form-control mb-4 border-primary-subtle"
                {...register("birthDate", { required: true, min: minDate })}
              />
            </Form.Group>
            {user.username === sessionStorage.getItem(username) && (
              <Form.Group controlId="currentBalance">
                {errors.currentBalance && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    <p className="fs-5">Required field.</p>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                )}
                <Form.Label className="fs-4 mb-2">Balance:</Form.Label>
                <Form.Control
                  defaultValue={user.currentBalance}
                  type="number"
                  readOnly={!editable}
                  className="form-control mb-4 border-primary-subtle"
                  {...register("currentBalance", { required: true })}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {editable && (
            <Button
              variant="success"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Edit
            </Button>
          )}
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowUserComponent;
