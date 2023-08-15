import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Payment } from "../Data/interface.ts";
import { UpdatePayment } from "../Services/PaymentService.ts";

const EditPaymentComponent = ({ payment, onSubmitUpdate }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    const paymentDto: Payment = {
      paymentId: payment.paymentId,
      DateTime:
        getValues("dateTime") === "" ? payment.dateTime : getValues("dateTime"),
      Description: getValues("description"),
      UserId: payment.userId,
      Value: Number(getValues("value")),
    };
    UpdatePayment(paymentDto)
      .then((res) => {
        onSubmitUpdate(res);
        handleClose();
      })
      .catch((err) => console.log(err));
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
          fill="currentColor"
          className="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          ></path>
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {errors.dateTime && (
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
            <Form.Group controlId="dateTime">
              <Form.Label className="fs-4 mb-2">Pick a date:</Form.Label>
              <Form.Control
                defaultValue={payment.dateTime}
                type="datetime-local"
                className="form-control mb-4 border-primary-subtle"
                {...register("dateTime", { required: true })}
              />
            </Form.Group>
            <Form.Group controlId="description">
              {errors.description && (
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
              <Form.Label className="fs-4 mb-2">Description:</Form.Label>
              <Form.Control
                defaultValue={payment.description}
                type="text"
                className="form-control mb-4 border-primary-subtle"
                {...register("description", { required: true })}
              />
            </Form.Group>
            <Form.Group controlId="value">
              {errors.value && (
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
              <Form.Label className="fs-4 mb-2">Value:</Form.Label>
              <Form.Control
                defaultValue={payment.value}
                type="number"
                className="form-control mb-4 border-primary-subtle"
                {...register("value", { required: true, min: 0 })}
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
            Edit
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPaymentComponent;
