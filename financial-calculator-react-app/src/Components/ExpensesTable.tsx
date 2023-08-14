import React from "react";
import { Expense } from "../Data/interface.ts";
import { formatDateTime } from "../Helper/HelperFunction.ts";
import DeleteButtonForm from "./DeleteButtonForm.tsx";
import EditExpenseComponent from "./EditExpenseComponent.tsx";

const ExpensesTable = ({
  expenses,
  handleDeleteEntity,
  handleUpdateEntity,
}) => {
  return (
    <div className="table-wrapper-scroll-y my-custom-scrollbar">
      <table className="table table-bordered table-striped mb-0">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {expenses &&
            expenses?.map((expense: Expense) => {
              return (
                <tr key={expense?.expenseId}>
                  <td>{formatDateTime(expense?.dateTime)}</td>
                  <td>{expense?.description}</td>
                  <td>{expense?.category?.name}</td>
                  <td>{expense?.value}</td>
                  <td className="d-flex justify-content-center">
                    <DeleteButtonForm
                      entityId={expense.expenseId}
                      value={expense.value}
                      onSubmitFunction={handleDeleteEntity}
                    ></DeleteButtonForm>
                    <EditExpenseComponent
                      expense={expense}
                      onSubmitUpdate={handleUpdateEntity}
                    ></EditExpenseComponent>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
