import React, { useState, useEffect } from "react";
import { Payment } from "../Data/interface.ts";
import {
  GetPaymentsByUserInMonth,
  GetAllPaymentsByUser,
  DeletePayment,
  UpdatePayment,
  AddPayment,
} from "../Services/PaymentService.ts";
import MonthHandler from "./MonthHandler.tsx";
import PaymentsTable from "./PaymentsTable.tsx";
import TableFooterSection from "./TableFooterSection.tsx";
import ValueButton from "./ValueButton.tsx";
import DropDownMenu from "./DropDownMenu.tsx";
import { filterOptionsPayments } from "../Data/data.ts";

const PaymentsContent = ({ title, message, loggedUser, changeUser }) => {
  const [payments, setPayments] = useState<Payment>([]);
  const [date, setDate] = useState(new Date());
  const [totalValue, setTotalValue] = useState(0);
  const [getAllPayments, setGetAllPayments] = useState(false);

  const changeDate = (newDate: Date) => {
    setDate(new Date(newDate));
  };

  const sortOptions = ["aaa", "bbb"];

  useEffect(() => {
    GetAllPaymentsMonthly();
  }, [date]);

  const getTotalValue = (payments: Payment[]) => {
    return payments?.reduce(
      (accumulator, payment) => accumulator + payment.value,
      0
    );
  };

  const sortDateAsc = () => {
    setPayments(
      [...payments].sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      )
    );
  };

  const sortDateDesc = () => {
    setPayments(
      [...payments].sort(
        (a, b) =>
          new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
      )
    );
  };

  const sortValueAsc = () => {
    setPayments([...payments].sort((a, b) => a.value - b.value));
  };

  const sortValueDesc = () => {
    setPayments([...payments].sort((a, b) => b.value - a.value));
  };

  const handleFilter = (item: string) => {
    switch (item) {
      case filterOptionsPayments[0]: {
        sortDateAsc();
        break;
      }
      case filterOptionsPayments[1]: {
        sortDateDesc();
        break;
      }
      case filterOptionsPayments[2]: {
        sortValueAsc();
        break;
      }
      case filterOptionsPayments[3]: {
        sortValueDesc();
        break;
      }
      default: {
        break;
      }
    }
  };

  const GetAllPaymentsMonthly = () => {
    GetPaymentsByUserInMonth(date.getFullYear(), date.getMonth() + 1).then(
      (res) => {
        console.log(res);
        setPayments(res);
        setTotalValue(getTotalValue(res));
      }
    );
  };

  const handleOnSubmitPayment = (newPayment: Payment) => {
    var newList = [...payments, newPayment];
    setPayments(newList);
    setTotalValue(getTotalValue(newList));

    changeUser({
      ...loggedUser,
      currentBalance: loggedUser.currentBalance + newPayment.value,
    });
  };

  const handleDeleteEntity = (paymentId: string, paymentValue) => {
    DeletePayment(paymentId)
      .then((res) => {
        if (res === 200) {
          const updatedPayments = payments.filter(
            (payment) => payment.paymentId !== paymentId
          );
          setPayments(updatedPayments);
          setTotalValue(getTotalValue(updatedPayments));
          changeUser({
            ...loggedUser,
            currentBalance: loggedUser.currentBalance - paymentValue,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateEntity = (updatedPayment: Payment) => {
    const index = payments.findIndex(
      (payment) => payment.paymentId === updatedPayment.paymentId
    );

    if (index !== -1) {
      const updatedPayments = [...payments];

      changeUser({
        ...loggedUser,
        currentBalance:
          loggedUser.currentBalance -
          updatedPayments[index].value +
          updatedPayment.value,
      });

      updatedPayments[index] = updatedPayment;

      setPayments(updatedPayments);
      setTotalValue(getTotalValue(updatedPayments));
    }
  };

  return (
    <>
      <br />
      <div
        className="container mb-5 main-content"
        style={{ padding: "5vh", minHeight: "60vh" }}
      >
        <h2 className="text-center">
          {title}
          <span>
            <br />
          </span>
          <small className="text-muted">{message}</small>
        </h2>
        <hr />

        <MonthHandler currentDate={date} changeDate={changeDate}></MonthHandler>
        {payments?.length > 0 && (
          <>
            <DropDownMenu
              onSelectFilter={handleFilter}
              sortList={filterOptionsPayments}
              message={"Sort by"}
            ></DropDownMenu>
            <hr></hr>
            <PaymentsTable
              payments={payments}
              handleDeleteEntity={handleDeleteEntity}
              handleUpdateEntity={handleUpdateEntity}
            ></PaymentsTable>
          </>
        )}
        <TableFooterSection>
          <ValueButton
            text={"Current Balance:"}
            value={loggedUser?.currentBalance}
          ></ValueButton>
          <ValueButton text={"Sum Value:"} value={totalValue}></ValueButton>
        </TableFooterSection>
      </div>
    </>
  );
};

export default PaymentsContent;
