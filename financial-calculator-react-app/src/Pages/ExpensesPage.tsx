import React from "react";
import ExpensesContent from "../Components/ExpensesContent.tsx";

const ExpensesPage = ({ loggedUser, changeUser }) => {
  return (
    <ExpensesContent
      title={"Expense"}
      message={"Spend wisely"}
      loggedUser={loggedUser}
      changeUser={changeUser}
    ></ExpensesContent>
  );
};

export default ExpensesPage;
