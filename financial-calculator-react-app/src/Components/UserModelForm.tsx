import React, { useState } from "react";
import { User } from "../Data/interface.ts";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { userRoles, username } from "../Data/data.ts";

const UserModelForm = ({
  show,
  editable,
  handleClose,
  handleSubmitForm,
  title,
  user,
}) => {
  const [editModeOn, setEditModeOn] = useState(false);
  const onSubmit = () => {
    const userDto: User = {
      UserId: user.userId,
      Username: user.username,
      Mail: getValues("mail"),
      CurrentBalance: Number(getValues("currentBalance")),
      BirthDate: getValues("birthDate"),
      Role: user.role,
      IsDeleted: user.isDeleted,
    };
    handleSubmitForm(userDto);
    setEditModeOn(false);
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 16);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="username">
              <Form.Label className="fs-4 mb-2">Username:</Form.Label>
              <Form.Control
                defaultValue={user?.username}
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
                defaultValue={user?.mail}
                type="text"
                readOnly={!editModeOn}
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
                defaultValue={user?.birthDate}
                type="datetime-local"
                readOnly={!editModeOn}
                className="form-control mb-4 border-primary-subtle"
                {...register("birthDate", {
                  required: true,
                  max: minDate.toISOString().split(".")[0],
                })}
              />
            </Form.Group>
            {user?.username === sessionStorage.getItem(username) && (
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
                  defaultValue={user?.currentBalance}
                  type="number"
                  readOnly={!editModeOn}
                  className="form-control mb-4 border-primary-subtle"
                  {...register("currentBalance", { required: true })}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {editable && (
            <>
              {!editModeOn ? (
                <Button
                  variant="success"
                  type="button"
                  onClick={() => setEditModeOn(true)}
                >
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    variant="success"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="warning"
                    type="button"
                    onClick={() => setEditModeOn(false)}
                  >
                    Back
                  </Button>
                </>
              )}
            </>
          )}
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserModelForm;
