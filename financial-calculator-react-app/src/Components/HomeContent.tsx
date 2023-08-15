import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Payment, Expense } from "../Data/interface.ts";
import { GetPaymentsByUserInMonth } from "../Services/PaymentService.ts";
import { GetExpenseInMonth } from "../Services/ExpenseService.ts";
import TableFooterSection from "./TableFooterSection.tsx";
import ValueButton from "./ValueButton.tsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomeContent = ({ title, message }) => {
  const [paymentsValue, setPaymentsValue] = useState(5);
  const [expensesValue, setExpensesValue] = useState(3);
  const [date, setDate] = useState(new Date());

  const getTotalValuePayments = (payments: Payment[]) => {
    return payments?.reduce(
      (accumulator, payment) => accumulator + payment.value,
      0
    );
  };

  const getTotalValueExpenses = (expenses: Expense[]) => {
    return expenses?.reduce(
      (accumulator, expense) => accumulator + expense.value,
      0
    );
  };

  useEffect(() => {
    GetPaymentsByUserInMonth(date.getFullYear(), date.getMonth() + 1).then(
      (res) => {
        setPaymentsValue(getTotalValuePayments(res));
      }
    );
    GetExpenseInMonth(date).then((res) => {
      setExpensesValue(getTotalValueExpenses(res));
    });
  }, []);

  const data = {
    labels: ["Expenses", "Income"],

    datasets: [
      {
        data: [expensesValue, paymentsValue],
        backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(255, 159, 64, 0.8)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
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
        <Pie data={data} style={{ maxHeight: "40vh" }} />
        <hr />
        <TableFooterSection>
          <ValueButton text={"Income:"} value={paymentsValue} />
          <ValueButton text={"Expenses:"} value={expensesValue} />
        </TableFooterSection>
      </div>
    </>
  );
};

export default HomeContent;
