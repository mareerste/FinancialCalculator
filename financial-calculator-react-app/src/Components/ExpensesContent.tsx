import React, { useEffect, useState } from "react";
import { filterMenu } from "../Data/data.ts";
import { Expense } from "../Data/interface.ts";
import {
  GetExpenseInMonth,
  GetExpenseByUser,
  GetExpenseByUserInDateRange,
} from "../Services/ExpenseService.ts";
import ExpensesTable from "./ExpensesTable.tsx";
import FilterDropDownButton from "./FilterTableComponent.tsx";
import MonthHandler from "./MonthHandler.tsx";
import TotalValueSection from "./TotalValueSection.tsx";

const ExpensesContent = ({ title, message }) => {
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

  const handleFitler = (item: string) => {
    switch (item) {
      case filterMenu[0]: {
        sortDateAsc();
        break;
      }
      case filterMenu[1]: {
        sortDateDesc();
        break;
      }
      case filterMenu[2]: {
        sortCategoryAsc();
        break;
      }
      case filterMenu[3]: {
        sortCategoryDesc();
        break;
      }
      case filterMenu[4]: {
        sortValueAsc();
        break;
      }
      case filterMenu[5]: {
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

  const handleFitlerDates = (start, end) => {
    setGetAllExpenses(false);
    setDates([start, end]);
    setGetExpensesByDate(true);
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
          onSelectFilter={handleFitler}
          onSwitchButton={(value) => setGetAllExpenses(value)}
          onDateFilter={(start, end) => handleFitlerDates(start, end)}
        ></FilterDropDownButton>
        {expenses.length > 0 && (
          <>
            <ExpensesTable expenses={expenses}></ExpensesTable>
            <TotalValueSection value={totalValue}></TotalValueSection>
          </>
        )}
      </div>
    </>
  );
};

export default ExpensesContent;
