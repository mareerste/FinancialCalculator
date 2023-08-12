import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postCredentials } from "../Services/AuthService.ts";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = () => {
    const dto = {
      Username: getValues("username"),
      Password: getValues("password"),
    };

    postCredentials(dto)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form>
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
