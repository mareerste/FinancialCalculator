import React from "react";
import { Form } from "react-bootstrap";
import SignInForm from "../Components/SignInForm.tsx";

const LoginPage = () => {
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
