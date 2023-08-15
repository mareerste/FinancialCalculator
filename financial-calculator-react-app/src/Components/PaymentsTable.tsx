import React from "react";
import { Payment } from "../Data/interface.ts";
import { formatDateTime } from "../Helper/HelperFunction.ts";
import DeleteButtonForm from "./DeleteButtonForm.tsx";
import EditPaymentComponent from "./EditPaymentComponent.tsx";

const PaymentsTable = ({
  payments,
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
            <th scope="col">Value</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {payments &&
            payments?.map((payment: Payment) => {
              return (
                <tr key={payment?.paymentId}>
                  <td>{formatDateTime(payment?.dateTime)}</td>
                  <td>{payment?.description}</td>
                  <td>{payment?.value}</td>
                  <td className="d-flex justify-content-center">
                    <DeleteButtonForm
                      entityId={payment.paymentId}
                      value={payment.value}
                      onSubmitFunction={handleDeleteEntity}
                    ></DeleteButtonForm>
                    <EditPaymentComponent
                      payment={payment}
                      onSubmitUpdate={handleUpdateEntity}
                    ></EditPaymentComponent>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
