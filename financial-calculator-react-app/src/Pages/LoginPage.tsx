import React from "react";
import { Form } from "react-bootstrap";
import SignInForm from "../Components/SignInForm.tsx";
import logo from "../Images/logo.png";

const LoginPage = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <div className="d-flex  min-vh-100 justify-content-center align-items-center bg-warning">
      <div className="container login-form flex-column justify-content-center align-items-center d-flex bg-white">
        <h1 style={{ fontSize: "46px" }}>Financial Calculator Web App</h1>
        <Form.Text className="text-muted mb-3" style={{ fontSize: "large" }}>
          Welcome, Please sign in first.
        </Form.Text>
        <br />
        <SignInForm></SignInForm>
      </div>
    </div>
  );
};

export default LoginPage;
