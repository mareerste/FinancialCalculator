import React from "react";
import { filterMenu } from "../Data/data.ts";
import AddExpenseComponent from "./AddExpenseComponent.tsx";
import CheckBoxComponent from "./CheckBoxComponent.tsx";
import DateTimeFilterComponent from "./DateTimeFilterComponent.tsx";
import DropDownMenu from "./DropDownMenu.tsx";

const FilterTableComponent = ({
  onSelectFilter,
  onSwitchButton,
  onDateFilter,
  onSubmitExpense,
}) => {
  return (
    <div className="dropdown d-flex justify-content-between mb-2">
      <DateTimeFilterComponent
        onSubmit={onDateFilter}
        // onSubmit={(start, end) => console.log("start: ", start, "end: ", end)}
      ></DateTimeFilterComponent>
      <CheckBoxComponent
        messageOff={"Show all expenses"}
        messageOn={"Show montly expenses"}
        onClick={(clicked) => {
          onSwitchButton(clicked);
        }}
      ></CheckBoxComponent>
      <AddExpenseComponent
        onSubmitExpense={onSubmitExpense}
      ></AddExpenseComponent>
      <DropDownMenu
        onSelectFilter={onSelectFilter}
        message={"Sort by"}
      ></DropDownMenu>
    </div>
  );
};

export default FilterTableComponent;
