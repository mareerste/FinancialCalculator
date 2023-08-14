import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Expense, Category } from "../Data/interface.ts";
import { GetUndeletedCategories } from "../Services/CategoryService.ts";
import { UpdateExpense } from "../Services/ExpenseService.ts";

const EditExpenseComponent = ({ expense, onSubmitUpdate }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    GetUndeletedCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log(expense);
    const expenseDto: Expense = {
      ExpenseId: expense.expenseId,
      DateTime:
        getValues("dateTime") === ""
          ? new Date().toISOString()
          : getValues("dateTime"),
      Description: getValues("description"),
      CategoryId: getValues("categoryId"),
      Value: Number(getValues("value")),
    };
    if (isExpenseValid(expenseDto)) {
      UpdateExpense(expenseDto)
        .then((res) => {
          onSubmitUpdate(res);
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  const isExpenseValid = (expense: Expense) => {
    if (expense.Value < 0 || Number.isNaN(expense.Value)) {
      return false;
    }
    return true;
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
          <Modal.Title>Pick a date:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="dateTime">
              <Form.Label className="fs-4 mb-2">Pick a date:</Form.Label>
              <Form.Control
                defaultValue={expense.dateTime}
                type="datetime-local"
                className="form-control mb-4 border-primary-subtle"
                {...register("dateTime")}
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
                defaultValue={expense.description}
                type="text"
                className="form-control mb-4 border-primary-subtle"
                {...register("description", { required: true })}
              />
            </Form.Group>
            <Form.Group controlId="categoryId">
              {errors.categoryId && (
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
              <Form.Label className="fs-4 mb-2">Category:</Form.Label>
              <Form.Select
                defaultValue={expense.categoryId}
                className="form-control mb-4 border-primary-subtle"
                {...register("categoryId", { required: true })}
              >
                {categories.length > 0 &&
                  categories?.map((category) => {
                    return (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.name}
                      </option>
                    );
                  })}
              </Form.Select>
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
                defaultValue={expense.value}
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

export default EditExpenseComponent;
