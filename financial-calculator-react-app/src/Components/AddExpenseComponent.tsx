import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Expense, Category } from "../Data/interface.ts";
import { username } from "../Data/data.ts";
import { GetUndeletedCategories } from "../Services/CategoryService.ts";
import { AddExpense } from "../Services/ExpenseService.ts";

const AddExpenseComponent = ({ onSubmitExpense }) => {
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
    const expenseDto: Expense = {
      DateTime:
        getValues("dateTime") === ""
          ? new Date().toISOString()
          : getValues("dateTime"),
      Description: getValues("description"),
      CategoryId: getValues("categoryId"),
      Value: Number(getValues("value")),
      Username: sessionStorage.getItem(username),
    };
    if (isExpenseValid(expenseDto)) {
      AddExpense(expenseDto)
        .then((res) => {
          onSubmitExpense(res);
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
      <Button variant="warning" onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2vh"
          height="2vh"
          style={{ marginRight: "1vh" }}
          fill="currentColor"
          className="bi bi-plus-square"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
        </svg>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="dateTime">
              <Form.Label className="fs-4 mb-2">Pick a date:</Form.Label>
              <Form.Control
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
            Add
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddExpenseComponent;
