import React, { useEffect, useState } from "react";
import { filterOptionsExpenses } from "../Data/data.ts";
import { Expense } from "../Data/interface.ts";
import { DeleteExpense } from "../Services/ExpenseService.ts";
import {
  GetExpenseInMonth,
  GetExpenseByUser,
  GetExpenseByUserInDateRange,
} from "../Services/ExpenseService.ts";
import ExpensesTable from "./ExpensesTable.tsx";
import FilterDropDownButton from "./FilterTableComponent.tsx";
import MonthHandler from "./MonthHandler.tsx";
import TableFooterSection from "./TableFooterSection.tsx";
import ValueButton from "./ValueButton.tsx";

const ExpensesContent = ({ title, message, loggedUser, changeUser }) => {
  const [expenses, setExpenses] = useState<Expense>([]);
  const [date, setDate] = useState(new Date());
  const [totalValue, setTotalValue] = useState(0);
  const [getAllExpenses, setGetAllExpenses] = useState(false);
  const [getExpensesByDate, setGetExpensesByDate] = useState(false);
  const [dates, setDates] = useState<Array<string>>([]);

  const changeDate = (newDate: Date) => {
    setDate(new Date(newDate));
  };

  useEffect(() => {
    if (getAllExpenses) {
      getAllExpensesByUser();
    } else if (getExpensesByDate) {
      getExpensesByDateRange(dates[0], dates[1]);
    } else {
      getByMonth();
    }
  }, [date, getAllExpenses, dates]);

  const getTotalValue = (expenses: Expense[]) => {
    return expenses.reduce(
      (accumulator, expense) => accumulator + expense.value,
      0
    );
  };

  const getAllExpensesByUser = () => {
    GetExpenseByUser()
      .then((res) => {
        setExpenses(res);
        setTotalValue(getTotalValue(res));
      })
      .catch((err) => console.log(err));
  };

  const getExpensesByDateRange = (start: string, end: string) => {
    GetExpenseByUserInDateRange(start, end)
      .then((res) => {
        setExpenses(res);
        setTotalValue(getTotalValue(res));
        setGetExpensesByDate(false);
      })
      .catch((err) => {
        console.log(err);
        setGetExpensesByDate(false);
      });
  };

  const getByMonth = () => {
    GetExpenseInMonth(date)
      .then((res) => {
        setExpenses(res);
        setTotalValue(getTotalValue(res));
      })
      .catch((err) => console.log(err));
  };

  const handleFilter = (item: string) => {
    switch (item) {
      case filterOptionsExpenses[0]: {
        sortDateAsc();
        break;
      }
      case filterOptionsExpenses[1]: {
        sortDateDesc();
        break;
      }
      case filterOptionsExpenses[2]: {
        sortCategoryAsc();
        break;
      }
      case filterOptionsExpenses[3]: {
        sortCategoryDesc();
        break;
      }
      case filterOptionsExpenses[4]: {
        sortValueAsc();
        break;
      }
      case filterOptionsExpenses[5]: {
        sortValueDesc();
        break;
      }
      default: {
        break;
      }
    }
  };

  const sortDateAsc = () => {
    setExpenses(
      [...expenses].sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      )
    );
  };

  const sortDateDesc = () => {
    setExpenses(
      [...expenses].sort(
        (a, b) =>
          new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
      )
    );
  };

  const sortCategoryAsc = () => {
    setExpenses(
      [...expenses].sort((a, b) =>
        a.category.name.localeCompare(b.category.name)
      )
    );
  };

  const sortCategoryDesc = () => {
    setExpenses(
      [...expenses].sort((a, b) =>
        b.category.name.localeCompare(a.category.name)
      )
    );
  };

  const sortValueAsc = () => {
    setExpenses([...expenses].sort((a, b) => a.value - b.value));
  };

  const sortValueDesc = () => {
    setExpenses([...expenses].sort((a, b) => b.value - a.value));
  };

  const handleFilterDates = (start, end) => {
    setGetAllExpenses(false);
    setDates([start, end]);
    setGetExpensesByDate(true);
  };

  const handleOnSubmitExpense = (newExpense: Expense) => {
    var newList = [...expenses, newExpense];
    setExpenses(newList);
    setTotalValue(getTotalValue(newList));

    changeUser({
      ...loggedUser,
      currentBalance: loggedUser.currentBalance - newExpense.value,
    });
  };

  const handleDeleteEntity = (expenseId: string, expenseValue) => {
    DeleteExpense(expenseId)
      .then((res) => {
        if (res === 200) {
          const updatedExpenses = expenses.filter(
            (expense) => expense.expenseId !== expenseId
          );
          setExpenses(updatedExpenses);
          setTotalValue(getTotalValue(updatedExpenses));
          changeUser({
            ...loggedUser,
            currentBalance: loggedUser.currentBalance + expenseValue,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateEntity = (updatedExpense: Expense) => {
    const index = expenses.findIndex(
      (expense) => expense.expenseId === updatedExpense.expenseId
    );

    if (index !== -1) {
      const updatedExpenses = [...expenses];

      changeUser({
        ...loggedUser,
        currentBalance:
          loggedUser.currentBalance +
          updatedExpenses[index].value -
          updatedExpense.value,
      });

      updatedExpenses[index] = updatedExpense;

      setExpenses(updatedExpenses);
      setTotalValue(getTotalValue(updatedExpenses));
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
        {!getAllExpenses && (
          <MonthHandler
            currentDate={date}
            changeDate={changeDate}
          ></MonthHandler>
        )}
        <FilterDropDownButton
          onSelectFilter={handleFilter}
          onSwitchButton={(value) => setGetAllExpenses(value)}
          onDateFilter={(start, end) => handleFilterDates(start, end)}
          onSubmitExpense={(expense) => handleOnSubmitExpense(expense)}
        ></FilterDropDownButton>
        {expenses.length > 0 && (
          <>
            <ExpensesTable
              expenses={expenses}
              handleDeleteEntity={handleDeleteEntity}
              handleUpdateEntity={handleUpdateEntity}
            ></ExpensesTable>

            <TableFooterSection>
              <ValueButton
                text={"Your Balance:"}
                value={loggedUser?.currentBalance}
              ></ValueButton>
              <ValueButton
                text={"Total Value:"}
                value={totalValue}
              ></ValueButton>
            </TableFooterSection>
          </>
        )}
      </div>
    </>
  );
};

export default ExpensesContent;
