import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { User } from "../Data/interface.ts";
import { AddUser } from "../Services/UserService.ts";

const SignUpPage = ({ user }: User) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 16);

  const onSubmit = () => {
    setErrorMessage("");
    const userDto: User = {
      Username: getValues("username"),
      Password: getValues("password"),
      Mail: getValues("mail"),
      CurrentBalance: Number(getValues("currentBalance")),
      BirthDate: getValues("birthDate"),
    };
    AddUser(userDto)
      .then((res) => {
        if (res?.status === 201) {
          navigate("/login");
        } else {
          setErrorMessage(
            "User with these credentials already exists, please try again"
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex  min-vh-100 justify-content-center align-items-center bg-light background">
      <div
        className="container login-form flex-column justify-content-center align-items-center d-flex "
        style={{
          width: "auto",
          padding: "5%",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <Modal show={true}>
          <Modal.Header closeButton>
            <Modal.Title>Registration Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmit}>
              {errorMessage !== "" && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <p className="fs-5">{errorMessage}</p>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
              <Form.Group controlId="username">
                {errors.username && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    <p className="fs-5">Required field (Min 8 letters).</p>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                )}
                <Form.Label className="fs-4 mb-2">Username:</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control mb-4 border-primary-subtle"
                  {...register("username", { required: true, minLength: 8 })}
                />
              </Form.Group>
              <Form.Group controlId="password">
                {errors.password && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    <p className="fs-5">Required field (Min 8 letters).</p>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                )}
                <Form.Label className="fs-4 mb-2">Password:</Form.Label>
                <Form.Control
                  type="password"
                  className="form-control mb-4 border-primary-subtle"
                  {...register("password", { required: true, minLength: 8 })}
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
                  type="text"
                  className="form-control mb-4 border-primary-subtle"
                  {...register("mail", { required: true, minLength: 10 })}
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
                  type="datetime-local"
                  className="form-control mb-4 border-primary-subtle"
                  {...register("birthDate", {
                    required: true,
                    max: minDate.toISOString().split(".")[0],
                  })}
                />
              </Form.Group>
              <Form.Group controlId="currentBalance">
                {errors.currentBalance && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    <p className="fs-5">
                      Required field (Only positive numbers).
                    </p>
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
                  type="number"
                  defaultValue={0}
                  className="form-control mb-4 border-primary-subtle"
                  {...register("currentBalance", { required: true, min: 0 })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Sign Up
            </Button>

            <Button variant="danger" onClick={() => navigate("/login")}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SignUpPage;
