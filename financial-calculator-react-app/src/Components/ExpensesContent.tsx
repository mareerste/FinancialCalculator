import React, { useEffect, useState } from "react";
import { filterMenu } from "../Data/data.ts";
import { Expense } from "../Data/interface.ts";
import {
  GetExpenseInMonth,
  GetExpenseByUser,
} from "../Services/ExpenseService.ts";
import ExpensesTable from "./ExpensesTable.tsx";
import FilterDropDownButton from "./FilterDropDownButton.tsx";
import MonthHandler from "./MonthHandler.tsx";
import TotalValueSection from "./TotalValueSection.tsx";

const ExpensesContent = ({ title, message }) => {
  const [expenses, setExpenses] = useState<Expense>([]);
  const [date, setDate] = useState(new Date());
  const [totalValue, setTotalValue] = useState(0);
  const [allExpenses, setAllExpenses] = useState(false);

  const changeDate = (newDate: Date) => {
    setDate(new Date(newDate));
  };

  useEffect(() => {
    console.log("promena allExpenses:", allExpenses);
    if (allExpenses) {
      GetExpenseByUser()
        .then((res) => {
          setExpenses(res);
          setTotalValue(getTotalValue(res));
        })
        .catch((err) => console.log(err));
    } else {
      GetExpenseInMonth(date)
        .then((res) => {
          setExpenses(res);
          setTotalValue(getTotalValue(res));
        })
        .catch((err) => console.log(err));
    }
  }, [date, allExpenses]);

  const getTotalValue = (expenses: Expense[]) => {
    return expenses.reduce(
      (accumulator, expense) => accumulator + expense.value,
      0
    );
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
        {!allExpenses && (
          <MonthHandler
            currentDate={date}
            changeDate={changeDate}
          ></MonthHandler>
        )}
        {expenses.length > 0 && (
          <>
            <FilterDropDownButton
              onSelectFilter={handleFitler}
              onSwitchButton={(value) => setAllExpenses(value)}
            ></FilterDropDownButton>
            <ExpensesTable expenses={expenses}></ExpensesTable>
            <TotalValueSection value={totalValue}></TotalValueSection>
          </>
        )}
      </div>
    </>
  );
};

export default ExpensesContent;
