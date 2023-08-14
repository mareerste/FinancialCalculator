import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { storageKey, role, username } from "../Data/data.ts";
import { postCredentials } from "../Services/AuthService.ts";

const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = () => {
    setErrorMessage("");
    const dto = {
      Username: getValues("username"),
      Password: getValues("password"),
    };

    postCredentials(dto)
      .then((res) => {
        sessionStorage.setItem(storageKey, res.data.token);
        sessionStorage.setItem(role, res.data.role);
        sessionStorage.setItem(username, res.data.username);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setErrorMessage("Wrong credentials.");
      });
  };

  return (
    <>
      <form>
        {errorMessage && (
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
        {errors.username && (
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
        <div className="form-group">
          <label className="fs-4 mb-2" htmlFor="opis">
            Username:
          </label>
          <input
            type="text"
            className="form-control mb-4 border-primary-subtle"
            {...register("username", { required: true, maxLength: 20 })}
          />
        </div>
        {errors.password && (
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
        <div className="form-group">
          <label className="fs-4 mb-2" htmlFor="opis">
            Password:
          </label>
          <input
            type="password"
            className="form-control mb-4 border-primary-subtle"
            {...register("password", { required: true })}
          />
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary btn-lg"
          style={{ minWidth: "50%", marginLeft: "25%" }}
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default SignInForm;
